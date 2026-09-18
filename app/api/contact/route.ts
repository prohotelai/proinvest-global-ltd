import { NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  const parsed = ContactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'INVALID_CONTACT_REQUEST' }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
  const allowedOrigin = process.env.CONTACT_FORM_WEBHOOK_ORIGIN;
  const deliverySecret = process.env.CONTACT_FORM_WEBHOOK_SECRET;
  if (!webhookUrl || !allowedOrigin || !deliverySecret) {
    return NextResponse.json({ ok: false, error: 'CONTACT_DELIVERY_NOT_CONFIGURED' }, { status: 503 });
  }

  let target: URL;
  let allowed: URL;
  try {
    target = new URL(webhookUrl);
    allowed = new URL(allowedOrigin);
  } catch {
    return NextResponse.json({ ok: false, error: 'CONTACT_DELIVERY_NOT_CONFIGURED' }, { status: 503 });
  }
  if (target.protocol !== 'https:' || allowed.protocol !== 'https:' || target.origin !== allowed.origin) {
    return NextResponse.json({ ok: false, error: 'CONTACT_DELIVERY_NOT_CONFIGURED' }, { status: 503 });
  }

  const response = await fetch(target, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${deliverySecret}` },
    body: JSON.stringify({
      source: 'proinvest.global',
      recipient: 'info@proinvest.global',
      ...parsed.data,
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ ok: false, error: 'CONTACT_DELIVERY_FAILED' }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
