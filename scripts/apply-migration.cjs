const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function applyMigration() {
  const migrationPath = path.join(__dirname, "../prisma/migrations/20260121231518_init/migration.sql");
  const migrationSql = fs.readFileSync(migrationPath, "utf8");
  
  console.log("=== Applying Migration: 20260121231518_init ===\n");
  
  // Split on ");\n\n" to separate table definitions, then handle indexes separately
  const parts = migrationSql.split(/\);\n\n/);
  const statements = [];
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    
    // Check if this is a CREATE TABLE statement
    if (trimmed.includes("CREATE TABLE")) {
      // Remove leading comments and add back the closing );
      const tableMatch = trimmed.match(/CREATE TABLE[\s\S]+/);
      if (tableMatch) {
        statements.push(tableMatch[0] + ");");
      }
    }
    // Check if this contains CREATE INDEX statements
    else if (trimmed.includes("CREATE INDEX") || trimmed.includes("CREATE UNIQUE INDEX")) {
      // Split by lines and extract each index
      const lines = trimmed.split("\n");
      for (const line of lines) {
        const l = line.trim();
        if (l.startsWith("CREATE INDEX") || l.startsWith("CREATE UNIQUE INDEX")) {
          statements.push(l);
        }
      }
    }
  }
  
  console.log("Found " + statements.length + " SQL statements to execute\n");
  
  let successCount = 0;
  let failCount = 0;
  const createdItems = [];
  
  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      
      const tableMatch = stmt.match(/CREATE TABLE "(\w+)"/i);
      const indexMatch = stmt.match(/CREATE (UNIQUE )?INDEX "(\w+)"/i);
      
      if (tableMatch) {
        console.log("  [OK] Created TABLE: " + tableMatch[1]);
        createdItems.push("TABLE " + tableMatch[1]);
      } else if (indexMatch) {
        console.log("  [OK] Created INDEX: " + indexMatch[2]);
        createdItems.push("INDEX " + indexMatch[2]);
      }
      successCount++;
    } catch (err) {
      console.error("  [FAIL]: " + err.message);
      console.error("     SQL: " + stmt.substring(0, 70) + "...");
      failCount++;
    }
  }
  
  console.log("\n=== Migration Summary ===");
  console.log("  Successful: " + successCount);
  console.log("  Failed: " + failCount);
  
  // Record in _prisma_migrations
  try {
    await client.execute(
      'CREATE TABLE IF NOT EXISTS "_prisma_migrations" ("id" TEXT PRIMARY KEY, "checksum" TEXT NOT NULL, "finished_at" DATETIME, "migration_name" TEXT NOT NULL, "logs" TEXT, "rolled_back_at" DATETIME, "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "applied_steps_count" INTEGER NOT NULL DEFAULT 0);'
    );
    
    await client.execute({
      sql: 'INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "applied_steps_count") VALUES (?, ?, datetime("now"), ?, ?)',
      args: [
        require("crypto").randomUUID(),
        "applied-via-turso-direct",
        "20260121231518_init",
        successCount
      ]
    });
    console.log("  [OK] Migration recorded in _prisma_migrations");
  } catch (err) {
    console.log("  [WARN] Could not record migration: " + err.message);
  }
  
  return failCount === 0;
}

applyMigration().then((success) => {
  process.exit(success ? 0 : 1);
}).catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
