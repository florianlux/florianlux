/* eslint-disable @typescript-eslint/no-require-imports */
require('./load-typescript.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateWebsiteRequest, websiteRequestMailto } = require('../src/lib/website-request.ts');
const valid = { name: 'Zoë Müller', company: 'Café & Co?', email: 'qa@example.invalid', need: 'Neue Website', budget: '600-1000 €', message: 'Zeile 1 & Grüße\nZeile 2: # < > %' };
test('website draft round-trips international text, reserved characters and multiline messages', () => {
  assert.deepEqual(validateWebsiteRequest(valid), {});
  const url = new URL(websiteRequestMailto('mngmt@synapedia.com', valid));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'mngmt@synapedia.com');
  assert.equal(url.searchParams.get('subject'), 'Website-Anfrage für Café & Co?');
  assert.ok(url.searchParams.get('body').endsWith(valid.message));
  assert.equal([...url.searchParams.keys()].join(','), 'subject,body');
});
test('website validation rejects blank fields, invalid emails, injection, overlong text and invalid budgets', () => {
  for (const [key, value] of [['name', ' '], ['email', 'bad@'], ['email', 'x@y.invalid\nBcc:a@b.invalid'], ['company', 'a\nb'], ['message', ''], ['message', 'x'.repeat(2001)], ['budget', 'other']]) {
    assert.ok(validateWebsiteRequest({ ...valid, [key]: value })[key], key);
  }
});
