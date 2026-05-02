const ALLOWED_WIDGET_ORIGINS = new Set([
  'https://www.visariskai.com',
  'https://visariskai.com',
]);

export function isAllowedWidgetUrl(baseUrl: string): boolean {
  try {
    const parsed = new URL(baseUrl);
    return parsed.protocol === 'https:' && ALLOWED_WIDGET_ORIGINS.has(parsed.origin);
  } catch {
    return false;
  }
}

export function buildTrackedWidgetUrl(baseUrl: string, partnerCode: string): string {
  const parsed = new URL(baseUrl);
  parsed.searchParams.set('ppn_ref', partnerCode);
  parsed.searchParams.set('source', 'widget');
  return parsed.toString();
}

export function buildIframeEmbedCode(baseUrl: string, partnerCode: string): string {
  const trackedUrl = buildTrackedWidgetUrl(baseUrl, partnerCode);
  return `<iframe\n  src="${trackedUrl}"\n  width="100%"\n  height="600"\n  style="border:0;border-radius:12px;max-width:100%;"\n  loading="lazy"\n  referrerpolicy="no-referrer-when-downgrade"\n></iframe>`;
}
