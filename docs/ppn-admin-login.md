# PPN Admin Login Guide

This document explains how to access the **ProInvest Partner Network (PPN) Admin Dashboard** in production.

---

## Quick Reference

| Item | Value |
|------|-------|
| Admin URL | `https://www.proinvest.global/ppn/admin` |
| Login URL | `https://www.proinvest.global/ppn/login` |
| Auth Method | **Email + Password** (Credentials via NextAuth.js) |
| Admin Check Endpoint | `GET /api/v1/ppn/admin-check` |

---

## How Admin Access Works

### Authentication System

The PPN system uses **NextAuth.js with Credentials provider** (email + password), **NOT magic links**.

1. Users sign in with email and password at `/ppn/login`
2. The system verifies credentials against the `User` table in the database
3. A JWT session is created and stored in cookies

### Admin Authorization

Admin access is controlled by the **`role` field in the `User` database table**:

- `role = 'partner'` → Regular partner dashboard access only
- `role = 'admin'` → Full admin dashboard access

**Important:** The `PPN_ADMIN_EMAILS` environment variable mentioned in README is **for documentation only**. The actual admin access is determined by the database `role` field.

### Access Control Implementation

| Location | Protection Method |
|----------|-------------------|
| [app/ppn/admin/layout.tsx](../app/ppn/admin/layout.tsx) | Server-side check: `session.user.role !== 'admin'` → redirect to `/ppn/login` |
| [app/api/v1/ppn/admin/*](../app/api/v1/ppn/admin/) | API routes check `session.user.role !== 'admin'` → return 401 |

---

## Step-by-Step: Grant Admin Access in Production

### Step 1: Create a User Account

If the admin user doesn't exist, they must first sign up:

1. Go to `https://www.proinvest.global/ppn/signup`
2. Create an account with the desired admin email
3. The account will be created with `role = 'partner'` by default

### Step 2: Update User Role to Admin

You need direct database access to change a user's role to `admin`.

**Option A: Using Prisma Studio (local development)**
```bash
npx prisma studio
# Navigate to User table, find the user, change role to 'admin'
```

**Option B: Using SQL (production database)**
```sql
UPDATE User SET role = 'admin' WHERE email = 'your-admin@example.com';
```

**Option C: Using a database migration or seed script**

Add to `prisma/seed.ts`:
```typescript
await prisma.user.upsert({
  where: { email: 'your-admin@example.com' },
  update: { role: 'admin' },
  create: {
    email: 'your-admin@example.com',
    passwordHash: await bcrypt.hash('secure-password', 12),
    name: 'Admin User',
    role: 'admin',
  },
});
```

### Step 3: Sign In

1. Go to `https://www.proinvest.global/ppn/login`
2. Enter the admin email and password
3. You'll be redirected to the partner dashboard

### Step 4: Verify Admin Access

1. Visit `https://www.proinvest.global/api/v1/ppn/admin-check`
2. Expected response for admin:
   ```json
   {
     "success": true,
     "data": {
       "ok": true,
       "user_email": "admin@proinvest.global",
       "is_admin": true,
       "admin_source": "database_role",
       "admin_role_value": "admin",
       "message": "You have admin access. Proceed to /ppn/admin"
     }
   }
   ```

### Step 5: Access Admin Dashboard

Go to `https://www.proinvest.global/ppn/admin`

---

## Access Control Behavior

| User State | Action on `/ppn/admin` | Action on `/api/v1/ppn/admin/*` |
|------------|------------------------|---------------------------------|
| **Not logged in** | Redirect → `/ppn/login` | HTTP 401 Unauthorized |
| **Logged in, role=partner** | Redirect → `/ppn/login` | HTTP 401 Unauthorized |
| **Logged in, role=admin** | ✅ Access granted | ✅ Access granted |

---

## Required Environment Variables

### For Authentication to Work

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_SECRET` | ✅ Yes | JWT encryption secret (32+ chars). Generate with `openssl rand -base64 32` |
| `AUTH_SECRET` | No | Fallback for `NEXTAUTH_SECRET` |
| `DATABASE_URL` | ✅ Yes | Database connection string |
| `NEXTAUTH_URL` | ✅ Yes | Full URL (e.g., `https://www.proinvest.global`) |

### Email Provider (Optional)

The current implementation does **NOT use email/magic links**. Authentication is via email + password stored in the database.

If you want to add password reset or email verification in the future, you'll need:
- `RESEND_API_KEY` or `SENDGRID_API_KEY` or SMTP configuration

---

## Troubleshooting

### "I can log in but can't access /ppn/admin"

1. Check your role: Visit `/api/v1/ppn/admin-check`
2. If `is_admin: false`, your database role needs to be updated to `'admin'`

### "I see a blank page or redirect loop"

1. Clear cookies for the domain
2. Check that `NEXTAUTH_SECRET` is set in production
3. Verify `NEXTAUTH_URL` matches the actual URL

### "How do I know if I'm logged in?"

Visit `/api/v1/ppn/admin-check`:
- HTTP 401 = Not logged in
- HTTP 403 with `is_admin: false` = Logged in, not admin
- HTTP 200 with `is_admin: true` = Ready for admin access

---

## Security Notes

1. **Admin roles are database-controlled** — No hardcoded admin emails in code
2. **Password hashing** — Uses bcrypt with cost factor 12
3. **JWT sessions** — 30-day expiry, encrypted with `NEXTAUTH_SECRET`
4. **No email provider needed** — Passwords are used, not magic links
5. **Fails closed** — Non-admins cannot access admin routes (redirected or 401)

---

## Default Development Credentials

For local development (from `prisma/seed.ts`):

| Email | Password | Role |
|-------|----------|------|
| `admin@proinvest.global` | `admin123` | admin |
| `partner@example.com` | `partner123` | partner |

⚠️ **Never use these credentials in production!**

---

## Quick Checklist for Production Admin Access

- [ ] User account exists in database with correct email
- [ ] User's `role` field is set to `'admin'` in the database
- [ ] `NEXTAUTH_SECRET` is configured in Vercel environment variables
- [ ] `NEXTAUTH_URL` is set to `https://www.proinvest.global`
- [ ] Redeploy after any environment variable changes
- [ ] Sign in at `/ppn/login` with admin credentials
- [ ] Verify access at `/api/v1/ppn/admin-check`
- [ ] Navigate to `/ppn/admin`
