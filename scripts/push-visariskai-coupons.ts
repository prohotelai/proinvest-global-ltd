#!/usr/bin/env node
import 'dotenv/config';
import { pushVisaRiskAICoupons } from '../lib/partner/push-visariskai-coupons.ts';

async function main() {
  const result = await pushVisaRiskAICoupons();

  if (!result.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('[VisaRiskAI Push] Script failed unexpectedly:', error);
  process.exit(1);
});
