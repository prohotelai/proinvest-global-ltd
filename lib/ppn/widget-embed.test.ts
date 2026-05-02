import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTrackedWidgetUrl, isAllowedWidgetUrl, buildIframeEmbedCode } from './widget-embed.ts';

test('buildTrackedWidgetUrl appends ppn_ref/source when no query exists', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk', 'ABC123');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?ppn_ref=ABC123&source=widget');
});

test('buildTrackedWidgetUrl preserves existing query params', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk?foo=bar', 'ABC123');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?foo=bar&ppn_ref=ABC123&source=widget');
});

test('buildTrackedWidgetUrl replaces existing ppn_ref/source deterministically', () => {
  const result = buildTrackedWidgetUrl('https://www.visariskai.com/embed/quick-risk?source=old&ppn_ref=OLD&foo=bar', 'ABC123');
  assert.equal(result, 'https://www.visariskai.com/embed/quick-risk?source=widget&ppn_ref=ABC123&foo=bar');
});

test('isAllowedWidgetUrl allows only approved domains', () => {
  assert.equal(isAllowedWidgetUrl('https://www.visariskai.com/embed/quick-risk'), true);
  assert.equal(isAllowedWidgetUrl('https://visariskai.com/embed/quick-risk'), true);
  assert.equal(isAllowedWidgetUrl('https://evil.com/embed/quick-risk'), false);
});

test('buildIframeEmbedCode includes partner-specific ppn_ref via tracked URL', () => {
  const code = buildIframeEmbedCode('https://www.visariskai.com/embed/quick-risk', 'PARTNERXYZ');
  assert.match(code, /ppn_ref=PARTNERXYZ/);
  assert.match(code, /source=widget/);
  assert.match(code, /<iframe/);
});
