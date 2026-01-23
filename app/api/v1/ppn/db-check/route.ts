import { NextResponse } from 'next/server';
import { prisma } from '@/lib/ppn/db';

export const runtime = 'nodejs';

/**
 * GET /api/v1/ppn/db-check
 * Database connectivity and schema verification endpoint
 * Used to diagnose database issues in production
 */
export async function GET() {
  const checks: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    database_url_set: !!process.env.DATABASE_URL,
    database_url_type: process.env.DATABASE_URL?.split(':')[0] || 'not set',
  };

  try {
    // Test basic connectivity with a simple query
    const userCount = await prisma.user.count();
    checks.connection = 'ok';
    checks.user_table = 'exists';
    checks.user_count = userCount;
  } catch (error) {
    checks.connection = 'failed';
    checks.error = error instanceof Error ? error.message : String(error);
    
    // Check for specific error types
    const errorMsg = checks.error as string;
    if (errorMsg.includes('no such table')) {
      checks.diagnosis = 'Database tables do not exist. Run migrations: npx prisma migrate deploy';
    } else if (errorMsg.includes('SQLITE_CANTOPEN') || errorMsg.includes('unable to open')) {
      checks.diagnosis = 'Cannot open database file. Check DATABASE_URL path and permissions.';
    } else if (errorMsg.includes('Connection refused') || errorMsg.includes('ECONNREFUSED')) {
      checks.diagnosis = 'Cannot connect to database server. Check DATABASE_URL and network.';
    } else if (errorMsg.includes('401') || errorMsg.includes('Unauthorized')) {
      checks.diagnosis = 'Database authentication failed (401). For Turso/LibSQL, ensure DATABASE_URL includes ?authToken=YOUR_TOKEN';
    } else if (errorMsg.includes('authentication failed') || errorMsg.includes('Access denied')) {
      checks.diagnosis = 'Database authentication failed. Check credentials in DATABASE_URL.';
    } else {
      checks.diagnosis = 'Unknown database error. Check Vercel function logs for details.';
    }
    
    return NextResponse.json(checks, { status: 503 });
  }

  // Test Partner table
  try {
    const partnerCount = await prisma.partner.count();
    checks.partner_table = 'exists';
    checks.partner_count = partnerCount;
  } catch (error) {
    checks.partner_table = 'error';
    checks.partner_error = error instanceof Error ? error.message : String(error);
  }

  // Test Tier table
  try {
    const tierCount = await prisma.tier.count();
    checks.tier_table = 'exists';
    checks.tier_count = tierCount;
  } catch (error) {
    checks.tier_table = 'error';
    checks.tier_error = error instanceof Error ? error.message : String(error);
  }

  // Test Product table
  try {
    const productCount = await prisma.product.count();
    checks.product_table = 'exists';
    checks.product_count = productCount;
  } catch (error) {
    checks.product_table = 'error';
    checks.product_error = error instanceof Error ? error.message : String(error);
  }

  const allTablesOk = 
    checks.user_table === 'exists' && 
    checks.partner_table === 'exists' && 
    checks.tier_table === 'exists' &&
    checks.product_table === 'exists';

  checks.status = allTablesOk ? 'healthy' : 'degraded';
  
  if (!allTablesOk) {
    checks.recommendation = 'Some tables are missing. Run: npx prisma migrate deploy';
  }

  return NextResponse.json(checks, { status: allTablesOk ? 200 : 503 });
}
