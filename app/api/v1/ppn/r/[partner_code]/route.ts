import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/ppn/db';

export const runtime = 'nodejs';

interface Params {
  params: Promise<{ partner_code: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { partner_code } = await params;
  const { searchParams } = new URL(request.url);
  const productSlug = searchParams.get('product');
  const path = searchParams.get('path') || '/';

  // Find partner
  const partner = await prisma.partner.findUnique({
    where: { partnerCode: partner_code },
    select: { id: true, status: true },
  });

  if (!partner) {
    return NextResponse.json(
      { ok: false, error: { code: 'PARTNER_NOT_FOUND', message: 'Partner not found' } },
      { status: 404 }
    );
  }

  if (partner.status !== 'approved') {
    return NextResponse.json(
      { ok: false, error: { code: 'PARTNER_NOT_APPROVED', message: 'Partner is not approved' } },
      { status: 403 }
    );
  }

  // If no product specified, return error
  if (!productSlug) {
    return NextResponse.json(
      { ok: false, error: { code: 'PRODUCT_REQUIRED', message: 'Product slug is required (?product=...)' } },
      { status: 400 }
    );
  }

  // Find product
  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    select: { id: true, domain: true, status: true },
  });

  if (!product) {
    return NextResponse.json(
      { ok: false, error: { code: 'PRODUCT_NOT_FOUND', message: 'Product not found' } },
      { status: 404 }
    );
  }

  if (product.status !== 'active') {
    return NextResponse.json(
      { ok: false, error: { code: 'PRODUCT_INACTIVE', message: 'Product is inactive' } },
      { status: 403 }
    );
  }

  // Optionally log the click (without click_id since this is a redirect endpoint)
  // Note: The actual click tracking should be done via the events/click endpoint
  // This redirect is just for convenience

  // Build redirect URL
  const targetPath = path.startsWith('/') ? path : `/${path}`;
  const redirectUrl = `https://${product.domain}${targetPath}?ppn_ref=${partner_code}`;

  // Redirect to product domain
  return NextResponse.redirect(redirectUrl, 302);
}
