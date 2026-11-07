// "상식적인 플레이어" 정책 시뮬레이션: 매일 외출(식량 부족하면 상가 우선), 위험 라벨 회피, 나머지는 랜덤
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.join(__dirname,"..");const ctx={console,SCENES:{}};ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(root+"/engine/core.js","utf8"),ctx);
for(const n of ["home","mall","hosp","school","center","lake","station","apt","sys","ending","extra","endings_extra"]) vm.runInContext(fs.readFileSync(`${root}/chapters/${n}.js`,"utf8"),ctx);
const {Core}=ctx; const N=Number(process.argv[2]||500); const ends={}; let foodLog=[];
for(let w=0;w<N;w++){ let v=Core.newGame("나","동생"); let steps=0;
  while(steps++<3000 && !v.ending && !v.missing){
    if(v.choices.length){ const S=Core.S; let pick=null;
      const find=(re)=>v.choices.find(c=>re.test(c.t));
      if(v.id==="home_hub"){
        if(S.flags.sib_sick&&!S.flags.sib_cured&&Core.has("파란 상자")) pick=find(/파란 상자/);
        if(!pick&&!S.flags.out_today){ if(S.food<4) pick=find(/상가로 간다/); if(!pick&&S.flags.sib_sick&&!S.flags.sib_cured) pick=find(/병원으로/); if(!pick&&!S.flags.went_center) pick=find(/주민센터/); if(!pick&&!S.flags.info_time) pick=find(/다원중/); if(!pick) pick=[find(/상가로/),find(/병원으로/),find(/다원중/)].filter(Boolean)[Math.floor(Math.random()*3)]; }
        if(!pick&&S.day>=7) pick=find(/떠날 준비/);
        if(!pick) pick=find(/잠든다|여기까지/);
      }
      if(!pick){ const safe=v.choices.filter(c=>!/맨손|달려든다|싸운다|맞선다|소리|도망/.test(c.t)); const pool=safe.length?safe:v.choices; pick=pool[Math.floor(Math.random()*pool.length)]; }
      v=Core.choose(v,pick.i);
    } else if(v.next) v=Core.proceed(v); else break;
  }
  ends[v.id]=(ends[v.id]||0)+1; foodLog.push(Core.S.day);
}
console.log("상식 플레이",N,"회 엔딩:",Object.entries(ends).sort((a,b)=>b[1]-a[1]).map(([k,c])=>k+"="+c).join(" "));
console.log("평균 생존 일수:",(foodLog.reduce((a,b)=>a+b,0)/N).toFixed(1));
