import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildTrackedWidgetUrl, isAllowedWidgetUrl, buildIframeEmbedCode } from './widget-embed.ts';

test('buildTrackedWidgetUrl appends ppn_ref/source when no query exists', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk', 'ABC123');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?ppn_ref=ABC123&source=widget');
});

test('buildTrackedWidgetUrl preserves existing query params', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk?foo=bar', 'ABC123');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?foo=bar&ppn_ref=ABC123&source=widget');
});

test('buildTrackedWidgetUrl replaces existing ppn_ref/source instead of duplicating', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk?source=old&ppn_ref=OLD&foo=bar', 'ABC123');

  const parsed = new URL(result);
  assert.equal(parsed.searchParams.getAll('ppn_ref').length, 1);
  assert.equal(parsed.searchParams.getAll('source').length, 1);
  assert.equal(parsed.searchParams.get('ppn_ref'), 'ABC123');
  assert.equal(parsed.searchParams.get('source'), 'widget');
  assert.equal(parsed.searchParams.get('foo'), 'bar');
});

test('isAllowedWidgetUrl blocks non-VisaRiskAI widget URLs', () => {
  assert.equal(isAllowedWidgetUrl('https://www.visariskai.com/embed/quick-risk'), true);
  assert.equal(isAllowedWidgetUrl('https://visariskai.com/embed/quick-risk'), true);
  assert.equal(isAllowedWidgetUrl('https://evil.com/embed/quick-risk'), false);
  assert.equal(isAllowedWidgetUrl('http://www.visariskai.com/embed/quick-risk'), false);
});

test('buildIframeEmbedCode contains the correct iframe attributes', () => {
  const code = buildIframeEmbedCode('https://www.visariskai.com/embed/quick-risk', 'PARTNERXYZ');
  assert.match(code, /src="https:\/\/www\.visariskai\.com\/embed\/quick-risk\?ppn_ref=PARTNERXYZ&source=widget"/);
  assert.match(code, /width="100%"/);
  assert.match(code, /height="600"/);
  assert.match(code, /style="border:0;border-radius:12px;max-width:100%;"/);
  assert.match(code, /loading="lazy"/);
  assert.match(code, /referrerpolicy="no-referrer-when-downgrade"/);
});

test('partner assets page renders copy embed code for widget assets', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/ppn/assets/page.tsx'), 'utf8');
  assert.match(source, /Copy Embed Code/);
  assert.match(source, /Personalized iframe embed code/);
});

test('non-widget assets still behave as before with download/open link', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/ppn/assets/page.tsx'), 'utf8');
  assert.match(source, /\{asset\.type === 'widget' \?/);
  assert.match(source, /Download/);
});
