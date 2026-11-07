#!/usr/bin/env node
/* 사용법: node tools/validate.js [chapters/x.js ...] [--solo] [--walk N]
   --solo : 한 챕터만 검사 (다른 챕터 접두사의 타깃은 허용)
   --walk N : N회 랜덤 플레이 시뮬레이션 (전체 챕터일 때) */
const fs = require("fs"), path = require("path"), vm = require("vm");
const args = process.argv.slice(2);
const solo = args.includes("--solo");
const walkIdx = args.indexOf("--walk");
const walks = walkIdx >= 0 ? Number(args[walkIdx + 1]) || 300 : 0;
let files = args.filter((a) => a.endsWith(".js"));
const root = path.join(__dirname, "..");
if (!files.length) files = ["home", "mall", "hosp", "school", "center", "lake", "station", "apt", "sys", "ending", "extra", "endings_extra"].map((n) => `chapters/${n}.js`).filter((f) => fs.existsSync(path.join(root, f)));

const ctx = { console, SCENES: {}, globalThis: null, module: undefined, window: undefined };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "engine/core.js"), "utf8"), ctx, { filename: "core.js" });
let errors = [], warns = [];
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f }); }
  catch (e) { errors.push(`${f}: 문법/실행 오류 — ${e.message}`); }
}
const SCENES = ctx.SCENES, Core = ctx.Core;
const ids = Object.keys(SCENES);
const PREFIXES = ["p_", "home_", "mall_", "hosp_", "school_", "center_", "lake_", "station_", "apt_", "sys_", "end_", "extra_"];
const ownPrefixes = new Set(ids.map((id) => PREFIXES.find((p) => id.startsWith(p)) || "?"));
const ENTRY = { "chapters/home.js": ["p_start", "home_hub", "home_morning", "home_talk", "home_rest", "home_night_event"], "chapters/mall.js": ["mall_enter"], "chapters/hosp.js": ["hosp_enter", "hosp_cure"], "chapters/school.js": ["school_enter"], "chapters/center.js": ["center_enter"], "chapters/lake.js": ["lake_enter"], "chapters/station.js": ["station_enter"], "chapters/apt.js": ["apt_enter"], "chapters/ending.js": ["end_start", "end_escape_both", "end_escape_cold", "end_escape_alone", "end_stay_mall", "end_stay_school", "end_ambulance", "end_sib_turn", "end_me_turn", "end_death_me", "end_death_sib", "end_starve", "end_bus_trap", "end_parents", "end_day9"] };

let lineCount = 0, choiceCount = 0, condLines = 0;
const refs = {};
function checkTarget(t, from) {
  if (!t) return;
  if (t === "@home" || t === "@sleep" || t === "@back") return;
  const id = t.startsWith("@end:") ? t.slice(5) : t;
  refs[id] = (refs[id] || 0) + 1;
  if (SCENES[id]) return;
  const pre = PREFIXES.find((p) => id.startsWith(p));
  if (!pre) { errors.push(`${from}: 알 수 없는 타깃 '${t}' (접두사 규칙 위반)`); return; }
  if (solo && !ownPrefixes.has(pre)) return; // 다른 챕터 몫
  if (solo && pre === "end_" ) return;
  errors.push(`${from}: 존재하지 않는 씬 '${t}'`);
}
function checkExpr(expr, where) {
  if (expr == null) return;
  try { Function("S", "has", "flag", "return (" + expr + ")"); } catch (e) { errors.push(`${where}: 조건식 문법 오류 '${expr}'`); }
}
for (const id of ids) {
  const sc = SCENES[id];
  if (!PREFIXES.some((p) => id.startsWith(p))) warns.push(`${id}: 접두사 규칙 밖의 씬 ID`);
  const lines = sc.lines || [];
  if (!Array.isArray(lines)) errors.push(`${id}: lines 가 배열이 아님`);
  for (const l of lines) { if (typeof l.t !== "string") errors.push(`${id}: 대사 t 누락`); if (l.if) { condLines++; checkExpr(l.if, id); } }
  lineCount += lines.length;
  const ch = sc.choices || [];
  if (!ch.length && !sc.next && !sc.ending) errors.push(`${id}: 막다른 씬 (choices/next/ending 없음)`);
  if (ch.length && sc.next) warns.push(`${id}: choices 와 next 둘 다 있음 (next 무시됨)`);
  for (const c of ch) { choiceCount++; if (!c.t) errors.push(`${id}: 선택지 라벨 없음`); checkTarget(c.go, id); checkExpr(c.if, id); }
  checkTarget(sc.next, id);
  if (sc.variant) { if (!sc.ending) errors.push(`${id}: variant 엔딩인데 ending 필드 없음`); if (!SCENES[sc.variant.of] && !solo) errors.push(`${id}: variant.of '${sc.variant.of}' 씬이 없음`); else if (SCENES[sc.variant.of] && !SCENES[sc.variant.of].ending) errors.push(`${id}: variant.of 가 엔딩 씬이 아님`); checkExpr(sc.variant.if, id); refs[id] = (refs[id] || 0) + 1; if (sc.choices && sc.choices.length || sc.next) errors.push(`${id}: 엔딩 씬에 choices/next 금지`); }
  if (sc.hook) { if (!sc.hook.at || (!SCENES[sc.hook.at] && !solo)) errors.push(`${id}: hook.at '${sc.hook.at}' 씬이 없음`); checkExpr(sc.hook.if, id); refs[id] = (refs[id] || 0) + 1; }
}
for (const f of files) for (const e of ENTRY[f] || []) if (!SCENES[e]) errors.push(`${f}: 필수 진입점 '${e}' 미정의`);
if (!solo) for (const id of ids) if (!refs[id] && !["p_start", "home_hub", "home_morning", "end_death_me", "end_death_sib", "end_starve", "end_day9", "end_sib_turn", "end_me_turn"].includes(id)) warns.push(`${id}: 아무 곳에서도 참조되지 않음`);

console.log(`파일: ${files.join(", ")}`);
console.log(`씬 ${ids.length}개 / 대사·지문 ${lineCount}줄 (조건부 ${condLines}) / 선택지 ${choiceCount}개 / 엔딩 ${ids.filter((i) => SCENES[i].ending).length}종`);
for (const f of files) {
  const pre = f.includes("home") ? ["p_", "home_"] : f.includes("ending") ? ["end_"] : [path.basename(f, ".js") + "_"];
  const mine = ids.filter((i) => pre.some((p) => i.startsWith(p)));
  const ln = mine.reduce((a, i) => a + (SCENES[i].lines || []).length, 0);
  console.log(`  ${f}: 씬 ${mine.length} / 줄 ${ln}`);
}
if (warns.length) console.log("\n경고:\n  " + warns.join("\n  "));
if (errors.length) { console.log("\n오류:\n  " + errors.join("\n  ")); process.exitCode = 1; }
else console.log("\n오류 없음.");

if (walks && !solo && !errors.length) {
  const endings = {}, seen = new Set(); let deadEnds = [], crashes = 0, maxSteps = 0;
  for (let w = 0; w < walks; w++) {
    let view; try { view = Core.newGame("나", "동생"); } catch (e) { crashes++; continue; }
    let steps = 0;
    while (steps++ < 2000) {
      seen.add(view.id);
      if (view.missing) { deadEnds.push("누락 " + view.id); break; }
      if (view.ending) { endings[view.id] = (endings[view.id] || 0) + 1; break; }
      try {
        if (view.choices.length) view = Core.choose(view, view.choices[Math.floor(Math.random() * view.choices.length)].i);
        else if (view.next) view = Core.proceed(view);
        else { deadEnds.push("막다름 " + view.id); break; }
      } catch (e) { crashes++; deadEnds.push("예외 " + view.id + ": " + e.message); break; }
    }
    maxSteps = Math.max(maxSteps, steps);
    if (steps >= 2000) deadEnds.push("무한루프 의심 (마지막 " + view.id + ")");
  }
  console.log(`\n랜덤 플레이 ${walks}회: 도달 씬 ${seen.size}/${ids.length}, 최대 ${maxSteps}스텝, 예외 ${crashes}`);
  console.log("엔딩 분포:", Object.entries(endings).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(" "));
  const unseen = ids.filter((i) => !seen.has(i));
  if (unseen.length) console.log("미도달 씬 (" + unseen.length + "):", unseen.slice(0, 60).join(", "));
  if (deadEnds.length) { console.log("문제:", [...new Set(deadEnds)].slice(0, 30).join("\n  ")); process.exitCode = 1; }
}
