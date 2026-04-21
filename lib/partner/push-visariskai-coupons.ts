import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../generated/prisma/client.js';

type CouponSyncItem = {
  partnerRefCode: string;
  couponCode: string;
  productSlug: string;
  isActive: boolean;
};

const VISARISKAI_SYNC_URL = 'https://www.visariskai.com/api/internal/ppn/sync-coupons';

function normalizePartnerRefCode(value: string): string {
  return value.trim().toUpperCase();
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
  const adapter = new PrismaLibSql({ url: databaseUrl });

  return new PrismaClient({ adapter, log: ['error'] });
}

export async function pushVisaRiskAICoupons() {
  console.log('[VisaRiskAI Push] Starting coupon sync push.');

  const sharedSecret = process.env.VISARISKAI_SYNC_SECRET;
  if (!sharedSecret) {
    console.error('[VisaRiskAI Push] Missing VISARISKAI_SYNC_SECRET. Skipping push.');
    return {
      ok: false,
      reason: 'missing_secret',
      pushedItems: 0,
    };
  }

  const prisma = createPrismaClient();

  try {
    const [partners, products] = await Promise.all([
      prisma.partner.findMany({
        select: {
          partnerCode: true,
          status: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.product.findMany({
        select: {
          slug: true,
          status: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    const items: CouponSyncItem[] = [];

    for (const partner of partners) {
      const partnerRefCode = normalizePartnerRefCode(partner.partnerCode);
      const couponCode = partnerRefCode;

      for (const product of products) {
        items.push({
          partnerRefCode,
          couponCode,
          productSlug: product.slug,
          isActive: partner.status === 'approved' && product.status === 'active',
        });
      }
    }

    console.log(`[VisaRiskAI Push] Prepared ${items.length} coupon identities.`);

    const response = await fetch(VISARISKAI_SYNC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-sync-secret': sharedSecret,
      },
      body: JSON.stringify({ items }),
    });

    const responseText = await response.text();

    if (response.ok) {
      console.log(`[VisaRiskAI Push] Sync succeeded with status ${response.status}.`);
      console.log(`[VisaRiskAI Push] Response: ${responseText}`);
      return {
        ok: true,
        status: response.status,
        pushedItems: items.length,
        responseText,
      };
    }

    console.error(`[VisaRiskAI Push] Sync failed with status ${response.status}.`);
    console.error(`[VisaRiskAI Push] Response: ${responseText}`);
    return {
      ok: false,
      status: response.status,
      pushedItems: items.length,
      responseText,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[VisaRiskAI Push] Request error: ${message}`);
    return {
      ok: false,
      reason: 'request_error',
      pushedItems: 0,
      error: message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
