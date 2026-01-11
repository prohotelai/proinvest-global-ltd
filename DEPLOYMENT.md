# Deployment Guide

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier works)

## Deploying to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `prohotelai/proinvest-global-ltd`
4. Vercel will automatically detect Next.js configuration
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app`

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Custom Domain Setup

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain: `proinvest.global`
4. Follow DNS configuration instructions
5. Add the following DNS records:
   - `A` record: `76.76.21.21`
   - `CNAME` record: `cname.vercel-dns.com`

## Environment Variables

No environment variables are required for this static website.

## Build Verification

Before deploying, always verify the build:

```bash
npm run build
npm run lint
```

Both commands should complete without errors.

## Post-Deployment

After deployment:

1. Verify all pages load correctly
2. Test navigation and links
3. Check contact form functionality
4. Verify mobile responsiveness
5. Test SEO tags with [Open Graph Debugger](https://www.opengraph.xyz/)
6. Submit sitemap to Google Search Console: `https://proinvest.global/sitemap.xml`

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to any other branch

## Monitoring

- View deployment logs in Vercel Dashboard
- Analytics available in Vercel Dashboard → Analytics
- Set up custom alerts in Vercel Dashboard → Settings

## Support

For deployment issues, contact Vercel support or check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
