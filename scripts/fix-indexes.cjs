const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// The missing indexes from the initial migration
const indexes = [
  'CREATE UNIQUE INDEX "User_email_key" ON "User"("email");',
  'CREATE UNIQUE INDEX "Tier_name_key" ON "Tier"("name");',
  'CREATE UNIQUE INDEX "Partner_userId_key" ON "Partner"("userId");',
  'CREATE UNIQUE INDEX "Partner_partnerCode_key" ON "Partner"("partnerCode");',
  'CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");',
  'CREATE UNIQUE INDEX "ProductPlan_productId_planKey_billingCycle_key" ON "ProductPlan"("productId", "planKey", "billingCycle");',
  'CREATE UNIQUE INDEX "Attribution_productId_externalCustomerId_key" ON "Attribution"("productId", "externalCustomerId");',
  'CREATE UNIQUE INDEX "PartnerCommissionOverride_partnerId_productId_planId_key" ON "PartnerCommissionOverride"("partnerId", "productId", "planId");',
  'CREATE UNIQUE INDEX "CommissionEntry_externalInvoiceId_key" ON "CommissionEntry"("externalInvoiceId");',
  'CREATE UNIQUE INDEX "PayoutRequest_partnerId_monthKey_key" ON "PayoutRequest"("partnerId", "monthKey");',
];

async function applyIndexes() {
  console.log("=== Creating Missing Indexes ===\n");
  
  let successCount = 0;
  let failCount = 0;
  
  for (const sql of indexes) {
    try {
      await client.execute(sql);
      const match = sql.match(/INDEX "(\w+)"/i);
      console.log("  [OK] Created INDEX: " + (match ? match[1] : "unknown"));
      successCount++;
    } catch (err) {
      console.error("  [FAIL]: " + err.message);
      failCount++;
    }
  }
  
  console.log("\n=== Index Creation Summary ===");
  console.log("  Successful: " + successCount);
  console.log("  Failed: " + failCount);
  
  return failCount === 0;
}

applyIndexes().then((success) => {
  process.exit(success ? 0 : 1);
}).catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
