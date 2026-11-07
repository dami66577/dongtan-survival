// chapters/hosp.js — 대학병원 (의약품)
Object.assign(SCENES, {
  // ===== 출발 =====
  hosp_enter: {
    bg: "home",
    set: { "flags.went_hosp": true, "flags.hosp_visits": "+1" },
    lines: [
      { t: "대학병원. 큰길을 따라 걸으면 25분. 지도 없이도 아는 길이다. 엄마가 독감 주사를 맞히러 끌고 가던 길.", if: "S.flags.hosp_visits <= 1" },
      { t: "다시 병원이다. 길은 이제 익숙하지만, 익숙하다는 게 안전하다는 뜻은 아니었다.", if: "S.flags.hosp_visits >= 2" },
      { t: "창가에 서서 큰길 쪽을 내다봤다. 버스 정류장 근처에 느릿하게 움직이는 점이 몇 개 보였다." },
      { s: "sib", t: "병원 가는 거야? 거기 제일 위험하다던데. 아픈 사람들이 다 거기 모였었잖아.", if: "!S.flags.sib_sick" },
      { s: "sib", t: "…나 때문에 가는 거지. 괜찮아. 걸을 수 있어.", if: "S.flags.sib_sick && S.sib >= 30" },
      { s: "sib", t: "…나, 못 걷겠어. 다리가 솜 같아.", if: "S.flags.sib_sick && S.sib < 30" },
      { s: "me", t: "약이 필요해. 해열제도, 붕대도, 전부 다." },
      { s: "sib", t: "같이 갈래. 혼자 있으면 더 무서워.", if: "S.trust >= 50" },
      { s: "sib", t: "…난 안 가면 안 돼? 솔직히 여기 혼자 있는 게 나아.", if: "S.trust < 50" },
      { t: "마스크를 챙겼다. 숨이 답답하겠지만 없는 것보단 나을 것이다.", if: "has('마스크')" },
      { t: "마스크가 없다. 목도리로 입을 가리기로 했다.", if: "!has('마스크')" },
    ],
    choices: [
      { t: "{{sib}}와 함께 간다", go: "hosp_road", if: "S.flags.hosp_visits <= 1 && (!S.flags.sib_sick || S.sib >= 30)", set: { "flags.hosp_sib_along": true }, fx: { trust: 3 } },
      { t: "[유대 60↑] 업고라도 데려간다", go: "hosp_road", if: "S.flags.hosp_visits <= 1 && S.flags.sib_sick && S.sib < 30 && S.trust >= 60", set: { "flags.hosp_sib_along": true, "flags.hosp_carry": true }, fx: { trust: 5, hp: -3 } },
      { t: "{{sib}}는 집에 두고 혼자 간다", go: "hosp_road", if: "S.flags.hosp_visits <= 1", set: { "flags.hosp_sib_along": false }, fx: { trust: -3 } },
      { t: "{{sib}}와 함께 다시 간다", go: "hosp_revisit", if: "S.flags.hosp_visits >= 2 && (!S.flags.sib_sick || S.sib >= 30)", set: { "flags.hosp_sib_along": true }, fx: { trust: 2 } },
      { t: "[유대 60↑] 업고라도 데려간다", go: "hosp_revisit", if: "S.flags.hosp_visits >= 2 && S.flags.sib_sick && S.sib < 30 && S.trust >= 60", set: { "flags.hosp_sib_along": true, "flags.hosp_carry": true }, fx: { trust: 5, hp: -3 } },
      { t: "혼자 다시 간다", go: "hosp_revisit", if: "S.flags.hosp_visits >= 2", set: { "flags.hosp_sib_along": false } },
    ],
  },

  hosp_road: {
    bg: "street",
    lines: [
      { t: "아파트 단지를 벗어나 큰길로 나섰다. 왕복 8차선 도로에 차 한 대 서 있지 않았다. 정확히는, 서 있는 차는 많은데 움직이는 차가 없었다." },
      { t: "{{sib}}가 내 소매를 잡고 걸었다. 평소라면 창피하다고 뿌리쳤을 텐데.", if: "S.flags.hosp_sib_along && !S.flags.hosp_carry" },
      { t: "{{sib}}를 등에 업었다. 생각보다 가벼웠다. 그게 더 무서웠다.", if: "S.flags.hosp_carry" },
      { t: "혼자 걷는 큰길은 유난히 넓었다. 뒤를 돌아보면 아파트 창문 하나가 우리 집이라는 걸 안다. 거기서 {{sib}}가 보고 있을까.", if: "!S.flags.hosp_sib_along" },
      { t: "자전거를 끌고 나왔다. 큰길을 질주하면 10분이면 닿을 것이다. 대신 소리가 난다.", if: "has('자전거')" },
      { s: "sib", t: "야, 저기. 정류장. 세 명… 아니 네 명.", if: "S.flags.hosp_sib_along" },
      { t: "버스 정류장 유리 부스 안팎으로, 회색인 넷이 서 있었다. 버스를 기다리듯이. 3주째 오지 않는 버스를." },
      { s: "me", t: "길은 두 개야. 건널목으로 바로 가거나, 골목으로 돌아가거나." },
    ],
    choices: [
      { t: "건널목으로 간다 (빠르지만 정류장 옆)", go: "hosp_crosswalk" },
      { t: "상가 뒷골목으로 돌아간다 (느리지만 멀리)", go: "hosp_alley" },
      { t: "[아이템: 자전거] 큰길을 자전거로 질주한다", go: "hosp_bike", if: "has('자전거')" },
    ],
  },

  hosp_crosswalk: {
    bg: "street",
    lines: [
      { t: "신호등은 꺼져 있었다. 횡단보도의 흰 줄 위에 누군가의 운동화 한 짝이 놓여 있었다." },
      { t: "정류장까지 20미터. 회색인들은 고개를 숙인 채 미동도 없었다. 소리만 내지 않으면." },
      { s: "sib", t: "(속삭이며) 숨 쉬는 것도 들리는 거 아냐?", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "(속삭이며) 그 정도는 아냐. 발소리만 조심해." },
      { t: "손전등이 주머니에서 묵직하게 느껴졌다. 빛을 비추면 잠깐 멈칫한다고 했다. 잠깐.", if: "has('손전등')" },
    ],
    choices: [
      { t: "조용히, 천천히 지나간다", go: "hosp_busstop_sneak" },
      { t: "[아이템: 손전등] 빛을 비추며 지나간다", go: "hosp_busstop_light", if: "has('손전등')" },
      { t: "그냥 뛴다", go: "hosp_busstop_run" },
    ],
  },

  hosp_busstop_sneak: {
    bg: "street",
    lines: [
      { t: "한 걸음. 또 한 걸음. 아스팔트 위 유리 조각을 피해 발을 디뎠다." },
      { t: "회색인 하나가 고개를 들었다. 눈이 우리 쪽을 향했지만, 초점은 없었다. 다시 고개가 떨어졌다." },
      { t: "{{sib}}의 손이 내 소매를 찢을 듯이 쥐고 있었다.", if: "S.flags.hosp_sib_along" },
      { t: "{{sib}}가 입을 틀어막았다. 기침이 올라오는 게 어깨 떨림으로 느껴졌다.", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
      { t: "정류장을 지났다. 등 뒤로 유리 부스가 멀어졌다.", if: "!(S.flags.hosp_sib_along && S.flags.sib_sick)" },
    ],
    choices: [
      { t: "그대로 병원으로", go: "hosp_gate", if: "!(S.flags.hosp_sib_along && S.flags.sib_sick)", fx: { mind: -3 } },
      { t: "{{sib}}의 입을 막고 뛴다", go: "hosp_busstop_run", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
      { t: "그 자리에 얼어붙은 채 기침이 지나가길 기다린다", go: "hosp_busstop_freeze", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
    ],
  },

  hosp_busstop_freeze: {
    bg: "street",
    fx: { mind: -8 },
    lines: [
      { t: "{{sib}}가 결국 기침을 뱉었다. 작게, 그러나 텅 빈 거리에선 총성처럼." },
      { t: "넷이 동시에 고개를 들었다. 우리를 봤다. 분명히 봤다." },
      { t: "그런데 움직이지 않았다. 한참을. 그러다 하나씩, 다시 고개를 떨궜다." },
      { s: "sib", t: "…뭐야. 왜 안 와?" },
      { s: "me", t: "몰라. 가자. 지금." },
      { t: "나중에 서 간호사에게 듣기로, 회색인은 멈춰 있는 것을 사물로 본다고 했다. 우리는 운이 좋았다." },
    ],
    next: "hosp_gate",
  },

  hosp_busstop_light: {
    bg: "street",
    lines: [
      { t: "손전등을 켜고 정류장을 정면으로 비췄다. 회색인들이 동시에 멈칫했다. 빛 속에서 그들의 피부는 젖은 시멘트 색이었다." },
      { t: "건전지가 넉넉해서 빛이 선명했다. 그들은 눈을 가리듯 고개를 돌렸다.", if: "has('건전지')" },
      { t: "빛이 깜빡였다. 건전지가 다 돼 간다. 서둘러야 했다.", if: "!has('건전지')" },
      { s: "sib", t: "진짜 멈추네. 야, 이거 되게… 슬프다.", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "보지 마. 앞만 봐." },
      { t: "빛을 비춘 채 뒷걸음질로 정류장을 지났다. 빛을 끄자 그들은 다시 버스를 기다렸다." },
    ],
    next: "hosp_gate",
  },

  hosp_busstop_run: {
    bg: "street",
    fx: { hp: -3 },
    lines: [
      { t: "뛰었다. 발소리가 빈 도로에 울렸다. 뒤에서 뭔가가 몸을 트는 소리." },
      { t: "회색인은 빠르지 않다. 하지만 멈추지도 않는다. 뒤돌아보니 넷이 모두 이쪽으로 걸어오고 있었다." },
      { t: "{{sib}}가 보도블록에 걸려 넘어졌다. 무릎에서 피가 났다.", if: "S.flags.hosp_sib_along && !S.flags.hosp_carry" },
      { t: "등에 업힌 {{sib}}가 뒤를 보며 울먹였다. 다리가 후들거렸다.", if: "S.flags.hosp_carry" },
      { t: "혼자라 다행이었다. 숨이 턱에 찼지만 병원 간판이 보였다.", if: "!S.flags.hosp_sib_along" },
    ],
    choices: [
      { t: "돌아가서 {{sib}}를 일으켜 세운다", go: "hosp_gate", if: "S.flags.hosp_sib_along && !S.flags.hosp_carry", fx: { trust: 8, hp: -3 } },
      { t: "먼저 뛰고, 뒤에서 오라고 소리친다", go: "hosp_sib_grabbed", if: "S.flags.hosp_sib_along && !S.flags.hosp_carry", fx: { trust: -15 } },
      { t: "이를 악물고 계속 달린다", go: "hosp_gate", if: "!S.flags.hosp_sib_along || S.flags.hosp_carry", fx: { hp: -3 } },
    ],
  },

  hosp_sib_grabbed: {
    bg: "street",
    lines: [
      { t: "{{sib}}가 일어나는 사이, 가장 앞선 회색인이 {{sib}}의 패딩 모자를 움켜쥐었다." },
      { s: "sib", t: "야!! 야, {{me}}!!" },
      { t: "돌아섰다. 심장이 목구멍까지 올라왔다." },
    ],
    choices: [
      { t: "[아이템: 야구방망이] 휘두른다", go: "hosp_gate", if: "has('야구방망이')", fx: { trust: 5, mind: -5 }, set: { "flags.hosp_swung_bat": true } },
      { t: "[아이템: 식칼] 팔을 긋는다", go: "hosp_gate", if: "has('식칼')", fx: { trust: 3, mind: -10 } },
      { t: "패딩을 벗겨서 빠져나오게 한다", go: "hosp_gate", fx: { trust: 2, sib: -5 }, item: ["-담요"] },
      { t: "맨손으로 밀친다", go: "hosp_grab_bite", fx: { hp: -5 } },
    ],
  },

  hosp_grab_bite: {
    bg: "street",
    set: { "flags.sib_bitten": true },
    lines: [
      { t: "회색인의 어깨를 밀쳤다. 밀려나면서, 그 손이 {{sib}}의 손목을 긁었다. 아니, 이빨이었다." },
      { s: "sib", t: "…아. 아, 아파. {{me}}, 이거—" },
      { t: "{{sib}}의 손목에 반달 모양의 자국이 났다. 피가 맺혔다." },
      { s: "me", t: "괜찮아. 긁힌 거야. 괜찮아. 가자." },
      { t: "괜찮지 않다는 걸 둘 다 알았다. 48시간. 소문이 맞다면 그 안에 항생제 키트를 써야 한다." },
    ],
    next: "hosp_gate",
  },

  hosp_alley: {
    bg: "street",
    fx: { hp: -2 },
    set: { "flags.hosp_gang_seen": true },
    lines: [
      { t: "상가 뒷골목으로 들어섰다. 음식물 쓰레기 냄새가 3주째 썩고 있었다." },
      { t: "골목은 길었다. 담장을 하나 넘고, 주차된 트럭 밑을 기어서 지났다." },
      { t: "{{sib}}가 트럭 밑에서 손바닥을 긁혔지만 소리는 내지 않았다.", if: "S.flags.hosp_sib_along" },
      { t: "그때, 오토바이 소리. 셋, 아니 넷. 큰길 쪽에서 병원 방향으로 요란하게 지나갔다." },
      { s: "sib", t: "저 사람들 뭐야? 아직 기름이 있어?", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "병원 쪽이야. 우리랑 목적지가 같아." },
      { t: "회색인들이 오토바이 소리를 따라 큰길로 몰려가는 게 보였다. 덕분에 골목은 비었다. 덕분에, 병원엔 그들이 먼저 도착할 것이다." },
    ],
    next: "hosp_gate",
  },

  hosp_bike: {
    bg: "street",
    lines: [
      { t: "자전거에 올랐다. {{sib}}가 뒷자리에 매달려 내 허리를 꽉 잡았다.", if: "S.flags.hosp_sib_along" },
      { t: "페달을 밟았다. 바람이 귀를 때렸다. 3주 만에 느끼는 속도였다.", if: "!S.flags.hosp_sib_along" },
      { t: "정류장의 회색인들이 고개를 들었지만, 우리는 이미 50미터 앞이었다." },
      { s: "sib", t: "야!! 이거 진짜… 진짜 좋다!! 아 미쳤다!!", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "조용히 해!!" },
      { t: "병원 사거리에서 회색인 하나가 도로 한가운데 서 있었다. 핸들을 꺾었다. 어깨가 스쳤다. 넘어지지 않았다." },
      { t: "10분. 병원 정문이었다. 자전거는 응급실 옆 자전거 거치대에 묶었다. 이상하게 그 행동이 가장 일상 같았다." },
    ],
    next: "hosp_gate",
    fx: { mind: 3 },
  },

  // ===== 병원 입구 =====
  hosp_gate: {
    bg: "hosp",
    lines: [
      { t: "대학병원. 응급실 입구는 병원 침대와 수액 걸이, 뒤집힌 휠체어로 바리케이드가 쳐져 있었다. 안쪽에서 막은 것이다." },
      { t: "유리문에 빨간 스프레이로 쓰여 있었다. 「감염 의심자 출입금지 — 2층 내과병동 폐쇄」" },
      { s: "sib", t: "…우리도 감염 의심자 아냐?", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
      { s: "me", t: "아직은 아니야.", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
      { t: "주차장 쪽에 오토바이 네 대가 비스듬히 세워져 있었다. 엔진이 아직 식지 않은 듯 아지랑이가 올라왔다.", if: "S.flags.hosp_gang_seen" },
      { t: "주차장은 텅 비어 있었다. 구석에 구급차 한 대가 뒷문을 연 채 서 있는 게 보였다." },
    ],
    choices: [
      { t: "바리케이드를 넘어 응급실로 들어간다", go: "hosp_er" },
      { t: "주차장 뒤편, 구급차 쪽으로 돌아간다", go: "hosp_parking" },
      { t: "오토바이 주인들이 보이지 않을 때까지 숨어서 지켜본다", go: "hosp_hide_gate", if: "S.flags.hosp_gang_seen" },
    ],
  },

  hosp_hide_gate: {
    bg: "hosp",
    set: { "flags.hosp_gang_inside": true },
    lines: [
      { t: "기둥 뒤에 몸을 붙였다. {{sib}}를 안쪽으로 밀어 넣었다.", if: "S.flags.hosp_sib_along" },
      { t: "응급실 바리케이드 틈으로 헬멧 넷이 보였다. 셋은 안으로, 하나는 입구를 지켰다." },
      { s: "깍지 패거리", t: "약제실 2층이랬지? 파란 상자. 파란 거만 챙기면 돼. 나머진 다 쓰레기야." },
      { s: "깍지 패거리", t: "형, 근데 2층 병동이 감염자 천지라는데." },
      { s: "깍지 패거리", t: "그러니까 조용히 하라고, 새꺄." },
      { t: "파란 상자. 그게 뭔지 몰랐지만, 저들이 기름까지 써 가며 찾는 거라면 우리에게도 필요한 것이다." },
      { s: "sib", t: "(속삭이며) 저 사람들 먼저 가져가면 어떡해?", if: "S.flags.hosp_sib_along" },
    ],
    choices: [
      { t: "그들 뒤를 따라 조용히 들어간다", go: "hosp_lobby", fx: { mind: -3 } },
      { t: "반대편 주차장으로 돌아서 들어간다", go: "hosp_parking" },
    ],
  },

  hosp_parking: {
    bg: "hosp",
    set: { "flags.hosp_ambulance": true },
    lines: [
      { t: "주차장 뒤편. 구급차가 비스듬히 서 있었다. 뒷문이 열려 있고, 들것은 비어 있었다. 핏자국은 있었지만 오래된 것이었다." },
      { t: "운전석 문을 열었다. 키는 꽂혀 있지 않았다. 계기판 연료 바늘은 반쯤." },
      { s: "sib", t: "이거 움직이면 우리 탈출할 수 있는 거 아냐? 병원 차는 군인들이 세워도 통과시켜 주잖아.", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "키가 있어야지." },
      { t: "열쇠꾸러미를 꺼냈다. 주민센터에서 가져온 꾸러미에 차 키 모양이 하나 섞여 있었다.", if: "has('열쇠꾸러미')" },
      { t: "구급차를 기억해 두기로 했다. 열쇠만 있으면, 어쩌면." , if: "!has('열쇠꾸러미')" },
    ],
    choices: [
      { t: "[아이템: 열쇠꾸러미] 키를 꽂아 본다", go: "hosp_ambulance_key", if: "has('열쇠꾸러미')" },
      { t: "구급차 안을 뒤진다", go: "hosp_ambulance_search" },
      { t: "후문으로 병원에 들어간다", go: "hosp_backdoor" },
    ],
  },

  hosp_ambulance_key: {
    bg: "hosp",
    set: { "flags.hosp_ambulance_works": true },
    lines: [
      { t: "세 번째 키였다. 돌리자 계기판에 불이 들어왔다. 시동을 걸지는 않았다. 소리가 나면 끝이니까." },
      { s: "sib", t: "…야. 야. 됐어. 되는 거야 이거?", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "연료가 반. 외곽 봉쇄선까지는 갈 수 있을 거야. 거기서 어떻게 될지는 모르지만." },
      { t: "키를 뽑아 주머니 깊숙이 넣었다. 선택지가 하나 생겼다. 그것만으로 숨이 조금 쉬어졌다." },
    ],
    choices: [
      { t: "구급차 안을 마저 뒤진다", go: "hosp_ambulance_search" },
      { t: "후문으로 병원에 들어간다", go: "hosp_backdoor" },
    ],
    fx: { mind: 5 },
  },

  hosp_ambulance_search: {
    bg: "hosp",
    fx: { meds: 1 },
    item: ["구급상자"],
    lines: [
      { t: "구급차 뒤칸. 서랍을 열었다. 거즈, 붕대, 생리식염수. 해열제 한 통. 주사기는 손대지 않았다." },
      { t: "구급상자 하나를 통째로 챙겼다. 묵직했다." },
      { s: "sib", t: "이거면 됐네. 집에 가자.", if: "S.flags.hosp_sib_along && !S.flags.sib_sick" },
      { s: "sib", t: "…이걸로는 안 되는 거지. 내 거. 열 내리는 약 말고 다른 거.", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
      { s: "me", t: "안에 들어가 봐야 돼. 진짜 약은 약제실에 있어." },
    ],
    next: "hosp_backdoor",
  },

  hosp_backdoor: {
    bg: "hosp",
    lines: [
      { t: "직원 전용 후문. 잠겨 있지 않았다. 누군가 급히 나오면서 닫지 않은 것이다." },
      { t: "복도는 완전한 어둠이었다. 비상등마저 꺼져 있었다." },
      { t: "손전등을 켰다. 벽에 「약제실 ↑ 2F」 화살표가 떠올랐다.", if: "has('손전등')" },
      { t: "손전등이 없었다. 벽을 더듬으며 걸었다. 벽은 축축했다.", if: "!has('손전등')" },
      { t: "{{sib}}가 뒤에서 내 패딩 끈을 잡았다. 줄넘기 하듯.", if: "S.flags.hosp_sib_along" },
      { t: "멀리서 뭔가가 끌리는 소리. 천천히. 규칙적으로." },
    ],
    next: "hosp_lobby",
    fx: { mind: -3 },
  },

  hosp_er: {
    bg: "hosp",
    fx: { mind: -5 },
    lines: [
      { t: "침대를 타고 넘었다. 응급실 안은 전쟁 뒤의 야전병원 같았다. 커튼이 찢겨 있고, 수액이 바닥에 흥건했다." },
      { t: "침대마다 사람이 누워 있던 자국. 사람은 없었다. 어디로 갔는지는 생각하지 않기로 했다." },
      { s: "sib", t: "…여기 우리 반 애 아빠가 일했는데. 응급실 의사.", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "그래?", if: "S.flags.hosp_sib_along" },
      { s: "sib", t: "응. 걔 전학 갔어, 사태 터지기 전에. 다행이지.", if: "S.flags.hosp_sib_along" },
      { t: "응급실 안쪽 자동문은 전원이 나가 반쯤 열린 채 멈춰 있었다. 그 틈으로 로비의 어둠이 흘러나왔다." },
    ],
    next: "hosp_lobby",
  },

  hosp_lobby: {
    bg: "hosp",
    lines: [
      { t: "로비. 천장이 높아서 발소리가 세 번씩 울렸다. 안내데스크 위 모니터는 검은 거울이었다." },
      { t: "엘리베이터 넷. 전부 멈춤. 계단 표지판의 야광 페인트만 희미하게 빛났다." },
      { t: "위층에서 발소리와 낮은 웃음소리. 오토바이 패거리가 2층에 있다.", if: "S.flags.hosp_gang_inside" },
      { t: "복도 끝, 간호사실 쪽에서 희미한 불빛이 새어 나왔다. 랜턴 불빛. 전기 불빛이 아니었다. 누군가 있다." },
      { s: "sib", t: "사람이야? 아니면…", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "회색인은 불을 안 켜." },
    ],
    choices: [
      { t: "불빛 쪽, 간호사실로 간다", go: "hosp_station" },
      { t: "바로 계단으로 2층 약제실에 간다", go: "hosp_stairs" },
    ],
  },

  // ===== 서은혜 간호사 =====
  hosp_station: {
    bg: "hosp",
    lines: [
      { t: "간호사실. 랜턴 하나, 캠핑용 버너 하나, 그리고 가위를 거꾸로 쥔 여자가 서 있었다. 간호복 위에 패딩을 걸치고." },
      { s: "서은혜 간호사", t: "거기 서세요. 한 발짝만 더 오면 찌릅니다. 농담 아니에요." },
      { t: "가위 든 손이 떨리지 않았다. 3주를 혼자 버틴 손이었다." },
      { s: "서은혜 간호사", t: "열 있어요? 둘 다 이마 보여 봐요. 멀리서." },
      { t: "{{sib}}의 이마는 랜턴 빛 아래서도 붉었다.", if: "S.flags.hosp_sib_along && S.flags.sib_sick" },
      { s: "sib", t: "(작게) 야, 저 사람 진짜 간호사야? 명찰 있어.", if: "S.flags.hosp_sib_along" },
    ],
    choices: [
      { t: "손을 들고 '환자 가족입니다'라고 말한다", go: "hosp_nurse_talk" },
      { t: "'동생이 아파요. 열이 안 내려요.'", go: "hosp_nurse_sick", if: "S.flags.sib_sick" },
      { t: "[아이템: 식칼/야구방망이] 무기를 보여 주며 약 위치를 묻는다", go: "hosp_nurse_threat", if: "has('식칼') || has('야구방망이')" },
      { t: "대꾸하지 않고 계단으로 간다", go: "hosp_stairs", fx: { mind: -2 } },
    ],
  },

  hosp_nurse_talk: {
    bg: "hosp",
    set: { "flags.hosp_nurse_ally": true },
    lines: [
      { s: "me", t: "환자 가족이에요. 동탄 주민센터 옆 아파트에서 왔어요. 둘뿐이에요." },
      { s: "서은혜 간호사", t: "…둘뿐." },
      { t: "가위가 내려갔다. 그녀는 의자에 무너지듯 앉았다." },
      { s: "서은혜 간호사", t: "서은혜예요. 내과병동. 2주 전에 다들 철수할 때 남았어요. 못 움직이는 환자가 셋 있었거든요. 지금은 둘." },
      { s: "sib", t: "…저기, 혹시 회색열 걸리면 진짜 못 고쳐요?", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "고열 단계면 막을 수 있어요. 항생제 고용량이랑 해열제를 같이. 병원에 비축 키트가 있어요. 파란 상자. 약제실 안쪽, 냉장고 옆 '비축 2호' 선반." },
      { s: "서은혜 간호사", t: "약제실은 카드키로 잠겨 있어요. 내가 갖고 있고요. …근데 오늘 오토바이 소리를 들었어요. 그 사람들이 먼저 올라갔을 수도 있어요.", if: "S.flags.hosp_gang_seen" },
      { s: "서은혜 간호사", t: "약제실은 카드키로 잠겨 있어요. 내가 갖고 있고요. 쪽문은 비밀번호예요. 0921. 개원일." },
    ],
    choices: [
      { t: "'같이 가 주세요.'", go: "hosp_pharm_with_nurse", fx: { trust: 2 } },
      { t: "'혼자 가 볼게요. 환자분들 곁에 계세요.'", go: "hosp_stairs", set: { "flags.hosp_nurse_told": true }, fx: { mind: 2 } },
    ],
  },

  hosp_nurse_sick: {
    bg: "hosp",
    set: { "flags.hosp_nurse_ally": true },
    fx: { meds: 1, sib: 5 },
    lines: [
      { s: "me", t: "동생이 아파요. 사흘째 열이 안 내려요. 피부는… 아직 괜찮아요." },
      { t: "그녀의 눈이 {{sib}}에게 갔다. 가위가 책상에 놓였다. 손이 {{sib}}의 이마로, 목 옆으로 갔다. 익숙한 손이었다.", if: "S.flags.hosp_sib_along" },
      { t: "그녀는 내 말을 한참 듣더니, 증상을 하나하나 다시 물었다. 열, 기침, 피부 색, 눈 흰자.", if: "!S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "고열 단계예요. 아직 늦지 않았어요. 해열제는 이거 드리고—" },
      { t: "그녀가 서랍에서 약통을 꺼내 건넸다." },
      { s: "서은혜 간호사", t: "진짜 필요한 건 파란 상자예요. 항생제 비축 키트. 약제실 안쪽 냉장고 옆 '비축 2호'. 사흘치 한 세트. 그걸 다 써야 막혀요." },
      { s: "sib", t: "…막히는 거 맞죠? 확실해요?", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "내가 본 열한 명 중 여덟 명은 막혔어요. 확실하다는 말은 못 해요. 그래도 안 쓰는 것보단." },
      { s: "서은혜 간호사", t: "오토바이 소리 들었어요. 그 사람들이 그걸 노리는 거면, 서둘러야 해요.", if: "S.flags.hosp_gang_seen" },
      { s: "서은혜 간호사", t: "카드키는 내게 있어요. 쪽문 비밀번호는 0921." },
    ],
    choices: [
      { t: "'같이 가 주세요. 부탁드려요.'", go: "hosp_pharm_with_nurse", fx: { trust: 3 } },
      { t: "'제가 다녀올게요. {{sib}}를 봐 주세요.'", go: "hosp_stairs", if: "S.flags.hosp_sib_along", set: { "flags.hosp_nurse_told": true, "flags.hosp_sib_with_nurse": true } },
      { t: "'제가 다녀올게요.'", go: "hosp_stairs", if: "!S.flags.hosp_sib_along", set: { "flags.hosp_nurse_told": true } },
    ],
  },

  hosp_nurse_threat: {
    bg: "hosp",
    set: { "flags.hosp_nurse_hostile": true },
    fx: { mind: -5 },
    lines: [
      { t: "무기를 들어 보였다. 내 손이 아닌 것 같았다." },
      { s: "me", t: "약. 어디 있어요. 그것만 말하면 바로 갈게요." },
      { t: "그녀의 얼굴에서 뭔가가 꺼졌다. 두려움이 아니라, 기대 같은 것이." },
      { s: "서은혜 간호사", t: "…2층. 약제실. 잠겨 있어요. 알아서 하세요." },
      { s: "sib", t: "야. 야, 뭐 하는 거야. 저 사람 그냥 간호사잖아.", if: "S.flags.hosp_sib_along" },
      { t: "{{sib}}가 내 팔을 잡아 내렸다. 그 손이 떨리고 있었다. 나 때문에.", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "가세요. 그리고 다시는 오지 마세요." },
    ],
    choices: [
      { t: "사과하고 돌아선다", go: "hosp_stairs", fx: { trust: 3, mind: 2 }, set: { "flags.hosp_nurse_hostile": false, "flags.hosp_nurse_apology": true } },
      { t: "말없이 계단으로 간다", go: "hosp_stairs", fx: { trust: -10 } },
    ],
  },

  // ===== 2층 =====
  hosp_stairs: {
    bg: "hosp",
    lines: [
      { t: "비상계단. 손잡이가 차가웠다. 층계참마다 누군가 두고 간 물건들. 슬리퍼, 링거 백, 아이 신발." },
      { t: "2층 복도. 왼쪽 표지판 「약제실」. 오른쪽 「내과병동 — 출입금지」라고 쓴 종이가 테이프로 붙어 있고, 그 너머에서 느린 발소리들." },
      { t: "약제실 쪽에서 쇠 부딪히는 소리와 낮은 말소리. 그들이다.", if: "S.flags.hosp_gang_inside" },
      { t: "{{sib}}는 간호사실에 남았다. 혼자 걷는 복도가 유난히 길었다.", if: "S.flags.hosp_sib_with_nurse" },
      { t: "병동 쪽 복도는 약제실로 가는 지름길이기도 했다. 표지판 너머로, 한 번에 갈 수 있다. 조용하기만 하면." },
    ],
    choices: [
      { t: "약제실로 간다", go: "hosp_pharm_gang", if: "S.flags.hosp_gang_inside" },
      { t: "약제실로 간다", go: "hosp_pharm_door", if: "!S.flags.hosp_gang_inside" },
      { t: "내과병동을 가로지르는 지름길로 간다 (위험)", go: "hosp_ward" },
    ],
  },

  hosp_ward: {
    bg: "hosp",
    lines: [
      { t: "종이를 떼고 병동 문을 밀었다. 소독약 냄새 밑으로 다른 냄새가 깔려 있었다." },
      { t: "복도 양옆 병실. 열린 문 안에 환자복을 입은 회색인들이 침대에 걸터앉아 있었다. 앉은 채로. 아무도 눕지 않았다." },
      { t: "복도 한가운데 하나가 서 있었다. 링거 폴대를 아직 잡고. 바늘은 팔에서 빠져 덜렁거렸다." },
      { s: "sib", t: "(숨소리만)", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "{{sib}}의 기침이 목 안에서 끓는 게 들렸다. 참고 있다. 얼마나 참을 수 있을까.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse && S.flags.sib_sick" },
    ],
    choices: [
      { t: "숨을 참고 벽에 붙어 천천히 지나간다", go: "hosp_ward_pass", fx: { mind: -10 } },
      { t: "[아이템: 손전등] 불을 끄고, 벽을 더듬으며 간다", go: "hosp_ward_pass", if: "has('손전등')", fx: { mind: -6 } },
      { t: "한 번에 뛰어서 가로지른다", go: "hosp_ward_run" },
    ],
  },

  hosp_ward_pass: {
    bg: "hosp",
    lines: [
      { t: "벽에 등을 붙이고 게걸음으로. 폴대를 잡은 회색인의 옆을 30센티 거리로 지났다. 그 숨소리가 들렸다. 쇳소리 같은." },
      { t: "병실 안의 하나가 천천히 고개를 돌렸다. 우리를 봤다. 그리고 다시 창문을 봤다. 창밖에는 아무것도 없었다." },
      { t: "복도 끝 문. 밀었다. 열렸다. 닫았다. 등을 기대고 무릎이 꺾였다." },
      { s: "sib", t: "…나 오줌 쌀 뻔했어.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { s: "me", t: "나도.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "약제실 문이 바로 앞이었다." },
    ],
    next: "hosp_pharm_door",
  },

  hosp_ward_run: {
    bg: "hosp",
    fx: { hp: -3, mind: -8 },
    lines: [
      { t: "뛰었다. 첫 발소리에 병실의 머리들이 일제히 돌아갔다. 둘째 발소리에 침대에서 일어났다." },
      { t: "폴대를 잡은 회색인이 팔을 뻗었다. 폴대가 쓰러지며 쇳소리가 복도를 찢었다." },
      { t: "뒤에서 손이 내 패딩을 잡았다. 질척한 손.", if: "!S.flags.hosp_sib_along || S.flags.hosp_sib_with_nurse" },
      { t: "뒤에서 손이 {{sib}}의 가방끈을 잡았다. {{sib}}가 비명도 못 지르고 끌려갔다.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
    ],
    choices: [
      { t: "[아이템: 야구방망이] 돌아서서 휘두른다", go: "hosp_pharm_door", if: "has('야구방망이')", fx: { hp: -3, mind: -5 } },
      { t: "[아이템: 식칼] 잡은 팔을 찌른다", go: "hosp_pharm_door", if: "has('식칼')", fx: { hp: -5, mind: -8 } },
      { t: "가방끈을 끊어 버리고 {{sib}}를 끌어낸다", go: "hosp_pharm_door", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse", fx: { trust: 6, hp: -3 }, item: ["-초코바"] },
      { t: "{{sib}}가 먼저 팔꿈치로 밀쳐낸다", go: "hosp_sib_bitten", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "맨손으로 떨쳐낸다", go: "hosp_bitten_me", if: "!S.flags.hosp_sib_along || S.flags.hosp_sib_with_nurse" },
    ],
  },

  hosp_sib_bitten: {
    bg: "hosp",
    set: { "flags.sib_bitten": true },
    fx: { sib: -8, trust: 5 },
    lines: [
      { t: "{{sib}}가 팔꿈치로 회색인의 턱을 쳤다. 놀랍도록 정확하게. 체육 시간에 배운 게 있다며 자랑하던 동작." },
      { t: "회색인이 비틀거리며 놓았다. 그런데 {{sib}}의 팔뚝에, 소매가 찢긴 자리에, 붉은 반달이 찍혀 있었다." },
      { s: "sib", t: "…괜찮아. 괜찮아. 안 아파. 진짜." },
      { s: "me", t: "안 아프면 더 이상해." },
      { t: "문을 닫고 등을 기댔다. {{sib}}가 팔을 감췄다. 48시간. 파란 상자. 머릿속에 그 두 단어만 남았다." },
    ],
    next: "hosp_pharm_door",
  },

  hosp_bitten_me: {
    bg: "hosp",
    set: { "flags.me_bitten": true },
    fx: { hp: -9, mind: -10 },
    lines: [
      { t: "팔을 휘둘러 떨쳐냈다. 떨쳐지면서, 뭔가가 손등을 스쳤다. 뜨거웠다." },
      { t: "문을 닫고 손을 봤다. 손등에 이빨 자국. 깊지 않았다. 깊지 않다는 게 무슨 의미가 있는지는 몰랐다." },
      { t: "소매를 내려 가렸다. {{sib}}에게는 말하지 않기로 했다. 아직은." },
      { t: "48시간. 파란 상자. 이제 그건 {{sib}}만을 위한 게 아니었다." },
    ],
    next: "hosp_pharm_door",
  },

  hosp_pharm_door: {
    bg: "hosp",
    lines: [
      { t: "약제실. 철문에 카드 리더기, 그 옆에 번호 키패드가 달린 쪽문. 둘 다 잠겨 있었다." },
      { t: "문에는 긁힌 자국이 있었다. 누군가 벌써 열려고 했던 흔적. 열지는 못한 흔적." },
      { t: "서 간호사가 말한 번호가 떠올랐다. 0921.", if: "S.flags.hosp_nurse_told" },
      { t: "열쇠꾸러미를 꺼냈다. 주민센터 창고 열쇠 사이에 '약제실 마스터'라는 라벨이 붙은 게 있었다. 재난 대비 협약, 뭐 그런 것이었겠지.", if: "has('열쇠꾸러미')" },
      { s: "sib", t: "부수면 소리 나. 저쪽 병동에 다 들려.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
    ],
    choices: [
      { t: "[간호사 정보] 쪽문에 0921을 누른다", go: "hosp_pharm_in", if: "S.flags.hosp_nurse_told" },
      { t: "[아이템: 열쇠꾸러미] 마스터키로 연다", go: "hosp_pharm_in", if: "has('열쇠꾸러미')" },
      { t: "[아이템: 야구방망이] 키패드를 부순다", go: "hosp_pharm_break", if: "has('야구방망이')" },
      { t: "어깨로 쪽문을 들이받는다", go: "hosp_pharm_break", fx: { hp: -3 } },
      { t: "포기하고 돌아간다", go: "hosp_leave_empty" },
    ],
  },

  hosp_pharm_break: {
    bg: "hosp",
    lines: [
      { t: "쾅. 쾅. 세 번째에 쪽문 경첩이 비명을 지르며 휘었다. 병원 전체가 그 소리를 들었을 것이다." },
      { t: "복도 끝, 병동 문이 흔들렸다. 종이가 찢어지며 문이 열렸다. 환자복 둘이 걸어 나왔다." },
      { s: "sib", t: "온다. 온다, 온다, {{me}}—", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
    ],
    choices: [
      { t: "안으로 들어가 선반으로 문을 막는다", go: "hosp_pharm_in", fx: { hp: -3 }, set: { "flags.hosp_door_blocked": true } },
      { t: "복도에서 맞선다", go: "hosp_fight_corridor" },
    ],
  },

  hosp_fight_corridor: {
    bg: "hosp",
    fx: { mind: -10 },
    lines: [
      { t: "둘. 느리지만 멈추지 않는다. 복도는 좁았다. 한 번에 하나씩이다." },
      { t: "야구방망이의 무게가 손에 익었다. 익어서는 안 되는 것이.", if: "has('야구방망이')" },
      { t: "식칼. 식탁에서 사과를 깎던 칼. 손잡이가 땀으로 미끄러웠다.", if: "has('식칼') && !has('야구방망이')" },
      { t: "손에 든 게 없었다. 복도의 소화기가 보였다.", if: "!has('식칼') && !has('야구방망이')" },
    ],
    choices: [
      { t: "[아이템: 야구방망이] 무릎을 노린다", go: "hosp_pharm_in", if: "has('야구방망이')", fx: { hp: -5 } },
      { t: "[아이템: 식칼] 가까이 오게 두고 찌른다", go: "hosp_pharm_in", if: "has('식칼')", fx: { hp: -7 } },
      { t: "소화기로 밀어내며 들어간다", go: "hosp_pharm_in", fx: { hp: -9 } },
      { t: "맨손으로 붙잡고 밀친다", go: "hosp_bitten_me2" },
    ],
  },

  hosp_bitten_me2: {
    bg: "hosp",
    set: { "flags.me_bitten": true },
    fx: { hp: -12, mind: -10 },
    lines: [
      { t: "첫째를 밀쳤다. 둘째가 내 팔을 잡았다. 그리고 이빨이." },
      { t: "비명이 나왔다. 발로 차서 떨어뜨리고 약제실로 굴러 들어가 문을 밀었다." },
      { t: "팔뚝. 소매 위로 피가 번졌다. 물렸다. 내가." },
      { s: "sib", t: "…야. 야, 그거. 그거 뭐야. 보여 줘.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { s: "me", t: "긁힌 거야. 약 먼저 찾자." },
    ],
    next: "hosp_pharm_in",
  },

  hosp_pharm_in: {
    bg: "hosp",
    lines: [
      { t: "약제실. 선반 수십 개. 절반은 비어 있고, 바닥에 약통이 굴러다녔다. 누군가 급히 쓸어 담고 간 흔적." },
      { t: "안쪽, 꺼진 냉장고 옆. '비축 2호' 라벨 아래 파란 플라스틱 상자가 하나 놓여 있었다. 손바닥 두 개 크기. 봉인 테이프 그대로.", if: "!S.flags.hosp_gang_took_box && !S.flags.has_blue_box" },
      { t: "안쪽, 꺼진 냉장고 옆. '비축 2호' 라벨 아래는 비어 있었다. 먼지 위에 네모난 자국만. 그들이 먼저였다.", if: "S.flags.hosp_gang_took_box" },
      { t: "손전등 빛에 라벨들이 떠올랐다. 아세트아미노펜, 세파졸린, 붕대, 거즈. 읽을 수 있는 것만 챙기기로 했다.", if: "has('손전등')" },
      { t: "어둠 속에서 약통을 더듬었다. 라벨을 읽을 수 없었다. 모양으로, 무게로 골랐다.", if: "!has('손전등')" },
      { s: "sib", t: "저거야? 파란 거. 저게 그거야?", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse && !S.flags.hosp_gang_took_box" },
      { t: "막아 놓은 문 너머에서 뭔가가 긁는 소리가 계속됐다. 오래 있을 수는 없었다.", if: "S.flags.hosp_door_blocked" },
    ],
    choices: [
      { t: "파란 상자만 챙기고 바로 나간다", go: "hosp_get_box", if: "!S.flags.hosp_gang_took_box && !S.flags.has_blue_box" },
      { t: "파란 상자와 일반 약을 모두 챙긴다 (시간이 걸린다)", go: "hosp_get_both", if: "!S.flags.hosp_gang_took_box && !S.flags.has_blue_box" },
      { t: "남은 일반 약을 챙긴다", go: "hosp_get_meds" },
    ],
  },

  hosp_get_box: {
    bg: "hosp",
    set: { "flags.has_blue_box": true },
    item: ["파란 상자"],
    fx: { mind: 5 },
    lines: [
      { t: "파란 상자를 가방에 넣었다. 생각보다 가벼웠다. 사흘치 목숨이 이렇게 가볍다니." },
      { t: "상자 옆면에 매직으로 쓰여 있었다. 「1일 2회, 3일. 중단 금지. — 서은혜」", if: "S.flags.hosp_nurse_ally" },
      { t: "상자 옆면에 사용법이 인쇄되어 있었다. 1일 2회, 3일. 그 밑에 작게 '중단 시 효과 없음'." , if: "!S.flags.hosp_nurse_ally" },
      { s: "sib", t: "…됐다. 됐어. 가자. 빨리.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
    ],
    next: "hosp_pharm_exit",
  },

  hosp_get_meds: {
    bg: "hosp",
    fx: { meds: 2 },
    item: ["구급상자"],
    lines: [
      { t: "해열제 두 통, 붕대 한 뭉치, 소독약. 가방이 묵직해졌다." },
      { t: "파란 상자는 없었다. 하지만 빈손은 아니었다. 그렇게 생각하기로 했다.", if: "S.flags.hosp_gang_took_box" },
      { t: "진통제 한 통이 선반 밑에 굴러 들어가 있었다. 무릎을 꿇고 꺼냈다. 먼지가 입에 들어갔다." },
    ],
    next: "hosp_pharm_exit",
  },

  hosp_get_both: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_seen": true },
    item: ["파란 상자", "구급상자"],
    fx: { meds: 2 },
    lines: [
      { t: "파란 상자를 먼저 넣고, 선반을 훑었다. 해열제, 붕대, 소독약, 진통제. 가방 지퍼가 안 잠길 정도로." },
      { t: "너무 오래 있었다. 복도에서 발소리. 회색인의 끌리는 소리가 아니었다. 부츠 소리." },
      { t: "약제실 문이 열렸다. 헬멧 셋. 가장 앞의 헬멧이 바이저를 올렸다. 20대. 눈이 좁고 침착했다." },
      { s: "깍지 패거리", t: "오. 먼저 왔네. 파란 거, 가방에 있지?" },
    ],
    next: "hosp_gang_confront",
  },

  hosp_gang_confront: {
    bg: "hosp",
    lines: [
      { s: "깍지 패거리", t: "우리 깍지라고 해. 싸우고 싶진 않아. 기름 아깝거든. 상자 내려놓으면 다른 건 다 가져가." },
      { t: "셋. 하나는 쇠파이프, 하나는 공구 가방, 깍지는 빈손이었다. 빈손이 제일 무서웠다." },
      { s: "sib", t: "(작게) 우리 거야. 우리가 먼저 찾았어.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { s: "깍지 패거리", t: "동생이야? 아프구나. 그럼 더 필요하겠네. …근데 우리도 아픈 애가 있어서.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse && S.flags.sib_sick" },
    ],
    choices: [
      { t: "상자를 넘겨주고 나머지를 지킨다", go: "hosp_pharm_exit", set: { "flags.has_blue_box": false, "flags.hosp_gang_took_box": true }, item: ["-파란 상자"], fx: { trust: -8, mind: -5 } },
      { t: "병동 쪽 문을 열어 회색인을 끌어들이고 뛴다", go: "hosp_pharm_exit_run", set: { "flags.hosp_gang_enemy": true }, fx: { hp: -5, mind: -8 } },
      { t: "[식량 2↑] 식량으로 거래를 제안한다", go: "hosp_gang_deal", if: "S.food >= 2", fx: { food: -2 } },
      { t: "[정신력 60↑] 상자가 둘이라고 거짓말하고 냉장고 뒤를 가리킨다", go: "hosp_gang_bluff", if: "S.mind >= 60" },
    ],
  },

  hosp_gang_bluff: {
    bg: "hosp",
    lines: [
      { s: "me", t: "비축 1호는 냉장고 뒤 벽장이에요. 두 개 있었어요. 하나는 거기." },
      { t: "깍지가 나를 봤다. 오래. 내 눈이 흔들리지 않기를 바라며 그 눈을 마주 봤다." },
      { s: "깍지 패거리", t: "…확인해 봐." },
      { t: "쇠파이프가 냉장고를 밀었다. 벽장이 있었다. 진짜로. 안에 뭐가 있는지는 나도 몰랐다." },
      { s: "깍지 패거리", t: "…있네. 1호. 야, 얘 똑똑하다." },
      { t: "거짓말이 사실이 됐다. 그들이 벽장을 터는 사이, 우리는 문을 나섰다. 깍지가 뒤에서 말했다. '다음엔 안 봐줘.'" },
    ],
    next: "hosp_pharm_exit",
    fx: { mind: 5 },
  },

  hosp_pharm_gang: {
    bg: "hosp",
    set: { "flags.hosp_gang_seen": true },
    lines: [
      { t: "약제실 문이 열려 있었다. 안에서 헬멧 셋이 선반을 쓸어 담고 있었다. 쪽문 키패드는 이미 부서져 있었다." },
      { s: "깍지 패거리", t: "파란 거 찾았어? 냉장고 옆이라며." },
      { s: "깍지 패거리", t: "여기. 두 개네. 아니, 하나는 빈 거. 하나만." },
      { t: "문틈으로 보였다. 파란 상자. 헬멧 하나가 그걸 가방에 넣는 손." },
      { s: "sib", t: "(속삭이며) 저거 우리 거 아냐? 우리가 가져가야 하는 거 아냐?", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "셋. 쇠파이프, 공구 가방, 그리고 빈손의 리더. 우리는 둘. 아니, 하나 반.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "셋. 쇠파이프, 공구 가방, 그리고 빈손의 리더. 나는 혼자였다.", if: "!S.flags.hosp_sib_along || S.flags.hosp_sib_with_nurse" },
    ],
    choices: [
      { t: "숨어서 그들이 나갈 때까지 지켜본다", go: "hosp_gang_watch" },
      { t: "나서서 말을 건다", go: "hosp_gang_talk" },
      { t: "[아이템: 야구방망이/식칼] 불시에 덮친다", go: "hosp_gang_fight", if: "has('야구방망이') || has('식칼')" },
      { t: "조용히 물러나 그들이 떠난 뒤 들어간다", go: "hosp_gang_retreat" },
    ],
  },

  hosp_gang_watch: {
    bg: "hosp",
    set: { "flags.hosp_gang_took_box": true },
    fx: { mind: -5 },
    lines: [
      { t: "복도 소화전 뒤에 쪼그려 앉았다. 그들이 지나갔다. 부츠 소리 셋. 파란 상자가 든 가방이 내 눈높이에서 흔들렸다." },
      { s: "깍지 패거리", t: "이거면 걔 살아? 진짜?" },
      { s: "깍지 패거리", t: "몰라. 간호사 말로는 그렇다는데." },
      { t: "그들도 누군가를 살리려는 거였다. 그 사실이 위로가 되지는 않았다." },
      { t: "계단 소리가 멀어졌다. 오토바이 넷이 시동을 걸고 떠났다. 약제실은 비어 있었다. 파란 상자가 있던 자리도." },
    ],
    next: "hosp_pharm_in",
  },

  hosp_gang_talk: {
    bg: "hosp",
    lines: [
      { t: "문을 두드렸다. 셋이 동시에 돌아섰다. 쇠파이프가 올라갔다." },
      { s: "me", t: "싸우러 온 거 아니에요. 우리도 약 필요해서요. 동탄 주민센터 쪽에서 걸어왔어요." },
      { t: "빈손의 리더가 손을 들자 쇠파이프가 내려갔다. 바이저를 올렸다. 20대 초반. 눈이 좁고 침착했다." },
      { s: "깍지 패거리", t: "깍지. 그쪽은?" },
      { s: "깍지 패거리", t: "파란 거는 하나야. 우리도 아픈 애가 있어. 그러니까, 미안한데." },
      { s: "sib", t: "저도 아파요. 사흘째요.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse && S.flags.sib_sick" },
      { t: "깍지의 눈이 {{sib}}에게 갔다. 뭔가 계산하는 눈이었다. 나쁜 계산은 아닌 것 같았다.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse && S.flags.sib_sick" },
    ],
    choices: [
      { t: "솔직하게 사정을 말하고 상자를 나눠 달라고 한다", go: "hosp_gang_plead" },
      { t: "[식량 2↑] 식량과 바꾸자고 한다", go: "hosp_gang_deal", if: "S.food >= 2", fx: { food: -2 } },
      { t: "'나란히 상가 사람들이 우리 뒤에 있어요.'", go: "hosp_gang_mall_bluff" },
      { t: "[정신력 60↑] 서 간호사와의 관계를 거론하며 협상한다", go: "hosp_gang_nurse_card", if: "S.mind >= 60 && S.flags.hosp_nurse_ally" },
    ],
  },

  hosp_gang_plead: {
    bg: "hosp",
    lines: [
      { s: "me", t: "둘뿐이에요. 부모님은 서울에서 연락 끊겼고. 동생이 열이 안 내려요. 사흘치 한 세트래요. 반만이라도." },
      { s: "깍지 패거리", t: "반은 의미 없어. 중단하면 안 된다잖아." },
      { t: "깍지는 상자를 한참 봤다. 그리고 가방에서 해열제 두 통을 꺼내 바닥에 놓았다." },
      { s: "깍지 패거리", t: "이게 내가 할 수 있는 최선. 상자는 못 줘. 우리 애도 사흘째야." },
      { s: "sib", t: "…고마워요.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { s: "깍지 패거리", t: "고마워하지 마. 미안해서 주는 거니까." },
    ],
    next: "hosp_gang_took",
    fx: { meds: 2, trust: 3 },
  },

  hosp_gang_deal: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_truce": true },
    item: ["파란 상자"],
    lines: [
      { t: "가방에서 식량을 꺼냈다. 통조림, 라면. 우리의 이틀치." },
      { s: "me", t: "이거랑 바꿔요. 당신들은 기름이 있으니까 식량은 또 구할 수 있잖아요. 우린 걸어다녀요." },
      { s: "깍지 패거리", t: "…야, 쟤 말 되네." },
      { t: "깍지는 한참 생각했다. 그리고 가방에서 파란 상자를 꺼내 내밀었다. 대신 해열제는 전부 챙겼다." },
      { s: "깍지 패거리", t: "우리 애는 우리가 알아서 해. 간호사가 하나 더 숨겨 놨을 거야. 그 여자, 그런 사람이거든." },
      { s: "깍지 패거리", t: "다음엔 없어. 그리고 여긴 이제 우리 구역이야. 알지?" },
    ],
    next: "hosp_pharm_exit",
    fx: { mind: 3 },
  },

  hosp_gang_mall_bluff: {
    bg: "hosp",
    lines: [
      { s: "me", t: "나란히 상가 박 사장님 아시죠? 그쪽 사람들이 우릴 보냈어요. 우리가 안 돌아가면 그쪽이 와요." },
      { s: "깍지 패거리", t: "박 사장? 치킨집?" },
      { t: "깍지의 눈이 좁아졌다. 아는 이름이었다. 좋은 쪽으로인지 나쁜 쪽으로인지는 그의 다음 말에 달렸다." },
      { s: "깍지 패거리", t: "…그 아저씨 사람들이면 알지. 우리 기름 절반이 거기서 나와. 그래, 그렇다 치자.", if: "S.flags.mall_ally" },
      { s: "깍지 패거리", t: "그 아저씨가 너희 같은 애들을 보냈을 리가. 그 사람 외부인 안 받아. 거짓말을 하려면 좀 똑똑하게 해.", if: "!S.flags.mall_ally" },
    ],
    choices: [
      { t: "(우호 관계였다) 상자를 받아 나온다", go: "hosp_gang_deal_mall", if: "S.flags.mall_ally" },
      { t: "(들통났다) 사과하고 물러난다", go: "hosp_gang_took", if: "!S.flags.mall_ally", fx: { mind: -5 } },
      { t: "(들통났다) 그래도 버틴다", go: "hosp_gang_fight", if: "!S.flags.mall_ally", set: { "flags.hosp_gang_enemy": true } },
    ],
  },

  hosp_gang_deal_mall: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_truce": true },
    item: ["파란 상자"],
    lines: [
      { s: "깍지 패거리", t: "박 사장한테 전해. 깍지가 이번엔 양보했다고. 다음 기름은 두 배라고." },
      { t: "상자가 내 손에 들어왔다. 거짓말이 아니었던 게 다행이었다. 반쯤은 거짓말이었지만." },
      { s: "sib", t: "(속삭이며) 박 사장님이 우릴 보냈어?", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { s: "me", t: "(속삭이며) 보냈다고 치자." },
    ],
    next: "hosp_pharm_exit",
  },

  hosp_gang_nurse_card: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_truce": true },
    item: ["파란 상자"],
    lines: [
      { s: "me", t: "서 간호사님 아래층에 계세요. 그분이 아픈 사람 봐 주실 거예요. 당신들 아픈 분도요. 대신 상자는 우리가 가져가게 해 주세요. 당신들은 간호사를 얻는 거예요." },
      { t: "깍지가 쇠파이프 든 친구를 봤다. 친구의 어깨가 처져 있었다. 아픈 애는 그들에게도 가족인 모양이었다." },
      { s: "깍지 패거리", t: "…그 간호사가 우릴 봐 준다고? 우리가 어떤 놈들인지 알면서?" },
      { s: "me", t: "간호사잖아요." },
      { t: "긴 침묵. 깍지가 상자를 내밀었다." },
      { s: "깍지 패거리", t: "데려갈게. 우리 애. 저 여자가 손 안 대면 다시 올라와서 너희 찾을 거야." },
    ],
    next: "hosp_pharm_exit",
    fx: { mind: 5, trust: 3 },
  },

  hosp_gang_took: {
    bg: "hosp",
    set: { "flags.hosp_gang_took_box": true },
    fx: { mind: -8 },
    lines: [
      { t: "그들은 떠났다. 파란 상자와 함께. 계단 소리, 오토바이 소리, 그리고 정적." },
      { t: "약제실에는 그들이 남긴 것들이 굴러다녔다. 쓸모없다고 판단한 것들. 우리에게는 쓸모 있는 것들." },
      { s: "sib", t: "…괜찮아. 다른 방법 있을 거야. 간호사 선생님이 하나 더 숨겨 놨다며.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "{{sib}}가 나를 위로하고 있었다. 순서가 바뀌었다.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
    ],
    next: "hosp_get_meds",
  },

  hosp_gang_fight: {
    bg: "hosp",
    set: { "flags.hosp_gang_enemy": true },
    fx: { hp: -9, mind: -10 },
    lines: [
      { t: "덮쳤다. 처음 한 명은 기습에 넘어갔다. 두 번째부터는 아니었다." },
      { t: "쇠파이프가 어깨를 때렸다. 눈앞이 하얘졌다. 공구 가방이 날아왔다." },
      { s: "깍지 패거리", t: "야!! 그만!! 그만하라고!!" },
      { t: "깍지가 소리쳤다. 싸움을 말리는 건지, 부추기는 건지 알 수 없었다." },
      { s: "sib", t: "{{me}}!! 야!!", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "{{sib}}의 손이 주머니로 갔다. 호루라기. 박 사장이 준 거였나, 주민센터에서 가져온 거였나.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse && has('호루라기')" },
    ],
    choices: [
      { t: "[아이템: 호루라기] {{sib}}가 호루라기를 분다", go: "hosp_gang_whistle", if: "has('호루라기')" },
      { t: "계속 싸운다", go: "hosp_gang_lose" },
      { t: "바닥에 엎드려 항복한다", go: "hosp_gang_lose", fx: { hp: 5 } },
    ],
  },

  hosp_gang_whistle: {
    bg: "hosp",
    set: { "flags.has_blue_box": true },
    item: ["파란 상자"],
    fx: { hp: -3, trust: 8 },
    lines: [
      { t: "호루라기 소리가 복도를 찢었다. 길게. 세 번." },
      { t: "병동 문이 흔들렸다. 그리고 열렸다. 환자복 넷, 다섯, 여섯. 복도를 가득 채우며." },
      { s: "깍지 패거리", t: "미친— 튀어!! 튀라고!!" },
      { t: "그들이 계단으로 달렸다. 공구 가방이 떨어지고, 가방 지퍼가 열리고, 파란 상자가 복도에 굴렀다." },
      { t: "주웠다. 그리고 우리도 달렸다. 반대편 계단으로." },
      { s: "sib", t: "(헐떡이며) 나… 나 진짜 잘했지? 잘했지?" },
      { s: "me", t: "미쳤어. 진짜 미쳤어. 잘했어." },
    ],
    next: "hosp_pharm_exit_run",
  },

  hosp_gang_lose: {
    bg: "hosp",
    set: { "flags.hosp_gang_took_box": true },
    fx: { hp: -12, mind: -10, trust: -5 },
    lines: [
      { t: "바닥. 리놀륨 바닥이 차가웠다. 부츠가 눈앞에서 멈췄다." },
      { s: "깍지 패거리", t: "다음에 보면 안 봐줘. 알아들어?" },
      { t: "깍지가 쪼그려 앉아 내 가방을 뒤졌다. 파란 상자가 있었다면 가져갔을 것이다. 없으니 해열제만 챙겼다." },
      { s: "깍지 패거리", t: "동생이 너보다 똑똑하네. 쟤가 안 끼어들어서 다행인 줄 알아.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "그들은 떠났다. {{sib}}가 내 팔을 어깨에 걸고 일으켰다. 체중의 절반을 {{sib}}에게 맡겼다.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { t: "그들은 떠났다. 한참을 누워 있었다. 일어나야 했다. 집에 {{sib}}가 있다.", if: "!S.flags.hosp_sib_along || S.flags.hosp_sib_with_nurse" },
    ],
    next: "hosp_pharm_exit",
  },

  hosp_gang_retreat: {
    bg: "hosp",
    set: { "flags.hosp_gang_took_box": true },
    fx: { mind: -4 },
    lines: [
      { t: "물러났다. 계단참에서 20분을 기다렸다. 오토바이 소리가 멀어진 뒤에야 올라갔다." },
      { t: "약제실은 털려 있었다. 파란 상자가 있던 자리에 네모난 먼지 자국만." },
      { s: "sib", t: "…그냥 말이라도 걸어 볼 걸 그랬나.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
      { s: "me", t: "셋이었어. 말 걸었으면 뭐가 달랐을지 몰라.", if: "S.flags.hosp_sib_along && !S.flags.hosp_sib_with_nurse" },
    ],
    next: "hosp_pharm_in",
  },

  hosp_pharm_exit_run: {
    bg: "hosp",
    fx: { hp: -3 },
    lines: [
      { t: "반대편 계단. 두 칸씩. 로비. 응급실 바리케이드를 넘다가 정강이를 찧었다." },
      { t: "바깥. 찬 공기. 해가 벌써 기울고 있었다." },
      { t: "{{sib}}는 간호사실에 있다. 돌아가야 했다. 뒷문으로 다시.", if: "S.flags.hosp_sib_with_nurse" },
      { t: "서 간호사가 응급실 바리케이드 안쪽에서 손짓했다. {{sib}}가 그 옆에 있었다. 둘 다 무사했다.", if: "S.flags.hosp_sib_with_nurse" },
    ],
    next: "hosp_leave",
  },

  hosp_pharm_with_nurse: {
    bg: "hosp",
    set: { "flags.hosp_nurse_told": true },
    lines: [
      { t: "서 간호사가 앞장섰다. 가위 대신 카드키를 들고. 그녀의 발소리는 거의 나지 않았다. 3주 동안 익힌 걸음." },
      { t: "약제실 문이 열렸다. 쪽문 키패드가 부서져 있었다. 안쪽 선반이 쓸려 있었다.", if: "S.flags.hosp_gang_inside" },
      { s: "서은혜 간호사", t: "…먼저 왔군요. 그 사람들.", if: "S.flags.hosp_gang_inside" },
      { t: "그녀는 냉장고 옆이 아니라, 냉장고 뒤로 갔다. 벽장. 그 안에 파란 상자가 하나 더 있었다.", if: "S.flags.hosp_gang_inside" },
      { s: "서은혜 간호사", t: "비축 1호. 아무한테도 안 알려 준 거예요. …당신들한테는 알려 주네요. 왜인지는 모르겠지만.", if: "S.flags.hosp_gang_inside" },
      { t: "약제실. 선반은 반쯤 비었지만, 냉장고 옆 '비축 2호' 자리에 파란 상자가 그대로 있었다.", if: "!S.flags.hosp_gang_inside" },
      { s: "서은혜 간호사", t: "1일 2회, 사흘. 중간에 끊으면 처음부터 다시예요. 그런데 다시 할 상자는 없어요. 알겠죠?" },
      { t: "그녀는 해열제와 붕대도 챙겨 주었다. 그리고 상자 옆면에 매직으로 사용법을 적었다. 자기 이름까지." },
      { s: "sib", t: "선생님은 여기 계속 계실 거예요?", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "환자 둘이 아직 숨을 쉬니까요. 그게 끝나면… 모르겠어요." },
    ],
    choices: [
      { t: "[아픈 {{sib}}] 지금 여기서 첫 투여를 한다", go: "hosp_cure", if: "S.flags.hosp_sib_along && (S.flags.sib_sick || S.flags.sib_bitten) && !S.flags.sib_cured", set: { "flags.has_blue_box": true }, item: ["파란 상자"] },
      { t: "상자를 챙겨 집으로 돌아간다", go: "hosp_pharm_exit", set: { "flags.has_blue_box": true }, item: ["파란 상자"], fx: { meds: 1 } },
    ],
  },

  hosp_pharm_exit: {
    bg: "hosp",
    lines: [
      { t: "약제실을 나왔다. 복도는 조용했다. 조용한 게 좋은 건지 나쁜 건지 이제 구별이 안 됐다." },
      { t: "가방 속 파란 상자가 등에 닿았다. 네모난 안도감.", if: "S.flags.has_blue_box" },
      { t: "가방이 가벼웠다. 파란 상자는 없다. 해열제로 며칠 더 버틸 수 있을 뿐.", if: "!S.flags.has_blue_box" },
      { t: "{{sib}}가 간호사실에서 담요를 덮고 앉아 있었다. 서 간호사가 옆에서 체온을 재고 있었다.", if: "S.flags.hosp_sib_with_nurse" },
      { t: "손등이 욱신거렸다. 소매를 더 내렸다.", if: "S.flags.me_bitten && !S.flags.me_cured" },
    ],
    choices: [
      { t: "[파란 상자] 지금 {{sib}}에게 첫 투여를 한다", go: "hosp_cure", if: "has('파란 상자') && S.flags.hosp_sib_along && (S.flags.sib_sick || S.flags.sib_bitten) && !S.flags.sib_cured" },
      { t: "[파란 상자] 나에게 쓴다", go: "hosp_cure_me", if: "has('파란 상자') && S.flags.me_bitten && !S.flags.me_cured" },
      { t: "서 간호사에게 들러 인사하고 간다", go: "hosp_nurse_bye", if: "S.flags.hosp_nurse_ally" },
      { t: "집으로 돌아간다", go: "hosp_leave" },
    ],
  },

  hosp_cure: {
    bg: "hosp",
    set: { "flags.sib_cured": true, "flags.sib_sick": false, "flags.sib_bitten": false },
    item: ["-파란 상자"],
    fx: { sib: 30, trust: 8, mind: 8 },
    lines: [
      { t: "파란 상자의 봉인 테이프를 뜯었다. 안에 앰플 여섯, 주사기, 알약 한 줄, 그리고 코팅된 설명서." },
      { s: "서은혜 간호사", t: "내가 할게요. 팔 걷어요, 학생. 따끔해요.", if: "S.flags.hosp_nurse_ally" },
      { t: "그녀의 손은 빨랐다. 알코올 솜, 바늘, 끝. {{sib}}는 눈을 꼭 감고 있었다.", if: "S.flags.hosp_nurse_ally" },
      { t: "설명서를 세 번 읽었다. 주사기를 들었다. 손이 떨렸다. {{sib}}가 내 손목을 잡았다.", if: "!S.flags.hosp_nurse_ally" },
      { s: "sib", t: "야. 너 손 떨려. 내가 할게. 보건 시간에 해 봤어. 오렌지로.", if: "!S.flags.hosp_nurse_ally" },
      { t: "{{sib}}가 직접 놓았다. 오렌지보다는 어려웠을 것이다. 그래도 해냈다.", if: "!S.flags.hosp_nurse_ally" },
      { s: "sib", t: "…이제 사흘만 더 맞으면 돼?" },
      { s: "me", t: "사흘. 하루 두 번. 빼먹으면 처음부터야." },
      { s: "sib", t: "안 빼먹어. 내가 챙길게. 네가 까먹어도." },
      { t: "{{sib}}의 손목이 내 손 안에 있었다. 아직 뜨거웠다. 하지만 이제, 내려갈 열이었다." },
      { s: "서은혜 간호사", t: "사흘 뒤에 피부색 보세요. 회색기가 없으면 됐어요. 그리고… 고마워요. 누굴 살리는 걸 오랜만에 봤어요.", if: "S.flags.hosp_nurse_ally" },
    ],
    choices: [
      { t: "[파란 상자가 남았다면] 나에게도 쓴다", go: "hosp_cure_me", if: "S.flags.me_bitten && !S.flags.me_cured && has('파란 상자')" },
      { t: "집으로 돌아간다", go: "hosp_leave" },
    ],
  },

  hosp_cure_me: {
    bg: "hosp",
    set: { "flags.me_cured": true, "flags.me_bitten": false },
    item: ["-파란 상자"],
    fx: { hp: 15, mind: 5 },
    lines: [
      { t: "소매를 걷었다. 이빨 자국 주위가 벌써 거무스름했다. {{sib}}가 그걸 봤다.", if: "S.flags.hosp_sib_along" },
      { s: "sib", t: "…언제. 언제 물린 거야. 왜 말 안 했어.", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "너 먼저 챙기려고.", if: "S.flags.hosp_sib_along" },
      { s: "sib", t: "바보야. 네가 없으면 나도 없는 거잖아.", if: "S.flags.hosp_sib_along" },
      { t: "혼자 앰플을 땄다. 설명서대로. 바늘이 들어갈 때 눈을 감지 않았다. 감으면 못 할 것 같아서.", if: "!S.flags.hosp_sib_along" },
      { t: "사흘. 하루 두 번. 파란 상자는 이제 비었다. 다음은 없다." },
    ],
    next: "hosp_leave",
  },

  hosp_nurse_bye: {
    bg: "hosp",
    set: { "flags.hosp_nurse_quest": true },
    fx: { mind: 3 },
    lines: [
      { t: "간호사실. 서 간호사가 버너에 물을 올리고 있었다. 믹스커피 한 봉. 그녀의 하루 중 유일한 사치." },
      { s: "서은혜 간호사", t: "가요? …부탁 하나만 해도 돼요?" },
      { s: "서은혜 간호사", t: "지하 발전기가 경유가 떨어졌어요. 주차장 차들 탱크에 남은 게 있을 거예요. 호스랑 통만 있으면. 다음에 올 때, 혹시." },
      { s: "서은혜 간호사", t: "불이 들어오면 산소 농축기가 돌아가요. 환자 하나가 그걸로 버티거든요." },
      { s: "sib", t: "다시 올게요. 꼭.", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "꼭은 약속하지 마요. 요즘은 '아마'가 제일 정직해요." },
      { t: "그녀가 커피를 반 나눠 종이컵에 담아 주었다. 미지근하고 달았다." },
    ],
    next: "hosp_leave",
  },

  hosp_leave: {
    bg: "street",
    fx: { hp: -2 },
    lines: [
      { t: "병원을 나섰다. 해가 아파트 뒤로 넘어가고 있었다. 돌아가는 길은 올 때보다 길게 느껴졌다." },
      { t: "정류장의 회색인들은 그대로였다. 버스를 기다리며. 우리는 길 반대편으로 붙어 지났다." },
      { t: "자전거 덕에 해가 지기 전에 아파트가 보였다.", if: "has('자전거')" },
      { t: "{{sib}}가 가방을 멨다. 파란 상자가 든 가방을. 본인이 들겠다고 했다.", if: "S.flags.hosp_sib_along && has('파란 상자')" },
      { s: "sib", t: "다음에 올 땐 간호사 선생님 커피 믹스 사다 드리자. 나란히 상가 편의점에 있을 거야.", if: "S.flags.hosp_sib_along && S.flags.hosp_nurse_ally" },
      { s: "sib", t: "…그 오토바이 사람들, 또 만나면 어떡해?", if: "S.flags.hosp_sib_along && S.flags.hosp_gang_enemy" },
      { s: "me", t: "안 만나면 돼. 그게 계획이야.", if: "S.flags.hosp_sib_along && S.flags.hosp_gang_enemy" },
      { t: "{{sib}}의 팔뚝. 소매 아래 반달 자국. 48시간. 시계는 벌써 돌고 있었다.", if: "S.flags.sib_bitten && !S.flags.sib_cured" },
      { t: "현관문. 안에서 {{sib}}가 문을 열기 전에 세 번 두드리라고 했었다. 세 번 두드렸다. 문이 바로 열렸다. 기다리고 있던 것이다.", if: "!S.flags.hosp_sib_along" },
      { s: "sib", t: "…늦었잖아. 해 다 졌잖아. 나 진짜…", if: "!S.flags.hosp_sib_along" },
      { s: "me", t: "미안. 약 구해 왔어.", if: "!S.flags.hosp_sib_along" },
      { t: "{{sib}}는 말을 잇지 못했다. 그냥 내 패딩을 잡고 오래 서 있었다.", if: "!S.flags.hosp_sib_along" },
    ],
    next: "@home",
  },

  hosp_leave_empty: {
    bg: "street",
    fx: { mind: -10, hp: -2 },
    lines: [
      { t: "빈손으로 병원을 나섰다. 문 앞에서 한참을 서 있었다. 다시 들어갈 용기는 나지 않았다." },
      { t: "돌아가는 길. 정류장 회색인들이 고개를 들었다가 내렸다. 우리를 사물로 봤다. 사물이 된 기분이었다." },
      { s: "sib", t: "…괜찮아. 내일 다시 오면 되지. 아니면 다른 데.", if: "S.flags.hosp_sib_along" },
      { t: "집. {{sib}}가 문을 열고 내 손을 봤다. 빈손을. 아무 말도 하지 않았다. 그게 더 아팠다.", if: "!S.flags.hosp_sib_along" },
    ],
    next: "@home",
  },

  // ===== 재방문 =====
  hosp_revisit: {
    bg: "hosp",
    fx: { hp: -2 },
    lines: [
      { t: "큰길, 정류장, 병원 정문. 두 번째라고 덜 무섭지는 않았다. 다만 어디를 보지 말아야 하는지는 알았다." },
      { t: "정문 기둥에 스프레이 낙서가 새로 생겨 있었다. 「ㄲㅈ 구역 — 들어오면 죽음」. 깍지. 그들이 우리를 기억하고 있다.", if: "S.flags.hosp_gang_enemy" },
      { t: "주차장에 오토바이 한 대가 서 있었다. 한 대뿐. 나머지는 나간 모양이었다.", if: "S.flags.hosp_gang_took_box" },
      { t: "응급실 바리케이드 안쪽, 간호사실 쪽에서 랜턴 불빛이 보였다. 아직 있다. 서 간호사.", if: "S.flags.hosp_nurse_ally" },
      { t: "간호사실 쪽은 어두웠다. 그녀가 우릴 피하는 건지, 아니면.", if: "S.flags.hosp_nurse_hostile" },
      { s: "sib", t: "오늘은 뭐 할 거야? 정해 놓고 들어가자. 저번처럼 헤매지 말고.", if: "S.flags.hosp_sib_along" },
      { t: "{{sib}}의 팔뚝 자국이 어제보다 짙어졌다. 시간이 없다.", if: "S.flags.sib_bitten && !S.flags.sib_cured" },
    ],
    choices: [
      { t: "간호사실로 간다", go: "hosp_r_nurse", if: "S.flags.hosp_nurse_ally" },
      { t: "간호사실로 가서 사과한다", go: "hosp_r_nurse_apology", if: "S.flags.hosp_nurse_hostile" },
      { t: "약제실을 다시 뒤진다", go: "hosp_r_pharm", if: "!has('파란 상자')" },
      { t: "오토바이 패거리의 흔적을 쫓는다 (파란 상자 되찾기)", go: "hosp_r_gang_track", if: "S.flags.hosp_gang_took_box && !has('파란 상자') && !S.flags.sib_cured" },
      { t: "주차장 구급차를 확인한다", go: "hosp_r_ambulance", if: "S.flags.hosp_ambulance" },
      { t: "1층 매점과 로비를 뒤진다", go: "hosp_r_scavenge" },
    ],
  },

  hosp_r_nurse_apology: {
    bg: "hosp",
    lines: [
      { t: "간호사실. 서 간호사가 가위를 들었다. 저번과 같은 자세. 다른 눈." },
      { s: "me", t: "저번엔 죄송했어요. 무서워서 그랬어요. 변명이지만요." },
      { s: "sib", t: "저도 죄송해요. 말렸어야 했는데.", if: "S.flags.hosp_sib_along" },
      { t: "그녀는 한참 우리를 봤다. 가위가 천천히 내려갔다." },
      { s: "서은혜 간호사", t: "…무서운 건 다 똑같아요. 무서워서 뭘 하느냐가 다르지. 앉아요." },
    ],
    next: "hosp_r_nurse",
    set: { "flags.hosp_nurse_ally": true, "flags.hosp_nurse_hostile": false },
    fx: { mind: 5, trust: 3 },
  },

  hosp_r_nurse: {
    bg: "hosp",
    lines: [
      { t: "간호사실. 서 간호사는 전보다 말라 있었다. 랜턴 하나가 꺼져 있었다. 건전지가 떨어진 것이다." },
      { s: "서은혜 간호사", t: "왔네요. …환자 하나가 어젯밤에 갔어요. 이제 하나 남았어요." },
      { s: "sib", t: "…죄송해요.", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "학생이 왜 죄송해요. 얼굴 좀 봐요. 열은?" , if: "S.flags.hosp_sib_along" },
      { t: "그녀가 {{sib}}의 이마를 짚었다. 그리고 고개를 끄덕였다. 내려가고 있다는 뜻이었다.", if: "S.flags.hosp_sib_along && S.flags.sib_cured" },
      { t: "그녀가 {{sib}}의 이마를 짚었다. 표정이 굳었다.", if: "S.flags.hosp_sib_along && S.flags.sib_sick && !S.flags.sib_cured" },
      { t: "깍지 패거리의 아픈 애가 1층 응급실 침대에 누워 있었다. 그녀가 봐 주고 있었다. 약속은 지켜졌다.", if: "S.flags.hosp_gang_truce" },
      { t: "건전지를 하나 꺼내 랜턴에 끼워 주었다. 불이 들어왔다. 그녀가 웃었다. 처음 보는 표정이었다.", if: "has('건전지')" },
    ],
    choices: [
      { t: "발전기 연료 부탁을 들어준다 (지하로)", go: "hosp_r_generator", if: "S.flags.hosp_nurse_quest && !S.flags.hosp_generator" },
      { t: "'혹시… 파란 상자가 하나 더 있나요?'", go: "hosp_r_nurse_lastbox", if: "!has('파란 상자') && !S.flags.sib_cured && (S.flags.sib_sick || S.flags.sib_bitten) && !S.flags.hosp_lastbox_given" },
      { t: "구급차로 나가는 길을 묻는다", go: "hosp_r_route", if: "S.flags.hosp_ambulance && !S.flags.hosp_route_ready" },
      { t: "그냥 이야기를 나눈다", go: "hosp_r_nurse_talk" },
    ],
  },

  hosp_r_generator: {
    bg: "hosp",
    set: { "flags.hosp_generator": true },
    fx: { meds: 2, trust: 5, mind: 5, hp: -3 },
    lines: [
      { t: "주차장. 버려진 SUV 밑에 엎드려 호스를 탱크에 넣고 입으로 빨았다. 경유 맛. 뱉었다. 통에 반이 찼다." },
      { s: "sib", t: "으, 냄새. 야, 너 입에서 주유소 냄새 나.", if: "S.flags.hosp_sib_along" },
      { t: "지하. 발전기실. 완전한 어둠. 뭔가가 구석에서 움직였다. 환자복. 하나." },
      { t: "손전등으로 비췄다. 멈췄다. 그 사이 연료를 부었다.", if: "has('손전등')" },
      { t: "{{sib}}가 문 앞에서 캔을 발로 차 소리를 냈다. 그게 그쪽으로 갔다. 그 사이 연료를 부었다.", if: "!has('손전등') && S.flags.hosp_sib_along" },
      { t: "숨을 죽이고 연료를 부었다. 그것은 벽을 보고 서 있었다. 끝까지.", if: "!has('손전등') && !S.flags.hosp_sib_along" },
      { t: "스위치. 발전기가 기침을 하더니 돌았다. 복도 비상등이 켜졌다. 2층 어디선가 기계음. 산소 농축기." },
      { s: "서은혜 간호사", t: "…됐어요. 됐어. 고마워요. 진짜로." },
      { t: "그녀가 약품 캐비닛을 열어 해열제와 항생제 연고를 한 아름 챙겨 주었다." },
    ],
    next: "hosp_r_after",
  },

  hosp_r_nurse_lastbox: {
    bg: "hosp",
    set: { "flags.hosp_lastbox_given": true },
    lines: [
      { s: "me", t: "혹시… 파란 상자가 하나 더 있나요? 숨겨 놓은 거." },
      { t: "그녀는 오래 침묵했다. 손이 간호복 주머니로 갔다가 나왔다." },
      { s: "서은혜 간호사", t: "하나 있어요. 남은 환자를 위해 둔 거였는데… 그 사람은 이제 그 단계가 아니에요. 솔직히, 며칠 전부터." },
      { s: "서은혜 간호사", t: "주는 게 맞겠죠. 산 사람한테." },
      { t: "그녀가 책상 서랍 밑바닥에서 파란 상자를 꺼냈다. 봉인 그대로. 손이 떨리고 있었다. 처음으로." },
      { s: "sib", t: "…선생님.", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "사흘. 하루 두 번. 끊지 마요. 그리고 다 나으면 한 번만 더 와 줘요. 나은 얼굴 보고 싶으니까." },
    ],
    choices: [
      { t: "지금 여기서 첫 투여를 한다", go: "hosp_cure", if: "S.flags.hosp_sib_along", set: { "flags.has_blue_box": true }, item: ["파란 상자"] },
      { t: "상자를 받아 집으로 가져간다", go: "hosp_r_after", set: { "flags.has_blue_box": true }, item: ["파란 상자"], fx: { mind: 5 } },
    ],
  },

  hosp_r_route: {
    bg: "hosp",
    set: { "flags.hosp_route_ready": true },
    lines: [
      { s: "me", t: "주차장 구급차요. 저걸로 나갈 수 있을까요?" },
      { s: "서은혜 간호사", t: "라디오 방송 들었죠? 동탄역 북광장 수송차량." },
      { s: "서은혜 간호사", t: "그거… 녹음이에요. 저 같은 사람들이 확인했어요. 같은 문장, 같은 잡음, 매일.", if: "S.flags.info_fake" },
      { s: "서은혜 간호사", t: "그거 믿지 마요. 광장은 소리에 몰린 회색인 천지예요. 진짜 길은 따로 있어요.", if: "!S.flags.info_fake" },
      { s: "서은혜 간호사", t: "병원 뒷길. 장례식장 옆 차량 통로로 나가서 오산천 둑길을 타면 외곽 봉쇄선 검문소예요. 군인들은 아직 구급차는 세워 줘요. 환자 이송이라고 하면 통과시켜요. 적어도 지난주까지는 그랬어요." },
      { t: "그녀가 이면지에 약도를 그렸다. 병원, 둑길, 검문소. 동그라미 세 개와 선 하나." },
      { s: "서은혜 간호사", t: "키는 당직실 서랍이에요. 3층. 가져가요. 어차피 나는 못 떠나요.", if: "!has('열쇠꾸러미') && !S.flags.hosp_ambulance_works" },
      { s: "서은혜 간호사", t: "키 있죠? 그럼 됐어요. 연료는 반이면 검문소까지 충분해요.", if: "has('열쇠꾸러미') || S.flags.hosp_ambulance_works" },
      { s: "sib", t: "선생님도 같이 가요. 환자분이랑 같이.", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "…그 사람은 못 움직여요. 그리고 나는 그 사람 곁에 있을 거예요. 그게 내 일이니까. 떠나는 날 들러요. 커피 한 잔 줄게요." },
    ],
    choices: [
      { t: "3층 당직실로 키를 가지러 간다", go: "hosp_r_key", if: "!has('열쇠꾸러미') && !S.flags.hosp_ambulance_works" },
      { t: "약도를 챙기고 돌아간다", go: "hosp_r_after", item: ["지도"] },
    ],
  },

  hosp_r_key: {
    bg: "hosp",
    set: { "flags.hosp_ambulance_works": true, "flags.hosp_ambulance": true },
    item: ["열쇠꾸러미"],
    fx: { mind: -5 },
    lines: [
      { t: "3층. 당직실. 복도에 패거리가 남긴 라면 봉지와 담배꽁초. 그들이 여길 거점으로 쓰고 있었다.", if: "S.flags.hosp_gang_took_box" },
      { t: "3층. 당직실. 소파 위에 누군가 자다 떠난 자국. 담요가 아직 접히지 않은 채." },
      { t: "서랍. 두 번째 칸. 구급차 키. 노란 열쇠고리에 '응급1'이라고 쓰여 있었다." },
      { t: "복도 끝에서 뭔가가 쓰러지는 소리. 나왔다. 빨리. 계단. 돌아보지 않았다." },
      { s: "sib", t: "있어? 키? 됐어?", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "있어. 이제 차가 있어." },
    ],
    next: "hosp_r_after",
  },

  hosp_r_nurse_talk: {
    bg: "hosp",
    fx: { mind: 6, trust: 2 },
    lines: [
      { t: "버너에 물을 올렸다. 믹스커피 마지막 한 봉을 셋이서 나눴다." },
      { s: "서은혜 간호사", t: "사태 전에 나 여기서 야간 근무 했거든요. 밤에 복도 걸으면 환자들 숨소리가 다 달랐어요. 지금은 하나밖에 안 들려요." },
      { s: "sib", t: "선생님은 왜 안 가셨어요? 다들 갔을 때.", if: "S.flags.hosp_sib_along" },
      { s: "서은혜 간호사", t: "못 움직이는 사람을 두고 가면, 나중에 거울을 못 볼 것 같아서. 거창한 거 아니에요. 그냥 거울." },
      { s: "서은혜 간호사", t: "두 사람은 서로가 있잖아요. 그거 엄청 큰 거예요. 알고 있어요?" },
      { s: "sib", t: "…얘가 가끔 짜증나긴 하는데요.", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "너도.", if: "S.flags.hosp_sib_along" },
      { t: "그녀가 웃었다. 커피가 식었다. 창밖이 어두워지기 시작했다." },
    ],
    next: "hosp_r_after",
  },

  hosp_r_pharm: {
    bg: "hosp",
    lines: [
      { t: "약제실. 선반은 이제 완전히 비어 있었다. 바닥에 약통 껍데기만." },
      { t: "먼지 위에 발자국. 부츠. 3층 계단 쪽으로 이어졌다. 그들이 아직 병원 안에 있다.", if: "S.flags.hosp_gang_took_box" },
      { t: "냉장고 뒤 벽장을 열어 봤다. 비어 있었다. 서 간호사가 말한 1호도 이미 없다." },
      { t: "구석 캐비닛 밑에서 해열제 한 통을 찾았다. 유통기한이 지난 것. 상관없었다." },
    ],
    choices: [
      { t: "발자국을 따라 3층으로 간다", go: "hosp_r_gang_track", if: "S.flags.hosp_gang_took_box && !S.flags.sib_cured" },
      { t: "약만 챙기고 돌아간다", go: "hosp_r_after", fx: { meds: 1 } },
    ],
  },

  hosp_r_gang_track: {
    bg: "hosp",
    lines: [
      { t: "3층. 당직실에서 라면 냄새. 문이 반쯤 열려 있었다. 안에 하나. 헬멧을 벗은 10대 후반. 소파에 누워 땀을 흘리고 있었다. 회색열." },
      { t: "소파 옆 테이블. 파란 상자. 봉인이 뜯겨 있었다. 앰플 둘이 비어 있었다. 넷이 남았다." },
      { s: "sib", t: "(속삭이며) 쟤 혼자야. 나머지는 나갔나 봐.", if: "S.flags.hosp_sib_along" },
      { t: "넷. 우리에게 필요한 건 여섯. 그래도 넷은 넷이었다. 서 간호사라면 방법을 알지도." },
      { t: "아픈 아이가 몸을 뒤척였다. 눈을 떴다. 우리를 봤다." },
      { s: "깍지 패거리", t: "…누구. 형. 형 어딨어." },
    ],
    choices: [
      { t: "[정신력 50↑] 아이를 안심시키고 조용히 상자를 집는다", go: "hosp_r_steal_ok", if: "S.mind >= 50" },
      { t: "그냥 집어서 뛴다", go: "hosp_r_chase" },
      { t: "[간호사 우호] '아래층에 간호사가 있어. 같이 가자.'", go: "hosp_r_gang_trade", if: "S.flags.hosp_nurse_ally" },
      { t: "[아이템: 야구방망이] 위협해서 빼앗는다", go: "hosp_r_gang_fight2", if: "has('야구방망이')" },
    ],
  },

  hosp_r_steal_ok: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_partial": true },
    item: ["파란 상자"],
    fx: { mind: -5 },
    lines: [
      { s: "me", t: "형은 곧 올 거야. 물 마실래?" },
      { t: "아이가 고개를 끄덕였다. 물통을 건넸다. 아이가 마시는 동안 상자를 집었다. 아이는 그걸 봤다. 그리고 아무 말도 하지 않았다." },
      { s: "깍지 패거리", t: "…그거. 나한테 안 맞았어. 이틀 맞았는데 더 뜨거워. 가져가. 형한테는 말 안 할게." },
      { t: "열다섯이나 됐을까. 문을 닫으며 나는 그 아이의 얼굴을 외우지 않으려고 애썼다." },
      { s: "sib", t: "…우리 나쁜 사람이야?", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "몰라. 살아 있는 사람이야." , if: "S.flags.hosp_sib_along" },
    ],
    next: "hosp_r_after",
  },

  hosp_r_chase: {
    bg: "hosp",
    set: { "flags.hosp_gang_enemy": true },
    lines: [
      { t: "집었다. 뛰었다. 아이가 소리쳤다. 복도 끝 계단에서 부츠 소리. 하나가 남아 있었다." },
      { s: "깍지 패거리", t: "야!! 저 새끼 잡아!!" },
      { t: "계단. 두 칸씩. 뒤에서 쇠파이프가 난간을 때리는 소리." },
    ],
    choices: [
      { t: "상자를 꽉 쥐고 끝까지 뛴다", go: "hosp_r_after", set: { "flags.has_blue_box": true, "flags.hosp_gang_partial": true }, item: ["파란 상자"], fx: { hp: -9, mind: -5 } },
      { t: "상자를 계단 아래로 던지고 반대로 뛴다", go: "hosp_r_after", fx: { hp: -3, mind: -10 } },
    ],
  },

  hosp_r_gang_trade: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_truce": true, "flags.hosp_gang_partial": true },
    item: ["파란 상자"],
    fx: { trust: 5, mind: 5 },
    lines: [
      { s: "me", t: "아래층에 간호사가 있어. 진짜 간호사. 네 형이 아니라 그 사람이 널 봐야 돼." },
      { t: "아이는 한참 나를 봤다. 그리고 일어나려다 쓰러졌다. {{sib}}와 둘이서 부축했다.", if: "S.flags.hosp_sib_along" },
      { t: "아이는 한참 나를 봤다. 그리고 일어나려다 쓰러졌다. 어깨에 걸쳐 업었다. 가벼웠다.", if: "!S.flags.hosp_sib_along" },
      { t: "간호사실. 서 간호사는 아무것도 묻지 않았다. 아이를 눕히고 체온을 쟀다." },
      { s: "서은혜 간호사", t: "이틀 맞았으면 이 상자로는 완성이 안 돼요. 이 아이는 내 처방으로 할게요. 상자는 가져가요. 처음부터 시작하는 사람한테 필요하니까." },
      { t: "계단에서 부츠 소리. 깍지가 들어왔다. 침대 위 아이를 봤다. 우리를 봤다. 상자를 봤다." },
      { s: "깍지 패거리", t: "…됐어. 가. 그리고 다신 안 봐줘라는 말, 취소. 한 번 더 봐줄게." },
    ],
    next: "hosp_r_after",
  },

  hosp_r_gang_fight2: {
    bg: "hosp",
    set: { "flags.has_blue_box": true, "flags.hosp_gang_enemy": true, "flags.hosp_gang_partial": true },
    item: ["파란 상자"],
    fx: { mind: -15, hp: -3 },
    lines: [
      { t: "방망이를 들었다. 아이가 소파에서 몸을 움츠렸다." },
      { s: "깍지 패거리", t: "…형. 형. 형이 올 거야. 형이—" },
      { t: "상자를 집었다. 아이는 저항하지 않았다. 저항할 힘이 없었다." },
      { t: "문을 닫았다. 방망이가 손에서 미끄러질 뻔했다. 땀 때문이었다. 땀 때문이라고 해 두자." },
      { s: "sib", t: "…그 애 어떡해.", if: "S.flags.hosp_sib_along" },
      { s: "me", t: "그 애 형이 있어. 우리한텐 서로밖에 없고.", if: "S.flags.hosp_sib_along" },
      { t: "{{sib}}는 대답하지 않았다. 계단을 내려가는 내내.", if: "S.flags.hosp_sib_along" },
    ],
    next: "hosp_r_after",
  },

  hosp_r_ambulance: {
    bg: "hosp",
    lines: [
      { t: "주차장. 구급차는 그 자리에 있었다. 뒷문이 바람에 덜컹거렸다." },
      { t: "키를 꽂았다. 계기판에 불. 연료 반. 타이어 네 개 모두 공기가 있었다. 시동은 걸지 않았다.", if: "has('열쇠꾸러미') || S.flags.hosp_ambulance_works" },
      { t: "키가 없다. 운전석 밑, 선바이저, 글러브박스. 없었다. 서 간호사라면 알지 모른다.", if: "!has('열쇠꾸러미') && !S.flags.hosp_ambulance_works" },
      { s: "sib", t: "이거 타고 나갈 거면, 어디로 가는지는 알아야지. 아무 데나 가면 군인들이 쏠 수도 있잖아.", if: "S.flags.hosp_sib_along" },
      { t: "뒤칸에 담요 두 장이 있었다. 챙겼다.", if: "!has('담요')" },
    ],
    choices: [
      { t: "[열쇠 있음] 시동이 걸리는 걸 확인하고 기억해 둔다", go: "hosp_r_after", if: "has('열쇠꾸러미') || S.flags.hosp_ambulance_works", set: { "flags.hosp_ambulance_works": true }, item: ["담요"], fx: { mind: 5 } },
      { t: "서 간호사에게 키를 물어보러 간다", go: "hosp_r_route", if: "!has('열쇠꾸러미') && !S.flags.hosp_ambulance_works && S.flags.hosp_nurse_ally && !S.flags.hosp_route_ready" },
      { t: "3층 당직실을 뒤져 본다", go: "hosp_r_key", if: "!has('열쇠꾸러미') && !S.flags.hosp_ambulance_works" },
      { t: "돌아간다", go: "hosp_r_after", item: ["담요"] },
    ],
  },

  hosp_r_scavenge: {
    bg: "hosp",
    lines: [
      { t: "1층 매점. 셔터가 반쯤 내려가 있었다. 기어 들어갔다. 선반은 털렸지만 계산대 밑은 아니었다." },
      { t: "초코바 세 개. 생수 두 병. 컵라면 하나. 그리고 믹스커피 한 상자." },
      { s: "sib", t: "믹스커피!! 간호사 선생님 거!!", if: "S.flags.hosp_sib_along && S.flags.hosp_nurse_ally" },
      { s: "sib", t: "초코바. 야. 초코바. 이거 내 거야. 아무도 손대지 마.", if: "S.flags.hosp_sib_along" },
      { t: "셔터 밖에서 끌리는 발소리. 숨을 죽였다. 지나갔다." },
      { t: "매점 안쪽 사무실에 마스크 한 박스. 몇 장 챙겼다.", if: "!has('마스크')" },
    ],
    choices: [
      { t: "간호사에게 커피를 가져다준다", go: "hosp_r_nurse_talk", if: "S.flags.hosp_nurse_ally", fx: { food: 1, trust: 3 }, item: ["초코바", "물통", "마스크"], set: { "flags.hosp_coffee_gift": true } },
      { t: "전부 챙겨서 돌아간다", go: "hosp_r_after", fx: { food: 2 }, item: ["초코바", "물통", "마스크"] },
    ],
  },

  hosp_r_after: {
    bg: "hosp",
    lines: [
      { t: "병원 로비. 창밖 빛이 주황색으로 바뀌고 있었다. 돌아갈 시간." },
      { t: "가방 속 파란 상자. 아직 쓰지 않았다.", if: "has('파란 상자') && !S.flags.sib_cured" },
      { t: "구급차 키가 주머니에서 짤랑거렸다. 떠날 수 있는 길이 하나 생겼다. 언제 떠날지는 다른 문제였다.", if: "S.flags.hosp_ambulance_works" },
      { t: "{{sib}}가 손을 뻗었다. 가방을 자기가 들겠다고. 두 번째라 익숙해진 손짓.", if: "S.flags.hosp_sib_along" },
    ],
    choices: [
      { t: "[파란 상자] 떠나기 전에 {{sib}}에게 첫 투여를 한다", go: "hosp_cure", if: "has('파란 상자') && S.flags.hosp_sib_along && (S.flags.sib_sick || S.flags.sib_bitten) && !S.flags.sib_cured" },
      { t: "[파란 상자] 나에게 쓴다", go: "hosp_cure_me", if: "has('파란 상자') && S.flags.me_bitten && !S.flags.me_cured" },
      { t: "집으로 돌아간다", go: "hosp_leave" },
    ],
  },
});
