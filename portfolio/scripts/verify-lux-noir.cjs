/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium, firefox, webkit } = require(process.env.LUX_NOIR_PLAYWRIGHT_MODULE || 'playwright');
const axePath = require.resolve(process.env.LUX_NOIR_AXE_MODULE ? path.join(process.env.LUX_NOIR_AXE_MODULE, 'axe.min.js') : 'axe-core/axe.min.js');
const base = process.argv[2] || 'http://127.0.0.1:3037';
const output = path.resolve(process.env.LUX_NOIR_QA_OUTPUT || 'output/lux-noir');
const engines = (process.env.LUX_NOIR_BROWSERS || 'chromium').split(',');
const report = { base, engines: {}, failures: [], accessibility: [], labInteraction: null };
const modes = [
  ['BUILD','01','I build what I want to exist.'],
  ['THINK','02','Everything starts with a question.'],
  ['CREATE','03','Creativity is a form of independence.'],
  ['FIELD','04','Outside the interface.'],
  ['ARCHIVE','05','Progress leaves traces.'],
];
const routes = ['/', '/about', '/impressum', '/datenschutz', '/contact', '/projects', '/projects/synapedia', '/projects/suite','/projects/luxlabs', '/projects/neurocodex', '/journal', '/journal/designing-for-clarity', '/journal/motion-as-an-enhancement', '/journal/show-the-evidence', '/websites'];
async function check(engine, name, fn) {
  try { await fn(); report.engines[engine].checks.push(name); }
  catch (error) { report.failures.push({ engine, name, error: error.message }); }
}
async function ready(page) { await page.waitForFunction(() => document.querySelector('.ms-switch')?.getAttribute('data-enhanced') === 'true'); }
async function axeCheck(page, name) {
  // Sample the finished view, rather than a text fade partway through its entrance.
  await page.evaluate(() => Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {}))));
  await page.addScriptTag({ path: axePath });
  const result = await page.evaluate(() => window.axe.run(document, { runOnly: { type:'tag', values:['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } }));
  report.accessibility.push({ name, violations: result.violations.map(v => ({ id:v.id, impact:v.impact, nodes:v.nodes.map(n => ({ target:n.target, summary:n.failureSummary })) })), incomplete:result.incomplete.map(v => v.id) });
  assert.equal(result.violations.length, 0, `${name}: ${result.violations.map(v=>v.id).join(', ')}`);
}
(async () => {
  await fs.mkdir(output, { recursive:true });
  for (const engine of engines) {
    const library = {chromium,firefox,webkit}[engine];
    if (!library) throw new Error(`Unknown engine ${engine}`);
    const browser = await library.launch({ headless:true, ...(engine === 'chromium' && process.env.LUX_NOIR_CHROME ? { executablePath:process.env.LUX_NOIR_CHROME, chromiumSandbox:true } : {}) });
    report.engines[engine] = { version:browser.version(), checks:[] };
    const context = await browser.newContext({ viewport:{width:1440,height:900} });
    const page = await context.newPage();
    const errors = [], external = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (/^https?:/.test(r.url()) && new URL(r.url()).origin !== new URL(base).origin) external.push(new URL(r.url()).origin); });
    await page.goto(base, {waitUntil:'networkidle'}); await ready(page);
    await check(engine, 'five semantic mode buttons / copy / one panel / metadata', async () => {
      assert.deepEqual(await page.getByRole('group',{name:'Identity modes'}).getByRole('button').allTextContents(), modes.map(([name,code])=>code+name));
      for (const [name,code,headline] of modes) {
        const button = page.getByRole('button',{name,exact:true}); await button.click();
        await page.waitForFunction(label=>document.querySelector(`.ms-hero-${label}`)?.checkVisibility(), name.toLowerCase());
        assert.equal(await button.getAttribute('aria-pressed'),'true');
        assert.equal(await page.locator('.ms-hero-panel:visible').count(),1);
        assert.equal(await page.locator('.ms-work-panel:visible').count(),1);
        assert.equal(await page.locator('.ms-hero-panel:visible h2').innerText(),headline);
        assert.equal(await page.locator('.ms-image-mode:visible').innerText(),`FL / ${code}`);
      }
    });
    await check(engine,'arrow / Home / End keyboard selection and focus', async () => {
      const first=page.getByRole('button',{name:'BUILD',exact:true}); await first.focus(); await first.press('ArrowRight');
      assert.equal(await page.getByRole('button',{name:'THINK',exact:true}).getAttribute('aria-pressed'),'true');
      assert.equal(await page.evaluate(()=>document.activeElement?.textContent),'02THINK');
      await page.keyboard.press('End'); assert.equal(await page.getByRole('button',{name:'ARCHIVE',exact:true}).getAttribute('aria-pressed'),'true');
      await page.keyboard.press('Home'); assert.equal(await first.getAttribute('aria-pressed'),'true');
      assert.ok(await first.evaluate(el=>getComputedStyle(el).outlineStyle!=='none'));
    });
    await check(engine,'eight widths / no overflow / comfortable targets', async () => {
      for (const width of [320,375,390,430,768,1024,1440,1920]) {
        await page.setViewportSize({width,height:width>=1440?1080:900});
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width}px document overflow`);
        assert.ok(await page.locator('h1').evaluate(el=>el.scrollWidth<=el.clientWidth+1),`${width}px heading overflow`);
        for (const button of await page.locator('.ms-mode-button:visible').all()) {
          const box=await button.boundingBox(); assert.ok(box.height>=44 && box.width>=44,`${width}px hit target`);
        }
        if (engine==='chromium') await page.screenshot({path:path.join(output,`width-${width}.png`)});
      }
    });
    await check(engine,'mobile menu / scroll lock / inert background / Tab cycle / Escape', async () => {
      await page.setViewportSize({width:390,height:844});
      const summary=page.locator('.mobile-menu summary'); await summary.click();
      await page.waitForFunction(()=>document.body.style.overflow==='hidden' && document.querySelector('main').inert);
      assert.equal(await summary.getAttribute('aria-expanded'),'true');
      assert.ok(await page.locator('.mobile-links a').first().evaluate(el=>document.activeElement===el));
      await page.keyboard.press('Shift+Tab'); assert.ok(await summary.evaluate(el=>document.activeElement===el));
      await page.keyboard.press('Shift+Tab'); assert.ok(await page.locator('.mobile-links a').last().evaluate(el=>document.activeElement===el));
      await page.keyboard.press('Tab'); assert.ok(await summary.evaluate(el=>document.activeElement===el));
      await page.keyboard.press('Escape');
      await page.waitForFunction(()=>!document.querySelector('.mobile-menu').open && !document.querySelector('main').inert && document.body.style.overflow==='');
      assert.equal(await summary.getAttribute('aria-expanded'),'false'); assert.ok(await summary.evaluate(el=>document.activeElement===el));
      await summary.click(); await page.locator('.mobile-links a').first().click();
      await page.waitForFunction(()=>!document.querySelector('.mobile-menu').open && !document.querySelector('main').inert);
      await summary.click(); await page.setViewportSize({width:1440,height:900});
      await page.waitForFunction(()=>!document.querySelector('.mobile-menu').open && document.body.style.overflow==='');
    });
    await check(engine,'timeline disclosure / evidence', async () => {
      await page.locator('.desktop-nav').getByRole('link',{name:'Archive',exact:true}).click();
      await page.waitForFunction(()=>{const r=document.querySelector('[data-timeline] summary').getBoundingClientRect();return r.top<innerHeight && r.bottom>156});
      const item=page.locator('[data-timeline]').first(); await item.locator('summary').click();
      assert.equal(await item.getAttribute('open'),''); assert.match(await item.innerText(),/Local repository commit/);
    });
    await check(engine,'privacy and sound defaults / runtime errors', async () => {
      assert.deepEqual(errors,[]); assert.deepEqual([...new Set(external)],[]);
      assert.equal(await context.cookies().then(x=>x.length),0);
      assert.equal(await page.evaluate(()=>localStorage.length),0);
      assert.equal(await page.getByRole('button',{name:'Sound off',exact:false}).getAttribute('aria-pressed'),'false');
    });
    if (engine==='chromium') {
      await check(engine,'WCAG axe checks / all fifteen routes and five modes', async () => {
        for (const route of routes) {
          await page.goto(base+route,{waitUntil:'networkidle'});
          assert.equal(await page.locator('h1').count(),1); assert.ok(await page.locator('h1').isVisible());
          await axeCheck(page,route);
        }
        await page.goto(base,{waitUntil:'networkidle'}); await ready(page);
        for (const [name] of modes) { await page.getByRole('button',{name,exact:true}).click(); await axeCheck(page,`mode ${name}`); }
        await page.setViewportSize({width:390,height:844}); await page.locator('.mobile-menu summary').click();
        await page.waitForFunction(()=>document.querySelector('main').inert); await axeCheck(page,'mobile menu open');
        await page.keyboard.press('Escape');
      });
      await check(engine,'local navigation destinations and fragments', async () => {
        const destinations = new Set();
        for (const route of routes) {
          await page.goto(base+route,{waitUntil:'networkidle'});
          for (const href of await page.locator('a[href]').evaluateAll(links=>links.map(link=>link.href))) {
            const url=new URL(href); if(url.origin===new URL(base).origin)destinations.add(url.href);
          }
        }
        for(const destination of destinations) {
          const url=new URL(destination);const response=await context.request.get(destination);
          assert.ok(response.ok(),`${url.pathname} returned ${response.status()}`);
          if(url.hash)assert.ok((await response.text()).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing fragment ${url.pathname}${url.hash}`);
        }
        report.localDestinations=destinations.size;
      });
      await check(engine,'email draft / fields / no submission', async () => {
        await page.goto(base+'/websites',{waitUntil:'networkidle'});
        await page.getByLabel('Name',{exact:true}).fill('QA Example');
        await page.getByLabel('E-Mail',{exact:true}).fill('qa@example.invalid');
        await page.getByLabel('Nachricht',{exact:true}).fill('Preview & review <only>');
        const action=await page.locator('form').getAttribute('action'); assert.match(action,/^mailto:/);
        assert.equal(await page.locator('form').getAttribute('method'),'get');
        assert.equal(await page.locator('form input[type=email]').inputValue(),'qa@example.invalid');
        assert.ok(await page.getByText('Das Formular öffnet einen vorbereiteten E-Mail-Entwurf.',{exact:false}).isVisible());
      });
      await check(engine,'analytics adapter only reports with explicit consent', async () => {
        await page.goto(base,{waitUntil:'networkidle'}); await ready(page);
        await page.evaluate(()=>{window.qaEvents=[];window.fluxAnalytics={hasConsent:()=>false,track:(event)=>window.qaEvents.push(event)}});
        await page.getByRole('button',{name:'THINK',exact:true}).click(); assert.deepEqual(await page.evaluate(()=>window.qaEvents),[]);
        await page.evaluate(()=>{window.fluxAnalytics.hasConsent=()=>true});
        await page.getByRole('button',{name:'CREATE',exact:true}).click(); assert.ok((await page.evaluate(()=>window.qaEvents)).includes('mode_switch'));
      });
    }
    await check(engine,'reduced motion / all content / no pointer movement', async () => {
      const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await reduced.newPage();
      await p.goto(base,{waitUntil:'networkidle'});await ready(p);await p.getByRole('button',{name:'FIELD',exact:true}).click();
      assert.equal(await p.locator('.ms-hero-panel:visible h2').innerText(),'Outside the interface.');
      assert.equal(await p.locator('.ms-name-line > span').first().evaluate(el=>getComputedStyle(el).animationName),'none');
      assert.equal(await p.locator('.ms-portrait-frame img').first().evaluate(el=>getComputedStyle(el).transform),'none');
      if(engine==='chromium')await p.screenshot({path:path.join(output,'reduced-motion.png'),fullPage:true});await reduced.close();
    });
    await check(engine,'JS-disabled native switch and navigation', async () => {
      const native=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});const p=await native.newPage();
      await p.goto(base,{waitUntil:'networkidle'});assert.ok(await p.locator('h1').isVisible());
      await p.locator('label[for="mode-field"]').click();assert.equal(await p.locator('.ms-hero-panel:visible h2').innerText(),'Outside the interface.');
      await p.locator('.mobile-menu summary').click();assert.ok(await p.locator('.mobile-links').isVisible());
      assert.equal(await p.evaluate(()=>getComputedStyle(document.documentElement).overflowY),'hidden');
      for(const route of ['/about','/projects','/contact','/websites']) { await p.goto(base+route,{waitUntil:'networkidle'});assert.ok(await p.locator('h1').isVisible()); }
      await native.close();
    });
    await check(engine,'missing portrait / reserved fallback frame', async () => {
      const missing=await browser.newContext({viewport:{width:390,height:844}});const p=await missing.newPage();
      await p.route('**/_next/image?*',route=>route.request().url().includes('florian-supplied-portrait')?route.fulfill({status:404,body:'QA missing image'}):route.continue());
      await p.goto(base,{waitUntil:'networkidle'});await p.locator('.ms-portrait-frame[data-media-state="fallback"]').waitFor();
      const box=await p.locator('.ms-portrait-frame').first().boundingBox();assert.ok(box.width>100&&box.height>=280);
      if(engine==='chromium')await p.screenshot({path:path.join(output,'missing-image.png')});await missing.close();
    });
    if(engine==='chromium')await check(engine,'slow network / throttled interactions / lab Event Timing',async()=>{
      const slow=await browser.newContext({viewport:{width:390,height:844}});const p=await slow.newPage();
      await p.addInitScript(()=>{window.qaInteraction=[];if(PerformanceObserver.supportedEntryTypes.includes('event'))new PerformanceObserver(list=>window.qaInteraction.push(...list.getEntries().filter(e=>e.interactionId).map(e=>({id:e.interactionId,duration:e.duration})))).observe({type:'event',buffered:true,durationThreshold:16})});
      const cdp=await slow.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:60000,uploadThroughput:60000});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
      await p.goto(base,{waitUntil:'networkidle',timeout:45000});await ready(p);
      for(const [name] of modes)await p.getByRole('button',{name,exact:true}).click();
      await p.locator('.mobile-menu summary').click();await p.waitForFunction(()=>document.querySelector('main').inert);await p.keyboard.press('Escape');
      await p.locator('[data-timeline] summary').first().click();await p.waitForTimeout(500);
      const timing=await p.evaluate(()=>{const groups=new Map();for(const e of window.qaInteraction)groups.set(e.id,Math.max(groups.get(e.id)||0,e.duration));const values=[...groups.values()].sort((a,b)=>b-a);return {samples:values.length,maxDurationMs:values[0]??null,p98CandidateMs:values[Math.floor(values.length/50)]??null,supported:PerformanceObserver.supportedEntryTypes.includes('event')}});
      report.labInteraction={...timing,conditions:'390px viewport, 150ms latency, 60KB/s, 4x CPU; a short scripted interaction sequence, not field INP'};
      await slow.close();
    });
    await check(engine,'no runtime errors across the full route sequence',async()=>assert.deepEqual(errors,[]));
    await context.close();await browser.close();
    console.log(`${engine}: ${report.engines[engine].checks.length} checks passed`);
  }
  await fs.writeFile(path.join(output,'browser-report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({failures:report.failures,labInteraction:report.labInteraction},null,2));
  if(report.failures.length)process.exitCode=1;
})().catch(async error=>{report.failures.push({fatal:error.message});await fs.mkdir(output,{recursive:true});await fs.writeFile(path.join(output,'browser-report.json'),JSON.stringify(report,null,2));console.error(error);process.exitCode=1});
