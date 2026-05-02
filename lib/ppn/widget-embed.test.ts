import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildTrackedWidgetUrl, isAllowedWidgetUrl, buildIframeEmbedCode, buildWidgetEmbedVariants } from './widget-embed.ts';

test('buildTrackedWidgetUrl appends ppn_ref/source when no query exists', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk', 'ABC123');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?ppn_ref=ABC123&source=widget');
});

test('buildTrackedWidgetUrl preserves existing query params', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk?foo=bar', 'ABC123', 'light');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?foo=bar&ppn_ref=ABC123&source=widget&theme=light');
});

test('buildTrackedWidgetUrl adds each supported theme', () => {
  const base = 'https://www.visariskai.com/embed/quick-risk';
  assert.match(buildTrackedWidgetUrl(base, 'ABC123', 'light'), /theme=light/);
  assert.match(buildTrackedWidgetUrl(base, 'ABC123', 'dark'), /theme=dark/);
  assert.match(buildTrackedWidgetUrl(base, 'ABC123', 'risk'), /theme=risk/);
});

test('buildTrackedWidgetUrl replaces existing ppn_ref/source/theme instead of duplicating', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk?source=old&ppn_ref=OLD&theme=light&foo=bar', 'ABC123', 'dark');

  const parsed = new URL(result);
  assert.equal(parsed.searchParams.getAll('ppn_ref').length, 1);
  assert.equal(parsed.searchParams.getAll('source').length, 1);
  assert.equal(parsed.searchParams.getAll('theme').length, 1);
  assert.equal(parsed.searchParams.get('ppn_ref'), 'ABC123');
  assert.equal(parsed.searchParams.get('source'), 'widget');
  assert.equal(parsed.searchParams.get('theme'), 'dark');
  assert.equal(parsed.searchParams.get('foo'), 'bar');
});

test('isAllowedWidgetUrl blocks non-VisaRiskAI widget URLs', () => {
  assert.equal(isAllowedWidgetUrl('https://www.visariskai.com/embed/quick-risk'), true);
  assert.equal(isAllowedWidgetUrl('https://visariskai.com/embed/quick-risk'), true);
  assert.equal(isAllowedWidgetUrl('https://evil.com/embed/quick-risk'), false);
  assert.equal(isAllowedWidgetUrl('http://www.visariskai.com/embed/quick-risk'), false);
});

test('buildIframeEmbedCode contains the correct iframe attributes', () => {
  const code = buildIframeEmbedCode('https://www.visariskai.com/embed/quick-risk', 'PARTNERXYZ', 'risk');
  assert.match(code, /src="https:\/\/www\.visariskai\.com\/embed\/quick-risk\?ppn_ref=PARTNERXYZ&source=widget&theme=risk"/);
  assert.match(code, /width="100%"/);
  assert.match(code, /height="600"/);
  assert.match(code, /style="border:0;border-radius:12px;max-width:100%;"/);
  assert.match(code, /loading="lazy"/);
  assert.match(code, /referrerpolicy="no-referrer-when-downgrade"/);
});

test('buildWidgetEmbedVariants returns exactly three variants with expected themes', () => {
  const variants = buildWidgetEmbedVariants('https://www.visariskai.com/embed/quick-risk', 'PARTNERXYZ');
  assert.equal(variants.length, 3);
  assert.deepEqual(variants.map((variant) => variant.theme), ['light', 'dark', 'risk']);
  assert.match(variants[0].iframeEmbedCode, /theme=light/);
  assert.match(variants[1].iframeEmbedCode, /theme=dark/);
  assert.match(variants[2].iframeEmbedCode, /theme=risk/);
});

test('partner assets page renders Light/Dark/Risk widget variants', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/ppn/assets/page.tsx'), 'utf8');
  assert.match(source, /variant\.label/);
  assert.match(source, /Copy \{variant\.theme\.charAt\(0\)\.toUpperCase\(\) \+ variant\.theme\.slice\(1\)\} Code/);
});

test('non-widget assets still behave as before with download/open link', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/ppn/assets/page.tsx'), 'utf8');
  assert.match(source, /\{asset\.type === 'widget' \?/);
  assert.match(source, /Download/);
});
