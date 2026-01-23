const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function verify() {
  console.log("=== Database Connectivity Check ===\n");
  
  // 1. Check tables exist
  const tables = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma%' ORDER BY name"
  );
  
  console.log("Tables found: " + tables.rows.length);
  tables.rows.forEach(row => console.log("  - " + row.name));
  
  // 2. Check indexes
  const indexes = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );
  
  console.log("\nIndexes found: " + indexes.rows.length);
  
  // 3. Verify _prisma_migrations
  const migrations = await client.execute(
    "SELECT migration_name, finished_at, applied_steps_count FROM _prisma_migrations ORDER BY started_at"
  );
  
  console.log("\nMigrations applied:");
  migrations.rows.forEach(row => {
    console.log("  - " + row.migration_name + " (" + row.applied_steps_count + " steps)");
  });
  
  // 4. Quick row counts (should be 0 for fresh DB)
  console.log("\nRow counts (expecting 0 for fresh DB):");
  for (const table of ["User", "Partner", "Product", "Tier"]) {
    const count = await client.execute("SELECT COUNT(*) as cnt FROM \"" + table + "\"");
    console.log("  - " + table + ": " + count.rows[0].cnt);
  }
  
  console.log("\n=== Connection: SUCCESS ===");
}

verify().then(() => process.exit(0)).catch(err => {
  console.error("Connection FAILED:", err.message);
  process.exit(1);
});
