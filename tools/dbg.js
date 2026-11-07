const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 400, height: 820 }, colorScheme: 'dark' });
  p.on('pageerror', e => console.log('PAGEERROR', String(e))); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto('file:///home/user/dongtan-survival/dist/local.html');
  await p.evaluate(() => { localStorage.clear(); localStorage.setItem('dongtan_settings', JSON.stringify({ speed: 0, size: 16, auto: 0, sfx: 0, vib: 0 })); });
  await p.reload(); await p.click('#tap-start'); await p.click('#b-new'); await p.waitForTimeout(500);
  let sleeps = 0;
  for (let i = 0; i < 300; i++) {
    const ch = p.locator('#choicebox .choice'); const n = await ch.count();
    if (!n) { await p.click('#feed'); await p.waitForTimeout(20); continue; }
    const texts = await ch.allTextContents(); let idx = texts.findIndex(t => /잠든다/.test(t)); if (idx < 0) idx = Math.floor(Math.random() * n);
    if (/잠든다/.test(texts[idx])) sleeps++;
    try { await ch.nth(idx).click({ timeout: 4000 }); } catch (e) { console.log('STUCK at', i, texts[idx], 'daycard on:', await p.locator('#daycard.on').count(), 'loc', await p.locator('#h-loc').textContent()); await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/fail.png' }); break; }
    await p.waitForTimeout(30);
    if (await p.locator('#daycard.on').count()) { await p.waitForTimeout(2400); }
  }
  console.log('sleeps', sleeps, 'day', await p.locator('#h-day').textContent()); await b.close();
})();
