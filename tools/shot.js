const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 420, height: 800 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file:///home/user/dongtan-survival/dist/local.html'); await p.waitForTimeout(800);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/title.png' });
  await p.click('#b-new'); await p.waitForTimeout(600);
  for (let i = 0; i < 6; i++) { await p.click('#feed'); await p.waitForTimeout(250); }
  await p.waitForTimeout(1200);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/game.png' });
  console.log('errors:', errs); await b.close();
})();
