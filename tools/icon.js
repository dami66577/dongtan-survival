// 앱 아이콘 생성: 어두운 아파트 창 격자 + 불 켜진 창 하나 (글꼴 불필요)
const { chromium } = require('playwright');
const svg = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#15181d"/>
<g transform="translate(${pad} ${pad}) scale(${(512 - pad * 2) / 512})">
<rect x="96" y="56" width="320" height="420" rx="14" fill="#22272e" stroke="#3a414a" stroke-width="6"/>
${[0,1,2,3,4].map(r=>[0,1,2].map(c=>`<rect x="${132+c*92}" y="${92+r*74}" width="60" height="46" rx="4" fill="${(r===3&&c===1)?'#d9a441':'#1a1e24'}" stroke="#3a414a" stroke-width="3"/>`).join('')).join('')}
<rect x="232" y="408" width="48" height="68" fill="#1a1e24" stroke="#3a414a" stroke-width="3"/>
<ellipse cx="256" cy="486" rx="150" ry="10" fill="#0f1114"/>
</g></svg>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
  for (const [name, pad] of [["icon-512", 0], ["icon-maskable-512", 64]]) {
    await p.setContent(`<style>html,body{margin:0;background:#15181d}</style>${svg(pad)}`);
    await p.screenshot({ path: `docs/icons/${name}.png` });
  }
  await p.setViewportSize({ width: 192, height: 192 }); await p.setContent(`<style>html,body{margin:0;background:#15181d}svg{width:192px;height:192px}</style>${svg(0)}`); await p.screenshot({ path: 'docs/icons/icon-192.png' });
  await p.setViewportSize({ width: 180, height: 180 }); await p.setContent(`<style>html,body{margin:0;background:#15181d}svg{width:180px;height:180px}</style>${svg(28)}`); await p.screenshot({ path: 'docs/icons/apple-touch-icon.png' });
  await b.close(); console.log('icons ok');
})();
