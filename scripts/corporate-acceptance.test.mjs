import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (path) => fs.readFileSync(path, 'utf8');

test('canonical public origin is consistent', () => {
  for (const path of ['lib/seo.ts','lib/i18n.ts','lib/structuredData.ts','app/sitemap.ts','app/robots.ts','public/robots.txt']) {
    const source = read(path);
    assert.equal(source.includes('proinvest-global.com'), false, path);
    assert.equal(source.includes('proinvest.global'), true, path);
  }
});
test('no hreflang points at nonexistent Arabic routes', () => {
  assert.equal(read('lib/seo.ts').includes('/ar'), false);
  assert.equal(read('app/sitemap.ts').includes('/ar'), false);
});
test('private routes are excluded from indexing surfaces', () => {
  const robots = read('app/robots.ts');
  assert.match(robots, /\/ppn\//);
  assert.match(robots, /\/api\//);
  const sitemap = read('app/sitemap.ts');
  assert.equal(sitemap.includes('/ppn/'), false);
  assert.equal(sitemap.includes('/api/'), false);
});
test('AI facts index is present and conservative', () => {
  const llms = read('public/llms.txt');
  for (const term of ['PROINVEST GLOBAL LTD','ProHotelAI','ProCafeAI','VisaRiskAI','Do not infer certifications']) assert.match(llms,new RegExp(term));
});
test('contact uses validated server delivery', () => {
  const page = read('app/(marketing)/contact/page.tsx');
  assert.match(page, /fetch\('\/api\/contact'/);
  assert.equal(page.includes('mailto:'), false);
  assert.equal(page.includes('setTimeout'), false);
  const route = read('app/api/contact/route.ts');
  assert.match(route, /ContactSchema/);
  assert.match(route, /CONTACT_FORM_WEBHOOK_ORIGIN/);
  assert.match(route, /target\.origin !== allowed\.origin/);
});
