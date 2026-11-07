const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 400, height: 820 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/dongtan-survival/dist/local.html'); await p.waitForTimeout(500);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/t3.png' });
  await p.evaluate(() => localStorage.setItem('dongtan_settings', JSON.stringify({ speed: 0, size: 16, auto: 0, sfx: 0, vib: 0 })));
  await p.reload(); await p.click('#b-new'); await p.waitForTimeout(1200);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/toast.png' });
  // 허브까지 진행
  for (let i = 0; i < 80; i++) { if (await p.evaluate(() => window.__hub)) break; const n = await p.locator('#choicebox .choice').count(); if (n) { await p.locator('#choicebox .choice').nth(0).click(); } else await p.click('#feed'); await p.waitForTimeout(60); if (await p.locator('#h-loc').textContent() === '집' && await p.locator('#choicebox .choice').count() >= 5) break; }
  await p.waitForTimeout(300);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/hub.png' });
  await p.click('#t-map'); await p.waitForTimeout(400);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/map.png' });
  console.log('errors', errs); await b.close();
})();
