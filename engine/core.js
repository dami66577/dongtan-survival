/* ===== 동탄, 둘이서 — 코어 엔진 (DOM 없음; 브라우저/노드 공용) ===== */
(function (root) {
  const SCENES = (root.SCENES = root.SCENES || {});
  const STAT_KEYS = ["hp", "sib", "trust", "mind"];
  const LOC_PREFIX = ["mall_", "hosp_", "school_", "center_", "lake_", "station_", "apt_"];
  const AP_MAX = 4;
  const AP_COST = { mall_enter: 2, hosp_enter: 2, school_enter: 2, lake_enter: 2, station_enter: 2, center_enter: 1, apt_enter: 1, home_talk: 1, home_rest: 1 };
  const WEATHER = ["흐림", "흐림", "맑음", "비", "흐림", "맑음", "흐림", "첫눈", "눈", "눈", "눈"];
  const TIME_LABEL = ["밤", "저녁", "오후", "낮", "아침"];

  function newState(me, sibName) {
    return {
      me: me || "나", sibName: sibName || "동생",
      day: 1, hp: 80, sib: 90, trust: 60, mind: 70, food: 8, meds: 1,
      items: [], flags: {}, starve: 0, choicesMade: 0, visited: {}, lineCount: 0,
      ap: AP_MAX, weather: WEATHER[1], scene: "p_start",
    };
  }

  const Core = {
    S: null,
    newGame(me, sibName) { this.S = newState(me, sibName); return this.enter("p_start"); },
    load(S) { if (S.ap == null) S.ap = S.flags.out_today ? 1 : AP_MAX; if (!S.weather) S.weather = WEATHER[S.day] || "눈"; this.S = S; return this.enter(S.scene || "p_start"); },
    timeLabel() { return TIME_LABEL[Math.max(0, Math.min(4, this.S.ap))]; },
    weatherOf(day) { return WEATHER[day] || "눈"; },

    has(x) { return this.S.items.includes(x); },
    flag(n) { return !!this.S.flags[n]; },
    evalIf(expr) {
      if (expr == null || expr === "") return true;
      try {
        const S = this.S;
        return !!Function("S", "has", "flag", "return (" + expr + ")")(S, (x) => S.items.includes(x), (n) => !!S.flags[n]);
      } catch (e) { console.warn("조건식 오류:", expr, e.message); return false; }
    },
    sub(t) { return String(t).replace(/\{\{me\}\}/g, this.S.me).replace(/\{\{sib\}\}/g, this.S.sibName); },

    setPath(path, value) {
      const parts = path.split("."); let o = this.S;
      for (let i = 0; i < parts.length - 1; i++) { if (o[parts[i]] == null || typeof o[parts[i]] !== "object") o[parts[i]] = {}; o = o[parts[i]]; }
      const k = parts[parts.length - 1];
      if (typeof value === "string" && /^[+-]\d+$/.test(value)) o[k] = (Number(o[k]) || 0) + Number(value);
      else o[k] = value;
    },
    applySet(set) { if (set) for (const k in set) this.setPath(k, set[k]); },
    applyFx(fx) {
      if (!fx) return;
      const S = this.S;
      for (const k in fx) {
        const v = Number(fx[k]) || 0;
        if (STAT_KEYS.includes(k)) S[k] = Math.max(0, Math.min(100, (S[k] || 0) + v));
        else if (k === "food" || k === "meds") S[k] = Math.max(0, (S[k] || 0) + v);
      }
    },
    applyItems(list) {
      if (!list) return;
      for (const raw of [].concat(list)) {
        if (raw.startsWith("-")) { const n = raw.slice(1); const i = this.S.items.indexOf(n); if (i >= 0) this.S.items.splice(i, 1); }
        else if (!this.S.items.includes(raw)) this.S.items.push(raw);
      }
    },

    /** 특수 타깃을 실제 씬 ID로 변환 */
    resolve(target, fromId) {
      const S = this.S;
      if (!target) return null;
      if (target === "@home") { S.flags.out_today = S.ap < 2; return "home_hub"; }
      if (target === "@sleep") return this.sleep();
      if (target.startsWith("@end:")) return target.slice(5);
      if (target === "@back") { const r = S.hookReturn || "home_hub"; S.hookReturn = null; S.flags._noHook = true; return r; }
      return target;
    },

    /** 하루 경과 처리. 다음 씬 ID 반환 */
    sleep() {
      const S = this.S, F = S.flags;
      const mouths = F.school_jungwoo_join ? 3 : 2;
      if (S.food >= mouths) { S.food -= mouths; S.starve = 0; }
      else if (S.food > 0) { S.food = 0; S.starve = 0; S.hp -= 5; S.sib -= 5; S.mind -= 4; F.hungry_night = true; }
      else { S.starve = (S.starve || 0) + 1; S.hp -= 15; S.sib -= 15; S.mind -= 8; F.hungry_night = true; }
      if (F.sib_sick && !F.sib_cured) { S.sib -= 12; S.mind -= 4; }
      if (F.sib_bitten && !F.sib_cured) { F.sib_bitten_days = (F.sib_bitten_days || 0) + 1; }
      if (F.me_bitten && !F.me_cured) { F.me_bitten_days = (F.me_bitten_days || 0) + 1; S.hp -= 10; }
      if (!F.hungry_night) { S.hp += 6; if (!F.sib_sick || F.sib_cured) S.sib += 3; }
      if (S.day >= 4 && !S.items.includes("담요")) { S.hp -= 3; S.sib -= 3; F.cold_night = true; } else F.cold_night = false;
      for (const k of STAT_KEYS) S[k] = Math.max(0, Math.min(100, S[k]));
      S.day += 1; F.out_today = false; S.ap = AP_MAX; S.weather = WEATHER[S.day] || "눈"; F.hungry_night = (S.food === 0 && S.starve > 0) ? F.hungry_night : false;
      if (S.starve >= 3) return "end_starve";
      if (F.sib_bitten && !F.sib_cured && F.sib_bitten_days >= 2) return "end_sib_turn";
      if (F.me_bitten && !F.me_cured && F.me_bitten_days >= 2) return "end_me_turn";
      if (S.hp <= 0) return "end_death_me";
      if (S.sib <= 0) return "end_death_sib";
      if (S.day >= 9 && !F.end_started) return "end_day9";
      return "home_morning";
    },

    deathCheck(id) {
      const sc = SCENES[id];
      if (sc && sc.ending) return id;
      if (this.S.hp <= 0) return "end_death_me";
      if (this.S.sib <= 0) return "end_death_sib";
      return id;
    },

    /** 씬 진입: 효과 적용 후 렌더링용 뷰 반환 */
    enter(id) {
      const S = this.S;
      let sc = SCENES[id];
      if (!sc) return { id, missing: true, lines: [{ t: "(씬 누락: " + id + ")" }], choices: [], next: "home_hub" };
      // 훅: 다른 파일(예: chapters/extra.js)이 hook:{at,if,chance,repeat} 로 기존 씬 앞에 끼어들 수 있다. 끝은 "@back".
      if (!S.flags._noHook) {
        for (const hid in SCENES) {
          const h = SCENES[hid].hook; if (!h || h.at !== id) continue;
          if (S.visited[hid] && !h.repeat) continue;
          if (!this.evalIf(h.if)) continue;
          if (h.chance != null && Math.random() >= h.chance) continue;
          S.hookReturn = id; return this.enter(hid);
        }
      }
      if (!S.flags._noHook && AP_COST[id]) { S.ap = Math.max(0, (S.ap == null ? AP_MAX : S.ap) - AP_COST[id]); S.flags.out_today = S.ap < 2; }
      S.flags._noHook = false;
      // 엔딩 변형: variant:{of:"end_xxx", if:"...", priority:n} 을 가진 엔딩 씬이 기본 엔딩을 대체한다 (우선순위 높은 것 하나)
      if (sc.ending && !sc.variant) {
        let best = null;
        for (const vid in SCENES) {
          const v = SCENES[vid].variant; if (!v || v.of !== id || !SCENES[vid].ending) continue;
          if (!this.evalIf(v.if)) continue;
          const pr = Number(v.priority) || 0;
          if (!best || pr > best.pr) best = { vid, pr };
        }
        if (best) { id = best.vid; sc = SCENES[id]; }
      }
      S.scene = id; S.visited[id] = (S.visited[id] || 0) + 1;
      this.applySet(sc.set); this.applyFx(sc.fx); this.applyItems(sc.item);
      const after = this.deathCheck(id);
      if (after !== id) return this.enter(after);
      const lines = (sc.lines || []).filter((l) => this.evalIf(l.if)).map((l) => ({ s: l.s ? (l.s === "me" ? S.me : l.s === "sib" ? S.sibName : l.s) : null, role: l.s || "n", t: this.sub(l.t) }));
      S.lineCount += lines.length;
      const choices = (sc.choices || []).filter((c) => this.evalIf(c.if)).map((c, i) => ({ i, t: this.sub(c.t), c }));
      return { id, scene: sc, bg: sc.bg, lines, choices, next: choices.length ? null : (sc.next || null), ending: sc.ending || null };
    },

    choose(view, idx) {
      const ch = view.choices.find((x) => x.i === idx); if (!ch) return view;
      const c = ch.c; this.S.choicesMade++;
      this.applyFx(c.fx); this.applySet(c.set); this.applyItems(c.item);
      let target = this.resolve(c.go, view.id);
      if (target == null) target = "home_hub";
      return this.enter(this.deathCheck(target));
    },
    proceed(view) {
      let target = this.resolve(view.next, view.id);
      if (target == null) target = "home_hub";
      return this.enter(this.deathCheck(target));
    },
  };
  root.Core = Core;
  if (typeof module !== "undefined") module.exports = { Core, SCENES };
})(typeof window !== "undefined" ? window : globalThis);
