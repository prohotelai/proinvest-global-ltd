import { prisma } from './db';
import { z } from 'zod';

// Commission percentage bounds
const MIN_COMMISSION_PERCENT = 5;
const MAX_COMMISSION_PERCENT = 30;

// Commission becomes available after 60 days
const COMMISSION_ELIGIBILITY_DAYS = 60;

/**
 * Resolve commission percentage for a partner/product/plan combination
 * 
 * Resolution order (most specific to least specific):
 * 1. Partner + Product + Plan override
 * 2. Partner + Product override (no plan)
 * 3. If no override found, return null (block commission - admin must set it)
 */
export async function resolveCommissionPercent(
  partnerId: string,
  productId: string,
  planKey?: string,
  billingCycle?: string
): Promise<{ percent: number | null; source: string; reason?: string }> {
  // Find plan ID if planKey is provided
  let planId: string | null = null;
  if (planKey && billingCycle) {
    const plan = await prisma.productPlan.findFirst({
      where: {
        productId,
        planKey,
        billingCycle,
        active: true,
      },
    });
    planId = plan?.id || null;
  }

  // 1. Try to find partner + product + plan specific override
  if (planId) {
    const specificOverride = await prisma.partnerCommissionOverride.findFirst({
      where: {
        partnerId,
        productId,
        planId,
      },
      orderBy: { effectiveFrom: 'desc' },
    });

    if (specificOverride) {
      return {
        percent: specificOverride.percent,
        source: 'partner_product_plan_override',
      };
    }
  }

  // 2. Try to find partner + product override (no specific plan)
  const productOverride = await prisma.partnerCommissionOverride.findFirst({
    where: {
      partnerId,
      productId,
      planId: null,
    },
    orderBy: { effectiveFrom: 'desc' },
  });

  if (productOverride) {
    return {
      percent: productOverride.percent,
      source: 'partner_product_override',
    };
  }

  // 3. No override found - block commission creation
  return {
    percent: null,
    source: 'none',
    reason: 'No commission rate configured for this partner/product combination',
  };
}

/**
 * Create a commission entry from an invoice_paid event
 */
export async function createCommissionEntry(params: {
  partnerId: string;
  productId: string;
  externalCustomerId: string;
  externalSubscriptionId: string;
  externalInvoiceId: string;
  amountPaid: number;
  currency: string;
  planKey: string;
  billingCycle: string;
  occurredAt: Date;
}): Promise<{ success: boolean; commission?: CommissionResult; error?: string }> {
  const {
    partnerId,
    productId,
    externalCustomerId,
    externalSubscriptionId,
    externalInvoiceId,
    amountPaid,
    currency,
    planKey,
    billingCycle,
    occurredAt,
  } = params;

  // Check if partner is approved
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { status: true },
  });

  if (!partner || partner.status !== 'approved') {
    return {
      success: false,
      error: `Partner is not approved (status: ${partner?.status || 'not found'})`,
    };
  }

  // Resolve commission percentage
  const { percent, source, reason } = await resolveCommissionPercent(
    partnerId,
    productId,
    planKey,
    billingCycle
  );

  if (percent === null) {
    return {
      success: false,
      error: reason || 'No commission rate configured',
    };
  }

  // Validate percent is within bounds
  if (percent < MIN_COMMISSION_PERCENT || percent > MAX_COMMISSION_PERCENT) {
    return {
      success: false,
      error: `Commission percent ${percent} is outside allowed range (${MIN_COMMISSION_PERCENT}-${MAX_COMMISSION_PERCENT})`,
    };
  }

  // Calculate commission amount
  const commissionAmount = (amountPaid * percent) / 100;

  // Calculate eligibility date (60 days from payment)
  const eligibleAt = new Date(occurredAt);
  eligibleAt.setDate(eligibleAt.getDate() + COMMISSION_ELIGIBILITY_DAYS);

  // Check for duplicate (idempotency on invoice ID)
  const existing = await prisma.commissionEntry.findUnique({
    where: { externalInvoiceId },
  });

  if (existing) {
    return {
      success: true,
      commission: {
        id: existing.id,
        commissionAmount: existing.commissionAmount,
        commissionPercent: existing.commissionPercent,
        status: existing.status,
        isDuplicate: true,
      },
    };
  }

  // Create commission entry with pending status
  const commission = await prisma.commissionEntry.create({
    data: {
      partnerId,
      productId,
      externalCustomerId,
      externalSubscriptionId,
      externalInvoiceId,
      amountPaid,
      currency,
      commissionPercent: percent,
      commissionAmount,
      status: 'pending',
      occurredAt,
      eligibleAt,
    },
  });

  // Create ledger transaction
  await prisma.ledgerTransaction.create({
    data: {
      partnerId,
      type: 'commission_earned',
      amount: commissionAmount,
      currency,
      referenceType: 'commission',
      referenceId: commission.id,
      description: `Commission pending for invoice ${externalInvoiceId}`,
    },
  });

  return {
    success: true,
    commission: {
      id: commission.id,
      commissionAmount,
      commissionPercent: percent,
      status: 'pending',
      isDuplicate: false,
    },
  };
}

interface CommissionResult {
  id: string;
  commissionAmount: number;
  commissionPercent: number;
  status: string;
  isDuplicate: boolean;
}

/**
 * Transition pending commissions to available when eligible_at <= now
 */
export async function reconcilePendingCommissions(): Promise<{
  processed: number;
  errors: string[];
}> {
  const now = new Date();
  const errors: string[] = [];

  // Find all pending commissions that are now eligible
  const eligibleCommissions = await prisma.commissionEntry.findMany({
    where: {
      status: 'pending',
      eligibleAt: { lte: now },
    },
  });

  let processed = 0;

  for (const commission of eligibleCommissions) {
    try {
      await prisma.commissionEntry.update({
        where: { id: commission.id },
        data: { status: 'available' },
      });
      processed++;
    } catch (err) {
      errors.push(`Failed to update commission ${commission.id}: ${err}`);
    }
  }

  return { processed, errors };
}

/**
 * Void commissions when subscription is canceled
 * Voids all unpaid (pending or available) commissions for the subscription
 */
export async function voidCommissionsForSubscription(
  externalSubscriptionId: string,
  cancelReason?: string
): Promise<{ voided: number; errors: string[] }> {
  const errors: string[] = [];

  // Find all unpaid commissions for this subscription
  const commissions = await prisma.commissionEntry.findMany({
    where: {
      externalSubscriptionId,
      status: { in: ['pending', 'available'] },
    },
  });

  let voided = 0;

  for (const commission of commissions) {
    try {
      // Update commission status to void
      await prisma.commissionEntry.update({
        where: { id: commission.id },
        data: {
          status: 'void',
          voidReason: cancelReason || 'subscription_canceled',
        },
      });

      // Create negative ledger transaction
      await prisma.ledgerTransaction.create({
        data: {
          partnerId: commission.partnerId,
          type: 'commission_voided',
          amount: -commission.commissionAmount,
          currency: commission.currency,
          referenceType: 'commission',
          referenceId: commission.id,
          description: `Commission voided due to subscription cancellation`,
        },
      });

      voided++;
    } catch (err) {
      errors.push(`Failed to void commission ${commission.id}: ${err}`);
    }
  }

  return { voided, errors };
}

/**
 * Void/clawback commissions for a refund
 */
export async function handleRefund(
  externalInvoiceId: string,
  amountRefunded: number,
  reason: string
): Promise<{ voided: number; clawedBack: number; errors: string[] }> {
  const errors: string[] = [];

  // Find commission for this invoice
  const commission = await prisma.commissionEntry.findUnique({
    where: { externalInvoiceId },
  });

  if (!commission) {
    return { voided: 0, clawedBack: 0, errors: ['No commission found for this invoice'] };
  }

  let voided = 0;
  let clawedBack = 0;

  // Calculate refund proportion
  const refundRatio = amountRefunded / commission.amountPaid;
  const clawbackAmount = commission.commissionAmount * refundRatio;

  try {
    if (commission.status === 'paid') {
      // Commission was already paid - create clawback (negative adjustment)
      await prisma.ledgerTransaction.create({
        data: {
          partnerId: commission.partnerId,
          type: 'adjustment',
          amount: -clawbackAmount,
          currency: commission.currency,
          referenceType: 'commission',
          referenceId: commission.id,
          description: `Clawback due to ${reason}: -$${clawbackAmount.toFixed(2)}`,
        },
      });

      // Update commission with void reason but keep status as paid
      await prisma.commissionEntry.update({
        where: { id: commission.id },
        data: {
          voidReason: `Refund/Chargeback: ${reason}`,
        },
      });

      clawedBack = 1;
    } else {
      // Commission not yet paid - void it
      await prisma.commissionEntry.update({
        where: { id: commission.id },
        data: {
          status: 'void',
          voidReason: `Refund/Chargeback: ${reason}`,
        },
      });

      // Create negative ledger transaction
      await prisma.ledgerTransaction.create({
        data: {
          partnerId: commission.partnerId,
          type: 'commission_voided',
          amount: -commission.commissionAmount,
          currency: commission.currency,
          referenceType: 'commission',
          referenceId: commission.id,
          description: `Commission voided due to ${reason}`,
        },
      });

      voided = 1;
    }
  } catch (err) {
    errors.push(`Failed to process refund for commission ${commission.id}: ${err}`);
  }

  return { voided, clawedBack, errors };
}

/**
 * Calculate partner's available balance
 */
export async function calculatePartnerBalance(partnerId: string): Promise<{
  available: number;
  pending: number;
  paid: number;
  currency: string;
}> {
  const [availableResult, pendingResult, paidResult] = await Promise.all([
    // Available balance (available commissions not yet paid)
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'available' },
      _sum: { commissionAmount: true },
    }),
    // Pending balance
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'pending' },
      _sum: { commissionAmount: true },
    }),
    // Total paid
    prisma.commissionEntry.aggregate({
      where: { partnerId, status: 'paid' },
      _sum: { commissionAmount: true },
    }),
  ]);

  // Also factor in any negative adjustments (clawbacks)
  const adjustments = await prisma.ledgerTransaction.aggregate({
    where: {
      partnerId,
      type: 'adjustment',
    },
    _sum: { amount: true },
  });

  const available = (availableResult._sum.commissionAmount || 0) + (adjustments._sum.amount || 0);

  return {
    available: Math.max(0, available), // Can be negative but show 0 for available
    pending: pendingResult._sum.commissionAmount || 0,
    paid: paidResult._sum.commissionAmount || 0,
    currency: 'USD',
  };
}

/**
 * Request a payout
 */
export async function requestPayout(
  partnerId: string,
  amount: number,
  method: string
): Promise<{ success: boolean; payoutRequest?: { id: string }; error?: string }> {
  // Get current month key
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // Check if already requested this month
  const existingRequest = await prisma.payoutRequest.findUnique({
    where: {
      partnerId_monthKey: {
        partnerId,
        monthKey,
      },
    },
  });

  if (existingRequest) {
    return {
      success: false,
      error: 'Payout already requested for this month',
    };
  }

  // Calculate available balance
  const balance = await calculatePartnerBalance(partnerId);

  if (balance.available < 100) {
    return {
      success: false,
      error: `Minimum payout amount is $100. Your available balance is $${balance.available.toFixed(2)}`,
    };
  }

  if (amount > balance.available) {
    return {
      success: false,
      error: `Requested amount ($${amount}) exceeds available balance ($${balance.available.toFixed(2)})`,
    };
  }

  if (amount < 100) {
    return {
      success: false,
      error: 'Minimum payout amount is $100',
    };
  }

  // Create payout request
  const payoutRequest = await prisma.payoutRequest.create({
    data: {
      partnerId,
      requestedAmount: amount,
      currency: 'USD',
      method,
      status: 'requested',
      monthKey,
    },
  });

  // Create ledger transaction
  await prisma.ledgerTransaction.create({
    data: {
      partnerId,
      type: 'payout_requested',
      amount: -amount,
      currency: 'USD',
      referenceType: 'payout',
      referenceId: payoutRequest.id,
      description: `Payout requested: $${amount.toFixed(2)} via ${method}`,
    },
  });

  return {
    success: true,
    payoutRequest: { id: payoutRequest.id },
  };
}

/**
 * Process payout (admin marks as paid)
 */
export async function processPayout(
  payoutRequestId: string,
  status: 'approved' | 'processing' | 'paid' | 'rejected',
  adminNote?: string
): Promise<{ success: boolean; error?: string }> {
  const payoutRequest = await prisma.payoutRequest.findUnique({
    where: { id: payoutRequestId },
  });

  if (!payoutRequest) {
    return { success: false, error: 'Payout request not found' };
  }

  // Update payout request status
  await prisma.payoutRequest.update({
    where: { id: payoutRequestId },
    data: {
      status,
      processedAt: status === 'paid' || status === 'rejected' ? new Date() : undefined,
      adminNote,
    },
  });

  if (status === 'paid') {
    // Mark commissions as paid (FIFO)
    let remainingAmount = payoutRequest.requestedAmount;
    const availableCommissions = await prisma.commissionEntry.findMany({
      where: {
        partnerId: payoutRequest.partnerId,
        status: 'available',
      },
      orderBy: { eligibleAt: 'asc' }, // FIFO
    });

    for (const commission of availableCommissions) {
      if (remainingAmount <= 0) break;

      if (commission.commissionAmount <= remainingAmount) {
        await prisma.commissionEntry.update({
          where: { id: commission.id },
          data: {
            status: 'paid',
            paidAt: new Date(),
          },
        });
        remainingAmount -= commission.commissionAmount;
      }
    }

    // Create ledger transaction for paid payout
    await prisma.ledgerTransaction.create({
      data: {
        partnerId: payoutRequest.partnerId,
        type: 'payout_paid',
        amount: 0, // Already deducted when requested
        currency: 'USD',
        referenceType: 'payout',
        referenceId: payoutRequestId,
        description: `Payout completed: $${payoutRequest.requestedAmount.toFixed(2)}`,
      },
    });
  }

  if (status === 'rejected') {
    // Reverse the payout request ledger transaction
    await prisma.ledgerTransaction.create({
      data: {
        partnerId: payoutRequest.partnerId,
        type: 'adjustment',
        amount: payoutRequest.requestedAmount,
        currency: 'USD',
        referenceType: 'payout',
        referenceId: payoutRequestId,
        description: `Payout rejected: $${payoutRequest.requestedAmount.toFixed(2)} returned to available balance`,
      },
    });
  }

  return { success: true };
}

// Validation schemas
export const invoicePaidSchema = z.object({
  type: z.literal('invoice_paid'),
  occurred_at: z.string().datetime(),
  external_customer_id: z.string().min(1),
  external_subscription_id: z.string().min(1),
  external_invoice_id: z.string().min(1),
  currency: z.string().default('USD'),
  amount_paid: z.number().positive(),
  tax_amount: z.number().default(0),
  discount_amount: z.number().default(0),
  net_amount: z.number().positive(),
  plan_key: z.string().min(1),
  billing_cycle: z.enum(['monthly', 'annual']),
  ppn_ref: z.string().optional(),
  click_id: z.string().uuid().optional(),
  payment_processor: z.enum(['stripe', 'wise', 'bank', 'other']).optional(),
  payment_reference: z.string().optional(),
});

export const subscriptionCanceledSchema = z.object({
  type: z.literal('subscription_canceled'),
  occurred_at: z.string().datetime(),
  external_customer_id: z.string().min(1),
  external_subscription_id: z.string().min(1),
  cancel_reason: z.string().optional(),
  effective_at: z.string().datetime(),
});

export const refundSchema = z.object({
  type: z.literal('refund'),
  occurred_at: z.string().datetime(),
  external_customer_id: z.string().min(1),
  external_invoice_id: z.string().min(1),
  amount_refunded: z.number().positive(),
  currency: z.string().default('USD'),
  reason: z.enum(['chargeback', 'refund', 'other']),
});
