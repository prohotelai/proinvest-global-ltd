const ALLOWED_WIDGET_ORIGINS = new Set([
  'https://www.visariskai.com',
  'https://visariskai.com',
]);

export type WidgetTheme = 'light' | 'dark' | 'risk';

export interface WidgetEmbedVariant {
  theme: WidgetTheme;
  label: string;
  description: string;
  trackedWidgetUrl: string;
  iframeEmbedCode: string;
}

const WIDGET_VARIANTS: Array<Pick<WidgetEmbedVariant, 'theme' | 'label' | 'description'>> = [
  {
    theme: 'light',
    label: 'Light Widget',
    description: 'Best for most travel agency websites.',
  },
  {
    theme: 'dark',
    label: 'Dark Widget',
    description: 'Best for premium or dark website sections.',
  },
  {
    theme: 'risk',
    label: 'Risk Widget',
    description: 'Best for high-conversion refusal-risk pages.',
  },
];

export function isAllowedWidgetUrl(baseUrl: string): boolean {
  try {
    const parsed = new URL(baseUrl);
    return parsed.protocol === 'https:' && ALLOWED_WIDGET_ORIGINS.has(parsed.origin);
  } catch {
    return false;
  }
}

export function buildTrackedWidgetUrl(baseUrl: string, partnerCode: string, theme?: WidgetTheme): string {
  const parsed = new URL(baseUrl);
  parsed.searchParams.set('ppn_ref', partnerCode);
  parsed.searchParams.set('source', 'widget');
  if (theme) {
    parsed.searchParams.set('theme', theme);
  }
  return parsed.toString();
}

export function buildIframeEmbedCode(baseUrl: string, partnerCode: string, theme?: WidgetTheme): string {
  const trackedUrl = buildTrackedWidgetUrl(baseUrl, partnerCode, theme);
  return `<iframe\n  src="${trackedUrl}"\n  width="100%"\n  height="600"\n  style="border:0;border-radius:12px;max-width:100%;"\n  loading="lazy"\n  referrerpolicy="no-referrer-when-downgrade"\n></iframe>`;
}

export function buildWidgetEmbedVariants(baseUrl: string, partnerCode: string): WidgetEmbedVariant[] {
  return WIDGET_VARIANTS.map((variant) => ({
    ...variant,
    trackedWidgetUrl: buildTrackedWidgetUrl(baseUrl, partnerCode, variant.theme),
    iframeEmbedCode: buildIframeEmbedCode(baseUrl, partnerCode, variant.theme),
  }));
}
