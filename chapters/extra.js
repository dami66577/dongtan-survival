// chapters/extra.js — 추가 사건 모음 (다른 AI가 쓴 분량을 여기에 붙인다). hook 으로 기존 씬 앞에 끼어든다.
Object.assign(SCENES, {
  extra_sample_cat: {
    hook: { at: "home_hub", if: "S.day >= 2 && !flag('school_jungwoo_join')", chance: 0.25 },
    bg: "home",
    lines: [
      { t: "현관 밖에서 긁는 소리. 회색인은 긁지 않는다. 긁는 건 발톱이 있는 쪽이다." },
      { s: "sib", t: "야. 고양이야. 진짜 고양이." },
      { t: "문구멍 너머, 잿빛 고양이 한 마리가 복도 바닥에 앉아 이쪽을 보고 있었다." },
    ],
    choices: [
      { t: "참치캔 하나를 문틈으로 밀어 준다", go: "extra_sample_cat_feed", fx: { food: -1, trust: 4, mind: 5 } },
      { t: "모른 척한다. 먹을 게 없다", go: "extra_sample_cat_ignore", fx: { trust: -2 } },
    ],
  },
  extra_sample_cat_feed: {
    lines: [
      { s: "sib", t: "쟤 이름 회색이로 하자. 정우네 고양이도 회색이라며.", if: "flag('school_jungwoo')" },
      { s: "sib", t: "쟤 이름 뭐로 하지. 참치?" },
      { s: "me", t: "먹이 한 번 줬다고 우리 고양이 아니야." },
      { t: "고양이는 캔을 다 비우고도 가지 않았다. {{sib}}이 문에 기대앉아 한참을 들여다봤다." },
    ],
    next: "@back",
  },
  extra_sample_cat_ignore: {
    lines: [
      { s: "sib", t: "…알았어. 우리도 없지." },
      { t: "긁는 소리는 한참 뒤에 멎었다. {{sib}}은 그 뒤로 한동안 말을 하지 않았다." },
    ],
    next: "@back",
  },
});

// ===== 챗지피티 작성분 =====
Object.assign(SCENES, {
  extra_piano_start: {
    hook: { at: "home_hub", if: "S.day >= 2 && !flag('extra_piano_seen')", chance: 0.25 },
    bg: "home",
    set: { "flags.extra_piano_seen": true },
    lines: [
      { t: "윗집의 피아노는 며칠째 같은 시각에 시작한다. 세 마디를 치고, 마지막 음 하나를 남긴다." },
      { s: "sib", t: "위층은 출석 체크를 피아노로 하나 봐." },
      { t: "전기가 끊겨도 나무와 철사는 자기 일을 한다. 사람보다 성실하다." },
      { s: "me", t: "오늘도 마지막 음은 안 치네." },
      { t: "{{sib}}가 천장을 올려다봤다. 이번에는 시끄럽다는 표정이 아니었다." }
    ],
    choices: [
      { t: "동생과 13층으로 올라간다", go: "extra_piano_landing", if: "S.sib >= 40 && !flag('sib_sick')" },
      { t: "연주가 끝난 뒤의 소리까지 들어 본다", go: "extra_piano_listen" },
      { t: "오늘은 그냥 두고 할 일을 한다", go: "extra_piano_leave" }
    ]
  },

  extra_piano_landing: {
    bg: "home",
    lines: [
      { t: "13층 문에는 안내문이 붙어 있었다. 『연주 중에는 두드리지 마세요』." },
      { s: "sib", t: "지금도 민원은 받는대?" },
      { s: "me", t: "아래쪽도 봐." },
      { s: "sib", t: "『세 마디가 멎으면, 두 번』. 소음 안내문이 아니었네." },
      { t: "우리 기척에도 세 마디는 흔들리지 않았다. 문 아래에는 빈 접시가 놓여 있었다." }
    ],
    choices: [
      { t: "연주가 끝나면 문을 두 번 두드린다", go: "extra_piano_reply" },
      { t: "[식량 1] 한 끼를 놓고 두 번 두드린다", go: "extra_piano_food", if: "S.food >= 1", fx: { food: -1 } },
      { t: "기척을 줄이고 내려간다", go: "extra_piano_leave" }
    ]
  },

  extra_piano_listen: {
    bg: "home",
    lines: [
      { t: "피아노가 멎자 옆벽에서 짧은 소리가 두 번 났다. 조금 뒤에는 배관이 두 번 울렸다." },
      { s: "sib", t: "옆집에서도 들은 거지?" },
      { s: "me", t: "한 집만은 아닌 것 같아." },
      { t: "소리는 서로 겹치지 않았다. 누구도 크게 두드리지 않았다." },
      { s: "sib", t: "접속 확인이네. 친구 목록이 전부 벽 뒤에 있고." }
    ],
    choices: [
      { t: "천장을 조심스럽게 두 번 두드린다", go: "extra_piano_reply" },
      { t: "다른 집들의 응답만 듣는다", go: "extra_piano_leave" }
    ]
  },

  extra_piano_reply: {
    bg: "home",
    fx: { mind: 3, trust: 1 },
    set: { "flags.extra_piano_answered": true },
    lines: [
      { t: "내가 두 번 두드리자 피아노가 낮은 음 하나로 답했다." },
      { s: "me", t: "들었네." },
      { s: "sib", t: "그래서 매일 치는 거였나." },
      { s: "me", t: "적어도 오늘은." },
      { t: "이 건물에 이웃이 몇 명 남았는지는 여전히 모른다. 영 명은 아니었다." }
    ],
    next: "@back"
  },

  extra_piano_food: {
    bg: "home",
    fx: { mind: 2, trust: 3 },
    set: { "flags.extra_piano_food_left": true },
    lines: [
      { t: "빈 접시에 포장을 벗기지 않은 한 끼를 놓았다. 문은 열리지 않았다." },
      { s: "me", t: "먹을 걸 놓고 갑니다." },
      { s: "sib", t: "내일부터 답례 연주 두 배 되는 거 아냐?" },
      { s: "me", t: "한 곡이면 돼." },
      { t: "계단을 내려올 때 접시가 끌리는 소리가 났다. 우리는 돌아보지 않았다." }
    ],
    next: "@back"
  },

  extra_piano_leave: {
    bg: "home",
    lines: [
      { t: "우리는 집 안쪽으로 돌아왔다. 피아노 소리는 더 이어지지 않았다." },
      { s: "sib", t: "끝까지 알아보지는 않는 거지." },
      { s: "me", t: "오늘은." },
      { s: "sib", t: "그럼 내일도 같은 시각엔 귀만 열어 놓자." },
      { t: "나는 고개를 끄덕였다. 내일이라는 말을 할 때 필요한 준비는 그 정도였다." }
    ],
    next: "@back"
  },

  extra_door_start: {
    hook: { at: "home_night_event", if: "S.day >= 2 && !flag('extra_door_seen')", chance: 0.3 },
    bg: "night",
    set: { "flags.extra_door_seen": true },
    lines: [
      { t: "불이 끊긴 복도에서 우리 집 호수가 불렸다. 두 번. 세 번째에는 노크가 따라왔다." },
      { s: "sib", t: "엄마 목소리 같은데." },
      { t: "인터폰 화면은 검었다. 목소리의 끝이 익숙했다. 처음은 잘 모르겠다." },
      { s: "me", t: "조용히 해. 먼저 들어 보자." },
      { t: "문밖에서는 다시 우리 집 호수가 나왔다. 기다려 달라는 말은 없었다." }
    ],
    choices: [
      { t: "문을 잠근 채 질문한다", go: "extra_door_question" },
      { t: "[손전등] 잠금쇠를 확인하고 문밖 소리를 듣는다", go: "extra_door_light", if: "has('손전등')" },
      { t: "아무 소리도 내지 않고 문에서 떨어진다", go: "extra_door_silent" }
    ]
  },

  extra_door_question: {
    bg: "night",
    lines: [
      { t: "나는 문에서 한 걸음 떨어진 채 입을 열었다." },
      { s: "me", t: "여기 사는 사람 이름을 말해 봐요." },
      { t: "문밖에서는 우리 집 호수가 다시 나왔다. 억양까지 같았다." },
      { s: "sib", t: "말끝 끊기는 데도 똑같아." },
      { s: "me", t: "바퀴 소리만 달라." }
    ],
    choices: [
      { t: "문을 열지 않겠다고 알린다", go: "extra_door_warn" },
      { t: "질문을 멈추고 소리의 간격을 센다", go: "extra_door_count" },
      { t: "[손전등] 잠금쇠를 확인하고 문밖 소리를 듣는다", go: "extra_door_light", if: "has('손전등')" }
    ]
  },

  extra_door_light: {
    bg: "night",
    lines: [
      { t: "손전등으로 잠금쇠부터 확인했다. 문밖에서 작은 바퀴가 구르는 듯한 소리가 나다가 멎었다." },
      { s: "sib", t: "엄마가 수레를 끌고 왔어?" },
      { s: "me", t: "목소리가 너무 낮은 데서 나와." },
      { t: "호수 낭독이 반복될 때마다 끝에 짧은 잡음이 붙었다. 바퀴가 구르는 듯한 소리가 다시 났다." },
      { s: "sib", t: "저 잡음까지 매번 똑같아." }
    ],
    choices: [
      { t: "문을 열지 않겠다고 알린다", go: "extra_door_warn" },
      { t: "불을 끄고 소리의 간격을 센다", go: "extra_door_count" },
      { t: "더 확인하지 않고 문에서 떨어진다", go: "extra_door_silent" }
    ]
  },

  extra_door_warn: {
    bg: "night",
    fx: { mind: -2, trust: 2 },
    set: { "flags.extra_door_warned": true },
    lines: [
      { t: "나는 문손잡이를 잡지 않은 채 목소리만 낮췄다." },
      { s: "me", t: "그만 두드리세요. 안 엽니다." },
      { s: "sib", t: "그렇게 말하면 우리가 있다는 거 알잖아." },
      { s: "me", t: "이 문은 안 열린다는 것도." },
      { t: "잠깐 뒤 바퀴가 멀어졌다. 같은 목소리가 다음 집 호수를 불렀다." }
    ],
    next: "@back"
  },

  extra_door_count: {
    bg: "night",
    fx: { mind: 1, trust: 2 },
    set: { "flags.extra_door_pattern": true },
    lines: [
      { t: "{{sib}}가 내 손바닥에 손가락을 하나씩 접었다. 다시 폈다. 다시 접었다." },
      { s: "sib", t: "일곱 번. 매번 일곱까지 세면 또 불러." },
      { s: "me", t: "대답을 듣고 있는 건 아닌 것 같아." },
      { s: "sib", t: "그럼 우리도 대답 안 해." },
      { t: "복도의 소리가 옆집으로 옮겨갔다. 사람인지 장치인지 모를 것은 끝내 문을 통과하지 못했다." }
    ],
    next: "@back"
  },

  extra_door_silent: {
    bg: "night",
    fx: { mind: -2, trust: 3 },
    lines: [
      { t: "나는 {{sib}}의 손등을 눌렀다. 문에서 떨어진 뒤에도 그 손은 빼지 않았다." },
      { s: "sib", t: "엄마 아니라고 말해 줘." },
      { s: "me", t: "아직 몰라." },
      { s: "sib", t: "그럼 모르는 사람한테 문 안 열어." },
      { t: "노크는 한동안 더 이어졌다. 우리는 확인하지 않은 것을 확인했다고 말하지 않았다." }
    ],
    next: "@back"
  },

  extra_truck_start: {
    hook: { at: "mall_enter", if: "S.day >= 2 && S.sib >= 40 && !flag('sib_sick') && !flag('extra_truck_seen')", chance: 0.3 },
    bg: "street",
    set: { "flags.extra_truck_seen": true },
    lines: [
      { t: "오늘은 {{sib}}도 나란히 상가까지 함께 간다. 버려진 택배 트럭 주위의 상자들을 11월 바람이 밀고 있었다." },
      { s: "sib", t: "대한민국 마지막 무료배송이네." },
      { t: "적재함 안에서 금속을 두드리는 소리가 났다. 두 번 울리고 멎었다." },
      { s: "me", t: "아직 배송 중인가 봐. 사람이." },
      { t: "문틈으로 손가락이 나왔다가 들어갔다. 손톱 밑에 검은 먼지가 끼어 있었다." }
    ],
    choices: [
      { t: "뒷문의 잠금장치를 살핀다", go: "extra_truck_latch" },
      { t: "안의 사람과 먼저 말한다", go: "extra_truck_talk" },
      { t: "차량을 멀리 돌아간다", go: "extra_truck_leave" }
    ]
  },

  extra_truck_latch: {
    bg: "street",
    lines: [
      { t: "문은 잠긴 게 아니었다. 바깥 고리에 철제 손수레가 넘어져 걸려 있었다." },
      { s: "sib", t: "누가 일부러 막아 둔 거야?" },
      { s: "me", t: "쓰러진 것 같아. 바퀴 자국 봐." },
      { t: "문틈의 손에는 잿빛이 보이지 않았다. 손등에 배송 호수가 볼펜으로 빼곡했다." },
      { s: "sib", t: "저 사람 손이 배달 앱이네." }
    ],
    choices: [
      { t: "손수레를 당겨 문을 열어 준다", go: "extra_truck_free" },
      { t: "[의약품 1] 식량과의 교환을 제안한다", go: "extra_truck_trade", if: "S.meds >= 1" },
      { t: "주변의 발소리가 가까워지기 전에 떠난다", go: "extra_truck_leave" }
    ]
  },

  extra_truck_talk: {
    bg: "street",
    lines: [
      { t: "안의 남자는 배송기사라고 했다. 『발목이 돌아갔어요. 문만 열어 주면 되는데』." },
      { s: "me", t: "물린 건 아니죠?" },
      { t: "『어제부터 다들 그 말만 해요. 문 열어 줄 거냐는 말은 아무도 안 하고』." },
      { s: "sib", t: "먹을 것도 있대?" },
      { s: "me", t: "{{sib}}, 그 질문은 조금 뒤에." }
    ],
    choices: [
      { t: "문을 막은 손수레부터 치운다", go: "extra_truck_free" },
      { t: "[의약품 1] 남자의 식량과 교환한다", go: "extra_truck_trade", if: "S.meds >= 1" },
      { t: "더 지체하지 않고 떠난다", go: "extra_truck_leave" }
    ]
  },

  extra_truck_free: {
    bg: "street",
    fx: { hp: -4, trust: 3, mind: 2 },
    set: { "flags.extra_truck_freed": true },
    lines: [
      { t: "둘이 손수레를 당기자 문이 벌어졌다. 내 손등이 철판에 쓸렸다." },
      { s: "sib", t: "탈출 성공. 배송 완료 버튼은 어디 있대?" },
      { s: "me", t: "걸을 수 있어요?" },
      { t: "남자는 한 발로 내려와 이름표를 떼었다. 『오늘은 여기까지요』." },
      { s: "sib", t: "그 말은 좀 부럽다." }
    ],
    next: "@back"
  },

  extra_truck_trade: {
    bg: "street",
    fx: { meds: -1, food: 2, trust: 1 },
    set: { "flags.extra_truck_freed": true, "flags.extra_truck_traded": true },
    lines: [
      { t: "문틈으로 의약품을 밀어 넣었다. 돌아온 봉투에는 통조림 두 끼가 있었다." },
      { s: "sib", t: "우리가 택배비 낸 거야?" },
      { s: "me", t: "교환한 거야." },
      { s: "sib", t: "영수증은 없네. 환불도 없겠고." },
      { t: "남자가 바퀴 고리를 가리켰다. 당기지 말고 들어 올리라는 뜻이었다. 문은 생각보다 쉽게 열렸다." }
    ],
    next: "@back"
  },

  extra_truck_leave: {
    bg: "street",
    fx: { mind: -2 },
    lines: [
      { t: "나는 트럭을 돌아 나왔다. 등 뒤에서 금속을 두드리는 소리가 두 번 났다." },
      { s: "sib", t: "우리가 문 못 연 거랑 안 연 거랑 달라?" },
      { s: "me", t: "달라." },
      { s: "sib", t: "그럼 못 들은 척은 하지 말자." },
      { t: "나는 다음 골목까지 상자에 찍힌 화살표만 보았다. 전부 위를 가리켰다." }
    ],
    next: "@back"
  },

  extra_dog_start: {
    hook: { at: "school_enter", if: "S.day >= 2 && S.sib >= 40 && !flag('sib_sick') && !flag('extra_dog_seen')", chance: 0.3 },
    bg: "school",
    set: { "flags.extra_dog_seen": true },
    lines: [
      { t: "오늘은 {{sib}}와 함께 동생 학교로 간다. 운동장 가장자리에서 개 한 마리가 낙엽을 밟으며 목줄 끝을 맴돌았다." },
      { s: "sib", t: "목줄은 새것 같은데. 주인이 근처에 있나." },
      { t: "개가 짧게 짖었다. 급식실 쪽의 회색인이 천천히 고개를 들었다." },
      { s: "me", t: "한 번 더 짖으면 저쪽이 돌아봐." },
      { t: "목줄은 가로등 아래에 묶여 있었다. 개가 당길 때마다 매듭이 더 작아졌다." }
    ],
    choices: [
      { t: "몸을 낮추고 천천히 가까이 간다", go: "extra_dog_soothe" },
      { t: "담장을 끼고 매듭 쪽으로 접근한다", go: "extra_dog_knot" },
      { t: "개와 회색인 양쪽의 시야에서 벗어난다", go: "extra_dog_leave" }
    ]
  },

  extra_dog_soothe: {
    bg: "school",
    lines: [
      { t: "개는 내가 가까이 갈수록 입을 다물었다. 대신 앞발이 잘게 떨렸다." },
      { s: "sib", t: "게임에서는 손 내밀면 바로 친구 되던데." },
      { s: "me", t: "여기는 저장이 안 돼." },
      { t: "나는 손바닥을 낮게 폈다. 빈손이라는 사실이 개에게도 보였다." },
      { s: "sib", t: "과자 이름은 알아들을까." }
    ],
    choices: [
      { t: "[식량 1] 먹을 것으로 달래며 목줄을 푼다", go: "extra_dog_free", if: "S.food >= 1", fx: { food: -1 }, set: { "flags.extra_dog_fed": true } },
      { t: "반대편에 돌을 던져 빠져나갈 시간을 번다", go: "extra_dog_divert" },
      { t: "개가 다시 짖기 전에 물러난다", go: "extra_dog_leave" }
    ]
  },

  extra_dog_knot: {
    bg: "school",
    lines: [
      { t: "담장을 따라 웅크리고 들어가자 가로등 밑의 매듭이 손에 닿았다." },
      { s: "sib", t: "맨손으로 풀려?" },
      { s: "me", t: "손가락 두 개는 들어가." },
      { t: "개가 내 움직임을 따라 몸을 돌렸다. 줄이 느슨해진 쪽은 회색인이 있는 방향이었다." },
      { s: "sib", t: "야. 그냥 풀어 주면 도망갈 방향이 저쪽이야." }
    ],
    choices: [
      { t: "[식칼] 줄을 끊고 개를 담장 쪽으로 이끈다", go: "extra_dog_free", if: "has('식칼')" },
      { t: "돌을 반대편으로 던져 회색인을 돌려세운다", go: "extra_dog_divert" },
      { t: "손을 빼고 물러선다", go: "extra_dog_leave" }
    ]
  },

  extra_dog_free: {
    bg: "school",
    fx: { trust: 3, mind: 2 },
    set: { "flags.extra_dog_saved": true },
    lines: [
      { t: "목줄에서 벗어나자 개는 내 뒤에 잠깐 몸을 붙였다. 따뜻한 무게였다." },
      { s: "sib", t: "집까지 따라오면 어쩌지?" },
      { s: "me", t: "그건 그때 정하자." },
      { t: "개는 담장 밖에서 한 번 돌아봤다. 그리고 가로수 사이로 혼자 빠져나갔다." },
      { s: "sib", t: "너도 갈 데가 있으면 좋겠다." }
    ],
    next: "@back"
  },

  extra_dog_divert: {
    bg: "school",
    fx: { hp: -5, trust: 2 },
    set: { "flags.extra_dog_saved": true, "flags.extra_dog_noise": true },
    lines: [
      { t: "돌이 빈 철제 통에 부딪혔다. 회색인이 소리 쪽으로 몸을 돌렸다." },
      { s: "me", t: "지금. 담장 쪽으로만 와." },
      { s: "sib", t: "알았어. 개보다 내 목줄이 필요하겠네." },
      { t: "매듭을 풀고 빠져나오다 내 팔이 울타리에 긁혔다. 개는 우리보다 먼저 가로수 사이로 사라졌다." },
      { s: "sib", t: "다 뛰었는데 체육 점수는 아무도 안 주네." }
    ],
    next: "@back"
  },

  extra_dog_leave: {
    bg: "school",
    fx: { mind: -2 },
    lines: [
      { t: "나는 {{sib}}를 데리고 담장 모퉁이 뒤로 물러났다. 개는 보이지 않게 됐다." },
      { s: "sib", t: "다른 사람이 풀어 줄 수도 있겠지?" },
      { s: "me", t: "그럴 수 있어." },
      { s: "sib", t: "그건 약속은 아니지." },
      { t: "나는 대답 대신 동생의 소매를 놓았다. 잡고 있던 자리만 구겨져 있었다." }
    ],
    next: "@back"
  },

  extra_pram_start: {
    hook: { at: "hosp_enter", if: "S.day >= 2 && S.hp > 10 && S.sib >= 40 && !flag('sib_sick') && !flag('extra_pram_seen')", chance: 0.28 },
    bg: "street",
    set: { "flags.extra_pram_seen": true },
    lines: [
      { t: "대학병원으로 가는 길. 오늘은 {{sib}}도 같이 나왔다." },
      { t: "횡단보도 한가운데 유모차가 멈춰 있다. 덮개 아래에서 아이 우는 소리가 난다." },
      { s: "sib", t: "야. 저거 그냥 지나가면 안 되는 거지." },
      { s: "me", t: "먼저 봐야 해. 주변부터." },
      { s: "sib", t: "이런 때도 순서가 있네. 씨…" }
    ],
    choices: [
      { t: "차량 뒤에 몸을 가리며 유모차 가까이 간다", go: "extra_pram_close" },
      { t: "건너편 그늘에서 울음소리를 더 듣는다", go: "extra_pram_listen" },
      { t: "유모차에 손대지 않고 우회한다", go: "extra_pram_leave" }
    ]
  },

  extra_pram_close: {
    bg: "street",
    lines: [
      { t: "옆으로 다가가 덮개 틈을 본다. 좌석에는 아이 대신 수건과 작은 녹음기가 있다." },
      { s: "sib", t: "없어. 안에 아무도 없어." },
      { s: "me", t: "목소리만 두고 갔네." },
      { s: "sib", t: "누가 두고 갔는지는 찾지 말자. 제발." },
      { t: "길 건너 회색인 둘이 고개를 돌린다. 발은 느리지만 방향은 정확하다." }
    ],
    choices: [
      { t: "[손전등] 빛으로 틈을 만들고 전원을 끈다", go: "extra_pram_off", if: "has('손전등')" },
      { t: "좁은 차 사이로 몸을 밀어 넣고 전원을 끈다", go: "extra_pram_off", fx: { hp: -4 }, set: { "flags.extra_pram_scraped": true } },
      { t: "빈 공사장 쪽으로 유모차를 밀어 길을 비운다", go: "extra_pram_roll", fx: { hp: -2 } },
      { t: "차량 사이로 빠져나가 우회한다", go: "extra_pram_leave" }
    ]
  },

  extra_pram_listen: {
    bg: "street",
    lines: [
      { t: "울음 끝에 짧은 기침이 붙는다. 잠시 뒤, 같은 기침이 같은 자리에서 나온다." },
      { s: "sib", t: "방금 그거 아까도 했어. 숨 넘어가는 데까지 똑같아." },
      { s: "me", t: "반복 재생 같아." },
      { s: "sib", t: "같다는 거랑 확실한 거랑 다르잖아." },
      { t: "덮개 틈으로 작은 불빛이 깜박인다. 회색인 둘은 울음소리를 향해 횡단보도로 들어선다." }
    ],
    choices: [
      { t: "[손전등] 회색인을 멈칫하게 하고 안쪽을 확인한다", go: "extra_pram_off", if: "has('손전등')" },
      { t: "좁은 차 사이로 몸을 밀어 넣어 안쪽을 확인하고 소리를 끈다", go: "extra_pram_off", fx: { hp: -4 }, set: { "flags.extra_pram_scraped": true } },
      { t: "좌석이 비었는지 확인한 뒤 공사장 쪽으로 민다", go: "extra_pram_roll", fx: { hp: -2 } },
      { t: "지금 생긴 틈으로 우회한다", go: "extra_pram_leave" }
    ]
  },

  extra_pram_off: {
    bg: "street",
    set: { "flags.extra_pram_stopped": true },
    fx: { trust: 3, mind: 2 },
    lines: [
      { t: "빈 좌석의 수건을 젖히고 녹음기 버튼을 누른다. 울음이 문장 중간에서 잘리듯 끊긴다." },
      { t: "차체에 긁힌 팔이 쓰라렸다. 나는 찢어진 소매를 눌러 잡았다.", if: "flag('extra_pram_scraped')" },
      { s: "sib", t: "아기가 아니라서 다행인데, 다행이라고 하기도 이상해." },
      { s: "me", t: "그냥 없는 것까지 확인한 거야." },
      { s: "sib", t: "응. 그걸로 하자." },
      { t: "우리는 차 사이로 몸을 뺀다. 회색인들은 마지막 소리가 난 빈 유모차를 향해 계속 걷는다." }
    ],
    next: "@back"
  },

  extra_pram_roll: {
    bg: "street",
    set: { "flags.extra_pram_moved": true },
    fx: { mind: -2, trust: 1 },
    lines: [
      { t: "좌석에는 수건과 녹음기뿐이다. 브레이크를 풀다 손목을 찧고, 유모차를 비어 있는 공사장 경사로로 밀어 보낸다." },
      { s: "sib", t: "울음이 걸어가는 것 같아." },
      { s: "me", t: "길은 비었어. 건너자." },
      { s: "sib", t: "그래. 해결한 건 아니고, 지나갈 수는 있게 됐네." },
      { t: "회색인들이 유모차를 따라 방향을 바꾼다. 우리는 그들이 비운 횡단보도를 건넌다." }
    ],
    next: "@back"
  },

  extra_pram_leave: {
    bg: "street",
    lines: [
      { t: "나는 {{sib}}의 소매를 잡고 차량 뒤로 물러난다." },
      { s: "sib", t: "손은 안 잡아도 돼. 안 떨어질 거니까." },
      { s: "me", t: "소매야." },
      { t: "소매를 놓지는 않았다. {{sib}}도 빼지 않았다." },
      { t: "다음 모퉁이를 돌 때까지 울음이 들렸다. 길은 계속 있었다." }
    ],
    next: "@back"
  },

  extra_board_start: {
    hook: { at: "center_enter", if: "S.day >= 2 && !flag('extra_board_seen')", chance: 0.3 },
    bg: "center",
    set: { "flags.extra_board_seen": true },
    lines: [
      { t: "동탄 주민센터 앞에 생존자 교환 게시판이 생겼다. 최 주무관이 들뜬 테이프를 다시 누르고 있다." },
      { t: "물과 건전지를 바꾸자는 종이들 아래, 아버지의 이름과 어머니의 이름이 나란히 적혀 있다. 그 밑에는 『두 분의 가족을 찾습니다』." },
      { s: "me", t: "이거 누가 붙였어요." },
      { s: "최 주무관", t: "우선 어느 쪽지인지 짚어 주세요. 손이 떨리셔서 안 보입니다." },
      { s: "me", t: "이 두 사람요. 우리 부모님이에요." }
    ],
    choices: [
      { t: "접수 날짜와 작성자를 확인한다", go: "extra_board_date" },
      { t: "쪽지를 떼지 않고 뒷면까지 살핀다", go: "extra_board_back" },
      { t: "이름만 기억하고 물러난다", go: "extra_board_leave" }
    ]
  },

  extra_board_date: {
    bg: "center",
    lines: [
      { t: "최 주무관이 종이 모서리에 작게 적힌 날짜를 가리킨다. 어제다." },
      { s: "me", t: "그럼 어제까지 두 분이……." },
      { s: "최 주무관", t: "붙인 날짜입니다. 살아 계신 걸 확인한 날짜가 아닙니다." },
      { s: "me", t: "네. 확인된 것만 말씀해 주세요." },
      { t: "최 주무관은 접수한 사람의 신원도 확인하지 못했다고 말한다. 날짜 하나가 조금 전보다 작아 보인다." }
    ],
    choices: [
      { t: "거처를 밝히지 않는 답장을 남긴다", go: "extra_board_reply" },
      { t: "날짜와 미확인 사항까지 그대로 옮겨 적는다", go: "extra_board_copy" },
      { t: "추가 정보는 남기지 않는다", go: "extra_board_leave" }
    ]
  },

  extra_board_back: {
    bg: "center",
    lines: [
      { t: "테이프 한쪽을 들고 종이를 뒤집는다. 뒷면에는 『읽으신 가족은 답을 남겨 주세요』라고 적혀 있다." },
      { s: "me", t: "부모님 글씨는 아니에요." },
      { s: "최 주무관", t: "대신 적어 준 사람일 수도 있습니다. 이름을 어디서 얻었는지는 모릅니다." },
      { s: "me", t: "답장에 집 주소를 쓰는 건 안 되겠죠." },
      { t: "최 주무관이 바로 고개를 끄덕인다. 종이에는 접수 날짜 외에 작성자를 확인할 단서가 없다." }
    ],
    choices: [
      { t: "이곳에만 소식을 남겨 달라고 답한다", go: "extra_board_reply" },
      { t: "앞뒤 내용을 모두 옮겨 적는다", go: "extra_board_copy" },
      { t: "종이를 원래대로 붙이고 물러난다", go: "extra_board_leave" }
    ]
  },

  extra_board_reply: {
    bg: "center",
    set: { "flags.extra_board_reply": true },
    fx: { mind: 2 },
    lines: [
      { t: "나는 아래쪽에 작은 답장을 붙인다. 『둘은 함께 있습니다. 확인된 소식은 이 게시판에 남겨 주세요』." },
      { s: "최 주무관", t: "집 호수와 다니시는 시간은 적지 마세요." },
      { s: "me", t: "제가 다시 와서 확인할게요." },
      { s: "최 주무관", t: "그때도 먼저 내용을 확인하세요. 이름을 안다고 다 아는 사람은 아닙니다." },
      { t: "답장에는 내가 살아 있다는 사실만 있다. 어디에서 어떻게 살아 있는지는 없다." }
    ],
    next: "@back"
  },

  extra_board_copy: {
    bg: "center",
    set: { "flags.extra_board_copied": true },
    fx: { mind: 1 },
    lines: [
      { t: "이름과 문구를 옮겨 적고, 접수일 옆에 『작성자 미확인』을 덧붙인다." },
      { s: "me", t: "좋은 부분만 기억할까 봐요." },
      { s: "최 주무관", t: "전부 적는 게 맞습니다." },
      { s: "me", t: "{{sib}}한테도 전부 보여 줄게요." },
      { t: "종이를 접는다. 접힌 안쪽에 부모님 이름이 있고, 바깥쪽에는 물음표가 있다." }
    ],
    next: "@back"
  },

  extra_board_leave: {
    bg: "center",
    lines: [
      { t: "나는 이름을 한 번씩 더 읽는다. 제대로 읽었는지 확인할 필요는 없었다." },
      { s: "최 주무관", t: "지금 답을 남기지 않으셔도 됩니다." },
      { s: "me", t: "오늘은 읽은 걸로 할게요." },
      { t: "최 주무관이 종이 가장자리를 다시 눌러 붙인다." },
      { t: "이름 두 개가 게시판에 남는다. 내가 등을 돌린다고 없어지는 것은 아니다." }
    ],
    next: "@back"
  },

  extra_map_start: {
    hook: { at: "home_morning", if: "S.day >= 3 && !flag('sib_sick') && !flag('extra_map_seen')", chance: 0.32 },
    bg: "home",
    set: { "flags.extra_map_seen": true },
    lines: [
      { t: "식탁에 밤새 깎은 연필 부스러기가 수북하다. 어제 빈 종이였던 것이 지도가 되어 있다." },
      { t: "집과 동생 학교, 나란히 상가까지는 알아보겠다. 그 뒤로는 점선이 이어지고 종이 끝이 파랗다." },
      { s: "me", t: "이 끝은 어디야." },
      { s: "sib", t: "바다." },
      { s: "sib", t: "서울 말고. 동탄역도 말고. 나, 거기 가고 싶어." }
    ],
    choices: [
      { t: "왜 바다인지 묻는다", go: "extra_map_why" },
      { t: "확인할 수 있는 길부터 함께 짚는다", go: "extra_map_check" },
      { t: "지금은 갈 수 없다는 말을 먼저 한다", go: "extra_map_later" }
    ]
  },

  extra_map_why: {
    bg: "home",
    lines: [
      { t: "{{sib}}가 파란 부분을 손바닥으로 문지른다. 손날에 색연필 가루가 묻는다." },
      { s: "sib", t: "집도 대피소고 학교도 대피소잖아. 어디 가고 싶냐고 하면 전부 도망갈 데야." },
      { s: "me", t: "바다도 안전한지는 몰라." },
      { s: "sib", t: "알아. 안전해서 고른 건 아니야. 가고 싶어서 골랐지." },
      { t: "나는 지도에서 바다까지의 거리를 재려다 손을 뗀다. 이 종이에는 축척이 없다." }
    ],
    choices: [
      { t: "출발 날짜 없이 목적지로 남겨 둔다", go: "extra_map_keep" },
      { t: "바다는 남기고 가까운 길을 더 정확히 그린다", go: "extra_map_work" },
      { t: "지금은 약속하지 않겠다고 말한다", go: "extra_map_later" }
    ]
  },

  extra_map_check: {
    bg: "home",
    lines: [
      { t: "우리는 길을 아는 부분과 짐작한 부분 사이에 선을 긋는다. 선은 생각보다 집 가까이에 생긴다." },
      { s: "me", t: "여기서부터는 상상이지." },
      { s: "sib", t: "맞아. 상상이라고 써. 길이 있다고 우기는 건 싫어." },
      { s: "me", t: "아는 길도 지금 안전하다는 뜻은 아니고." },
      { t: "{{sib}}가 고개를 끄덕이고 빈칸에 물음표를 넣는다. 지도는 더 지저분해지고 조금 쓸 만해진다." }
    ],
    choices: [
      { t: "바다를 지우지 않고 지도를 보관한다", go: "extra_map_keep" },
      { t: "집 근처의 갈림길과 가릴 곳을 함께 표시한다", go: "extra_map_work" },
      { t: "오늘은 여기까지 그리기로 한다", go: "extra_map_later" }
    ]
  },

  extra_map_keep: {
    bg: "home",
    set: { "flags.extra_map_sea_goal": true },
    fx: { trust: 4, mind: 2 },
    lines: [
      { t: "지도 끝에 도착 날짜 대신 물음표를 하나 그린다." },
      { s: "me", t: "언제 갈지는 약속 못 해. 목적지는 남겨 두자." },
      { s: "sib", t: "예약금은 초코바야." },
      { s: "me", t: "예약금 없는 데로 가." },
      { t: "{{sib}}가 바다 옆에 『예약금 없음』이라고 적는다. 처음으로 지도에 가격이 붙었고, 다행히 감당할 수 있었다." }
    ],
    next: "@back"
  },

  extra_map_work: {
    bg: "home",
    set: { "flags.extra_map_local_notes": true },
    fx: { trust: 3, mind: 2 },
    lines: [
      { t: "우리는 기억나는 담장과 골목을 덧그린다. 직접 확인하지 않은 곳에는 작은 물음표를 남긴다." },
      { s: "sib", t: "내가 그린 것도 쓸 데가 있네." },
      { s: "me", t: "틀린 데를 표시할 줄 알면 쓸 수 있어." },
      { s: "sib", t: "그 말을 수학 시험 볼 때 들었어야 했는데." },
      { t: "바다는 지우지 않았다. 가까운 길을 고친다고 먼 데가 없어질 필요는 없다." }
    ],
    next: "@back"
  },

  extra_map_later: {
    bg: "home",
    set: { "flags.extra_map_deferred": true },
    fx: { trust: -1, mind: 1 },
    lines: [
      { t: "나는 지금 갈 수 없고, 갈 수 있다고 약속할 수도 없다고 말한다." },
      { s: "sib", t: "못 간다는 거랑 가고 싶지도 말라는 거랑은 달라." },
      { s: "me", t: "두 번째 말은 안 했어." },
      { t: "{{sib}}는 바다가 안쪽으로 들어가게 종이를 접는다. 버리지는 않는다." },
      { t: "접힌 지도가 식탁 한쪽에 남는다. 오늘 대답하지 못한 것들은 대체로 자리를 차지한다." }
    ],
    next: "@back"
  },

  extra_mirror_start: {
    hook: { at: "home_hub", if: "S.day >= 2 && !flag('extra_mirror_seen')", chance: 0.25 },
    bg: "home",
    set: { "flags.extra_mirror_seen": true },
    lines: [
      { t: "베란다 유리에 빛이 튄다. 옆 동 옥상 난간에서 누군가 작은 거울을 기울이고 있다." },
      { t: "짧게 셋, 길게 둘, 다시 하나. 다음에는 순서가 달라진다." },
      { s: "sib", t: "야, 모스 부호야?" },
      { s: "me", t: "닮긴 했는데 못 읽겠어." },
      { s: "sib", t: "저쪽도 못 쓰는 걸 수 있잖아." }
    ],
    choices: [
      { t: "창 안쪽에서 손을 들어 한 번 답한다", go: "extra_mirror_answer" },
      { t: "옥상과 건물 주변부터 살핀다", go: "extra_mirror_watch" },
      { t: "커튼을 닫는다", go: "extra_mirror_hide" }
    ]
  },

  extra_mirror_answer: {
    bg: "home",
    lines: [
      { t: "손을 높이 들자 거울이 멈춘다. 옥상에서도 손 하나가 올라온다." },
      { s: "sib", t: "봤다. 우리 봤어." },
      { s: "me", t: "여기까지는 통하네." },
      { s: "sib", t: "서로 모르는 외국어로 인사한 기분이야." },
      { t: "내가 손을 내리자 저쪽도 내린다. 암호를 푼 건 아니다. 서로 보고 있다는 건 알았다." }
    ],
    choices: [
      { t: "살아 있는 사람이 있다는 것만 전한다", go: "extra_mirror_contact" },
      { t: "건물 입구의 위험을 살펴 경고한다", go: "extra_mirror_warn" },
      { t: "더 드러내지 않고 커튼을 닫는다", go: "extra_mirror_hide" }
    ]
  },

  extra_mirror_watch: {
    bg: "home",
    lines: [
      { t: "난간 뒤에 서 있는 사람은 한 명이다. 그 뒤 계단문은 반쯤 열려 있다." },
      { s: "sib", t: "혼자인가?" },
      { s: "me", t: "보이는 건 한 명." },
      { s: "sib", t: "보이는 건. 그래." },
      { t: "시선을 아래로 옮긴다. 건물 출입구 앞에서 회색인 둘이 천천히 방향을 바꾸고 있다." }
    ],
    choices: [
      { t: "창 안쪽에서 손을 들어 존재를 알린다", go: "extra_mirror_contact" },
      { t: "출입구 쪽을 가리키고 위험을 표시한다", go: "extra_mirror_warn" },
      { t: "지켜본 것으로 끝낸다", go: "extra_mirror_hide" }
    ]
  },

  extra_mirror_contact: {
    bg: "home",
    set: { "flags.extra_mirror_contact": true },
    fx: { mind: 3, trust: 1 },
    lines: [
      { t: "나는 천천히 손을 흔든다. 옥상의 사람도 같은 속도로 흔든다." },
      { s: "sib", t: "이제 끝이야?" },
      { s: "me", t: "응. 인사했어." },
      { s: "sib", t: "인사가 이렇게 일 많이 시키는 거였나." },
      { t: "거울이 내려간다. 이름도 사정도 모르지만, 옆 동 옥상은 조금 전보다 덜 비어 보인다." }
    ],
    next: "@back"
  },

  extra_mirror_warn: {
    bg: "home",
    set: { "flags.extra_mirror_warning": true },
    fx: { trust: 3, mind: 1 },
    lines: [
      { t: "출입구 앞 회색인들을 확인하고, 종이에 큰 X를 그려 든다. 이어 건물 아래쪽을 반복해서 가리킨다." },
      { s: "sib", t: "알아들었을까?" },
      { s: "me", t: "계단문 잡으려다 멈췄어." },
      { s: "sib", t: "그럼 한 번 더. X 더 크게 그려." },
      { t: "저쪽 사람이 난간 쪽으로 돌아온다. 정확히 무슨 뜻으로 읽었는지는 모르지만, 당장 내려가지는 않는다." }
    ],
    next: "@back"
  },

  extra_mirror_hide: {
    bg: "home",
    set: { "flags.extra_mirror_closed": true },
    lines: [
      { t: "커튼을 당긴다. 베란다 유리와 우리 얼굴 사이에 천 한 장이 생긴다." },
      { s: "sib", t: "조금 더 볼까?" },
      { s: "me", t: "오늘은 여기까지." },
      { t: "{{sib}}는 커튼을 다시 열지 않는다. 대신 밑단을 본다." },
      { t: "천 아래로 빛이 한 번 더 들어왔다가 사라진다. 끝까지 뜻을 모르는 신호였다." }
    ],
    next: "@back"
  },

  extra_minjae_start: {
    hook: { at: "mall_enter", if: "flag('mall_ally') && !flag('mall_hostile') && !flag('extra_minjae_seen')", chance: 0.3 },
    bg: "street",
    set: { "flags.extra_minjae_seen": true },
    lines: [
      { t: "나란히 상가로 가는 길, 빗물받이 옆에서 신발 한 짝이 내 쪽으로 흔들렸다." },
      { s: "민재", t: "아, 왔네. 지형 확인 중이었어." },
      { t: "민재의 발목은 신발 위로 부어 있었다. 바짓단은 날카로운 철망에 찢겨 있었다." },
      { t: "골목 끝에서 회색인 둘이 걸어 나왔다. 아직 우리 쪽을 보지는 않았다." },
      { s: "me", t: "그럼 이제 서서 확인하자." }
    ],
    choices: [
      { t: "발목을 살피고 부축할 준비를 한다", go: "extra_minjae_carry" },
      { t: "큰길을 피할 샛길부터 찾는다", go: "extra_minjae_path" },
      { t: "민재를 숨겨 두고 상가에서 사람을 데려온다", go: "extra_minjae_fetch" }
    ]
  },

  extra_minjae_carry: {
    bg: "street",
    lines: [
      { t: "민재가 일어나려다 다시 주저앉았다. 웃는 입과 이마의 식은땀이 서로 다른 보고를 했다." },
      { s: "me", t: "그 발로 어디까지 갈 수 있어." },
      { s: "민재", t: "게임이면 상가까지. 현실이면 저 맨홀." },
      { s: "me", t: "현실 쪽으로 견적 내자." },
      { t: "곧장 부축하면 빠르다. 발목을 고정하거나 먼 샛길을 택하면 부담을 나눌 수 있다." }
    ],
    choices: [
      { t: "[의약품 1] 붕대로 발목을 고정하고 부축한다", if: "S.meds >= 1", go: "extra_minjae_saved", fx: { meds: -1, hp: -3 }, set: { "flags.extra_minjae_bandaged": true } },
      { t: "[야구방망이] 지팡이로 짚게 하고 부축한다", if: "has('야구방망이')", go: "extra_minjae_saved", fx: { hp: -5 } },
      { t: "빠른 길 대신 돌아갈 샛길을 확인한다", go: "extra_minjae_path" }
    ]
  },

  extra_minjae_path: {
    bg: "street",
    lines: [
      { t: "주차장 뒤에 사람 하나씩 지날 틈이 있었다. 입구까지는 회색인들의 시야를 가로질러야 했다." },
      { s: "민재", t: "나 혼자 갈 수 있어. 속도가 아주 예술적이라 그렇지." },
      { s: "me", t: "말하는 힘을 왼쪽 다리에 보내." },
      { t: "회색인 하나가 바닥을 긁는 신발 소리에 고개를 들었다. 아직은 걸어오는 거리보다 우리가 돌아갈 거리가 짧았다." },
      { s: "민재", t: "발목한테 전달했는데 읽고 답이 없네." }
    ],
    choices: [
      { t: "[손전등] 잠깐 멈칫하게 한 뒤 함께 틈을 지난다", if: "has('손전등')", go: "extra_minjae_saved", fx: { hp: -2 } },
      { t: "민재의 체중을 받아 빠르게 틈을 지난다", go: "extra_minjae_saved", fx: { hp: -8 } },
      { t: "민재를 먼저 보내고 반대쪽에서 소리를 낸다", go: "extra_minjae_divert", fx: { hp: -10 } },
      { t: "아직 가려진 곳에 숨겨 두고 지원을 데려온다", go: "extra_minjae_fetch" }
    ]
  },

  extra_minjae_saved: {
    bg: "mall",
    set: { "flags.extra_minjae_rescued": true },
    fx: { mind: 2 },
    lines: [
      { t: "치킨집 뒷문에 닿자 민재가 야구 선수처럼 한쪽 발로 바닥을 쓸었다. 세이프 판정은 아무도 해 주지 않았다." },
      { s: "민재", t: "보고서에는 내가 너 엄호했다고 써도 돼?" },
      { s: "me", t: "철자는 틀리지 마." },
      { t: "박 사장이 빈 의자를 끌어왔다. 민재의 허세보다 먼저 발목을 봤다." },
      { s: "박 사장", t: "어이, 학생. 잘 데려왔어. 얘는 여기 두고 가." }
    ],
    next: "@back"
  },

  extra_minjae_divert: {
    bg: "mall",
    set: { "flags.extra_minjae_rescued": true, "flags.extra_minjae_debt": true },
    lines: [
      { t: "민재를 틈으로 밀어 넣고 반대편 차의 번호판을 찼다. 회색인들이 나란히 방향을 바꿨다." },
      { s: "민재", t: "나 때문에 그러는 거면 진짜 멋없거든." },
      { s: "me", t: "그래. 그러니까 먼저 가." },
      { t: "담을 돌아 치킨집에 도착했을 때 팔뚝이 시퍼렇게 멍들어 있었다. 민재가 문고리를 잡고 기다렸다." },
      { s: "민재", t: "빚은 적어 놨어. 이자는 없어. 그건 내가 정했어." }
    ],
    next: "@back"
  },

  extra_minjae_fetch: {
    bg: "mall",
    set: { "flags.extra_minjae_rescued": true, "flags.extra_minjae_team": true },
    fx: { mind: -2 },
    lines: [
      { t: "민재를 닫힌 셔터의 움푹한 입구에 숨겼다. 상가를 왕복하는 동안 그 자리를 머릿속에서 몇 번이나 확인했다." },
      { s: "me", t: "혼자 옮기다 둘 다 잡힐 것 같아요." },
      { s: "박 사장", t: "어이, 학생. 그걸 알면 됐어. 판자 저쪽 끝 잡아." },
      { t: "둘이 판자를 들고 돌아가 민재를 옮겼다. 치킨집까지 오는 길에 민재는 한 번도 허세를 부리지 않았다." },
      { s: "민재", t: "구조대가 치킨집이면 영수증은 누가 끊냐." }
    ],
    next: "@back"
  },

  extra_one_start: {
    hook: { at: "home_night_event", if: "S.day >= 3 && S.sib >= 25 && !flag('extra_one_seen')", chance: 0.3 },
    bg: "night",
    set: { "flags.extra_one_seen": true },
    lines: [
      { t: "동생이 달력 모서리를 접었다 폈다. 이미 끝난 날짜에는 무슨 짓을 해도 일정이 생기지 않았다." },
      { s: "sib", t: "우리 둘 중 하나만 살 수 있으면 넌 누굴 고를 거야." },
      { t: "나는 소매 끝을 문질렀다. 손가락이 갈 곳을 먼저 정했다." },
      { s: "me", t: "어떤 하나." },
      { t: "동생은 웃지 않았다. 농담으로 빠져나갈 문은 처음부터 없었다." }
    ],
    choices: [
      { t: "너를 고르겠다고 대답한다", go: "extra_one_you" },
      { t: "나를 고를 수도 있다고 대답한다", go: "extra_one_me" },
      { t: "헤어졌을 때 다시 만날 방법부터 정하자고 한다", go: "extra_one_pact", fx: { trust: 2 } }
    ]
  },

  extra_one_you: {
    bg: "night",
    lines: [
      { s: "me", t: "너를 고를 거야." },
      { s: "sib", t: "네가 없어지는 쪽을 내가 좋아할 줄 알았어?" },
      { t: "동생은 접힌 달력을 손톱으로 눌렀다. 종이에 난 선은 펴도 남았다." },
      { s: "me", t: "네가 살아 있으면 좋겠다는 말이 먼저 나왔어." },
      { t: "보호한다는 말 안에 동생의 의견이 들어갈 자리는 만들어 두지 않았다." }
    ],
    choices: [
      { t: "서로의 의견부터 듣기로 약속한다", go: "extra_one_pact", fx: { trust: 4 } },
      { t: "정작 그 순간은 자신 없다고 털어놓는다", go: "extra_one_honest", fx: { trust: 3, mind: -2 } },
      { t: "대답을 멈추고 곁에 앉는다", go: "extra_one_silence", fx: { trust: 1 } }
    ]
  },

  extra_one_me: {
    bg: "night",
    lines: [
      { s: "me", t: "나를 고를지도 몰라. 막상 닥치면." },
      { s: "sib", t: "응. 그렇게 대답할 수도 있지." },
      { t: "동생이 고개를 끄덕였다. 안도인지 실망인지 한 동작으로 구별할 수는 없었다." },
      { s: "me", t: "그게 네가 덜 중요하다는 뜻은 아니야." },
      { t: "변명은 입구가 넓었다. 더 들어가기 전에 말을 멈췄다." }
    ],
    choices: [
      { t: "서로를 찾을 장소와 방법을 정한다", go: "extra_one_pact", fx: { trust: 2 } },
      { t: "무엇이 두려운지까지 말한다", go: "extra_one_honest", fx: { trust: 4, mind: -2 } },
      { t: "동생이 더 말할 때까지 곁에 있는다", go: "extra_one_silence", fx: { trust: 1 } }
    ]
  },

  extra_one_pact: {
    bg: "night",
    set: { "flags.extra_one_pact": true },
    fx: { mind: 2 },
    lines: [
      { s: "me", t: "떨어지면 집 앞 계단참. 집이 위험하면 주민센터 뒤편. 혼자 결정한 걸 상대도 알 거라고 생각하지 않기." },
      { s: "sib", t: "그리고 내가 무섭다고 하면 들을 것. 열네 살이라고 음소거하지 말고." },
      { t: "우리는 누가 남을지 대신 어디서 다시 만날지 적었다. 적을 수 있는 쪽부터 했다." },
      { s: "me", t: "너도 내가 무섭다고 하면 듣기." },
      { t: "동생이 항목 앞에 작은 네모를 그렸다. 둘 다 체크할 수 있게 두 개였다." }
    ],
    next: "@back"
  },

  extra_one_honest: {
    bg: "night",
    set: { "flags.extra_one_honest": true },
    lines: [
      { t: "정답을 모른다고 말하자 해야 할 말이 조금 선명해졌다." },
      { s: "me", t: "겁나. 네가 다치는 것도, 내가 다치는 것도. 어느 쪽이라고 말하면 덜 무서울 줄 알았어." },
      { s: "sib", t: "나도. 근데 나 네 짐 칸에 들어 있는 건 아니야." },
      { t: "동생이 자기 무릎을 두드렸다. 짐이라면 이렇게 의견이 많을 수 없었다." },
      { s: "me", t: "알아. 그래서 네 의견도 물을게." }
    ],
    next: "@back"
  },

  extra_one_silence: {
    bg: "night",
    set: { "flags.extra_one_together": true },
    fx: { mind: 2 },
    lines: [
      { t: "나는 대답을 더 고르는 대신 동생 옆에 앉았다. 벽지는 두 사람이 기대기에도 충분히 낡아 있었다." },
      { s: "sib", t: "말 돌리는 건데, 이 정도면 기술점수는 줄게." },
      { s: "me", t: "몇 점." },
      { s: "sib", t: "종말 이전 기준으로 삼 점." },
      { t: "질문은 그대로 남았다. 동생도 그대로 옆에 있었다. 지금 확인할 수 있는 건 그 둘이었다." }
    ],
    next: "@back"
  },

  extra_chalk_start: {
    hook: { at: "school_enter", if: "S.sib >= 40 && !flag('sib_sick') && !flag('extra_chalk_seen')", chance: 0.35 },
    bg: "school",
    set: { "flags.extra_chalk_seen": true },
    lines: [
      { t: "오늘은 {{sib}}도 함께 나왔다. 동생 학교 담벼락에 이름과 날짜가 분필로 이어져 있었다." },
      { t: "『살아 있음』 옆에는 『나도』가, 그 옆에는 급식 메뉴를 묻는 글이 있었다. 아무도 답하지 않았다." },
      { s: "sib", t: "이거 우리 반 글씨야. 띄어쓰기 안 하는 것까지 똑같네." },
      { s: "me", t: "누가 마지막이야." },
      { t: "맨 아래에는 빈자리와 짧아진 분필이 남아 있었다. 동생이 그 앞에서 걸음을 멈췄다." }
    ],
    choices: [
      { t: "동생이 적을 말을 함께 고른다", go: "extra_chalk_name" },
      { t: "다른 아이들이 남긴 기록을 읽는다", go: "extra_chalk_read" },
      { t: "동생에게 흔적을 남기지 않아도 된다고 말한다", go: "extra_chalk_blank" }
    ]
  },

  extra_chalk_name: {
    bg: "school",
    lines: [
      { s: "sib", t: "이름만 쓸까. 살아 있다고까지 쓰면 좀 자랑 같나." },
      { s: "me", t: "그 정도는 해도 돼." },
      { t: "동생이 분필을 집었다. 손가락에 묻은 흰 가루를 닦지 않았다." },
      { s: "sib", t: "주소는 안 쓸래. 이거 보는 게 친구만은 아닐 테니까." },
      { t: "글자를 쓸 자리와 쓰지 않을 정보를 동생이 먼저 골랐다." }
    ],
    choices: [
      { t: "이름과 오늘 날짜를 적게 한다", go: "extra_chalk_signed" },
      { t: "친구들이 알아볼 작은 그림만 남긴다", go: "extra_chalk_mark" },
      { t: "분필을 내려놓고 더 적지 않는다", go: "extra_chalk_blank" }
    ]
  },

  extra_chalk_read: {
    bg: "school",
    lines: [
      { t: "며칠 전 날짜 아래에 『체육관에서 나감』이 적혀 있었다. 도착지가 아니라 떠났다는 기록이었다." },
      { s: "sib", t: "체육 시간마다 숨던 애도 체육관은 나갔네." },
      { s: "me", t: "지금 어디 있다는 뜻은 아닐 거야." },
      { t: "동생이 이름을 한 번씩 입 모양으로만 읽었다. 출석을 부르되 대답을 강요하지 않았다." },
      { s: "sib", t: "응. 살아 있었다는 뜻부터 챙겨둘래." }
    ],
    choices: [
      { t: "동생의 이름과 날짜도 이어 적는다", go: "extra_chalk_signed" },
      { t: "반 친구들만 알아볼 그림을 이어 그린다", go: "extra_chalk_mark" },
      { t: "읽은 것으로 충분하다고 하고 떠난다", go: "extra_chalk_blank" }
    ]
  },

  extra_chalk_signed: {
    bg: "school",
    set: { "flags.extra_chalk_signed": true },
    fx: { trust: 3, mind: 2 },
    lines: [
      { t: "동생이 『{{sib}}』와 오늘 날짜를 적었다. 『살아 있음』은 조금 작게 썼다." },
      { s: "sib", t: "출석 체크는 망해도 계속하네." },
      { s: "me", t: "이번에는 네가 체크하는 거지." },
      { t: "동생은 뒤에 올 사람이 쓸 자리를 남겼다. 담벼락 끝까지 자기 이름으로 채우지는 않았다." },
      { s: "sib", t: "다음에 와서 날짜 고칠 거야. 아직은 계획이야." }
    ],
    next: "@back"
  },

  extra_chalk_mark: {
    bg: "school",
    set: { "flags.extra_chalk_mark": true },
    fx: { trust: 2, mind: 1 },
    lines: [
      { t: "이름 대신 과자 봉지 같은 네모가 생겼다. 모서리가 한쪽만 유난히 크게 찢겨 있었다." },
      { s: "sib", t: "우리 반에서는 나 이거 맨날 흘리는 걸로 알아." },
      { s: "me", t: "알아볼 사람은 알아보겠네." },
      { t: "집의 방향도, 층수도 적지 않았다. 동생이 분필 가루를 손바닥에서 털었다." },
      { s: "sib", t: "딱 그 사람들만." }
    ],
    next: "@back"
  },

  extra_chalk_blank: {
    bg: "school",
    set: { "flags.extra_chalk_private": true },
    fx: { trust: 1 },
    lines: [
      { t: "분필은 담벼락 아래에 남았다. 빈자리에 내 손이나 동생의 손이 대신 들어가지는 않았다." },
      { s: "sib", t: "안 쓰면 죽은 줄 알까." },
      { s: "me", t: "모르는 걸로 남는 거야. 정해지는 건 아니고." },
      { t: "동생은 담벼락을 한 번 더 봤다. 아무것도 쓰지 않아도 읽은 이름은 가져갈 수 있었다." },
      { s: "sib", t: "그럼 오늘은 읽는 쪽 할래." }
    ],
    next: "@back"
  },

  extra_live_start: {
    hook: { at: "home_hub", if: "flag('radio') && !flag('extra_live_seen')", chance: 0.25 },
    bg: "home",
    set: { "flags.extra_live_seen": true, "flags.extra_live_heard": true },
    lines: [
      { t: "창가에서 라디오 안테나를 만지다가 주민센터 앞을 봤다. 한 사람이 바닥에 떨어진 노란 우산으로 손을 뻗었다." },
      { s: "라디오", t: "동탄 주민센터 앞에서 지금 노란 우산을 집어 드는 분, 뒤를 보지 말고 그대로 걸어가세요." },
      { t: "목소리가 중간 숨을 들이켰다. 다음 말이 나오기 전에 잡음이 덮였다." },
      { s: "sib", t: "야. 저 사람 지금 우산 펴는데." },
      { t: "라디오가 방금 본 일을 말했다. 시간을 알려 주는 방송보다 정확했다." }
    ],
    choices: [
      { t: "창가에서 우산을 든 사람을 확인한다", go: "extra_live_window" },
      { t: "주파수를 조금씩 돌려 목소리를 찾는다", go: "extra_live_tune" },
      { t: "들은 문장을 종이에 적는다", go: "extra_live_note" }
    ]
  },

  extra_live_window: {
    bg: "home",
    lines: [
      { t: "노란 우산이 주민센터 모퉁이로 사라졌다. 뒤편에는 회색인 하나가 느리게 걸어오고 있었다." },
      { s: "sib", t: "저 사람한테 한 말 맞지." },
      { s: "me", t: "방금 우산 집는 걸 보고 말했어." },
      { t: "맞은편 창문들은 전부 어두웠다. 이곳을 볼 수 있는 자리는 하나가 아니었다." },
      { s: "sib", t: "그럼 누가 이 동네를 보고 있는 거네." }
    ],
    choices: [
      { t: "밖으로 신호를 보내지 않고 목격한 위치를 적는다", go: "extra_live_note" },
      { t: "커튼 틈으로 손바닥을 한 번 보여 준다", go: "extra_live_signal" },
      { t: "창가에서 물러나 라디오를 끈다", go: "extra_live_stop" }
    ]
  },

  extra_live_tune: {
    bg: "home",
    lines: [
      { t: "다이얼을 조금씩 움직였다. 99.9로 돌아오자 익숙한 비상방송의 억양만 다시 잡혔다." },
      { s: "sib", t: "아까 사람, 엄청 가까이 있는 것 같았는데." },
      { s: "me", t: "가까이 있는 것과 우리 편인 건 다른 얘기야." },
      { t: "수신기를 향해 말을 해도 건너가지는 않는다. 나는 대답 대신 안테나 각도를 남겨 두었다." },
      { s: "sib", t: "알아. 그래도 이제 말하는 사람은 있는 거잖아." }
    ],
    choices: [
      { t: "문장과 들은 장소를 기록한다", go: "extra_live_note" },
      { t: "창문으로 작은 손짓을 보내 본다", go: "extra_live_signal" },
      { t: "다이얼을 그만 돌리고 라디오를 끈다", go: "extra_live_stop" }
    ]
  },

  extra_live_note: {
    bg: "home",
    set: { "flags.extra_live_note": true },
    fx: { mind: 3 },
    lines: [
      { t: "나는 들은 문장 아래에 노란 우산을 그렸다. 글보다 그림 쪽이 덜 자신 있었다." },
      { s: "me", t: "위치 하나. 문장 하나. 누구인지는 모름." },
      { s: "sib", t: "수원까지 가는 법은 안 알려 줬네." },
      { s: "me", t: "오늘 들은 건 오늘 들은 만큼만 믿자." },
      { t: "토요일 수송차량에 관한 안내 옆에 별도의 칸을 만들었다. 두 목소리가 같은 편이라는 증거는 없었다." }
    ],
    next: "@back"
  },

  extra_live_signal: {
    bg: "home",
    set: { "flags.extra_live_signal": true },
    fx: { trust: 2, mind: 1 },
    lines: [
      { t: "커튼을 손 하나만큼 열었다. 손바닥을 한 번 보이고 다시 가렸다." },
      { s: "sib", t: "보였을까." },
      { s: "me", t: "모르지." },
      { t: "건너편에서 돌아온 신호는 없었다. 라디오에서도 그 사람의 두 번째 문장은 들리지 않았다." },
      { s: "sib", t: "봤으면 저쪽에도 살아 있는 사람 하나 늘었겠다." }
    ],
    next: "@back"
  },

  extra_live_stop: {
    bg: "home",
    set: { "flags.extra_live_paused": true },
    fx: { mind: 2 },
    lines: [
      { t: "라디오를 끄자 방 안에서 물이 떨어지는 소리가 들렸다. 정적에도 늘 자기 할 일이 있었다." },
      { s: "sib", t: "꺼도 방금 말한 사람이 없어지는 건 아니지." },
      { s: "me", t: "응. 다시 듣고 싶으면 켜면 돼." },
      { t: "다이얼은 움직이지 않았다. 다음에 확인할 자리를 그대로 뒀다." },
      { s: "sib", t: "그럼 됐어. 그 사람도 어디선가 아직 할 말이 있겠지." }
    ],
    next: "@back"
  }
});
