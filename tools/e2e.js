const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 420, height: 800 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file:///home/user/dongtan-survival/dist/local.html');
  await p.evaluate(() => { localStorage.clear(); localStorage.setItem('dongtan_settings', JSON.stringify({ speed: 0, size: 16, auto: 0 })); });
  await p.reload(); await p.click('#tap-start'); await p.waitForTimeout(500); await p.fill('#in-me', '하늘'); await p.fill('#in-sib', '바다'); await p.click('#b-new'); await p.waitForTimeout(300);
  let scenes = 0, choicesSeen = 0;
  for (let i = 0; i < 400; i++) {
    if (await p.locator('#ending.on').count()) break;
    const ch = p.locator('#choicebox .choice');
    const n = await ch.count();
    if (await p.locator('#daycard.on').count()) { await p.waitForTimeout(2500); continue; }
    if (n === 0) { await p.click('#feed'); await p.waitForTimeout(30); }
    else { scenes++; if (n > 1) choicesSeen++; await ch.nth(Math.floor(Math.random() * n)).click(); await p.waitForTimeout(40); }
    if (i === 60) { await p.click('#t-bag'); await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/bag.png' }); await p.click('#ov-bag [data-close]'); }
    if (i === 90) { await p.click('#t-save'); await p.click('#slots .slot:nth-child(1) button:nth-of-type(1)'); const t = await p.locator('#slots .slot:nth-child(1) .muted').textContent(); console.log('slot1:', t); await p.click('#ov-save [data-close]'); }
  }
  const day = await p.locator('#h-day').textContent();
  console.log('scenes', scenes, 'choice-scenes', choicesSeen, 'day', day, 'ending?', await p.locator('#ending.on').count());
  await p.screenshot({ path: '/tmp/claude-0/-home-user/d8d7cc43-7102-5404-8cc9-e47456336749/scratchpad/e2e.png' });
  // 이름 치환 확인
  const html = await p.locator('#feedcol, #e-ep').allTextContents(); console.log('placeholder leak:', html.join('').includes('{{'));
  // 타이틀로 → 이어하기/불러오기
  if (await p.locator('#ending.on').count()) { await p.click('#e-title-btn'); } else { await p.click('#t-title'); await p.click('#c-ok'); }
  await p.click('#tap-start').catch(()=>{}); await p.waitForTimeout(400); await p.click('#b-load'); await p.click('#slots .slot:nth-child(1) button:nth-of-type(2)'); await p.waitForTimeout(200);
  console.log('loaded day:', await p.locator('#h-day').textContent(), 'sibname:', await p.locator('#s-sib-name').textContent());
  console.log('errors:', errs); await b.close();
})();
