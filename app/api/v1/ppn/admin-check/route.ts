import { auth } from '@/lib/ppn/auth';
import { successResponse, errorResponse, ErrorCodes } from '@/lib/ppn/api-response';

export const runtime = 'nodejs';

/**
 * GET /api/v1/ppn/admin-check
 * 
 * Admin access diagnostic endpoint.
 * Returns authentication and admin status for debugging access issues.
 * 
 * Security:
 * - Returns 401 if not authenticated
 * - Returns 403 if authenticated but not admin
 * - Returns 200 with is_admin=true only for admin users
 * - Never reveals the full list of admin emails (only count)
 */
export async function GET() {
  const session = await auth();

  // Not authenticated
  if (!session?.user) {
    return errorResponse(
      ErrorCodes.UNAUTHORIZED,
      'Authentication required. Please sign in at /ppn/login',
      401
    );
  }

  const userEmail = session.user.email;
  const userRole = session.user.role;
  const isAdmin = userRole === 'admin';

  // Check if PPN_ADMIN_EMAILS env var exists (for documentation purposes)
  // Note: Current system uses database role, not env var
  const adminEmailsVar = process.env.PPN_ADMIN_EMAILS || '';
  const adminEmails = adminEmailsVar
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(e => e.length > 0);

  // Authenticated but not admin - return 403 with diagnostic info
  if (!isAdmin) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: {
          code: ErrorCodes.FORBIDDEN,
          message: 'Admin access required. Your account does not have admin privileges.',
        },
        diagnostic: {
          user_email: userEmail,
          is_admin: false,
          admin_source: 'database_role',
          admin_role_value: userRole,
          env_var_configured: adminEmails.length > 0,
          env_admin_emails_count: adminEmails.length,
          help: 'Admin access is controlled by the "role" field in the User database table. Contact system administrator.',
        },
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Authenticated admin - return success
  return successResponse({
    ok: true,
    user_email: userEmail,
    is_admin: true,
    admin_source: 'database_role',
    admin_role_value: userRole,
    env_var_configured: adminEmails.length > 0,
    env_admin_emails_count: adminEmails.length,
    message: 'You have admin access. Proceed to /ppn/admin',
  });
}
