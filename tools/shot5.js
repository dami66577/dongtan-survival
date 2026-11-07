const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 400, height: 820 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  await p.goto('file:///home/user/dongtan-survival/dist/local.html'); await p.waitForTimeout(400);
  await p.evaluate(() => localStorage.setItem('dongtan_settings', JSON.stringify({ speed: 0, size: 16, auto: 0, sfx: 0, vib: 0 })));
  await p.reload(); await p.waitForTimeout(400); await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/u1.png' });
  await p.click('#tap-start'); await p.waitForTimeout(600); await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/u2.png' });
  await p.click('#b-new'); await p.waitForTimeout(300);
  for (let i = 0; i < 400; i++) { const ch = p.locator('#choicebox .choice'); const n = await ch.count(); if (!n) { await p.click('#feed'); await p.waitForTimeout(15); continue; } const texts = await ch.allTextContents(); if (n >= 5 && await p.locator('#h-loc').textContent() === '집') break; await ch.nth(Math.floor(Math.random() * n)).click(); await p.waitForTimeout(30); }
  await p.waitForTimeout(500); await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/u3.png' });
  const ch = p.locator('#choicebox .choice'); const texts = await ch.allTextContents(); const i = texts.findIndex(t => /잠든다/.test(t)); if (i >= 0) { await ch.nth(i).click(); }
  for (let k = 0; k < 40; k++) { const n = await p.locator('#choicebox .choice').count(); if (await p.locator('#daycard.on').count()) break; if (!n) { await p.click('#feed'); } else await p.locator('#choicebox .choice').first().click(); await p.waitForTimeout(30); }
  await p.waitForTimeout(600); await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/u4.png' });
  await b.close();
})();
