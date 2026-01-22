import { z } from 'zod';

// Click event schema
export const clickEventSchema = z.object({
  type: z.literal('click'),
  occurred_at: z.string().datetime(),
  ppn_ref: z.string().min(1),
  click_id: z.string().uuid(),
  landing_url: z.string().url(),
  ip: z.string().optional(),
  user_agent: z.string().optional(),
  utm: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    content: z.string().optional(),
    term: z.string().optional(),
  }).optional(),
});

// Signup event schema
export const signupEventSchema = z.object({
  type: z.literal('signup'),
  occurred_at: z.string().datetime(),
  ppn_ref: z.string().optional(),
  click_id: z.string().uuid().optional(),
  external_customer_id: z.string().min(1),
  email: z.string().email(),
  country: z.string().length(2).optional(),
  metadata: z.object({
    company_name: z.string().optional(),
  }).optional(),
});

// Subscription started event schema
export const subscriptionStartedSchema = z.object({
  type: z.literal('subscription_started'),
  occurred_at: z.string().datetime(),
  external_customer_id: z.string().min(1),
  external_subscription_id: z.string().min(1),
  plan_key: z.string().min(1),
  billing_cycle: z.enum(['monthly', 'annual']),
  is_trial: z.boolean().default(false),
  trial_ends_at: z.string().datetime().optional(),
  ppn_ref: z.string().optional(),
  click_id: z.string().uuid().optional(),
});

// Invoice paid event schema
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

// Subscription canceled event schema
export const subscriptionCanceledSchema = z.object({
  type: z.literal('subscription_canceled'),
  occurred_at: z.string().datetime(),
  external_customer_id: z.string().min(1),
  external_subscription_id: z.string().min(1),
  cancel_reason: z.string().optional(),
  effective_at: z.string().datetime(),
});

// Refund event schema
export const refundEventSchema = z.object({
  type: z.literal('refund'),
  occurred_at: z.string().datetime(),
  external_customer_id: z.string().min(1),
  external_invoice_id: z.string().min(1),
  amount_refunded: z.number().positive(),
  currency: z.string().default('USD'),
  reason: z.enum(['chargeback', 'refund', 'other']),
});

// Types
export type ClickEvent = z.infer<typeof clickEventSchema>;
export type SignupEvent = z.infer<typeof signupEventSchema>;
export type SubscriptionStartedEvent = z.infer<typeof subscriptionStartedSchema>;
export type InvoicePaidEvent = z.infer<typeof invoicePaidSchema>;
export type SubscriptionCanceledEvent = z.infer<typeof subscriptionCanceledSchema>;
export type RefundEvent = z.infer<typeof refundEventSchema>;
