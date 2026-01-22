# Proinvest Global Ltd - Corporate Website

**AI that runs real hospitality operations — not experiments.**

This is the official corporate website for Proinvest Global Ltd, a UK-based technology and investment company specializing in Applied Artificial Intelligence solutions for the hospitality and food & beverage sectors.

## Company Information

- **Company Name:** Proinvest Global Ltd
- **Company Number:** 16851428
- **Registered Address:** 2 Frederick Street, Kings Cross, London WC1X 0ND, United Kingdom
- **Phone:** +44 7448 810068
- **Email:** info@proinvest.global

## Products

- **ProHotelAI** - AI-powered hotel operations platform
- **ProCafeAI (CafeGrok AI)** - AI-powered café & restaurant operations platform

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** SQLite (via Prisma + LibSQL)
- **Auth:** NextAuth.js v5
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Database Setup

1. Generate Prisma client:
```bash
npx prisma generate
```

2. Run migrations:
```bash
npx prisma migrate dev
```

3. Seed the database (optional, for development):
```bash
npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed.ts
```

### Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# PPN (Partner Network)
PPN_CRON_SECRET="your-cron-secret-key"
PPN_ADMIN_EMAILS="admin@proinvest.global"
ENCRYPTION_KEY="your-32-character-encryption-key"
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## ProInvest Partner Network (PPN)

The PPN is an affiliate/referral partner program built into this website.

### Partner Portal Routes

- `/partners` - Partner program landing page
- `/ppn/signup` - Partner registration
- `/ppn/login` - Partner login
- `/ppn/dashboard` - Partner dashboard
- `/ppn/links` - Referral link generator
- `/ppn/commissions` - Commission tracking
- `/ppn/payouts` - Payout requests
- `/ppn/assets` - Marketing materials

### Admin Routes

- `/ppn/admin` - Admin overview
- `/ppn/admin/products` - Product management
- `/ppn/admin/partners` - Partner management
- `/ppn/admin/commissions` - Commission management
- `/ppn/admin/payouts` - Payout processing
- `/ppn/admin/assets` - Asset library
- `/ppn/admin/settings` - Tier & settings

### API Endpoints

All PPN events are received at `/api/v1/ppn/events/`:

- `POST /events/click` - Track referral clicks
- `POST /events/signup` - Customer signup
- `POST /events/subscription_started` - Subscription started
- `POST /events/invoice_paid` - Payment received (triggers commission)
- `POST /events/subscription_canceled` - Cancellation (voids unpaid commissions)
- `POST /events/refund` - Refund/chargeback

### API Documentation

See full API specification: [/docs/ppn-api-spec-v1.md](./docs/ppn-api-spec-v1.md)

### Configuring Products for PPN

1. Log in as admin at `/ppn/login`
2. Go to `/ppn/admin/products`
3. Add a new product with:
   - Name and slug
   - Domain (e.g., `prohotelai.com`)
   - Default landing URL and pricing URL
4. Copy the generated webhook secret
5. Configure your product to send events to the PPN API with HMAC signature

### Sending Events from Products

Example (Node.js):

```javascript
const crypto = require('crypto');

const timestamp = Math.floor(Date.now() / 1000);
const eventId = crypto.randomUUID();
const body = JSON.stringify({
  type: 'invoice_paid',
  occurred_at: new Date().toISOString(),
  external_customer_id: 'cus_123',
  external_subscription_id: 'sub_123',
  external_invoice_id: 'inv_123',
  currency: 'USD',
  amount_paid: 199.00,
  net_amount: 199.00,
  plan_key: 'professional',
  billing_cycle: 'monthly',
  ppn_ref: 'PARTNER01',
});

const signingString = `v1.${timestamp}.${eventId}.${body}`;
const signature = 'v1=' + crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(signingString)
  .digest('hex');

await fetch('https://www.proinvest.global/api/v1/ppn/events/invoice_paid', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-PPN-Product-Id': PRODUCT_ID,
    'X-PPN-Timestamp': String(timestamp),
    'X-PPN-Event-Id': eventId,
    'X-PPN-Signature': signature,
    'Idempotency-Key': eventId,
  },
  body,
});
```

### Commission Flow

1. **invoice_paid** event → Commission created with `pending` status
2. After 60 days → Commission becomes `available`
3. Partner requests payout (min $100) → Admin approves → Commission `paid`

### Cron Job

Set up a daily cron job to process pending commissions:

```bash
curl -X POST https://www.proinvest.global/api/v1/ppn/jobs/reconcile \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Project Structure

```
app/
├── about/              # About page
├── case-studies/       # Case studies page
├── components/         # Reusable components
├── contact/            # Contact page with form
├── industries/         # Industries we serve
├── insights/           # Blog/insights page
├── partners/           # Partner program landing
├── ppn/                # Partner portal
│   ├── admin/          # Admin dashboard
│   ├── dashboard/      # Partner dashboard
│   ├── login/          # Partner login
│   └── signup/         # Partner signup
├── solutions/          # Solutions overview
├── api/v1/ppn/         # PPN API endpoints
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── sitemap.ts          # SEO sitemap
└── robots.ts           # SEO robots.txt

lib/ppn/                # PPN library code
├── auth.ts             # Authentication config
├── commission-engine.ts # Commission calculation
├── db.ts               # Database client
├── schemas.ts          # Zod validation schemas
└── signature.ts        # HMAC signature verification

docs/
└── ppn-api-spec-v1.md  # API specification

prisma/
├── schema.prisma       # Database schema
├── migrations/         # Database migrations
└── seed.ts             # Development seed data
```

## Features

- ✅ Fully responsive design
- ✅ SEO optimized with meta tags and Open Graph
- ✅ Semantic HTML
- ✅ Clean, minimal, enterprise-grade UI
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Production-ready
- ✅ Vercel deployment compatible
- ✅ Partner Network with lifetime commissions
- ✅ Multi-product support
- ✅ HMAC-signed webhook events
- ✅ Idempotent event processing

## Deployment

This project is ready to deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prohotelai/proinvest-global-ltd)

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Vercel will automatically detect Next.js and configure the build
5. Deploy!

### Production Database

For production, consider using:
- **Turso** (LibSQL cloud) - Recommended for SQLite
- **PostgreSQL** - Update schema provider to `postgresql`
- **PlanetScale** - MySQL-compatible

## License

Copyright © 2025 Proinvest Global Ltd. All rights reserved.

