const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 400, height: 820 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  await p.goto('file:///home/user/dongtan-survival/dist/local.html'); await p.waitForTimeout(600);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/t2.png' });
  await p.evaluate(() => localStorage.setItem('dongtan_settings', JSON.stringify({ speed: 0, size: 16, auto: 0, sfx: 0, vib: 0 })));
  await p.reload(); await p.click('#b-new'); await p.waitForTimeout(1300);
  for (let i = 0; i < 9; i++) { const n = await p.locator('#choicebox .choice').count(); if (n) await p.locator('#choicebox .choice').nth(0).click(); await p.waitForTimeout(150); }
  await p.waitForTimeout(600);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/g2.png' }); await b.close();
})();
