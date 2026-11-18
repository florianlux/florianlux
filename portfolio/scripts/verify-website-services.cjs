/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium, webkit } = require(process.env.LUX_NOIR_PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:3037';
const output = path.resolve(process.env.LUX_NOIR_QA_OUTPUT || 'output/playwright/consolidation');
const report = { base, conditions: 'Local production preview; headless; cold page contexts; no CPU/network throttling. LCP/CLS are lab observations, not field CWV.', layouts: [], forms: [], performance: [], failures: [] };

async function settled(page) {
  await page.evaluate(() => Promise.all(document.getAnimations().filter(a => Number.isFinite(a.effect?.getComputedTiming().endTime)).map(a => a.finished.catch(() => {}))));
}
async function main() {
  await fs.mkdir(output, { recursive: true });
  for (const [engine, library] of Object.entries({ chromium, webkit })) {
    const browser = await library.launch({ headless: true });
    try {
      for (const route of ['/', '/websites', '/contact']) {
        for (const width of [360, 390, 430, 768, 1440]) {
          const context = await browser.newContext({ viewport: { width, height: 900 } });
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', e => errors.push(e.message));
          await page.addInitScript(() => {
            window.websiteQA = { lcp: null, cls: 0 };
            if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) new PerformanceObserver(list => { window.websiteQA.lcp = list.getEntries().at(-1).startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
            if (PerformanceObserver.supportedEntryTypes.includes('layout-shift')) new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.websiteQA.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
          });
          try {
            const response = await page.goto(base + route, { waitUntil: 'networkidle' });
            assert.equal(response.status(), 200);
            await settled(page);
            const layout = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth,
              clipped: [...document.querySelectorAll('h1,h2,h3,button,.premium-button')].filter(el => el.checkVisibility() && el.scrollWidth > el.clientWidth + 2).map(el => el.textContent.trim()).slice(0, 8),
              images: [...document.images].filter(el => el.checkVisibility() && (!el.complete || el.naturalWidth === 0)).map(el => el.getAttribute('src')),
              navOverlap: (() => { const a = document.querySelector('.brand').getBoundingClientRect(), n = document.querySelector('.desktop-nav').getBoundingClientRect(); return n.width > 0 && a.right > n.left + 1; })(),
            }));
            assert.ok(layout.document <= width + 1, `${width}px overflow`);
            assert.deepEqual(layout.clipped, [], 'clipped visible text');
            assert.deepEqual(layout.images, [], 'failed visible image');
            assert.equal(layout.navOverlap, false, 'navigation overlaps brand');
            assert.deepEqual(errors, [], 'runtime errors');
            const name = `${engine}-${route === '/' ? 'home' : route.slice(1)}-${width}`;
            await page.screenshot({ path: path.join(output, `${name}.png`), timeout: 15000 });
            if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true, timeout: 15000 });
            report.layouts.push({ engine, route, width, ...layout });
            if (engine === 'chromium' && [390, 1440].includes(width)) {
              const perf = await page.evaluate(() => ({ ...window.websiteQA, resources: performance.getEntriesByType('resource').map(e => ({ name: new URL(e.name).pathname, bytes: e.encodedBodySize, kind: e.initiatorType })) }));
              report.performance.push({ route, width, ...perf });
            }
          } catch (error) { report.failures.push({ engine, route, width, error: error.message }); }
          await context.close();
        }
      }
      const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
      const page = await context.newPage();
      try {
        await page.goto(base + '/websites', { waitUntil: 'networkidle' });
        const form = page.getByRole('form', { name: 'Erzähl kurz, was du vorhast.' });
        await form.getByRole('button', { name: 'E-Mail-Entwurf öffnen', exact: true }).press('Enter');
        assert.equal(await form.getByLabel('Name', { exact: true }).evaluate(el => el === document.activeElement), true);
        assert.equal(await form.getByRole('alert').count(), 1);
        await form.getByLabel('Name', { exact: true }).fill('Zoë Müller');
        await form.getByLabel('E-Mail', { exact: true }).fill('invalid');
        await form.getByLabel('Nachricht', { exact: true }).fill('Grüße & Rückfrage\nKeine E-Mail senden.');
        await form.getByRole('button', { name: 'E-Mail-Entwurf öffnen', exact: true }).press('Enter');
        assert.equal(await form.getByLabel('E-Mail', { exact: true }).evaluate(el => el === document.activeElement), true);
        assert.equal(await form.getByLabel('E-Mail', { exact: true }).getAttribute('aria-invalid'), 'true');
        await form.getByLabel('E-Mail', { exact: true }).press('Tab');
        assert.equal(await form.getByLabel('Was brauchst du?', { exact: true }).evaluate(el => el === document.activeElement), true);
        await page.screenshot({ path: path.join(output, `${engine}-form-errors.png`), fullPage: true });
        report.forms.push({ engine, validation: 'PASS', keyboard: 'PASS', validMailtoHandoff: 'NOT_RUN: avoids invoking a real mail client; URL builder unit-tested' });
      } catch (error) { report.failures.push({ engine, form: error.message }); }
      await context.close();
    } finally { await browser.close(); }
  }
  await fs.writeFile(path.join(output, 'website-services-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ layouts: report.layouts.length, forms: report.forms, failures: report.failures, performance: report.performance.map(({ route, width, lcp, cls }) => ({ route, width, lcp, cls })) }, null, 2));
  if (report.failures.length) process.exitCode = 1;
}
main().catch(async error => { console.error(error); process.exitCode = 1; });
