import { NextResponse } from 'next/server';
import { isEncryptionConfigured } from '@/lib/ppn/utils';

export const runtime = 'edge';

// Build-time info (populated at build time via env vars or defaults)
const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();
const GIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_SHA || 'unknown';

/**
 * GET /api/v1/ppn/ready
 * Production readiness check endpoint
 * Returns system health status and configuration checks
 */
export async function GET() {
  const checks = {
    // Database check - verify DATABASE_URL is set
    database_configured: !!process.env.DATABASE_URL,
    
    // Auth check - verify NEXTAUTH_SECRET or AUTH_SECRET is set
    auth_configured: !!(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET),
    
    // Encryption check - verify ENCRYPTION_KEY is properly configured
    encryption_configured: isEncryptionConfigured(),
    
    // Cron check - verify PPN_CRON_SECRET is set
    cron_configured: !!process.env.PPN_CRON_SECRET,
  };

  // Overall status: ok if required checks pass (database + auth)
  const requiredChecks = checks.database_configured && checks.auth_configured;
  const allChecks = Object.values(checks).every(Boolean);

  const response = {
    ok: requiredChecks,
    status: allChecks ? 'healthy' : requiredChecks ? 'degraded' : 'unhealthy',
    checks,
    version: {
      build_time: BUILD_TIME,
      git_sha: GIT_SHA.substring(0, 7), // Only show short SHA
    },
    warnings: [] as string[],
  };

  // Add warnings for missing optional configs
  if (!checks.encryption_configured) {
    response.warnings.push('ENCRYPTION_KEY not configured - payout methods will not work');
  }
  if (!checks.cron_configured) {
    response.warnings.push('PPN_CRON_SECRET not configured - reconciliation cron will not work');
  }

  // Return 200 if required checks pass, 503 otherwise
  return NextResponse.json(response, { 
    status: requiredChecks ? 200 : 503,
  });
}
