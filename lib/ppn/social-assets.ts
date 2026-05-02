const ALLOWED_WIDGET_ORIGINS = new Set([
  'https://www.visariskai.com',
  'https://visariskai.com',
]);

export type SocialAssetChannel = 'facebook' | 'instagram' | 'whatsapp';

type SocialAssetKit = {
  channel: SocialAssetChannel;
  label: string;
  description: string;
  trackedUrl: string;
  content: string;
  contentLabel: 'Caption' | 'Message';
  copyContentButtonLabel: string;
  copyLinkButtonLabel: string;
};

const SOCIAL_ASSET_DEFINITIONS: Array<Omit<SocialAssetKit, 'trackedUrl' | 'content'> & { theme: 'risk' | 'light'; template: (trackedUrl: string) => string }> = [
  {
    channel: 'facebook',
    label: 'Facebook / Instagram Post',
    description: 'Best for feed posts and boosted ads.',
    contentLabel: 'Caption',
    copyContentButtonLabel: 'Copy Caption',
    copyLinkButtonLabel: 'Copy Link',
    theme: 'risk',
    template: (trackedUrl) => `Planning to apply for a UK or Schengen visa?\n\nMost refusals happen because of small issues people do not notice early enough.\n\nCheck your visa approval risk in under 60 seconds.\n\nFree AI pre-check:\n${trackedUrl}`,
  },
  {
    channel: 'instagram',
    label: 'Instagram Story',
    description: 'Best for story traffic and quick awareness.',
    contentLabel: 'Caption',
    copyContentButtonLabel: 'Copy Caption',
    copyLinkButtonLabel: 'Copy Link',
    theme: 'risk',
    template: (trackedUrl) => `Visa rejected or applying soon?\n\nYou may have hidden weak points in your application.\n\nCheck your visa risk before you apply or reapply:\n${trackedUrl}`,
  },
  {
    channel: 'whatsapp',
    label: 'WhatsApp / Messenger Share',
    description: 'Best for sending directly to interested clients.',
    contentLabel: 'Message',
    copyContentButtonLabel: 'Copy Message',
    copyLinkButtonLabel: 'Copy Link',
    theme: 'light',
    template: (trackedUrl) => `Hi, before you apply for a UK or Schengen visa, you can use this free 1-minute AI pre-check to identify possible refusal risks:\n\n${trackedUrl}`,
  },
];

export function buildTrackedSocialUrl(baseUrl: string, partnerCode: string, channel: SocialAssetChannel): string {
  const parsed = new URL(baseUrl);
  const theme = channel === 'whatsapp' ? 'light' : 'risk';
  parsed.searchParams.set('ppn_ref', partnerCode);
  parsed.searchParams.set('source', channel);
  parsed.searchParams.set('theme', theme);
  return parsed.toString();
}

export function buildSocialAssetKits(baseUrl: string, partnerCode: string): SocialAssetKit[] {
  if (!isAllowedSocialAssetBaseUrl(baseUrl)) {
    return [];
  }

  return SOCIAL_ASSET_DEFINITIONS.map((kit) => {
    const trackedUrl = buildTrackedSocialUrl(baseUrl, partnerCode, kit.channel);
    return {
      channel: kit.channel,
      label: kit.label,
      description: kit.description,
      trackedUrl,
      content: kit.template(trackedUrl),
      contentLabel: kit.contentLabel,
      copyContentButtonLabel: kit.copyContentButtonLabel,
      copyLinkButtonLabel: kit.copyLinkButtonLabel,
    };
  });
}

function isAllowedSocialAssetBaseUrl(baseUrl: string): boolean {
  try {
    const parsed = new URL(baseUrl);
    return parsed.protocol === 'https:' && ALLOWED_WIDGET_ORIGINS.has(parsed.origin);
  } catch {
    return false;
  }
}
