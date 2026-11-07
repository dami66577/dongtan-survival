const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 420, height: 800 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  await p.goto('file:///home/user/dongtan-survival/dist/local.html'); await p.click('#b-new'); await p.waitForTimeout(500);
  for (let i = 0; i < 12; i++) { await p.click('#feed'); await p.waitForTimeout(150); }
  await p.waitForTimeout(1500);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/dark.png' }); await b.close();
})();
