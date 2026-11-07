const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 420, height: 800 }, colorScheme: 'dark' });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/dongtan-survival/dist/local.html');
  await p.evaluate(() => { localStorage.setItem('dongtan_auto', JSON.stringify({ S: Object.assign({ me: '하늘', sibName: '바다', day: 8, hp: 50, sib: 60, trust: 80, mind: 60, food: 2, meds: 0, items: [], flags: { school_jungwoo_join: true }, visited: {}, choicesMade: 40, lineCount: 500, scene: 'end_escape_both' }), when: Date.now() })); });
  await p.reload(); await p.click('#b-continue'); await p.waitForTimeout(800);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/ending.png' });
  console.log('title:', await p.locator('#e-title').textContent(), 'img:', await p.locator('#e-art').getAttribute('src'), 'errors:', errs); await b.close();
})();
