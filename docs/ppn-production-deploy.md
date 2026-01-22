# PPN Production Deployment Guide

This guide provides step-by-step instructions for deploying the ProInvest Partner Network (PPN) MVP to Vercel production.

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Database Setup](#database-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Cron Job Setup](#cron-job-setup)
5. [Post-Deployment Validation](#post-deployment-validation)
6. [Troubleshooting](#troubleshooting)

---

## Environment Variables

### Required Variables

These must be set before deployment. The build will fail without them.

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Turso/LibSQL connection string | `libsql://your-db.turso.io?authToken=xxx` |
| `NEXTAUTH_SECRET` | Auth encryption key (32+ chars) | Generate with: `openssl rand -base64 32` |

### Optional Variables (with safe defaults)

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `AUTH_SECRET` | Fallback for NEXTAUTH_SECRET | Falls back to `NEXTAUTH_SECRET` | For backward compatibility |
| `ENCRYPTION_KEY` | AES key for payout details | `NOT SET` | **Required for payout methods to work** |
| `PPN_CRON_SECRET` | Cron job auth token | `NOT SET` | Required for reconciliation cron |
| `RATE_LIMIT_MAX` | API rate limit per minute | `60` | Adjust based on traffic |

### Security Notes

- **NEXTAUTH_SECRET**: Generate a secure random string:
  ```bash
  openssl rand -base64 32
  ```

- **ENCRYPTION_KEY**: Generate a secure 32-character key:
  ```bash
  openssl rand -base64 32
  ```

- **PPN_CRON_SECRET**: Generate a unique token:
  ```bash
  openssl rand -hex 32
  ```

---

## Database Setup

### Step 1: Create Turso Database

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create proinvest-ppn

# Get connection URL
turso db show proinvest-ppn --url

# Create auth token
turso db tokens create proinvest-ppn
```

### Step 2: Set DATABASE_URL

Combine the URL and token:
```
libsql://[your-db-name]-[your-org].turso.io?authToken=[your-token]
```

### Step 3: Run Migrations

After setting `DATABASE_URL` in your environment:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (production-safe)
npx prisma migrate deploy

# (Optional) Seed test data
npx prisma db seed
```

---

## Vercel Deployment

### Step 1: Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub: `prohotelai/proinvest-global-ltd`
3. Select `main` branch

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npx prisma generate && next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### Step 3: Set Environment Variables

In Vercel project settings → Environment Variables:

```
DATABASE_URL=libsql://your-db.turso.io?authToken=xxx
NEXTAUTH_SECRET=your-generated-secret
ENCRYPTION_KEY=your-encryption-key
PPN_CRON_SECRET=your-cron-secret
```

### Step 4: Deploy

Click "Deploy" and wait for build to complete.

---

## Cron Job Setup

The PPN reconciliation job processes pending commissions and must run periodically.

### Vercel Cron Configuration

Create or update `vercel.json` in the project root:

```json
{
  "crons": [
    {
      "path": "/api/v1/ppn/jobs/reconcile",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This runs every 6 hours. Adjust the schedule as needed:
- `0 * * * *` - Every hour
- `0 */6 * * *` - Every 6 hours
- `0 0 * * *` - Daily at midnight

### Manual Trigger (Testing)

```bash
curl -X POST https://your-domain.vercel.app/api/v1/ppn/jobs/reconcile \
  -H "Authorization: Bearer YOUR_PPN_CRON_SECRET" \
  -H "Content-Type: application/json"
```

### Response Examples

**Success:**
```json
{
  "ok": true,
  "data": {
    "processed": 15,
    "ran_at": "2026-01-22T12:00:00.000Z"
  }
}
```

**Error (cron not configured):**
```json
{
  "ok": false,
  "error": {
    "code": "CRON_NOT_CONFIGURED",
    "message": "PPN_CRON_SECRET environment variable is not set"
  }
}
```

---

## Post-Deployment Validation

### Quick Smoke Test

Run the built-in smoke test:

```bash
# Set your production URL
export PPN_BASE_URL=https://your-domain.vercel.app

# Run smoke test
npm run ppn:smoke
```

### Manual Validation Checklist

1. **Health Check:**
   ```bash
   curl https://your-domain.vercel.app/api/v1/ppn/health
   ```
   Expected: `{"status":"ok","service":"ppn",...}`

2. **Readiness Check:**
   ```bash
   curl https://your-domain.vercel.app/api/v1/ppn/ready
   ```
   Expected: All checks should be `true` (except optional ones)

3. **Marketing Pages:**
   - [ ] `/partners` loads without errors
   - [ ] `/ppn/login` shows login form
   - [ ] `/ppn/signup` shows registration form

4. **Existing Site:**
   - [ ] `/` (home) loads normally
   - [ ] `/about` loads normally
   - [ ] `/solutions` loads normally

### Readiness Endpoint Response

```json
{
  "ok": true,
  "checks": {
    "database_connected": true,
    "auth_configured": true,
    "encryption_configured": true,
    "cron_configured": true
  },
  "version": {
    "build_time": "2026-01-22T10:00:00Z",
    "git_sha": "abc1234"
  }
}
```

---

## Troubleshooting

### Build Fails: "Cannot find module '@/lib/generated/prisma'"

**Cause:** Prisma client not generated.

**Fix:** Ensure build command includes `npx prisma generate`:
```
npx prisma generate && next build
```

### Runtime Error: "Database configuration error"

**Cause:** Invalid or missing `DATABASE_URL`.

**Fix:** 
1. Verify Turso database exists
2. Check connection string format
3. Verify auth token is valid

### Payout Methods: "Encryption not configured"

**Cause:** `ENCRYPTION_KEY` not set.

**Fix:** Add `ENCRYPTION_KEY` environment variable with a secure 32+ character key.

### Cron Returns 503: "CRON_NOT_CONFIGURED"

**Cause:** `PPN_CRON_SECRET` not set.

**Fix:** Add `PPN_CRON_SECRET` environment variable.

### Auth Error: "NEXTAUTH_SECRET missing"

**Cause:** Neither `NEXTAUTH_SECRET` nor `AUTH_SECRET` is set.

**Fix:** Add `NEXTAUTH_SECRET` environment variable.

---

## Quick Reference Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Run smoke test
npm run ppn:smoke

# Manual health check
curl https://your-domain.vercel.app/api/v1/ppn/health

# Manual readiness check  
curl https://your-domain.vercel.app/api/v1/ppn/ready

# Manual cron trigger
curl -X POST https://your-domain.vercel.app/api/v1/ppn/jobs/reconcile \
  -H "Authorization: Bearer $PPN_CRON_SECRET"
```

---

## Deployment Checklist

- [ ] DATABASE_URL set and verified
- [ ] NEXTAUTH_SECRET set (32+ chars)
- [ ] ENCRYPTION_KEY set (for payout methods)
- [ ] PPN_CRON_SECRET set (for reconciliation)
- [ ] Build command includes `npx prisma generate`
- [ ] Prisma migrations deployed
- [ ] Smoke test passes
- [ ] Readiness endpoint shows all checks green
