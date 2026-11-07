// chapters/station.js — 동탄역 (북광장의 버스 · 깍지 패거리 본거지). 가장 위험한 장소.
Object.assign(SCENES, {
  station_enter: {
    bg: "street",
    set: { "flags.went_station": true, "flags.station_visits": "+1", "flags.station_sib_with": false },
    lines: [
      { t: "동탄역. 걸어서 30분. 라디오가 말하는 그 북광장이 거기 있다.", if: "S.flags.station_visits == 1" },
      { t: "지도에 연필로 동그라미 쳐 둔 곳. 가장 멀고, 가장 모르는 곳.", if: "S.flags.station_visits == 1 && has('지도')" },
      { t: "다시 동탄역. 지난번 길은 몸이 기억하고 있었다.", if: "S.flags.station_visits >= 2" },
      { t: "비가 온다. 우산은 소리를 막는다. 소리를 못 들으면 죽는다. 우산은 두고 간다.", if: "S.weather == '비'" },
      { t: "눈이 쌓이기 시작했다. 발자국이 남는다는 뜻이다. 우리 것도, 다른 것들의 것도.", if: "S.weather == '눈' || S.weather == '첫눈'" },
      { s: "sib", t: "거기 버스 있다며. 진짜 있으면 어떡할 거야." },
      { s: "me", t: "진짜 있으면 타야지." },
      { s: "sib", t: "진짜 있을 리가 없다는 얼굴로 말하지 마." },
      { t: "{{sib}}은 벌써 신발끈을 묶고 있었다. 열이 있는 애가 저러면 안 되는데.", if: "flag('sib_sick') && !flag('sib_cured')" },
    ],
    choices: [
      { t: "같이 간다. 거기가 제일 위험하다고 미리 말해 둔다", go: "station_sib_warn", set: { "flags.station_sib_with": true } },
      { t: "동생은 집에 둔다. 혼자 다녀온다", go: "station_sib_stay", fx: { trust: -4 } },
      { t: "[동생 건강 50↓] 동생이 저 상태로는 안 된다. 혼자 간다", go: "station_sib_stay_sick", if: "S.sib < 50", fx: { trust: 2 } },
      { t: "역시 오늘은 아니다. 집에 있는다", go: "@home" },
    ],
  },
  station_sib_warn: {
    lines: [
      { s: "me", t: "거긴 사람도 많이 모였던 곳이야. 사람 많던 곳은 지금 뭐가 많겠어." },
      { s: "sib", t: "회색인." },
      { s: "me", t: "내가 뛰라고 하면 뛰어. 어디로냐고 묻지 말고." },
      { s: "sib", t: "알았어. 근데 넌 내가 뛰라고 하면 뛸 거야?" },
      { t: "대답하지 못했다. {{sib}}은 그걸 대답으로 받아들였다." },
    ],
    next: "station_road",
  },
  station_sib_stay: {
    lines: [
      { s: "sib", t: "또 혼자 가? 거긴 제일 위험하다며." },
      { s: "me", t: "그래서 혼자 가는 거야." },
      { s: "sib", t: "그 말 할 때마다 네가 돌아올 확률이 줄어드는 느낌인데." },
      { t: "문이 닫히기 전에 {{sib}}이 뭔가 던졌다. 초코바. 반쯤 먹다 만 것.", if: "has('초코바')" },
      { t: "현관문을 닫고 나서야 잠금장치 소리를 세 번 확인했다." },
    ],
    next: "station_road",
  },
  station_sib_stay_sick: {
    lines: [
      { t: "{{sib}}의 이마에 손을 댔다. 뜨겁다. 말은 안 했지만 알고 있었다." },
      { s: "sib", t: "나 괜찮은데." },
      { s: "me", t: "괜찮은 사람은 괜찮다고 안 해." },
      { s: "sib", t: "…그럼 빨리 와. 해 지기 전에." },
      { t: "담요를 턱까지 올려 주었다. 열이 나는 애는 춥다고 한다. 이상한 일이다.", if: "has('담요')" },
    ],
    next: "station_road",
  },

  /* ---------- 가는 길 ---------- */
  station_road: {
    bg: "street",
    lines: [
      { t: "큰길. 동탄역 방향으로 차들이 한 줄로 서 있다. 3주 전에 멈춘 그대로. 문이 열린 차, 닫힌 차, 뒤집힌 차." },
      { t: "고가 위에서 바람 소리가 난다. 바람 소리 사이에 다른 소리가 섞여 있다. 끌리는 소리." },
      { s: "sib", t: "저 차들 사이로 가면 안 보이겠다. 근데 저 안에 뭐가 있는지도 안 보이겠지.", if: "flag('station_sib_with')" },
      { t: "자전거가 있다. 고가 위 차도는 비어 있다. 빠르게 지나갈 수 있다.", if: "has('자전거')" },
    ],
    choices: [
      { t: "고가 위 차도로 올라간다 (탁 트여서 멀리 보인다)", go: "station_road_bridge" },
      { t: "차량 행렬 사이로 몸을 낮춰 간다", go: "station_road_cars" },
      { t: "[아이템: 자전거] 자전거로 한 번에 달린다", go: "station_road_bike", if: "has('자전거')" },
    ],
  },
  station_road_bridge: {
    lines: [
      { t: "고가. 난간 너머로 동탄역 지붕이 보인다. 광장에 무언가 많이 모여 있다. 색은 하나. 잿빛." },
      { t: "앞에서 둘. 회색인. 난간에 기대 선 채 천천히 이쪽으로 고개를 돌린다." },
      { s: "sib", t: "야. 둘이야. 둘은 어떻게 해.", if: "flag('station_sib_with')" },
    ],
    choices: [
      { t: "[아이템: 손전등] 눈에 빛을 쏘고 그 사이로 지나간다", go: "station_road_light", if: "has('손전등')" },
      { t: "난간 바깥 좁은 턱으로 돌아간다", go: "station_road_ledge" },
      { t: "[아이템: 야구방망이] 먼저 친다", go: "station_road_bat", if: "has('야구방망이')" },
      { t: "되돌아 내려가 차량 사이로 간다", go: "station_road_cars", fx: { mind: -3 } },
    ],
  },
  station_road_light: {
    lines: [
      { t: "빛. 둘 다 멈췄다. 눈이 빛을 따라 돌아간다. 몸은 그 뒤에 한 박자 늦게 따라온다." },
      { t: "그 한 박자 사이로 지나갔다. 뒤에서 손이 공기를 긁었다." },
      { s: "sib", t: "…손전등 건전지 얼마나 남았어?", if: "flag('station_sib_with')" },
      { s: "me", t: "묻지 마." },
    ],
    next: "station_arrive",
  },
  station_road_ledge: {
    lines: [
      { t: "난간 바깥. 발 하나 너비. 아래는 8미터. 회색인은 난간을 넘지 않는다. 넘을 생각을 못 한다." },
      { t: "{{sib}}이 내 벨트를 잡았다. 떨어지면 같이 떨어진다는 뜻이었다.", if: "flag('station_sib_with')" },
      { t: "바람이 한 번 세게 불었다. 숨을 멈추고 지나갔다.", fx: { mind: -4 } },
      { t: "눈이 쌓인 턱은 미끄러웠다. 발이 한 번 헛디뎠다.", if: "S.weather == '눈' || S.weather == '첫눈'" },
    ],
    choices: [
      { t: "끝까지 간다", go: "station_arrive", fx: { hp: -3 } },
      { t: "[정신력 40↓] 손이 떨린다. 난간 안으로 다시 넘는다", go: "station_road_bite_me", if: "S.mind < 40" },
    ],
  },
  station_road_bat: {
    lines: [
      { t: "첫 번째는 쓰러졌다. 두 번째는 쓰러진 첫 번째 위로 넘어왔다." },
      { t: "방망이가 손에서 미끄러졌다. 비 때문인지 땀 때문인지.", if: "S.weather == '비'" },
      { t: "팔. 잿빛 손가락이 팔을 잡았다. 옷 위다. 이빨은 닿지 않았다." },
      { s: "sib", t: "야! 야!!", if: "flag('station_sib_with')" },
      { t: "두 번째도 쓰러졌다. 방망이 손잡이에 금이 갔다." },
    ],
    choices: [
      { t: "팔을 확인한다", go: "station_road_check" },
    ],
  },
  station_road_check: {
    lines: [
      { t: "소매를 걷었다. 붉은 자국. 피부는 안 찢어졌다." },
      { s: "sib", t: "…안 찢어진 거 맞지? 맞지?", if: "flag('station_sib_with')" },
      { s: "me", t: "맞아." },
      { t: "맞다고 믿기로 했다. 믿는 것 말고 할 수 있는 게 없었다.", fx: { mind: -5, hp: -5 } },
    ],
    next: "station_arrive",
  },
  station_road_bite_me: {
    lines: [
      { t: "난간을 넘는 순간 뒤에서 잡았다. 어깨. 그리고 이빨." },
      { t: "소리를 질렀는지 안 질렀는지 기억이 안 난다. 뿌리치고 뛰었다." },
      { t: "어깨에서 피가 났다. 많이는 아니다. 많고 적고의 문제가 아니라는 걸 안다.", set: { "flags.me_bitten": true }, fx: { hp: -15, mind: -10 } },
      { s: "sib", t: "…집에 가자. 지금. 응?", if: "flag('station_sib_with')" },
      { s: "me", t: "온 김에 보고 간다. 48시간이면 아직 시간 있어." },
    ],
    next: "station_arrive",
  },
  station_road_cars: {
    lines: [
      { t: "차량 사이. 문이 열린 SUV 안에 캐리어가 있다. 뒷좌석에 카시트. 비어 있다." },
      { t: "조수석 바닥에 과자 봉지. 뜯지 않은 것.", fx: { food: 1 } },
      { t: "세 대 앞 승합차. 창문 안쪽에서 뭔가 유리를 긁고 있다. 안에 갇혀 있다. 3주째." },
      { s: "sib", t: "저거 문 안 열리나 봐. 다행이다. 다행이라고 하면 안 되나.", if: "flag('station_sib_with')" },
    ],
    choices: [
      { t: "눈을 마주치지 않고 지나간다", go: "station_arrive", fx: { mind: -2 } },
      { t: "승합차 트렁크를 살핀다 (안에 있는 건 못 나온다)", go: "station_road_van" },
    ],
  },
  station_road_van: {
    lines: [
      { t: "트렁크. 잠겨 있지 않았다. 생수 한 묶음, 즉석밥 한 상자. 누군가의 피난 짐." },
      { t: "유리 긁는 소리가 빨라졌다. 안에서 이쪽을 보고 있다. 제복. 운전기사였을 것이다." },
      { s: "me", t: "미안합니다." },
      { t: "짐을 꺼내는 동안 {{sib}}은 유리 너머를 보고 있었다. 말리지 않았다. 봐 두는 게 나을 때도 있다.", if: "flag('station_sib_with')", fx: { mind: -3 } },
      { t: "즉석밥은 무거웠다. 무거운 건 좋은 것이다.", fx: { food: 3 } },
    ],
    next: "station_arrive",
  },
  station_road_bike: {
    lines: [
      { t: "고가 위 차도. 페달을 밟는다. 바람이 귀를 때린다. 뒤에 {{sib}}이 허리를 잡고 있다.", if: "flag('station_sib_with')" },
      { t: "고가 위 차도. 페달을 밟는다. 바람이 귀를 때린다. 혼자라서 가볍다. 가벼운 게 싫다.", if: "!flag('station_sib_with')" },
      { t: "회색인 둘이 난간에서 돌아섰지만 이미 지나쳤다. 바퀴 소리에 광장 쪽에서 몇이 고개를 든다." },
      { t: "고가 끝에서 내려 자전거를 눕혔다. 여기서부터는 소리를 내면 안 된다." },
    ],
    next: "station_arrive",
  },

  /* ---------- 도착 / 허브 ---------- */
  station_arrive: {
    bg: "station",
    lines: [
      { t: "동탄역. 유리 지붕이 반쯤 깨져 있다. 북광장에 버스 두 대. 하늘색 수원행. 그리고 그 주위에 서른쯤. 잿빛.", if: "S.flags.station_visits == 1" },
      { t: "스피커. 『수원 비상대책본부입니다. 매주 토요일 05시, 동탄역 북광장에서…』 소리가 나면 잿빛 머리들이 일제히 버스 쪽을 본다.", if: "S.flags.station_visits == 1" },
      { s: "sib", t: "…저게 수송차량이야? 저 사람들이 다 타려고 기다리는 거야?", if: "S.flags.station_visits == 1 && flag('station_sib_with')" },
      { s: "me", t: "타려는 게 아니야. 소리 때문에 온 거야.", if: "S.flags.station_visits == 1 && flag('station_sib_with')" },
      { t: "북광장. 버스는 그대로. 잿빛은 더 늘었다.", if: "S.flags.station_visits >= 2 && !flag('station_speaker_off')" },
      { t: "북광장. 스피커는 꺼져 있다. 내가 껐다. 잿빛 무리가 흩어져 광장 전체에 퍼져 있다. 모여 있던 게 차라리 나았나.", if: "S.flags.station_visits >= 2 && flag('station_speaker_off')" },
      { t: "주차타워 쪽에서 오토바이 엔진 소리. 깍지 패거리는 저 안에 산다. 지난번에 봤다.", if: "flag('hosp_gang_seen') && !flag('station_gang_base')" },
      { t: "주차타워 3층 창에서 누군가 이쪽을 보고 있다. 손을 흔든다. 거래처 대우다.", if: "flag('station_gang_deal') && !flag('station_gang_enemy')" },
      { t: "주차타워 3층 창에 사람 그림자. 오토바이 한 대가 시동을 걸었다. 우리를 본 것이다.", if: "flag('station_gang_enemy')" },
    ],
    choices: [
      { t: "북광장 버스 쪽으로 간다", go: "station_plaza", if: "!flag('station_bus_seen')" },
      { t: "북광장을 다시 본다", go: "station_r_plaza", if: "flag('station_bus_seen')" },
      { t: "역사 안으로 들어간다", go: "station_hall" },
      { t: "주차타워 쪽으로 간다 (오토바이 소리)", go: "station_tower", if: "!flag('station_gang_base')" },
      { t: "주차타워로 간다 (깍지 패거리)", go: "station_r_tower", if: "flag('station_gang_base')" },
      { t: "충분히 봤다. 집으로 돌아간다", go: "station_leave" },
    ],
  },

  /* ---------- 북광장 ---------- */
  station_plaza: {
    bg: "station",
    set: { "flags.station_bus_seen": true },
    lines: [
      { t: "버스 정류장 뒤 화단에 엎드렸다. 20미터. 버스 문은 열려 있다. 안에는 아무도 없다. 아무도 없는 게 보인다." },
      { t: "스피커는 버스 지붕이 아니라 광장 가로등에 달려 있다. 케이블이 가로등을 타고 내려와 작은 상자로 들어간다." },
      { s: "sib", t: "저 상자. 발전기 아니야? 소리 안 나는데.", if: "flag('station_sib_with')" },
      { t: "배터리 상자. 타이머. 누가 설치하고 떠났다. 설치한 사람은 지금 여기 없다." },
    ],
    choices: [
      { t: "버스까지 기어가서 안을 확인한다 (위험)", go: "station_plaza_close" },
      { t: "[아이템: 호루라기] 반대편에서 호루라기를 불어 무리를 끈 뒤 버스로 간다", go: "station_plaza_whistle", if: "has('호루라기')" },
      { t: "여기서 한 시간 더 지켜본다", go: "station_plaza_watch" },
      { t: "충분하다. 물러난다", go: "station_arrive", set: { "flags.station_bus_suspect": true } },
    ],
  },
  station_plaza_watch: {
    lines: [
      { t: "한 시간. 방송이 세 번 나왔다. 같은 문장, 같은 호흡, 같은 자리에서 끊기는 숨소리." },
      { t: "두 번째와 세 번째 사이, 잿빛 무리 중 하나가 쓰러졌다. 아무도 쳐다보지 않았다. 쓰러진 것도 일어나지 않았다." },
      { s: "sib", t: "녹음이야. 사람이 아니야. 사람이면 세 번 다 똑같이 못 해.", if: "flag('station_sib_with')" },
      { t: "녹음이다. 확신에 가깝다. 하지만 확신은 저 상자 안에 있다.", set: { "flags.station_bus_suspect": true }, fx: { mind: -3 } },
    ],
    choices: [
      { t: "상자까지 간다. 확인해야 한다", go: "station_plaza_close" },
      { t: "충분하다. 돌아간다", go: "station_arrive" },
    ],
  },
  station_plaza_whistle: {
    lines: [
      { t: "광장 반대편 택시 승강장. 호루라기를 세 번 길게 불고 화단 뒤로 숨었다." },
      { t: "서른 개의 머리가 한 번에 돌았다. 느리게, 그러나 전부. 발 끄는 소리가 파도처럼 광장을 건너갔다." },
      { t: "버스까지 비었다. 2분. 그 안에 끝내야 한다.", set: { "flags.station_whistled": true } },
    ],
    next: "station_bus_inside",
  },
  station_plaza_close: {
    lines: [
      { t: "화단에서 버스까지. 포복. 잿빛 발목들이 어깨 높이에서 지나간다. 냄새. 쇠 냄새와 단 냄새." },
      { t: "하나가 멈춰 섰다. 바로 옆. 내려다보지는 않는다. 그냥 서 있다. 숨을 쉬지 않았다. 나도.", fx: { mind: -6 } },
      { t: "{{sib}}이 내 발목을 잡고 따라왔다. 잡은 손이 떨리지 않았다. 떨리는 건 나였다.", if: "flag('station_sib_with')" },
      { t: "버스 계단. 올라섰다." },
    ],
    next: "station_bus_inside",
  },
  station_bus_inside: {
    lines: [
      { t: "버스 안. 좌석마다 짐이 있다. 캐리어, 배낭, 아기 띠. 사람은 없다. 3주 전에 탔다가 3주 전에 내린 사람들." },
      { t: "맨 뒷좌석에 어린이 신발 한 짝. 분홍색. 다른 한 짝은 없다." },
      { t: "운전석 위 안내문. 『수원 비상대책본부 수송 안내 — 11월 넷째 주 토요일 05:00 출발. 본 차량은 대기 차량임.』 날짜가 적혀 있다. 8일째 새벽이다.", set: { "flags.info_route": true, "flags.info_time": true } },
      { s: "sib", t: "…넷째 주 토요일. 그게 이번 주지?", if: "flag('station_sib_with')" },
      { t: "운전석 아래 쪽지. 『연료 없음. 기사 없음. 오지 마세요. — 11/2』 연필 글씨가 뭉개져 있다." },
    ],
    choices: [
      { t: "가로등 아래 배터리 상자를 연다", go: "station_speaker" },
      { t: "짐을 뒤진다 (식량)", go: "station_bus_bags" },
      { t: "더는 못 있겠다. 빠져나간다", go: "station_plaza_escape" },
    ],
  },
  station_bus_bags: {
    lines: [
      { t: "캐리어 두 개. 옷, 옷, 약 봉투, 사진. 세 번째 배낭에 통조림 네 개와 에너지바.", fx: { food: 3 } },
      { t: "약 봉투에는 혈압약. 쓸 데가 없다. 그래도 챙겼다. 누군가는 쓸지 모른다.", fx: { meds: 1 } },
      { t: "{{sib}}이 아기 띠를 한참 들고 있다가 제자리에 놓았다.", if: "flag('station_sib_with')", fx: { mind: -2 } },
    ],
    choices: [
      { t: "가로등 아래 배터리 상자를 연다", go: "station_speaker" },
      { t: "빠져나간다", go: "station_plaza_escape" },
    ],
  },
  station_speaker: {
    lines: [
      { t: "상자. 자동차 배터리 둘, 타이머, 녹음기. 녹음기 액정에 『REPEAT 60min』. 테이프가 돌고 있다." },
      { t: "녹음이다. 사람은 없다. 토요일 새벽 5시에도 없을 것이다. 이 방송을 듣고 여기 온 사람들이 지금 광장에 서 있다. 잿빛으로.", set: { "flags.info_fake": true }, fx: { mind: -5 } },
      { s: "sib", t: "…그럼 우리 지난 며칠 동안 뭘 기다린 거야.", if: "flag('station_sib_with')" },
      { s: "me", t: "기다린 게 아니라 확인한 거야. 이제 확인했어." },
      { t: "상자 뚜껑 안쪽에 매직 글씨. 『유인용. 광장에 모아 두면 길이 비니까. — 깍지』" },
    ],
    choices: [
      { t: "녹음기를 끈다 (무리가 흩어진다 — 길이 안 비게 된다)", go: "station_speaker_off", set: { "flags.station_speaker_off": true } },
      { t: "그대로 둔다. 깍지 말이 맞다. 모여 있는 게 낫다", go: "station_plaza_escape", fx: { mind: -2 } },
      { t: "테이프를 되감아 끝에 경고를 덧녹음한다 『오지 마세요. 녹음입니다.』", go: "station_speaker_warn", set: { "flags.station_speaker_warned": true } },
    ],
  },
  station_speaker_off: {
    lines: [
      { t: "정지 버튼. 광장이 조용해졌다. 조용한 게 이렇게 큰 소리일 줄 몰랐다." },
      { t: "서른 개의 머리가 하나씩 아무 방향으로 돌아갔다. 모여 있던 것이 풀어졌다. 광장 전체로." },
      { s: "sib", t: "야. 이제 어디로 가. 사방이 다 저건데.", if: "flag('station_sib_with')" },
      { t: "다음에 여기 올 때는 더 어려울 것이다. 다음에 여기 올 사람도.", fx: { mind: 3 } },
    ],
    next: "station_plaza_escape",
  },
  station_speaker_warn: {
    lines: [
      { t: "녹음 버튼. 마이크에 입을 댔다. 『…오지 마세요. 이건 녹음입니다. 버스는 안 갑니다. 병원 뒤로…』 거기서 손이 멈췄다." },
      { t: "병원 뒤 얘기는 넣지 않았다. 아는 사람만 알면 된다. 모르는 사람이 몰려가면 그것도 끝이다." },
      { s: "sib", t: "네 목소리 이상하게 나왔어. 라디오 아저씨 같아.", if: "flag('station_sib_with')" },
      { t: "테이프가 다시 돌기 시작했다. 한 시간 뒤면 광장이 내 목소리를 듣는다.", fx: { mind: 4 } },
    ],
    next: "station_plaza_escape",
  },
  station_plaza_escape: {
    lines: [
      { t: "버스 뒷문. 광장 가장자리까지 40미터." },
      { t: "무리는 아직 반대편에 있다. 호루라기 소리가 아직 그쪽을 붙들고 있다.", if: "flag('station_whistled')" },
      { t: "하나가 뒷문 앞에 서 있다. 아까 그것. 옆에 서 있던 것.", if: "!flag('station_whistled')" },
    ],
    choices: [
      { t: "지금 뛴다", go: "station_plaza_run", if: "!flag('station_whistled')" },
      { t: "[아이템: 손전등] 빛으로 얼굴을 치고 지나간다", go: "station_plaza_light", if: "!flag('station_whistled') && has('손전등')" },
      { t: "조용히 빠져나간다", go: "station_arrive", if: "flag('station_whistled')", set: { "flags.station_whistled": false } },
    ],
  },
  station_plaza_light: {
    lines: [
      { t: "빛. 멈칫. 어깨로 밀고 나갔다. 뒤에서 손이 등을 긁었다. 옷만." },
      { t: "광장 끝 화단을 넘었다. 뒤를 보지 않았다. 보면 느려진다." },
      { s: "sib", t: "…살았다. 살았어. 야 살았어.", if: "flag('station_sib_with')", fx: { trust: 4 } },
    ],
    next: "station_arrive",
  },
  station_plaza_run: {
    lines: [
      { t: "뛰었다. 뒷문 앞 그것이 팔을 뻗었다. 피했다. 두 번째는 못 봤다." },
      { t: "{{sib}}이 비명을 질렀다. 짧게. 뒤를 봤다. 잿빛 손이 {{sib}}의 소매를 잡고 있었다.", if: "flag('station_sib_with')" },
      { t: "팔꿈치로 쳤다. 소매가 찢어졌다. {{sib}}이 빠져나왔다.", if: "flag('station_sib_with')" },
      { t: "옆에서 하나가 더 왔다. 느리다. 느리다고 믿었다.", if: "!flag('station_sib_with')" },
    ],
    choices: [
      { t: "[동생 동행] 동생 팔을 확인한다", go: "station_plaza_sib_check", if: "flag('station_sib_with')" },
      { t: "끝까지 뛴다", go: "station_plaza_out", if: "!flag('station_sib_with')" },
    ],
  },
  station_plaza_sib_check: {
    lines: [
      { t: "광장 밖 택시 승강장 뒤. {{sib}}의 소매를 걷었다." },
      { t: "손톱 자국. 길게. 그리고 손목 안쪽에 작은 반달 모양. 이빨.", if: "S.mind < 45 || S.sib < 50" },
      { t: "손톱 자국. 길게. 피부는 멀쩡하다. 이빨은 닿지 않았다.", if: "!(S.mind < 45 || S.sib < 50)" },
    ],
    choices: [
      { t: "…", go: "station_plaza_sib_bitten", if: "S.mind < 45 || S.sib < 50", set: { "flags.sib_bitten": true }, fx: { sib: -10, mind: -12, trust: 5 } },
      { t: "…", go: "station_plaza_sib_ok", if: "!(S.mind < 45 || S.sib < 50)", fx: { mind: -5, trust: 5 } },
    ],
  },
  station_plaza_sib_bitten: {
    lines: [
      { s: "sib", t: "…이거 아니지? 손톱이지?" },
      { s: "me", t: "손톱이야." },
      { s: "sib", t: "거짓말할 때 너 눈 안 깜빡이는 거 알아?" },
      { t: "48시간. 파란 상자. 병원. 머릿속에서 세 단어가 순서를 바꿔 가며 돌았다." },
      { s: "sib", t: "괜찮아. 나 안 울어. 근데 집에 가서 울어도 돼?" },
    ],
    next: "station_arrive",
  },
  station_plaza_sib_ok: {
    lines: [
      { s: "sib", t: "…안 물렸어. 안 물렸어, 맞지?" },
      { s: "me", t: "안 물렸어." },
      { s: "sib", t: "다시 말해 줘." },
      { s: "me", t: "안 물렸어. 손톱이야. 소독하면 돼." },
      { t: "{{sib}}은 내 옷자락을 쥐고 한참 놓지 않았다. 놓으라고 하지 않았다." },
    ],
    next: "station_arrive",
  },
  station_plaza_out: {
    lines: [
      { t: "광장 밖. 무릎에 손을 짚고 숨을 쉬었다. 손이 떨렸다. 손만 떨리는 게 다행이었다." },
      { t: "뒤돌아봤다. 광장은 다시 조용해지고 있었다. 방송이 다시 나왔다. 머리들이 다시 버스를 봤다.", if: "!flag('station_speaker_off')" },
      { t: "뒤돌아봤다. 광장은 조용했다. 조용한 채로 사방으로 퍼져 있었다.", if: "flag('station_speaker_off')", fx: { hp: -4 } },
    ],
    next: "station_arrive",
  },
  station_r_plaza: {
    bg: "station",
    lines: [
      { t: "북광장. 버스 두 대. 안내문도 그대로다.", if: "!flag('station_speaker_off') && !flag('station_speaker_warned')" },
      { t: "방송이 나왔다. 내 목소리. 『오지 마세요. 이건 녹음입니다.』 광장 가장자리에 새로 온 발자국이 있다. 그리고 돌아간 발자국도.", if: "flag('station_speaker_warned')", fx: { mind: 4 } },
      { t: "방송이 없다. 무리는 광장 전체로 퍼졌다. 버스까지 가는 건 이제 불가능에 가깝다.", if: "flag('station_speaker_off')" },
      { t: "스피커 상자가 사라졌다. 케이블만 가로등에 늘어져 있다. 깍지 패거리가 챙겨 갔거나, 배터리가 죽었거나.", if: "flag('station_gang_enemy') && !flag('station_speaker_off')", set: { "flags.station_speaker_off": true } },
      { s: "sib", t: "더 볼 거 없어. 가자.", if: "flag('station_sib_with')" },
    ],
    next: "station_arrive",
  },

  /* ---------- 역사 내부 ---------- */
  station_hall: {
    bg: "station",
    lines: [
      { t: "역사. 셔터가 반쯤 내려와 있다. 몸을 숙여 들어갔다. 대합실 전광판은 꺼져 있고, 바닥에 전단이 눈처럼 깔려 있다." },
      { t: "『실종자를 찾습니다』 전단이 기둥마다 붙어 있다. 사진, 사진, 사진. 모두 웃고 있다." },
      { s: "sib", t: "여기 사람들 다 어디 갔을까. 기차 타고 갔을까.", if: "flag('station_sib_with')" },
      { t: "편의점 유리가 깨져 있다. 화장실 쪽에서 물 떨어지는 소리. 승강장 계단 아래는 어둡다." },
      { t: "지난번에 뒤진 편의점은 그대로다. 비어 있다.", if: "flag('station_cvs_done')" },
    ],
    choices: [
      { t: "편의점을 뒤진다", go: "station_cvs", if: "!flag('station_cvs_done')" },
      { t: "화장실로 간다 (물소리)", go: "station_toilet", if: "!flag('station_toilet_done')" },
      { t: "승강장으로 내려간다 (어둡다)", go: "station_platform", if: "!flag('station_train_done')" },
      { t: "밖으로 나간다", go: "station_arrive" },
    ],
  },
  station_cvs: {
    set: { "flags.station_cvs_done": true },
    lines: [
      { t: "편의점. 진열대는 거의 비었다. 누군가 먼저 다녀갔고, 그 다음 누군가도 다녀갔다." },
      { t: "계산대 아래. 유통기한 지난 삼각김밥 상자 뒤에 컵라면 여섯 개. 상자로 가려져 있어서 살아남았다.", fx: { food: 3 } },
      { t: "창고 문. 반쯤 열려 있다. 안에서 비닐 소리." },
    ],
    choices: [
      { t: "창고를 연다", go: "station_cvs_store" },
      { t: "이 정도면 됐다. 나온다", go: "station_hall" },
    ],
  },
  station_cvs_store: {
    lines: [
      { t: "창고. 편의점 조끼를 입은 회색인이 라면 상자 사이에 앉아 있다. 비닐을 손으로 만지고 있다. 뜯지는 못한다." },
      { t: "이쪽을 봤다. 일어서는 데 시간이 걸린다. 그 시간에 상자 하나를 끌어냈다.", fx: { food: 2 } },
      { s: "sib", t: "아저씨 미안해요. 월급 못 받았을 텐데.", if: "flag('station_sib_with')" },
      { t: "문을 닫았다. 안에서 비닐 소리가 다시 났다.", fx: { mind: -3 } },
    ],
    next: "station_hall",
  },
  station_toilet: {
    set: { "flags.station_toilet_done": true },
    lines: [
      { t: "화장실. 세면대 하나에서 물이 떨어진다. 수도는 끊겼는데 옥상 탱크에 남은 물이 내려오는 모양이다." },
      { t: "물통을 채웠다. 묵직하다. 이 무게는 사흘치다.", if: "has('물통')", fx: { food: 1 } },
      { t: "물통이 없다. 손으로 받아 마셨다. 차갑고 쇠 맛이 났다.", if: "!has('물통')", fx: { hp: 3 } },
      { t: "거울. 립스틱 글씨. 『엄마 기다렸어. 5시에 버스 없었어. 집으로 갈게. 지혜』 그 아래 다른 글씨. 『지혜야 엄마 왔어 11/4』 그 아래는 없다." },
      { s: "sib", t: "…엄마가 늦었네.", if: "flag('station_sib_with')" },
      { t: "{{sib}}이 립스틱 글씨 아래에 손가락으로 뭔가 쓰려다 말았다. 거울에 김이 서리지 않았다.", if: "flag('station_sib_with')", fx: { mind: -3, trust: 3 } },
    ],
    next: "station_hall",
  },
  station_platform: {
    bg: "night",
    lines: [
      { t: "승강장. 지하. 비상등 하나가 깜빡인다. 선로에 SRT 한 편성이 서 있다. 문이 열려 있다. 전부." },
      { t: "열차 안은 더 어둡다. 손전등이 있다. 켜면 보이고, 켜면 보인다.", if: "has('손전등')" },
      { t: "손전등이 없다. 비상등 불빛이 닿는 첫 칸까지만 갈 수 있다.", if: "!has('손전등')" },
    ],
    choices: [
      { t: "[아이템: 손전등] 열차 안으로 들어간다", go: "station_train", if: "has('손전등')" },
      { t: "첫 칸만 살핀다", go: "station_train_first", if: "!has('손전등')" },
      { t: "너무 어둡다. 올라간다", go: "station_hall" },
    ],
  },
  station_train_first: {
    set: { "flags.station_train_done": true },
    lines: [
      { t: "첫 칸. 좌석 그물망에 과자 봉지. 선반에 가방 하나. 가방 안에 손목시계와 충전기. 쓸모없는 것들.", fx: { food: 1 } },
      { t: "둘째 칸 연결문 유리 너머에서 뭔가 움직였다. 승무원 모자. 돌아섰다." },
    ],
    next: "station_hall",
  },
  station_train: {
    set: { "flags.station_train_done": true },
    lines: [
      { t: "손전등. 좌석 등받이가 열을 지어 빛 속에서 떠올랐다. 비어 있다. 3호차까지." },
      { t: "4호차 연결문. 승무원 제복. 모자. 이쪽으로 걸어온다. 걷는 게 아니라 끌려온다." },
      { s: "sib", t: "승무원이면 열쇠 있지 않을까. 승무원실 열쇠.", if: "flag('station_sib_with')" },
    ],
    choices: [
      { t: "빛으로 멈춰 세우고 지나쳐 승무원실로 간다", go: "station_train_crew" },
      { t: "[아이템: 식칼] 좁은 통로에서 끝낸다", go: "station_train_knife", if: "has('식칼')" },
      { t: "3호차 짐만 챙기고 나간다", go: "station_train_bags" },
    ],
  },
  station_train_bags: {
    lines: [
      { t: "3호차. 선반의 가방들. 과자, 생수, 누군가의 도시락. 유통기한은 묻지 않는다.", fx: { food: 2 } },
      { t: "승무원은 2호차까지 왔다. 그 전에 내렸다." },
    ],
    next: "station_hall",
  },
  station_train_knife: {
    lines: [
      { t: "통로 폭은 어깨 하나. 저쪽도 어깨 하나. 먼저 손이 왔다. 칼이 먼저 닿았다." },
      { t: "끝났다. 승무원 모자가 바닥에 떨어졌다. 명찰. 『차장 이○○』. 이름은 읽지 않았다.", fx: { mind: -6 } },
      { t: "손목. 긁혔다. 칼이 닿기 전에 손톱이 먼저였다. 피부가 조금 벗겨졌다.", if: "S.hp < 55" },
    ],
    choices: [
      { t: "손목을 확인한다", go: "station_train_bite_me", if: "S.hp < 55", set: { "flags.me_bitten": true }, fx: { hp: -8, mind: -8 } },
      { t: "승무원실로 간다", go: "station_train_crew_room", if: "!(S.hp < 55)" },
    ],
  },
  station_train_bite_me: {
    lines: [
      { t: "손톱 자국이라고 하기엔 깊다. 이빨 자국이라고 하기엔 얕다. 둘 중 하나로 정해야 한다면 나쁜 쪽이다." },
      { s: "sib", t: "…야. 그거. 그거 뭐야.", if: "flag('station_sib_with')" },
      { s: "me", t: "긁혔어." },
      { t: "48시간. 병원. 파란 상자. 순서를 정했다." },
    ],
    next: "station_train_crew_room",
  },
  station_train_crew: {
    lines: [
      { t: "빛. 멈췄다. 좌석 사이로 몸을 밀어 넣어 지나쳤다. 제복 소매가 뺨을 스쳤다. 차가웠다." },
      { t: "5호차 끝 승무원실. 문은 잠겨 있지 않았다.", fx: { mind: -3 } },
    ],
    next: "station_train_crew_room",
  },
  station_train_crew_room: {
    lines: [
      { t: "승무원실. 비상식량 상자. 건빵, 초코바, 생수.", fx: { food: 3 }, item: ["초코바"] },
      { t: "벽에 무전기 거치대. 휴대용 무전기 하나. 전원이 들어온다. 채널이 돌아간다. 잡음, 잡음, 잡음.", if: "!has('무전기')", item: ["무전기"], set: { "flags.radio": true } },
      { t: "벽에 무전기 거치대. 비어 있다. 우리 것과 같은 기종이었을 것이다.", if: "has('무전기')" },
      { t: "운행일지. 마지막 장. 『11/1 06:40 수서행 출발 대기. 승객 212명. 운행 명령 없음. 10:00 승객 하차 안내. 14:00 승객 다시 승차. 18:00 …』 뒤는 없다." },
      { s: "sib", t: "212명이 어디로 갔을까.", if: "flag('station_sib_with')" },
      { s: "me", t: "광장에." },
    ],
    next: "station_hall",
  },

  /* ---------- 주차타워 ---------- */
  station_tower: {
    bg: "station",
    set: { "flags.station_gang_base": true },
    lines: [
      { t: "주차타워. 1층 입구에 오토바이 네 대. 기름 냄새. 2층 난간에 빨랫줄. 사람이 산다." },
      { t: "입구 옆 벽에 스프레이. 『깍지』. 그 아래 작은 글씨. 『들어오면 안 나감』" },
      { t: "병원에서 본 얼굴 중 하나가 2층 난간에 앉아 있다. 담배. 이쪽을 아직 못 봤다.", if: "flag('hosp_gang_seen')" },
      { t: "2층 난간의 남자가 이쪽을 봤다. 일어섰다. 병원에서 우리가 한 일을 기억하는 얼굴이다.", if: "flag('hosp_gang_enemy')" },
      { t: "2층 난간의 남자가 손을 들었다. 병원에서의 휴전을 기억하는 손이다.", if: "flag('hosp_gang_truce')" },
      { s: "sib", t: "저 사람들… 약 가져간 사람들이지.", if: "flag('station_sib_with') && flag('hosp_gang_took_box')" },
    ],
    choices: [
      { t: "뒤쪽 계단으로 몰래 올라간다", go: "station_tower_sneak", if: "!flag('hosp_gang_truce')" },
      { t: "정면으로 걸어 들어가 말을 건다", go: "station_tower_talk", if: "!flag('hosp_gang_enemy')" },
      { t: "[깍지와 적대] 그래도 들어간다. 이야기할 게 있다", go: "station_tower_enemy", if: "flag('hosp_gang_enemy')" },
      { t: "들어가지 않는다. 광장으로 돌아간다", go: "station_arrive" },
    ],
  },
  station_tower_sneak: {
    lines: [
      { t: "뒤쪽 비상계단. 3층. 차량 대신 텐트 다섯 동. 가운데에 드럼통 불. 사람은 셋. 넷째는 안 보인다." },
      { t: "구석 승합차. 뒷문이 열려 있고 안에 상자들. 약 봉투, 생수, 통조림. 병원 약제실에서 본 그 상자들." },
      { t: "승합차 옆 기둥에 누군가 묶여 있다. 입에 테이프. 고개를 숙이고 있다." },
      { t: "얼굴을 들었다. 민재다.", if: "flag('mall_ally') && flag('mall_minjae_friend')" },
      { t: "얼굴을 들었다. 모르는 얼굴. 스무 살쯤. 눈이 이쪽을 봤다.", if: "!(flag('mall_ally') && flag('mall_minjae_friend'))" },
    ],
    choices: [
      { t: "승합차에서 상자를 하나 꺼낸다", go: "station_tower_steal" },
      { t: "묶인 사람에게 간다", go: "station_tower_captive" },
      { t: "본 걸로 충분하다. 조용히 내려간다", go: "station_arrive", fx: { mind: -2 } },
    ],
  },
  station_tower_steal: {
    lines: [
      { t: "상자. 해열제, 소독약, 붕대. 파란 상자는 없다. 그건 다른 데 두었거나 이미 썼거나.", fx: { meds: 2 } },
      { t: "파란 상자. 상자들 맨 아래. 병원에서 그들이 먼저 챙긴 그것.", if: "flag('hosp_gang_took_box') && !has('파란 상자') && !flag('has_blue_box')", item: ["파란 상자"], set: { "flags.has_blue_box": true, "flags.station_box_stolen": true } },
      { t: "승합차 문이 삐걱했다. 드럼통 옆 셋 중 하나가 고개를 돌렸다." },
    ],
    choices: [
      { t: "묶인 사람을 데리고 간다", go: "station_tower_captive_free", if: "!flag('station_captive_freed')" },
      { t: "지금 내려간다", go: "station_tower_run" },
    ],
  },
  station_tower_captive: {
    lines: [
      { s: "민재", t: "…으읍. 읍.", if: "flag('mall_ally') && flag('mall_minjae_friend')" },
      { t: "테이프를 뗐다. 민재. 입술이 터져 있다.", if: "flag('mall_ally') && flag('mall_minjae_friend')" },
      { s: "민재", t: "정찰 나왔다가… 씨. 박 사장님한테 말하지 마요. 혼자 온 거.", if: "flag('mall_ally') && flag('mall_minjae_friend')" },
      { t: "테이프를 뗐다. 모르는 청년. 목소리가 갈라져 있다.", if: "!(flag('mall_ally') && flag('mall_minjae_friend'))" },
      { s: "목소리", t: "저… 약 훔치려다가. 동생이 아파서. 사흘 묶여 있었어요.", if: "!(flag('mall_ally') && flag('mall_minjae_friend'))" },
      { s: "sib", t: "풀어 줘. 빨리.", if: "flag('station_sib_with')" },
    ],
    choices: [
      { t: "줄을 푼다", go: "station_tower_captive_free", set: { "flags.station_captive_freed": true } },
      { t: "풀면 우리까지 위험하다. 테이프만 다시 붙인다", go: "station_tower_captive_leave", fx: { mind: -8, trust: -8 } },
    ],
  },
  station_tower_captive_leave: {
    lines: [
      { t: "눈이 나를 봤다. 테이프를 붙였다. 눈은 계속 봤다." },
      { s: "sib", t: "…야. 야. 진짜야?", if: "flag('station_sib_with')" },
      { t: "내려오는 계단에서 {{sib}}은 한 번도 내 쪽을 보지 않았다.", if: "flag('station_sib_with')" },
      { t: "혼자였다. 혼자라서 다행이라고 생각한 걸 나중에 후회했다.", if: "!flag('station_sib_with')" },
    ],
    next: "station_arrive",
  },
  station_tower_captive_free: {
    set: { "flags.station_captive_freed": true },
    lines: [
      { t: "줄. 매듭이 단단했다. 식칼이 있어서 빨랐다.", if: "has('식칼')" },
      { t: "줄. 매듭을 손톱으로 풀었다. 오래 걸렸다.", if: "!has('식칼')" },
      { t: "드럼통 쪽에서 의자 끄는 소리. 하나가 일어섰다." },
      { s: "민재", t: "뒤 계단. 2층에서 왼쪽. 내가 앞장설게요.", if: "flag('mall_ally') && flag('mall_minjae_friend')", set: { "flags.station_minjae_rescued": true } },
      { s: "목소리", t: "고맙습니다. 고맙습니다. 저 먼저 갈게요.", if: "!(flag('mall_ally') && flag('mall_minjae_friend'))", set: { "flags.station_stranger_freed": true } },
    ],
    next: "station_tower_run",
  },
  station_tower_run: {
    lines: [
      { t: "계단. 위에서 고함. 『야! 야 거기!』 발소리가 따라왔다. 오토바이 시동 소리." },
      { t: "1층 입구. 오토바이 한 대가 앞을 막았다. 헬멧 없는 얼굴. 병원에서 본 얼굴. 깍지가 아니다. 깍지의 오른팔쯤." },
      { s: "민재", t: "이쪽!! 건널목 쪽 지하도!", if: "flag('station_minjae_rescued')" },
    ],
    choices: [
      { t: "지하도로 뛴다", go: "station_tower_escape", set: { "flags.station_gang_enemy": true } },
      { t: "[아이템: 호루라기] 광장 쪽으로 호루라기를 불어 무리를 끌어온다", go: "station_tower_escape_whistle", if: "has('호루라기')", set: { "flags.station_gang_enemy": true } },
      { t: "멈춰 선다. 손을 든다", go: "station_tower_caught" },
    ],
  },
  station_tower_escape: {
    lines: [
      { t: "지하도. 오토바이는 계단을 못 내려온다. 고함만 내려왔다." },
      { t: "반대편으로 나왔을 때 민재가 벽에 기대 웃고 있었다. 웃는 게 아니라 떨고 있었다.", if: "flag('station_minjae_rescued')" },
      { s: "민재", t: "상가까지 같이 가요. 박 사장님한테 형… 아니, 누나… 아니 그냥 {{me}}이 구했다고 할게요.", if: "flag('station_minjae_rescued')", fx: { trust: 3 } },
      { t: "청년은 반대편으로 나오자마자 꾸벅 인사하고 뛰어갔다. 어느 쪽으로 갔는지 못 봤다.", if: "flag('station_stranger_freed')" },
      { t: "이제 깍지 패거리는 우리 얼굴을 안다. 병원에서도, 상가에서도 조심해야 한다.", fx: { mind: -4 } },
    ],
    next: "station_leave",
  },
  station_tower_escape_whistle: {
    lines: [
      { t: "호루라기. 세 번. 광장의 잿빛 머리들이 일제히 주차타워를 봤다. 파도가 방향을 바꿨다." },
      { t: "오토바이가 먼저 도망갔다. 고함이 우리가 아니라 무리를 향했다. 그 틈에 빠져나왔다." },
      { s: "sib", t: "…저 사람들 괜찮을까.", if: "flag('station_sib_with')" },
      { s: "me", t: "오토바이 있잖아." },
      { t: "괜찮지 않아도 할 수 없었다. 할 수 없는 게 늘어난다.", fx: { mind: -5 } },
    ],
    next: "station_leave",
  },
  station_tower_caught: {
    lines: [
      { t: "손을 들었다. 오른팔이 내 가방을 벗겼다. 통조림, 약, 손전등. 전부 바닥에 쏟았다." },
      { t: "『깍지가 보고 싶대.』 3층으로 끌려 올라갔다.", fx: { food: -2, meds: -1 } },
      { t: "손전등을 가져갔다.", if: "has('손전등')", item: ["-손전등"] },
    ],
    next: "station_kkakji",
  },
  station_tower_talk: {
    lines: [
      { t: "정면. 두 손을 보이게 들고 걸어 들어갔다. 2층 난간의 남자가 아래로 소리쳤다. 『손님.』" },
      { t: "3층. 드럼통 불. 텐트. 한가운데 접이식 의자에 앉은 사람. 깍지. 생각보다 작다. 생각보다 어리다." },
      { s: "깍지 패거리", t: "병원 그 학생들이네. 여기까지 왔어? 겁이 없는 거야, 머리가 없는 거야.", if: "flag('hosp_gang_seen')" },
      { s: "깍지 패거리", t: "처음 보는 얼굴. 둘이서 여기까지 걸어왔어? 광장 지나서?", if: "!flag('hosp_gang_seen')" },
      { s: "sib", t: "…형도 어려 보이는데.", if: "flag('station_sib_with')" },
      { s: "깍지 패거리", t: "형 아니야. 그리고 어린 거랑 무서운 거랑은 상관없어. 너도 알잖아." },
    ],
    next: "station_kkakji",
  },
  station_tower_enemy: {
    lines: [
      { t: "들어서자마자 셋이 둘러쌌다. 손에 각목, 손에 쇠파이프. 2층에서 깍지가 내려왔다." },
      { s: "깍지 패거리", t: "병원에서 우리 애 다치게 한 게 너지. 여기까지 온 건 사과하러 온 거야, 죽으러 온 거야." },
      { s: "me", t: "둘 다 아니야. 이야기하러 왔어." },
      { s: "깍지 패거리", t: "이야기. 좋아. 짧게." },
    ],
    next: "station_kkakji",
  },
  station_kkakji: {
    lines: [
      { t: "깍지. 스물셋쯤. 손톱 밑이 전부 새카맣다. 그래서 깍지인지, 다른 이유인지 묻지 않았다." },
      { s: "깍지 패거리", t: "광장 방송, 봤어? 내가 틀어 놓은 거야. 소리 나는 데로 모이거든. 모이면 나머지 길이 비어. 우리는 그 빈 길로 다녀." },
      { s: "깍지 패거리", t: "너네 집 근처까지 그 덕에 조용한 거야. 고맙다는 말은 안 해도 돼." },
      { s: "sib", t: "그 방송 듣고 온 사람들은요. 광장에 있는 사람들.", if: "flag('station_sib_with')" },
      { s: "깍지 패거리", t: "…그 사람들은 내가 틀기 전에 이미 거기 있었어. 그건 믿어도 되고 안 믿어도 돼." },
    ],
    choices: [
      { t: "거래를 제안한다 (아이템 ↔ 약·식량)", go: "station_kkakji_deal", if: "!flag('station_gang_enemy')" },
      { t: "왜 여기 남았는지 묻는다", go: "station_kkakji_story", if: "!flag('station_kkakji_story')" },
      { t: "봉쇄선 넘는 길을 아는지 묻는다", go: "station_kkakji_route" },
      { t: "[깍지와 적대] 병원 일을 사과한다", go: "station_kkakji_apology", if: "flag('hosp_gang_enemy') || flag('station_gang_enemy')" },
      { t: "더 할 말 없다. 나간다", go: "station_kkakji_leave" },
    ],
  },
  station_kkakji_deal: {
    lines: [
      { s: "깍지 패거리", t: "뭐 있는데." },
      { t: "가방을 열어 보였다. 깍지가 손가락으로 하나씩 짚었다." },
      { s: "깍지 패거리", t: "건전지. 그거면 해열제 한 통.", if: "has('건전지')" },
      { s: "깍지 패거리", t: "야구방망이. 그거면 통조림 세 개. 우린 쇠파이프가 더 많아서 필요 없는데, 애들이 야구 좋아해.", if: "has('야구방망이')" },
      { s: "깍지 패거리", t: "무전기. 그건 안 팔지? 안 팔 거면 꺼내지 마. 욕심나니까.", if: "has('무전기')" },
      { s: "깍지 패거리", t: "줄 게 없네. 그럼 그냥 가. 오늘은 봐주는 날이야.", if: "!has('건전지') && !has('야구방망이')" },
    ],
    choices: [
      { t: "[아이템: 건전지] 건전지 ↔ 해열제", go: "station_kkakji_deal_done", if: "has('건전지')", item: ["-건전지"], fx: { meds: 2 }, set: { "flags.station_gang_deal": true } },
      { t: "[아이템: 야구방망이] 야구방망이 ↔ 통조림", go: "station_kkakji_deal_done", if: "has('야구방망이')", item: ["-야구방망이"], fx: { food: 3 }, set: { "flags.station_gang_deal": true } },
      { t: "거래하지 않는다", go: "station_kkakji" },
    ],
  },
  station_kkakji_deal_done: {
    lines: [
      { s: "깍지 패거리", t: "다음에 또 와. 광장 지나올 때 왼쪽으로. 왼쪽은 우리가 치워 놨어." },
      { t: "거래처. 이 사람들에게 우리는 이제 거래처다. 적보다는 낫다. 친구보다는 못하다." },
      { s: "sib", t: "저 형… 아니 저 사람, 나쁜 사람이야?", if: "flag('station_sib_with')" },
      { s: "me", t: "모르겠어. 나쁜 사람이 저렇게 길을 알려주진 않을 것 같은데." },
    ],
    next: "station_kkakji",
  },
  station_kkakji_story: {
    set: { "flags.station_kkakji_story": true },
    lines: [
      { s: "깍지 패거리", t: "왜 남았냐고. 안 남았어. 못 나간 거지. 2주 전에 봉쇄선까지 갔었어. 오토바이로." },
      { s: "깍지 패거리", t: "검문소에서 열 재더라. 내 동생이 걸렸어. 37.8. 그걸로 끝. 걔만 남으라고 해서 나도 남았지." },
      { t: "드럼통 불이 깍지의 얼굴 반쪽만 비췄다." },
      { s: "깍지 패거리", t: "사흘 뒤에 회색 됐어. 여기 3층 끝 텐트. 아직 거기 있어. 문 잠가 놓고." },
      { s: "sib", t: "…", if: "flag('station_sib_with')" },
      { s: "깍지 패거리", t: "그래서 약을 모으는 거야. 늦었지만. 늦은 걸 아는데도 모으게 되더라. 너네도 그럴 거야.", fx: { mind: -4, trust: 2 } },
      { t: "{{sib}}이 내 손을 잡았다. 열이 있는 손이었다.", if: "flag('station_sib_with') && flag('sib_sick') && !flag('sib_cured')" },
    ],
    next: "station_kkakji",
  },
  station_kkakji_route: {
    lines: [
      { s: "깍지 패거리", t: "봉쇄선? 옥상 올라가 봐. 밤에 검문소 불빛 보여. 동남쪽. 차로 20분, 걸어서 반나절." },
      { s: "깍지 패거리", t: "걸어서는 못 가. 중간에 다 잿빛이야. 차가 있어야 돼. 멀쩡한 차. 기름 든 차." },
      { s: "깍지 패거리", t: "병원 뒤에 구급차 한 대 있어. 키가 없어서 우리도 못 가져갔어. 주민센터 그 아줌마가 열쇠 뭉치를 갖고 있다는 소문은 들었고.", if: "!flag('hosp_ambulance')", set: { "flags.school_amb_hint": true } },
      { s: "깍지 패거리", t: "병원 뒤 구급차, 봤지? 너네 눈 보니까 봤네. 키 구했으면 뒷길로 가. 큰길은 광장이랑 똑같아.", if: "flag('hosp_ambulance')" },
      { s: "깍지 패거리", t: "차 없으면 하나 더. 호수공원 둑길. 농로로 이어져. 외곽 마을 쪽으로 돌아 나가면 검문소 뒤야. 멀어. 근데 비어 있어.", set: { "flags.center_backroad": true } },
      { s: "me", t: "왜 알려주는 거야." },
      { s: "깍지 패거리", t: "우린 안 갈 거니까. 동생 두고 못 가. 그러니까 너네라도 가. 가서 여기 사람 있었다고 말해." },
    ],
    choices: [
      { t: "옥상에 올라가 본다", go: "station_tower_roof", if: "!flag('station_roof_seen')" },
      { t: "고맙다고 하고 내려간다", go: "station_kkakji_leave" },
    ],
  },
  station_tower_roof: {
    bg: "night",
    set: { "flags.station_roof_seen": true },
    lines: [
      { t: "옥상. 해가 지고 있었다. 동탄이 발밑에 전부 있었다. 불 켜진 창은 세 개. 셀 수 있었다." },
      { t: "동남쪽. 지평선에 흰 불빛 한 줄. 검문소. 봉쇄선. 거기까지가 사람의 땅이다." },
      { s: "sib", t: "저기가 끝이야? 저기만 가면 돼?", if: "flag('station_sib_with')" },
      { s: "me", t: "저기까지가 문제야." },
      { t: "눈이 내리기 시작했다. 불빛이 흐려졌다 또렷해졌다 했다.", if: "S.weather == '첫눈' || S.weather == '눈'" },
      { t: "주차타워 3층 끝 텐트. 지퍼가 잠겨 있고 안에서 천천히 뭔가 움직이는 소리.", if: "flag('station_kkakji_story')", fx: { mind: -3 } },
      { t: "검문소 불빛을 눈에 넣었다. 돌아가는 길 내내 눈을 감아도 보였다.", fx: { mind: 4 } },
    ],
    next: "station_kkakji_leave",
  },
  station_kkakji_apology: {
    lines: [
      { s: "me", t: "병원에서는 미안했어. 약이 급했어." },
      { s: "깍지 패거리", t: "급한 건 다 급해. 우리 애 손가락 두 개 부러졌어." },
      { t: "침묵. 드럼통 불이 탁 소리를 냈다." },
      { s: "깍지 패거리", t: "…됐어. 손가락은 붙어. 대신 다음에 병원에서 마주치면 길 비켜. 그게 사과야." },
    ],
    choices: [
      { t: "알았다", go: "station_kkakji", set: { "flags.station_gang_enemy": false, "flags.hosp_gang_truce": true, "flags.station_gang_deal": true }, fx: { mind: 3 } },
      { t: "길은 못 비킨다. 우리도 급하다", go: "station_kkakji_leave", set: { "flags.station_gang_enemy": true } },
    ],
  },
  station_kkakji_leave: {
    lines: [
      { t: "1층 입구. 오토바이 네 대 사이로 걸어 나왔다. 2층 난간의 남자가 담배를 비벼 껐다." },
      { s: "깍지 패거리", t: "왼쪽으로 가. 왼쪽.", if: "flag('station_gang_deal') && !flag('station_gang_enemy')" },
      { s: "깍지 패거리", t: "다시 오지 마. 다음엔 손님 아니야.", if: "flag('station_gang_enemy')" },
      { s: "sib", t: "…저 사람 동생, 아직 거기 있댔지.", if: "flag('station_sib_with') && flag('station_kkakji_story')" },
      { s: "me", t: "응." },
      { s: "sib", t: "나는 그러지 마. 내가 그렇게 되면. 문 잠그고 3층에 두지 마.", if: "flag('station_sib_with') && flag('station_kkakji_story')", fx: { trust: 4, mind: -4 } },
    ],
    next: "station_leave",
  },
  station_r_tower: {
    bg: "station",
    lines: [
      { t: "주차타워. 2층 난간. 오늘은 둘이 앉아 있다." },
      { s: "깍지 패거리", t: "거래처 왔네. 뭐 가져왔어.", if: "flag('station_gang_deal') && !flag('station_gang_enemy')" },
      { t: "쇠파이프가 먼저 내려왔다. 말은 그 다음이었다. 『꺼져.』", if: "flag('station_gang_enemy')" },
      { s: "깍지 패거리", t: "민재 걔 상가 잘 들어갔어? 박 사장한테 우리 욕 많이 했겠네.", if: "flag('station_minjae_rescued') && !flag('station_gang_enemy')" },
      { t: "3층 끝 텐트 쪽이 조용하다. 지퍼가 열려 있다. 깍지는 그쪽을 보지 않는다.", if: "flag('station_kkakji_story') && S.flags.station_visits >= 3", fx: { mind: -3 } },
    ],
    choices: [
      { t: "거래한다", go: "station_kkakji_deal", if: "!flag('station_gang_enemy')" },
      { t: "봉쇄선 길을 다시 묻는다", go: "station_kkakji_route", if: "!flag('station_gang_enemy')" },
      { t: "[깍지와 적대] 사과하러 왔다", go: "station_kkakji_apology", if: "flag('station_gang_enemy')" },
      { t: "돌아선다", go: "station_arrive" },
    ],
  },

  /* ---------- 귀가 ---------- */
  station_leave: {
    bg: "street",
    lines: [
      { t: "돌아가는 길. 고가 위에서 광장을 한 번 더 봤다. 버스 두 대. 잿빛 서른." },
      { t: "방송이 들렸다. 내 목소리였다.", if: "flag('station_speaker_warned')" },
      { t: "방송은 없었다. 대신 동탄 전체가 광장처럼 조용했다.", if: "flag('station_speaker_off')" },
      { s: "민재", t: "저 여기서 상가로 갈게요. 고마워요. 진짜로.", if: "flag('station_minjae_rescued') && !flag('station_minjae_thanked')", set: { "flags.station_minjae_thanked": true, "flags.mall_minjae_friend": true } },
      { s: "sib", t: "…토요일에 버스 안 오는 거, 이제 확실하지?", if: "flag('station_sib_with') && flag('info_fake')" },
      { s: "me", t: "확실해. 그러니까 다른 길로 가는 거야." },
      { t: "집 현관. 잠금장치를 열기 전에 어깨를 확인했다. 아직 괜찮다. 아직.", if: "flag('me_bitten') && !flag('me_cured')" },
      { t: "{{sib}}이 현관에서 기다리고 있었다. 담요를 둘러쓴 채로. 열이 더 오른 것 같았다.", if: "!flag('station_sib_with') && flag('sib_sick') && !flag('sib_cured')", fx: { sib: -3 } },
      { t: "{{sib}}이 현관에서 기다리고 있었다. 자지 않고.", if: "!flag('station_sib_with') && !(flag('sib_sick') && !flag('sib_cured'))", fx: { trust: 2 } },
    ],
    next: "@home",
  },
});
