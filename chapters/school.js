// chapters/school.js — 중학교 (정보 확보)
Object.assign(SCENES, {

  // ───────────────────────── 입구 ─────────────────────────
  school_enter: {
    bg: "street",
    set: { "flags.went_school": true, "flags.school_visits": "+1" },
    lines: [
      { t: "아파트 단지 뒷길. 동생 학교와 옆 학교는 걸어서 10분, 서로 담 하나를 두고 붙어 있다.", if: "S.flags.school_visits <= 1" },
      { t: "다시 학교로 가는 길. 지난번보다 바람이 매섭다. 전봇대에 붙은 휴교 안내문이 반쯤 떨어져 펄럭였다.", if: "S.flags.school_visits >= 2" },
      { s: "sib", t: "야. 나도 갈래. 내 학교잖아.", if: "S.flags.school_visits <= 1 && !S.flags.sib_sick" },
      { s: "sib", t: "……오늘도 학교 가? 나 머리 뜨거워서 못 가겠어. 조심해.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
      { s: "sib", t: "또 가? 선생님한테 내 안부 전해줘. 아니다, 같이 가.", if: "S.flags.school_visits >= 2 && (!S.flags.sib_sick || S.flags.sib_cured)" },
      { s: "me", t: "운동장에 뭐가 있을지 몰라. 가면 내 뒤에 딱 붙어." },
      { t: "정우가 우리 집에 온 뒤로, 동생은 외출할 때마다 정우에게 고양이를 맡기고 나온다.", if: "S.flags.school_jungwoo_join" },
    ],
    choices: [
      { t: "동생을 데리고 간다", go: "school_go_with_sib", if: "!S.flags.sib_sick || S.flags.sib_cured", set: { "flags.school_sib_along": true } },
      { t: "혼자 간다. 동생은 집에 둔다", go: "school_go_alone", if: "!S.flags.sib_sick || S.flags.sib_cured", set: { "flags.school_sib_along": false } },
      { t: "[동생 아픔] 동생을 두고 혼자 간다", go: "school_go_alone", if: "S.flags.sib_sick && !S.flags.sib_cured", set: { "flags.school_sib_along": false } },
    ],
  },

  school_go_with_sib: {
    bg: "street",
    fx: { trust: 4 },
    lines: [
      { s: "sib", t: "오케이. 근데 진짜로, 교실 한 번만 들러도 돼? 사물함에 두고 온 게 있어.", if: "!S.flags.school_locker_opened" },
      { s: "sib", t: "오케이. 이번엔 선생님 얼굴 보고 오자. 지난번에 인사도 제대로 못 했어.", if: "S.flags.school_locker_opened" },
      { s: "me", t: "뭔데.", if: "!S.flags.school_locker_opened" },
      { s: "sib", t: "……비밀. 가면 알려줄게.", if: "!S.flags.school_locker_opened" },
      { t: "동생은 패딩 지퍼를 턱까지 올리고 내 옆에 붙었다. 발걸음이 평소보다 빨랐다." },
      { t: "횡단보도. 신호등은 꺼진 지 오래다. 우리는 좌우를 두 번씩 살피고 뛰어 건넜다." },
    ],
    next: "school_crossroad",
  },

  school_go_alone: {
    bg: "street",
    lines: [
      { s: "sib", t: "……알았어. 문 잠그고 있을게. 어두워지기 전에 와.", if: "!S.flags.sib_sick || S.flags.sib_cured" },
      { s: "sib", t: "……문 잠글게. 빨리 와.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
      { t: "현관문이 닫히는 소리를 등 뒤로 듣는 건 매번 익숙해지지 않는다." },
      { t: "혼자 걷는 길은 빠르지만 조용하다. 내 발소리만 아파트 벽에 부딪혀 돌아왔다." },
      { t: "담 너머로 두 학교의 지붕이 보였다. 동생 학교는 노란 벽, 옆 학교는 회색 벽." },
    ],
    next: "school_crossroad",
  },

  school_crossroad: {
    bg: "school",
    lines: [
      { t: "두 학교 사이 좁은 골목. 왼쪽이 동생 학교, 오른쪽이 옆 학교다." },
      { t: "동생 학교 쪽에서는 아주 희미하게, 전자음 같은 게 들렸다. 라디오? 아니면 착각.", if: "!S.flags.school_teacher_ally" },
      { t: "동생 학교 과학실 창문에 작은 불빛이 보였다. 김 선생이 아직 있다.", if: "S.flags.school_teacher_ally" },
      { t: "옆 학교 쪽은 아무 소리도 나지 않았다. 창문 몇 개가 깨져 있었다." },
      { s: "sib", t: "옆 학교는 왜 저렇게 됐지. 우리 학교보다 더 조용해.", if: "S.flags.school_sib_along" },
      { t: "골목 끝 컨테이너 옆에서 작은 그림자가 움직였다. 고양이?", if: "(S.flags.school_board_hint || S.flags.school_office_seen) && !S.flags.school_jungwoo" },
    ],
    choices: [
      { t: "동생 학교로 간다", go: "school_dawon_gate", if: "!S.flags.school_teacher_ally" },
      { t: "동생 학교 과학실로 바로 간다 (김 선생)", go: "school_revisit_teacher", if: "S.flags.school_teacher_ally" },
      { t: "옆 학교로 간다", go: "school_dongwon_gate" },
      { t: "골목 끝 컨테이너를 살펴본다", go: "school_container", if: "(S.flags.school_board_hint || S.flags.school_office_seen) && !S.flags.school_jungwoo" },
      { t: "정우를 찾아간다", go: "school_revisit_jungwoo", if: "S.flags.school_jungwoo && !S.flags.school_jungwoo_join" },
    ],
  },

  // ───────────────────────── 동생 학교 ─────────────────────────
  school_dawon_gate: {
    bg: "school",
    lines: [
      { t: "동생 학교 정문. '2학기 학부모 상담 주간' 현수막이 바람에 뒤집혀 있었다." },
      { t: "운동장에 셋. 체육복 차림 하나, 교복 하나, 그리고 경비 아저씨 조끼를 입은 하나. 모두 천천히, 목적 없이 걷고 있었다." },
      { s: "sib", t: "……저거 경비 아저씨야. 맨날 나한테 지각이라고 뭐라 했는데.", if: "S.flags.school_sib_along" },
      { s: "me", t: "보지 마. 발밑만 봐.", if: "S.flags.school_sib_along" },
      { t: "회색인들은 느리다. 하지만 소리에 민감하다. 운동장은 자갈이다." },
      { t: "건물 뒤쪽, 급식실 쪽 후문이 보였다. 돌아가면 5분은 더 걸린다." },
    ],
    choices: [
      { t: "정문으로, 벽을 따라 조용히 들어간다", go: "school_dawon_front" },
      { t: "후문(급식실 쪽)으로 돌아간다", go: "school_dawon_back" },
      { t: "[아이템: 손전등] 손전등으로 반대편으로 유인한다", go: "school_dawon_flash", if: "has('손전등')" },
    ],
  },

  school_dawon_front: {
    bg: "school",
    fx: { mind: -4 },
    lines: [
      { t: "벽에 등을 붙이고 한 발씩. 자갈 밟는 소리가 심장 소리만큼 컸다." },
      { t: "체육복 입은 회색인이 고개를 돌렸다. 멈췄다. 우리도 멈췄다." },
      { s: "sib", t: "(숨 참는 소리)", if: "S.flags.school_sib_along" },
      { t: "회색인은 다시 고개를 돌려 제 갈 길을 갔다. 10초. 20초. 현관 유리문이 손에 닿았다." },
      { t: "문은 잠겨 있지 않았다. 안으로 들어가 조용히 닫았다." },
    ],
    next: "school_dawon_hall",
  },

  school_dawon_back: {
    bg: "school",
    fx: { food: 1 },
    lines: [
      { t: "담을 따라 급식실 뒤로 돌았다. 음식물 쓰레기통 냄새가 아직도 남아 있었다." },
      { t: "후문 철문에 자물쇠. 하지만 옆 환풍구 패널이 떨어져 있어서 몸을 구부리면 들어갈 수 있었다." },
      { s: "sib", t: "여기로 급식 아줌마들이 담배 피우러 나왔었어. 다 알아.", if: "S.flags.school_sib_along" },
      { t: "급식실은 텅 비어 있었다. 대형 냉장고 문이 열려 있고, 안은 썩은 냄새뿐이었다." },
      { t: "다만 조리대 밑에서 뜯지 않은 건빵 봉지 두 개를 찾았다." },
    ],
    next: "school_dawon_hall",
  },

  school_dawon_flash: {
    bg: "school",
    fx: { mind: 2 },
    lines: [
      { t: "손전등을 켜서 운동장 반대편 구령대 쪽으로 빛을 던졌다. 빛이 벽에서 흔들렸다." },
      { t: "셋이 동시에 고개를 돌렸다. 느리게, 하지만 확실하게 빛 쪽으로 걷기 시작했다." },
      { s: "sib", t: "오, 된다. 진짜 되네.", if: "S.flags.school_sib_along" },
      { s: "me", t: "건전지 아껴야 하니까 이제 뛰어." },
      { t: "우리는 반대쪽으로 뛰었다. 현관까지 30초. 뒤돌아보지 않았다." },
    ],
    next: "school_dawon_hall",
  },

  school_dawon_hall: {
    bg: "school",
    lines: [
      { t: "1층 복도. 신발장에 실내화가 가지런히 꽂혀 있었다. 아무도 꺼내 신지 않은 채로." },
      { t: "복도 끝 게시판에 '급식 식단표 11월 셋째 주'. 금요일 메뉴는 돈까스였다." },
      { s: "sib", t: "돈까스 날 못 먹은 게 제일 억울해.", if: "S.flags.school_sib_along" },
      { s: "me", t: "그게 제일 억울하면 다행이지.", if: "S.flags.school_sib_along" },
      { t: "2층에서 아주 작게, 규칙적인 잡음이 들렸다. 라디오 주파수를 맞추는 소리 같았다.", if: "!S.flags.school_teacher_ally" },
      { t: "복도 바닥에 화살표가 분필로 그려져 있었다. 과학실 방향.", if: "!S.flags.school_teacher_ally" },
    ],
    choices: [
      { t: "2학년 3반 교실로 간다 (동생 반)", go: "school_dawon_class", if: "!S.flags.school_class_seen" },
      { t: "과학실로 간다 (잡음 쪽)", go: "school_dawon_science", if: "!S.flags.school_teacher_ally && !S.flags.school_teacher_hostile" },
      { t: "과학실 문을 다시 두드린다", go: "school_science_retry", if: "S.flags.school_teacher_hostile && !S.flags.school_teacher_ally" },
      { t: "과학실의 김 선생에게 간다", go: "school_revisit_teacher", if: "S.flags.school_teacher_ally" },
      { t: "교무실을 뒤진다", go: "school_dawon_office", if: "!S.flags.school_office_seen" },
      { t: "학교를 나간다", go: "school_leave" },
    ],
  },

  school_dawon_class: {
    bg: "school",
    set: { "flags.school_class_seen": true },
    lines: [
      { t: "2학년 3반. 문 옆 명패에 담임 이름. 책상 서른 개가 그날 그대로 흐트러져 있었다." },
      { t: "칠판에는 지워지지 않은 수학 문제와, 그 위에 누군가 크게 써 놓은 글씨가 있었다." },
      { s: "sib", t: "……내 자리 저기야. 창가에서 두 번째.", if: "S.flags.school_sib_along" },
      { t: "동생은 자기 자리로 가서 앉았다. 의자가 삐걱거렸다. 잠깐, 아무 말도 하지 않았다.", if: "S.flags.school_sib_along" },
      { t: "동생 자리를 찾는 건 어렵지 않았다. 책상에 게임 캐릭터 낙서가 가득한 자리.", if: "!S.flags.school_sib_along" },
      { t: "책상 서랍에 반쯤 푼 수학 문제집이 있었다. 날짜는 3주 전에 멈춰 있었다.", if: "!S.flags.school_sib_along" },
    ],
    choices: [
      { t: "동생의 사물함을 열어본다", go: "school_dawon_locker", if: "!S.flags.school_locker_opened" },
      { t: "칠판의 글씨를 읽는다", go: "school_dawon_board", if: "!S.flags.school_board_hint" },
      { t: "동생 옆에 앉는다", go: "school_dawon_class_sib", if: "S.flags.school_sib_along && !S.flags.school_class_moment" },
      { t: "교실을 나온다", go: "school_dawon_hall" },
    ],
  },

  school_dawon_locker: {
    bg: "school",
    set: { "flags.school_locker_opened": true, "flags.school_board_hint": true },
    item: ["초코바"],
    fx: { trust: 5, mind: 3 },
    lines: [
      { s: "sib", t: "비번 0 4 1 7. 내 생일.", if: "S.flags.school_sib_along" },
      { s: "me", t: "보안 수준 참 훌륭하다.", if: "S.flags.school_sib_along" },
      { t: "사물함 비밀번호는 모른다. 하지만 자물쇠는 싸구려였고, 식칼 손잡이로 두 번 치니 열렸다.", if: "!S.flags.school_sib_along && has('식칼')" },
      { t: "사물함 비밀번호는 모른다. 동생 생일을 넣어봤다. 0417. 열렸다. 너무 쉬워서 조금 슬펐다.", if: "!S.flags.school_sib_along && !has('식칼')" },
      { t: "안에는 체육복, 교과서, 그리고 뜯지 않은 초코바 두 개." },
      { s: "sib", t: "이거야. 이거 가지러 오고 싶었어. 매점에서 마지막으로 산 거.", if: "S.flags.school_sib_along" },
      { s: "sib", t: "하나는 네 거. 나 혼자 먹으려던 건 아니고……그냥.", if: "S.flags.school_sib_along" },
      { t: "사물함 안쪽 문에 쪽지가 붙어 있었다. '정우 — 옆 학교 뒤 컨테이너. 살아 있음. 고양이도.' 동생 글씨가 아니었다." },
    ],
    next: "school_dawon_class",
  },

  school_dawon_board: {
    bg: "school",
    set: { "flags.school_board_hint": true },
    fx: { mind: 2 },
    lines: [
      { t: "칠판 위쪽, 분필로 크게. '살아있는 사람은 과학실로. — 김동현'" },
      { t: "그 아래 작은 글씨로, 다른 손. '정우 왔다 감. 옆 학교 뒤 컨테이너에 있음. 회색이도 있음.'" },
      { s: "sib", t: "정우……? 걔 살아 있어? 걔 부모님 둘 다 병원 가셨다고 했는데.", if: "S.flags.school_sib_along" },
      { s: "sib", t: "회색이는 고양이야. 정우가 급식실 뒤에서 몰래 키우던 애. 감염이랑 상관없어, 이름만 그래.", if: "S.flags.school_sib_along" },
      { t: "정우. 동생 입에서 몇 번 들은 이름이다. 반 친구. 말이 없고, 고양이를 좋아하는.", if: "!S.flags.school_sib_along" },
      { t: "칠판 구석에는 누군가 그린 작은 고양이 낙서가 있었다." },
    ],
    next: "school_dawon_class",
  },

  school_dawon_class_sib: {
    bg: "school",
    set: { "flags.school_class_moment": true },
    lines: [
      { t: "동생 옆자리, 누군가의 의자에 앉았다. 창밖으로 운동장의 회색인 셋이 느리게 돌고 있었다." },
      { s: "sib", t: "여기 앉으면 운동장이 다 보여. 체육 시간에 애들 뛰는 거 구경하는 게 좋았어." },
      { s: "sib", t: "……이제 저 아래서 뛰는 건 경비 아저씨뿐이네. 뛰는 것도 아니고." },
      { s: "sib", t: "야. 솔직히 말해봐. 우리 반 애들 중에 살아 있는 애 몇 명이나 될 것 같아." },
    ],
    choices: [
      { t: "\"모르겠어. 근데 정우는 살아 있잖아.\"", go: "school_class_honest", if: "S.flags.school_board_hint" },
      { t: "\"모르겠어. 솔직히.\"", go: "school_class_honest" },
      { t: "\"다들 어디선가 잘 숨어 있을 거야.\"", go: "school_class_comfort" },
      { t: "말없이 어깨를 두드린다", go: "school_class_silent" },
    ],
  },

  school_class_honest: {
    bg: "school",
    fx: { trust: 6, mind: -2 },
    lines: [
      { s: "sib", t: "……응. 그게 낫다. 거짓말로 괜찮다고 하는 것보다." },
      { s: "sib", t: "엄마 아빠도 그래서 안 물어본 거야. 네가 모른다고 할까 봐." },
      { s: "me", t: "물어봐도 돼. 모르면 모른다고 할게." },
      { s: "sib", t: "……나중에. 지금은 아니고." },
      { t: "동생이 책상에 낙서된 캐릭터를 손가락으로 문질렀다. 지워지지 않았다." },
    ],
    next: "school_dawon_class",
  },

  school_class_comfort: {
    bg: "school",
    fx: { trust: -3, mind: 2 },
    lines: [
      { s: "sib", t: "……그런 말은 선생님들이 하는 거잖아. 네가 하니까 이상해." },
      { s: "sib", t: "됐어. 그냥 물어본 거야." },
      { t: "동생은 일어나서 창문에 이마를 댔다. 유리에 김이 서렸다 사라졌다." },
      { t: "위로가 되지 못한 말은 공기 중에 조금 더 오래 남는다." },
    ],
    next: "school_dawon_class",
  },

  school_class_silent: {
    bg: "school",
    fx: { trust: 3 },
    lines: [
      { t: "아무 말도 하지 않았다. 동생도 더 묻지 않았다." },
      { s: "sib", t: "……고마워. 뭐라고 안 해줘서." },
      { t: "우리는 잠깐 그렇게 앉아 있었다. 복도에서 바람이 문을 흔들 때까지." },
    ],
    next: "school_dawon_class",
  },

  school_dawon_office: {
    bg: "school",
    set: { "flags.school_office_seen": true },
    lines: [
      { t: "교무실. 책상 위 커피잔에 곰팡이. 컴퓨터는 모두 꺼져 있고, 서류가 바닥에 흩어져 있었다." },
      { t: "벽에 붙은 비상 연락망. 2학년 3반 명단에 동생 이름과 집 전화번호가 있었다. 전화는 3주째 먹통이다." },
      { t: "담임 책상 서랍에서 구급상자를 찾았다. 반쯤 쓰다 남은 것이지만 붕대와 해열제가 들어 있었다." },
      { t: "명단 옆 메모. '정우 — 보호자 연락 불가. 옆 학교 쪽 컨테이너에서 목격(11/2).' 선생 글씨 같았다." },
      { s: "sib", t: "선생님들 다 어디 갔지. 교무실 비었는데 분필 글씨는 있고.", if: "S.flags.school_sib_along" },
    ],
    choices: [
      { t: "구급상자를 챙긴다", go: "school_office_take", item: ["구급상자"], fx: { meds: 1 } },
      { t: "구급상자는 두고 간다. 누군가 더 필요할지도", go: "school_office_leave", fx: { mind: 2 } },
    ],
  },

  school_office_take: {
    bg: "school",
    lines: [
      { t: "구급상자를 배낭에 넣었다. 무게가 든든했다." },
      { s: "sib", t: "담임 쌤 거 훔치는 거 아냐?", if: "S.flags.school_sib_along" },
      { s: "me", t: "빌리는 거야. 나중에 갚아.", if: "S.flags.school_sib_along" },
      { t: "복도로 나왔다. 2층 잡음은 아직 계속되고 있었다.", if: "!S.flags.school_teacher_ally" },
    ],
    next: "school_dawon_hall",
  },

  school_office_leave: {
    bg: "school",
    lines: [
      { t: "구급상자를 서랍에 도로 넣었다. 누가 돌아올지 모른다. 동생이 다니는 학교다." },
      { s: "sib", t: "……그거 가져가도 되는데. 아니, 됐어. 네 말이 맞아.", if: "S.flags.school_sib_along" },
      { t: "복도로 나왔다." },
    ],
    next: "school_dawon_hall",
  },

  school_dawon_science: {
    bg: "school",
    lines: [
      { t: "2층 과학실. 문에 종이가 붙어 있었다. '살아 있으면 세 번, 쉬고, 두 번.'" },
      { t: "안에서 잡음이 멈췄다. 누군가 숨을 죽이는 기척." },
      { s: "sib", t: "(속삭임) 저거 김동현 쌤 글씨야. 과학 쌤. 판서 진짜 못 알아보기로 유명한데 저건 알아보겠네.", if: "S.flags.school_sib_along" },
    ],
    choices: [
      { t: "세 번, 쉬고, 두 번 두드린다", go: "school_science_knock" },
      { t: "문을 그냥 연다", go: "school_science_barge" },
      { t: "동생에게 말하게 한다 — \"쌤, 저예요\"", go: "school_science_reveal", if: "S.flags.school_sib_along" },
    ],
  },

  school_science_knock: {
    bg: "school",
    lines: [
      { t: "똑, 똑, 똑. 쉬고. 똑, 똑." },
      { t: "잠시 후, 안에서 책상 끄는 소리. 문이 손가락 하나만큼 열렸다. 안경 너머로 핏발 선 눈." },
      { s: "김동현 선생", t: "……사람이네. 진짜 사람. 몇 명이에요? 물린 데 있어요?" },
      { s: "me", t: "둘이요. 안 물렸어요.", if: "S.flags.school_sib_along" },
      { s: "me", t: "혼자요. 안 물렸어요.", if: "!S.flags.school_sib_along" },
      { s: "김동현 선생", t: "손 보여줘요. 팔도. ……좋아요. 들어와요. 빨리, 소리 내지 말고." },
    ],
    next: "school_teacher_talk",
  },

  school_science_barge: {
    bg: "school",
    set: { "flags.school_teacher_hostile": true },
    fx: { mind: -5 },
    lines: [
      { t: "문을 확 열었다. 안에서 뭔가 날아왔다. 비커. 벽에 맞고 산산조각." },
      { s: "김동현 선생", t: "나가! 나가라고! 노크하라고 써놨잖아!" },
      { t: "안경 쓴 남자가 실험대 뒤에서 소화기를 들고 떨고 있었다. 눈이 회색인을 보는 눈이었다." },
      { s: "me", t: "사람이에요! 저 사람이라고요!" },
      { s: "김동현 선생", t: "……사람이면 왜 노크를 안 해. 나가요. 지금은 안 돼요. 심장이……나가요." },
      { t: "문이 코앞에서 닫혔다. 안에서 책상이 다시 밀리는 소리." },
      { s: "sib", t: "……야. 쌤 저렇게 겁 많은 사람 아니었는데.", if: "S.flags.school_sib_along" },
    ],
    next: "school_dawon_hall",
  },

  school_science_retry: {
    bg: "school",
    lines: [
      { t: "다시 과학실 앞. 이번에는 종이에 적힌 대로 했다. 세 번, 쉬고, 두 번." },
      { t: "한참 뒤 문이 열렸다. 김 선생은 아직도 소화기를 들고 있었지만, 이번에는 내려놓았다." },
      { s: "김동현 선생", t: "……아까는 미안해요. 3주 동안 문 열고 들어온 건 전부 저것들이었어요." },
      { s: "sib", t: "쌤, 저예요. 2학년 3반. 과학 수행평가 늦게 낸 애.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "……어. 어! 학생. 살아 있었구나. 들어와요, 둘 다. 아니, 제발 들어와요.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "들어와요. 이번엔 제대로 얘기합시다.", if: "!S.flags.school_sib_along" },
    ],
    set: { "flags.school_teacher_hostile": false },
    next: "school_teacher_talk",
  },

  school_science_reveal: {
    bg: "school",
    fx: { trust: 3 },
    lines: [
      { s: "sib", t: "쌤! 김동현 쌤! 저예요, 2학년 3반이요!" },
      { t: "안에서 뭔가 떨어지는 소리. 그리고 문이 벌컥 열렸다." },
      { s: "김동현 선생", t: "……학생? 학생이야? 세상에. 세상에, 살아 있었어." },
      { t: "안경 쓴 남자가 동생의 어깨를 양손으로 잡고 한참 들여다봤다. 눈가가 붉었다." },
      { s: "김동현 선생", t: "들어와. 둘 다. 이쪽은……보호자? 형제? 아무튼 들어와요. 소리 내지 말고." },
      { s: "sib", t: "쌤 판서는 여전히 못 알아보겠더라고요. 칠판에 써놓은 거." },
      { s: "김동현 선생", t: "……이 와중에 그 소리를 하니. 그래, 너 맞다." },
    ],
    next: "school_teacher_talk",
  },

  school_teacher_talk: {
    bg: "school",
    set: { "flags.school_teacher_ally": true },
    fx: { mind: 5 },
    lines: [
      { t: "과학실은 요새였다. 실험대로 문을 막고, 창문에 암막, 구석에 침낭. 그리고 창가에 안테나 선이 이어진 낡은 무전기." },
      { s: "김동현 선생", t: "아마추어 무선. 취미였어요. 이게 이렇게 쓰일 줄은 몰랐지." },
      { s: "김동현 선생", t: "애들 하교시키고 남은 교사들이랑 여기 있었어요. 하나둘 집에 가겠다고 나갔고……돌아온 사람은 없어요." },
      { s: "김동현 선생", t: "저는 집이 수원이라. 봉쇄선 너머예요. 그래서 여기 남아서 교신이라도 하자고." },
      { s: "sib", t: "쌤, 밥은요?", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "급식실 창고. 건빵이랑 미숫가루. 한 달은 버텨요. 혼자면.", if: "S.flags.school_sib_along" },
      { t: "무전기 옆에 노트가 펼쳐져 있었다. 날짜마다 빽빽하게 뭔가 적혀 있었다." },
    ],
    choices: [
      { t: "\"방송, 들을 수 있어요?\"", go: "school_radio_listen" },
      { t: "\"그 노트에 뭐가 적혀 있어요?\"", go: "school_teacher_notes" },
    ],
  },

  school_teacher_notes: {
    bg: "school",
    lines: [
      { s: "김동현 선생", t: "교신 기록. 들리는 건 전부 적어요. 어느 날 안 들리게 될 수도 있으니까." },
      { t: "노트를 넘겼다. 'FM 99.9 — 수원 비상대책본부 — 토요일 05:00 동탄역 북광장 수송.' 같은 문장이 매일 반복해서 적혀 있었다." },
      { t: "그런데 11월 3일부터는 문장 옆에 작은 물음표가 하나씩 늘어나 있었다." },
      { s: "me", t: "이 물음표는요?" },
      { s: "김동현 선생", t: "……그건 직접 들어보고 얘기해요. 제 생각이 틀렸으면 좋겠으니까." },
    ],
    next: "school_radio_listen",
  },

  school_radio_listen: {
    bg: "school",
    set: { "flags.info_route": true, "flags.info_time": true },
    lines: [
      { t: "김 선생이 다이얼을 돌렸다. 잡음. 잡음. 그리고 또렷한 남자 목소리." },
      { s: "라디오", t: "수원 비상대책본부입니다. 반복합니다. 동탄 지역 생존자 여러분. 매주 토요일 새벽 5시, 동탄역 북광장에서 수원행 수송차량이 출발합니다." },
      { s: "라디오", t: "감염 증상이 없는 분만 탑승 가능합니다. 소지품은 최소화하십시오. 반복합니다. 매주 토요일 새벽 5시……" },
      { s: "sib", t: "토요일! 야, 토요일이면……", if: "S.flags.school_sib_along" },
      { s: "me", t: "며칠 남았어. 세 보자." },
      { t: "머릿속으로 날짜를 셌다. 토요일 새벽은 지금부터 세어 8일째 새벽이다." },
      { s: "김동현 선생", t: "……들었죠. 좋은 소식이죠. 그런데." },
      { s: "김동현 선생", t: "저 방송, 3주 동안 토씨 하나 안 바뀌었어요. 날씨 얘기도, 날짜 얘기도 없어요. 사람이 하는 방송이면 그럴 수 있나." },
      { s: "김동현 선생", t: "제가 수원 쪽에 호출을 넣어봤어요. 매일. 한 번도 응답이 없어요. 그냥……제 생각이에요. 틀렸으면 좋겠고." },
    ],
    next: "school_radio_after",
  },

  school_radio_after: {
    bg: "school",
    lines: [
      { t: "무전기는 책상에 볼트로 고정돼 있었다. 그 옆에 건전지로 돌아가는 작은 휴대용 라디오가 하나 더 있었다." },
      { s: "김동현 선생", t: "부탁이 하나 있어요. 옥상 안테나가 바람에 꺾였어요. 그거 세우면 수신 범위가 넓어져서, 수원 말고 다른 데도 잡힐지 몰라요." },
      { s: "김동현 선생", t: "제가 올라가면 되는데……고소공포증이. 웃기죠. 3주 동안 회색인은 견뎠는데 높이는 못 견뎌요." },
    ],
    choices: [
      { t: "\"무전기를 저희한테 주실 수 있어요?\"", go: "school_ask_radio", if: "!has('라디오')" },
      { t: "안테나를 고쳐주겠다고 한다", go: "school_antenna_ask", if: "!S.flags.school_antenna_done" },
      { t: "거절한다. 위험하다", go: "school_antenna_refuse", if: "!S.flags.school_antenna_done" },
      { t: "이만 가보겠다고 한다", go: "school_teacher_bye" },
    ],
  },

  school_ask_radio: {
    bg: "school",
    lines: [
      { s: "김동현 선생", t: "무전기는 안 돼요. 그건 여기 안테나가 있어야 쓸모가 있고, 제가 유일하게 하는 일이 그거예요." },
      { s: "김동현 선생", t: "대신 이거. 휴대용 라디오. 99.9 맞춰놨어요. 건전지는 아껴 써요." },
      { t: "작은 라디오를 받았다. 손바닥만 했다. 이걸로 방송을 직접 들을 수 있다." },
      { s: "sib", t: "쌤 완전 사기꾼인 줄 알았는데.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "……수행평가 점수 다시 매길까.", if: "S.flags.school_sib_along" },
    ],
    item: ["라디오"],
    set: { "flags.radio": true },
    fx: { trust: 2 },
    next: "school_radio_after",
  },

  school_antenna_ask: {
    bg: "school",
    lines: [
      { s: "김동현 선생", t: "……정말요? 고마워요. 옥상 문은 열려 있어요. 안테나는 급수탑 옆. 선만 다시 끼우고 폴대를 세우면 돼요." },
      { s: "김동현 선생", t: "바람이 심하니까 난간에서 떨어져요. 그리고 옥상 문 열어두면 안 돼요. 소리가 새요." },
      { s: "sib", t: "나도 갈래. 내가 더 가벼우니까 올라가기 쉬워.", if: "S.flags.school_sib_along" },
    ],
    choices: [
      { t: "혼자 올라간다", go: "school_antenna_roof", set: { "flags.school_antenna_who": "me" } },
      { t: "동생과 같이 올라간다", go: "school_antenna_roof", if: "S.flags.school_sib_along", set: { "flags.school_antenna_who": "both" } },
      { t: "[유대 70↑] 동생에게 올라가게 하고 아래서 잡아준다", go: "school_antenna_roof", if: "S.flags.school_sib_along && S.trust >= 70", set: { "flags.school_antenna_who": "sib" } },
    ],
  },

  school_antenna_roof: {
    bg: "school",
    lines: [
      { t: "옥상. 바람이 패딩을 뚫고 들어왔다. 동탄 전체가 보였다. 불 켜진 창이 하나도 없는 아파트 숲." },
      { t: "급수탑 옆, 폴대가 반으로 꺾여 있었다. 케이블은 빠져서 바닥에서 뱀처럼 꿈틀거렸다." },
      { t: "멀리 동탄역 쪽. 북광장에 뭔가 큰 것이 서 있는 게 보였다. 버스? 너무 멀어서 확실하지 않았다." },
      { s: "sib", t: "야, 저기 동탄역. 버스 있어. 진짜로 있어!", if: "S.flags.school_antenna_who !== 'me'" },
      { t: "폴대를 세우려면 급수탑 사다리를 반쯤 올라가 케이블을 끼워야 했다. 사다리는 녹슬었고, 바람은 멈추지 않았다." },
      { t: "동생이 사다리를 올라갔다. 나는 아래서 사다리를 두 손으로 붙잡았다. 가벼운 몸이 바람에 흔들렸다.", if: "S.flags.school_antenna_who === 'sib'" },
      { t: "내가 사다리를 올라갔다. 동생이 아래에서 폴대를 받쳤다.", if: "S.flags.school_antenna_who === 'both'" },
      { t: "혼자 사다리를 올라갔다. 아래에서 붙잡아줄 사람은 없었다.", if: "S.flags.school_antenna_who === 'me'" },
    ],
    choices: [
      { t: "천천히, 한 손은 항상 사다리를 잡고 작업한다", go: "school_antenna_success", fx: { mind: -3 } },
      { t: "바람이 잦아든 틈에 빠르게 끝낸다", go: "school_antenna_fall" },
      { t: "[아이템: 야구방망이] 방망이를 지렛대로 써서 폴대를 세운다", go: "school_antenna_success", if: "has('야구방망이')", fx: { mind: 2 } },
    ],
  },

  school_antenna_fall: {
    bg: "school",
    lines: [
      { t: "돌풍. 사다리가 흔들렸다. 손이 미끄러졌다." },
      { t: "1미터 반. 옥상 바닥에 어깨부터 떨어졌다. 숨이 멎었다가 돌아왔다.", if: "S.flags.school_antenna_who !== 'sib'" },
      { t: "동생이 미끄러졌다. 나는 사다리를 놓고 동생을 받았다. 둘 다 바닥에 굴렀다.", if: "S.flags.school_antenna_who === 'sib'" },
      { s: "sib", t: "야!! 야, 괜찮아?! 일어나봐!", if: "S.flags.school_antenna_who === 'both'" },
      { s: "sib", t: "……미안. 미안해. 내가 빨리 하려고.", if: "S.flags.school_antenna_who === 'sib'" },
      { s: "me", t: "……괜찮아. 어깨만. 괜찮아." },
      { t: "다행히 케이블은 떨어지기 직전에 끼워졌다. 폴대는 비스듬하지만 서 있었다." },
      { t: "옥상 문 쪽에서 소리를 들은 건지, 아래층 복도에서 무언가 끌리는 소리가 났다. 빨리 내려가야 했다." },
    ],
    fx: { hp: -18, mind: -6 },
    set: { "flags.school_antenna_done": true, "flags.school_antenna_hurt": true },
    next: "school_antenna_back",
  },

  school_antenna_success: {
    bg: "school",
    lines: [
      { t: "케이블 끝의 커넥터를 폴대 단자에 끼웠다. 딸깍. 폴대를 세우고 철사로 급수탑 난간에 묶었다." },
      { t: "손이 얼어서 감각이 없었지만, 안테나는 바람 속에서 똑바로 서 있었다." },
      { s: "sib", t: "됐다! 됐어! 쌤 이거 보면 울걸.", if: "S.flags.school_antenna_who !== 'me'" },
      { t: "내려가기 전에 한 번 더 동탄역 쪽을 봤다. 버스는 아까와 똑같은 자리에, 똑같은 모양으로 서 있었다." },
      { t: "주변에 작은 점들이 움직이고 있었다. 사람인지 회색인인지는 여기서 알 수 없었다." },
    ],
    fx: { mind: 4, trust: 3 },
    set: { "flags.school_antenna_done": true, "flags.school_bus_suspect": true },
    next: "school_antenna_back",
  },

  school_antenna_back: {
    bg: "school",
    lines: [
      { t: "과학실로 돌아왔다. 김 선생이 무전기에 귀를 대고 있었다. 잡음이 전보다 맑았다." },
      { s: "김동현 선생", t: "……들려요. 아까보다 훨씬. 고마워요. 정말." },
      { s: "김동현 선생", t: "어깨 괜찮아요? 여기 파스 있어요. 과학실에 왜 파스가 있냐면……묻지 마요.", if: "S.flags.school_antenna_hurt" },
      { t: "김 선생은 잠시 머뭇거리다가, 무전기 옆 서랍에서 휴대용 라디오를 꺼내 내밀었다.", if: "!has('라디오')" },
      { s: "김동현 선생", t: "이거 가져가요. 99.9 맞춰놨어요. 저는 이제 큰 거 있으니까.", if: "!has('라디오')" },
      { t: "그리고 선생은 실험대에 걸터앉아, 한참 동안 창문 암막을 바라봤다." },
    ],
    item: ["라디오"],
    set: { "flags.radio": true },
    next: "school_teacher_offer",
  },

  school_antenna_refuse: {
    bg: "school",
    lines: [
      { s: "me", t: "죄송해요. 지금 바람에 옥상은……저희도 돌아가야 해서요." },
      { s: "김동현 선생", t: "……그렇죠. 맞아요. 제가 염치없는 부탁을 했어요. 학생 보호자한테." },
      { s: "김동현 선생", t: "그래도 라디오는 가져가요. 방송 들으면서 날짜 세요. 틀리면 안 되니까." },
      { t: "휴대용 라디오를 받았다. 선생의 손은 차가웠다.", if: "!has('라디오')" },
    ],
    item: ["라디오"],
    set: { "flags.radio": true, "flags.school_antenna_done": true },
    fx: { trust: -1 },
    next: "school_teacher_offer",
  },

  school_teacher_offer: {
    bg: "school",
    set: { "flags.school_offer_stay": true },
    lines: [
      { s: "김동현 선생", t: "……있잖아요. 이건 그냥 생각해보라는 건데." },
      { s: "김동현 선생", t: "토요일 수송이 진짜가 아니면. 혹은 진짜여도 둘이서 북광장까지 가는 게 너무 위험하면." },
      { s: "김동현 선생", t: "여기 와요. 과학실. 급식 창고 식량이면 셋이 두 달은 버텨요. 안테나도 섰고, 언젠가 누군가는 응답할 거예요." },
      { s: "sib", t: "쌤이랑 학교에서 산다고요? 아, 그건 좀……", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "과학 수행평가는 안 시켜. 약속해.", if: "S.flags.school_sib_along" },
      { s: "me", t: "……생각해볼게요." },
      { s: "김동현 선생", t: "그래요. 문은 항상 세 번, 쉬고, 두 번이에요." },
    ],
    next: "school_teacher_bye",
  },

  school_teacher_bye: {
    bg: "school",
    lines: [
      { s: "김동현 선생", t: "어두워지기 전에 가요. 운동장은 후문으로. 셋이 정문 쪽에 몰려 있어요." },
      { s: "김동현 선생", t: "학생. 꼭 살아서 와. 선생이 할 수 있는 말이 이것밖에 없다.", if: "S.flags.school_sib_along" },
      { s: "sib", t: "……네. 쌤도요.", if: "S.flags.school_sib_along" },
      { t: "과학실 문이 닫혔다. 세 번, 쉬고, 두 번. 복도는 다시 조용해졌다." },
    ],
    choices: [
      { t: "옆 학교도 들러본다", go: "school_dongwon_gate", if: "!S.flags.school_dongwon_done" },
      { t: "골목 끝 컨테이너로 간다 (정우)", go: "school_container", if: "(S.flags.school_board_hint || S.flags.school_office_seen) && !S.flags.school_jungwoo" },
      { t: "집으로 돌아간다", go: "school_leave" },
    ],
  },

  // ───────────────────────── 재방문: 김 선생 ─────────────────────────
  school_revisit_teacher: {
    bg: "school",
    lines: [
      { t: "과학실 문. 세 번, 쉬고, 두 번. 문이 전보다 빨리 열렸다." },
      { s: "김동현 선생", t: "왔어요? 들어와요. 마침 할 얘기가 있었어요." },
      { s: "김동현 선생", t: "학생! 얼굴이 좀 야위었네. 밥은 먹고 다니지?", if: "S.flags.school_sib_along" },
      { s: "sib", t: "쌤이 할 말은 아니죠. 쌤 볼 들어갔어요.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "동생은요? 아프다고요? ……해열제는 있어요? 여기 조금 있는데.", if: "!S.flags.school_sib_along && S.flags.sib_sick && !S.flags.sib_cured" },
      { t: "무전기 옆 노트가 두 장 더 넘어가 있었다. 물음표가 더 늘어 있었다." },
    ],
    choices: [
      { t: "\"수원이랑 교신은 됐어요?\"", go: "school_revisit_radio" },
      { t: "해열제를 받는다", go: "school_revisit_meds", if: "!S.flags.school_sib_along && S.flags.sib_sick && !S.flags.sib_cured && !S.flags.school_meds_given" },
      { t: "정우 얘기를 꺼낸다", go: "school_revisit_jungwoo_talk", if: "S.flags.school_jungwoo && !S.flags.school_jungwoo_join && !S.flags.school_teacher_jungwoo" },
      { t: "인사만 하고 나온다", go: "school_leave" },
    ],
  },

  school_revisit_meds: {
    bg: "school",
    set: { "flags.school_meds_given": true },
    fx: { meds: 1, mind: 3 },
    lines: [
      { s: "김동현 선생", t: "여기. 양호실에서 가져온 거예요. 해열제 한 통. 애들 열나면 주려고 뒀는데, 이제 애들이……" },
      { t: "선생은 말을 끝내지 않았다. 약통을 내 손에 쥐여줬다." },
      { s: "김동현 선생", t: "회색열이면 해열제로는 못 막아요. 알죠? 병원에 파란 상자라는 게 있다는 소문이……소문이에요. 확인은 못 했고." },
      { s: "me", t: "……알아요. 그래도 고마워요." },
    ],
    next: "school_revisit_teacher",
  },

  school_revisit_radio: {
    bg: "school",
    lines: [
      { s: "김동현 선생", t: "안테나 세운 뒤로 수신 범위가 넓어졌어요. 그래서 알게 된 게 있어요.", if: "S.flags.school_antenna_done" },
      { s: "김동현 선생", t: "안테나가 그 모양이라 범위는 그대로예요. 그래도 알게 된 게 있어요.", if: "!S.flags.school_antenna_done" },
      { s: "김동현 선생", t: "99.9 방송. 녹음을 떠서 비교해봤어요. 매일 같은 시각에 같은 잡음이 같은 자리에서 나요. 기침 소리까지 같아요." },
      { s: "김동현 선생", t: "사람이 아니에요. 어딘가에서 녹음된 걸 반복 재생하는 거예요. 3주 전에 녹음된 걸." },
      { s: "sib", t: "……그럼 토요일 버스는요?", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "모르죠. 3주 전엔 진짜였을 수도 있고. 지금도 진짜일 수도 있고. 다만 저 방송은 그걸 보증하지 않아요." },
      { t: "김 선생은 노트의 물음표들을 손가락으로 하나하나 짚었다." },
      { s: "김동현 선생", t: "그리고 어젯밤. 다른 주파수에서 짧게 뭔가 잡혔어요. '……병원 뒤……차량……' 그게 다예요. 그리고 끊겼어요." },
    ],
    set: { "flags.info_fake": true, "flags.info_route": true, "flags.info_time": true, "flags.school_amb_hint": true },
    fx: { mind: -5 },
    choices: [
      { t: "\"그래도 토요일에 북광장에 가볼 거예요.\"", go: "school_revisit_decide_go" },
      { t: "\"병원 뒤를 확인해봐야겠어요.\"", go: "school_revisit_decide_hosp" },
      { t: "\"……여기 남으라는 얘기, 아직 유효해요?\"", go: "school_revisit_decide_stay", if: "S.flags.school_offer_stay" },
    ],
  },

  school_revisit_decide_go: {
    bg: "school",
    lines: [
      { s: "김동현 선생", t: "……말릴 순 없죠. 가면, 새벽 4시엔 출발해요. 멀리서 먼저 보고. 버스가 움직이는지, 사람이 타는지." },
      { s: "김동현 선생", t: "안 움직이면 돌아와요. 여기로. 문은 세 번, 쉬고, 두 번." },
      { s: "sib", t: "쌤 그 말 몇 번째예요.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "외울 때까지.", if: "S.flags.school_sib_along" },
    ],
    next: "school_leave",
  },

  school_revisit_decide_hosp: {
    bg: "school",
    fx: { mind: 3 },
    lines: [
      { s: "김동현 선생", t: "대학병원. 거기 아직 사람이 있다는 얘기를 들었어요. 간호사 한 분이. 그리고 오토바이 소리도 자주 나고." },
      { s: "김동현 선생", t: "조심해요. 약 있는 데는 사람이 꼬여요. 좋은 사람만 꼬이는 게 아니고." },
      { s: "me", t: "알아요." },
      { s: "김동현 선생", t: "……정말 아는 얼굴이네. 가요. 어두워져요." },
    ],
    next: "school_leave",
  },

  school_revisit_decide_stay: {
    bg: "school",
    fx: { trust: 2, mind: 4 },
    lines: [
      { s: "김동현 선생", t: "유효해요. 언제든. 침낭 두 개 더 있고, 창고 열쇠는 여기." },
      { s: "김동현 선생", t: "……사실은 그게 제일 안전한 선택일지도 몰라요. 재미없는 선택이지만. 어른이 재미없는 선택을 하는 거예요." },
      { s: "sib", t: "쌤 그거 꼰대 발언인 거 알죠.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "알아. 그래도 살아 있는 꼰대가 낫지.", if: "S.flags.school_sib_along" },
      { t: "결정은 나중이다. 하지만 돌아갈 곳이 하나 더 생겼다는 건 확실했다." },
    ],
    set: { "flags.school_stay_confirmed": true },
    next: "school_leave",
  },

  school_revisit_jungwoo_talk: {
    bg: "school",
    set: { "flags.school_teacher_jungwoo": true },
    lines: [
      { s: "me", t: "정우라는 애, 아세요? 컨테이너에서 혼자 지내는." },
      { s: "김동현 선생", t: "……알아요. 몇 번 데려오려고 했는데 저를 안 믿어요. 어른이 자기 부모님을 병원에 데려갔고, 거기서 둘 다 못 돌아왔으니까." },
      { s: "김동현 선생", t: "학생이 가면 달라요. 친구니까. 그 애한테 지금 필요한 건 어른이 아니라 또래예요.", if: "S.flags.school_sib_along" },
      { s: "김동현 선생", t: "동생 데리고 가봐요. 친구가 말하면 달라요.", if: "!S.flags.school_sib_along" },
      { t: "선생은 건빵 한 봉지를 내밀었다. 정우 몫이라고 했다." },
    ],
    fx: { food: 1 },
    next: "school_revisit_teacher",
  },

  // ───────────────────────── 옆 학교 ─────────────────────────
  school_dongwon_gate: {
    bg: "school",
    set: { "flags.school_dongwon_done": true },
    lines: [
      { t: "옆 학교 정문은 열려 있었다. 아니, 뜯겨 있었다. 철문 한쪽이 경첩째 떨어져 운동장에 누워 있었다." },
      { t: "운동장에는 아무것도 없었다. 회색인도, 사람도. 농구 골대 그물만 바람에 흔들렸다." },
      { s: "sib", t: "여기 애들은 우리 학교 애들보다 세다고 소문났었는데. 다 어디 갔지.", if: "S.flags.school_sib_along" },
      { t: "현관 유리에 피 묻은 손자국이 말라붙어 있었다. 오래된 것이었다." },
      { t: "건물 안으로 들어가는 길은 셋. 옥상으로 가는 비상계단, 급식실, 그리고 1층 끝 방송실." },
      { t: "비상계단 벽에 분필 글씨. '옥상에서 역이 보임.'" },
    ],
    choices: [
      { t: "옥상으로 올라간다", go: "school_dongwon_roof", if: "!S.flags.school_roof_seen" },
      { t: "급식실을 뒤진다", go: "school_dongwon_cafeteria", if: "!S.flags.school_dw_cafe_done" },
      { t: "방송실로 간다", go: "school_dongwon_broadcast", if: "!S.flags.school_tape_seen" },
      { t: "골목 끝 컨테이너로 간다 (정우)", go: "school_container", if: "(S.flags.school_board_hint || S.flags.school_office_seen) && !S.flags.school_jungwoo" },
      { t: "옆 학교를 나간다", go: "school_leave" },
    ],
  },

  school_dongwon_roof: {
    bg: "school",
    set: { "flags.school_roof_seen": true },
    fx: { mind: -2 },
    lines: [
      { t: "비상계단 5층. 숨이 찼다. 옥상 문은 벽돌로 괴어 열려 있었다. 누군가 먼저 여기 올라왔었다." },
      { t: "옥상에서 남쪽. 동탄역이 보였다. 그리고 북광장. 버스 두 대가 나란히 서 있었다. 파란색 관광버스." },
      { s: "sib", t: "버스! 진짜 있어! 방송이 진짜였어!", if: "S.flags.school_sib_along" },
      { t: "버스 옆 가로등 기둥에 스피커가 매달려 있었다. 바람 방향이 맞을 때, 희미하게 목소리가 실려 왔다." },
      { s: "라디오", t: "……동탄 지역 생존자 여러분……매주 토요일 새벽 5시……" },
      { t: "버스 주변으로 점 같은 것들이 움직였다. 느리게. 아주 느리게. 버스 쪽으로 모였다가 흩어졌다가." },
      { t: "옥상 난간에 누군가 매직으로 써놓은 글씨. '11/8 버스 안 움직임' '11/15 버스 안 움직임'" },
    ],
    choices: [
      { t: "한 시간 더 지켜본다 (춥다, 해가 짧다)", go: "school_dongwon_roof_watch", fx: { hp: -5, mind: -4 } },
      { t: "충분히 봤다. 내려간다", go: "school_dongwon_roof_leave" },
    ],
  },

  school_dongwon_roof_watch: {
    bg: "school",
    set: { "flags.info_fake": true, "flags.info_route": true, "flags.info_time": true, "flags.school_bus_suspect": true },
    lines: [
      { t: "한 시간. 손이 곱았다. 동생은 내 패딩 안으로 손을 집어넣었다.", if: "S.flags.school_sib_along" },
      { t: "한 시간. 손이 곱았다. 혼자 서 있는 옥상은 시간이 두 배로 흘렀다.", if: "!S.flags.school_sib_along" },
      { t: "스피커의 방송이 끝나고, 잡음, 그리고 다시 처음부터. 정확히 11분 간격. 기침 소리까지 같은 자리에서." },
      { t: "버스는 한 번도 움직이지 않았다. 시동 소리도, 불빛도 없었다. 앞 타이어가 주저앉아 있었다." },
      { t: "그리고 버스 주변의 점들. 햇빛 각도가 바뀌자 보였다. 하나같이 잿빛. 전부 회색인이었다. 수십." },
      { s: "sib", t: "……저거 다. 다 저것들이야. 버스 타러 갔던 사람들이……", if: "S.flags.school_sib_along" },
      { s: "me", t: "그만 봐. 내려가자." },
      { t: "방송은 녹음이다. 버스는 미끼다. 아니, 미끼조차 아니다. 그냥 3주 전에 멈춘 시계다." },
      { t: "토요일 새벽 5시, 북광장. 그 정보는 이제 '가지 말아야 할 곳'이 됐다." },
    ],
    fx: { mind: -8, trust: 4 },
    next: "school_dongwon_roof_leave",
  },

  school_dongwon_roof_leave: {
    bg: "school",
    set: { "flags.info_route": true, "flags.info_time": true },
    lines: [
      { t: "계단을 내려왔다. 난간의 매직 글씨가 머릿속에서 지워지지 않았다. '버스 안 움직임.'", if: "!S.flags.info_fake" },
      { t: "뭔가 이상하다. 하지만 멀리서 본 것만으로 단정할 순 없다. 토요일 새벽 5시. 날짜는 알았다.", if: "!S.flags.info_fake" },
      { t: "계단을 내려왔다. 다리가 후들거렸다. 추위 때문만은 아니었다.", if: "S.flags.info_fake" },
      { s: "sib", t: "……그래도 가볼 거야? 토요일에.", if: "S.flags.school_sib_along && S.flags.info_fake" },
      { s: "me", t: "다른 길을 찾아야지. 있을 거야.", if: "S.flags.school_sib_along && S.flags.info_fake" },
    ],
    set: { "flags.info_route": true, "flags.info_time": true, "flags.school_bus_suspect": true },
    next: "school_dongwon_gate",
  },

  school_dongwon_cafeteria: {
    bg: "school",
    set: { "flags.school_dw_cafe_done": true },
    lines: [
      { t: "옆 학교 급식실. 동생 학교보다 컸다. 그리고 더 심하게 뒤집혀 있었다. 누군가 이미 다 훑고 간 자리." },
      { t: "그런데 창고 안쪽, 선반 뒤에 라면 박스 하나가 끼어 있었다. 다섯 개들이." },
      { t: "라면 박스에 손을 뻗는 순간, 조리대 뒤에서 그릇이 떨어졌다. 조리복을 입은 회색인. 한 명. 느리게 일어났다." },
      { s: "sib", t: "(속삭임) 야, 야, 뒤에……", if: "S.flags.school_sib_along" },
      { t: "거리 5미터. 라면 박스까지 2미터. 출구까지 8미터." },
    ],
    choices: [
      { t: "라면을 챙기고 뛴다", go: "school_dongwon_cafeteria_grab" },
      { t: "[아이템: 야구방망이] 방망이로 맞선다", go: "school_dongwon_cafeteria_fight", if: "has('야구방망이')" },
      { t: "[아이템: 식칼] 칼로 맞선다", go: "school_dongwon_cafeteria_fight", if: "has('식칼')" },
      { t: "포기하고 조용히 물러난다", go: "school_dongwon_cafeteria_sneak" },
    ],
  },

  school_dongwon_cafeteria_grab: {
    bg: "school",
    fx: { food: 3 },
    lines: [
      { t: "박스를 끌어안고 돌아섰다. 회색인의 손이 패딩 소매를 스쳤다. 천 찢어지는 소리." },
      { t: "출구. 문을 닫았다. 안에서 둔탁하게 문을 두드리는 소리가 세 번, 네 번, 그리고 멈췄다." },
      { s: "sib", t: "……소매. 소매 봐봐. 물린 거 아니지?", if: "S.flags.school_sib_along" },
      { t: "소매를 걷었다. 긁힌 자국도 없었다. 천만 찢어졌다. 숨을 내쉬었다." },
      { t: "라면 다섯 개. 패딩 소매 하나와 바꿨다. 나쁘지 않은 거래였다." },
    ],
    fx: { food: 3, mind: -5 },
    next: "school_dongwon_gate",
  },

  school_dongwon_cafeteria_fight: {
    bg: "school",
    lines: [
      { t: "맞섰다. 회색인은 느렸고, 나는 빨랐다. 하지만 그것은 아프다는 걸 몰랐다." },
      { t: "두 번. 세 번. 네 번째에 쓰러졌다. 조리복 명찰에 이름이 있었다. 읽지 않았다." },
      { s: "sib", t: "……", if: "S.flags.school_sib_along" },
      { s: "sib", t: "야. 괜찮아? 손 떨려.", if: "S.flags.school_sib_along" },
      { s: "me", t: "괜찮아. 라면 들어." },
      { t: "라면 다섯 개를 챙겼다. 창고 안쪽에 참치캔 두 개도 더 있었다. 급식실을 나올 때 뒤를 돌아보지 않았다." },
    ],
    fx: { food: 4, mind: -10, hp: -4 },
    set: { "flags.school_killed_one": true },
    next: "school_dongwon_gate",
  },

  school_dongwon_cafeteria_sneak: {
    bg: "school",
    lines: [
      { t: "뒷걸음질. 한 발. 두 발. 회색인은 소리가 난 그릇 쪽을 보고 있었다." },
      { t: "문을 소리 없이 닫았다. 라면 다섯 개는 그 안에 그대로 두고." },
      { s: "sib", t: "……라면. 라면 다섯 개였는데.", if: "S.flags.school_sib_along" },
      { s: "me", t: "라면보다 네가 비싸." },
      { s: "sib", t: "……그런 말 하면 반칙이지.", if: "S.flags.school_sib_along" },
    ],
    fx: { trust: 4, mind: 2 },
    next: "school_dongwon_gate",
  },

  school_dongwon_broadcast: {
    bg: "school",
    set: { "flags.school_tape_seen": true },
    lines: [
      { t: "1층 끝 방송실. 문은 잠겨 있었지만, 유리창이 깨져 있어 손을 넣어 열 수 있었다." },
      { t: "안은 좁았다. 믹서, 마이크, 그리고 책상 위에 보조배터리에 연결된 작은 송신기. 전원 LED가 빨갛게 깜빡였다." },
      { t: "송신기 옆에 녹음기. 재생 버튼이 테이프로 고정돼 있었다. '반복' 램프가 켜져 있었다." },
      { t: "포스트잇 한 장. '수원 본부 지시. 11/8 05:00 수송 안내. 본인은 11/9 철수. 배터리 교체 바람. — 방송반 담당' " },
      { s: "sib", t: "11월 8일? 야, 그거 2주 전이잖아.", if: "S.flags.school_sib_along" },
      { t: "녹음기를 들어 올렸다. 라벨: '동탄 생존자 안내 v1'. 날짜 11월 7일. 그 뒤로 갱신된 적 없는 v1." },
      { t: "99.9 방송은 여기서 나가고 있었다. 수원이 아니라, 옆 학교 방송실에서. 3주 전에 녹음된 목소리로." },
    ],
    choices: [
      { t: "녹음기를 끈다. 더는 아무도 속지 않게", go: "school_broadcast_off" },
      { t: "그대로 둔다. 누군가의 희망일지도", go: "school_broadcast_on" },
      { t: "녹음기에 새 메시지를 덧붙인다", go: "school_broadcast_record" },
    ],
  },

  school_broadcast_off: {
    bg: "school",
    set: { "flags.info_fake": true, "flags.info_route": true, "flags.info_time": true, "flags.school_broadcast_off": true },
    fx: { mind: -6 },
    lines: [
      { t: "재생 버튼의 테이프를 뜯었다. 빨간 램프가 꺼졌다. 방송실은 완전히 조용해졌다." },
      { t: "이제 동탄 어디서도 99.9는 잡히지 않을 것이다. 토요일 새벽 5시도, 수원행 버스도." },
      { s: "sib", t: "……잘한 거 맞지? 누가 이거 듣고 토요일에 거기 갔다가……", if: "S.flags.school_sib_along" },
      { s: "me", t: "맞아. 잘한 거야." },
      { t: "확신은 없었다. 하지만 북광장의 버스 주변에 모여 있던 점들을 생각하면, 다른 선택은 없었다." },
      { t: "방송은 가짜였다. 진짜 길은 다른 데 있어야 한다. 있어야만 한다." },
    ],
    next: "school_dongwon_gate",
  },

  school_broadcast_on: {
    bg: "school",
    set: { "flags.info_fake": true, "flags.info_route": true, "flags.info_time": true },
    fx: { mind: -4 },
    lines: [
      { t: "손을 거뒀다. 빨간 램프는 계속 깜빡였다." },
      { s: "sib", t: "……왜 안 꺼? 가짜잖아.", if: "S.flags.school_sib_along" },
      { s: "me", t: "가짜여도, 저 방송 들으면서 하루 더 버티는 사람이 있을지도 몰라. 우리처럼." },
      { s: "sib", t: "……그렇게 버티다가 토요일에 북광장 가면?", if: "S.flags.school_sib_along" },
      { t: "대답하지 못했다. 방송실 문을 닫았다. 램프는 유리창 너머에서 계속 깜빡였다." },
      { t: "방송은 가짜다. 적어도 우리는 안다. 그걸로 충분한지는 모르겠다." },
    ],
    next: "school_dongwon_gate",
  },

  school_broadcast_record: {
    bg: "school",
    set: { "flags.info_fake": true, "flags.info_route": true, "flags.info_time": true, "flags.school_broadcast_warned": true },
    fx: { mind: 4, trust: 3 },
    lines: [
      { t: "녹음기에 '추가 녹음' 버튼이 있었다. 마이크를 잡았다. 손이 떨렸다." },
      { s: "me", t: "……이 방송은 11월 7일에 녹음된 겁니다. 북광장 버스는 움직이지 않습니다. 가지 마세요. 주변에 감염자가 많습니다." },
      { s: "sib", t: "(속삭임) 이름은 말하지 마. 어디 사는지도.", if: "S.flags.school_sib_along" },
      { s: "me", t: "……살아 있는 사람이 있으면, 동생 학교 과학실로. 세 번, 쉬고, 두 번.", if: "S.flags.school_teacher_ally" },
      { s: "me", t: "……살아 있는 사람이 있으면, 조심하세요. 그게 다예요.", if: "!S.flags.school_teacher_ally" },
      { t: "녹음을 저장했다. 이제 11분마다 3주 전 목소리 뒤에 내 목소리가 따라붙을 것이다." },
      { s: "sib", t: "……야. 너 목소리 떨렸어. 근데 멋있었어.", if: "S.flags.school_sib_along" },
    ],
    next: "school_dongwon_gate",
  },

  // ───────────────────────── 정우 ─────────────────────────
  school_container: {
    bg: "school",
    lines: [
      { t: "두 학교 담 사이, 공사용 컨테이너 하나. 문에 자물쇠가 바깥에서 걸려 있었다. 안에서 잠근 게 아니다. 안에서 들어가서 바깥 자물쇠를 거는 건 불가능하다." },
      { t: "그런데 컨테이너 밑, 바닥 틈에서 고양이 한 마리가 기어 나왔다. 잿빛 털. 목에 빨간 끈." },
      { s: "sib", t: "회색이! 회색이 맞아! 정우야? 정우 안에 있어?", if: "S.flags.school_sib_along" },
      { t: "컨테이너 뒤편으로 돌아갔다. 벽 아래쪽 패널이 하나 뜯겨 있었다. 사람 하나 겨우 들어갈 구멍.", if: "!S.flags.school_sib_along" },
      { t: "안에서 아주 작은 기척. 숨을 참는 소리." },
    ],
    choices: [
      { t: "동생에게 이름을 부르게 한다", go: "school_jungwoo_meet", if: "S.flags.school_sib_along" },
      { t: "\"정우야. {{sib}} 가족이야. 괜찮아.\"", go: "school_jungwoo_meet_alone", if: "!S.flags.school_sib_along" },
      { t: "구멍으로 들어간다", go: "school_jungwoo_barge" },
    ],
  },

  school_jungwoo_meet: {
    bg: "school",
    set: { "flags.school_jungwoo": true },
    fx: { trust: 5, mind: 5 },
    lines: [
      { s: "sib", t: "정우야. 나야. 2학년 3반. 너 옆자리. 수학 시간에 네 지우개 빌려 쓰고 안 돌려준 애." },
      { t: "긴 침묵. 그리고 패널 틈으로 마른 얼굴 하나가 나왔다. 열네 살. 3주 동안 열 살은 더 먹은 얼굴." },
      { s: "정우", t: "……지우개." },
      { s: "sib", t: "어. 그거 아직 내 필통에 있어. 돌려줄게. 집에 가면." },
      { s: "정우", t: "……집." },
      { t: "정우는 컨테이너에서 기어 나왔다. 고양이가 다리에 몸을 비볐다. 정우는 고양이를 안고 우리를 봤다. 나를 오래 봤다." },
      { s: "정우", t: "……어른이에요?" },
      { s: "sib", t: "어른 아냐. 그냥 우리 집 사람이야. 어른이면 내가 이렇게 반말 하겠냐." },
    ],
    next: "school_jungwoo_talk",
  },

  school_jungwoo_meet_alone: {
    bg: "school",
    set: { "flags.school_jungwoo": true },
    fx: { mind: 2 },
    lines: [
      { t: "긴 침묵. 패널 틈으로 눈 하나가 보였다. 나를 재고 있었다." },
      { s: "정우", t: "……{{sib}}? 걔 살아 있어요?" },
      { s: "me", t: "살아 있어. 집에 있어. 네 얘기 했어. 고양이 얘기도." },
      { s: "정우", t: "……왜 혼자 왔어요." },
      { s: "me", t: "걔가 아파서. 열이 나.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
      { s: "me", t: "밖이 위험해서. 내가 먼저 확인하려고.", if: "!S.flags.sib_sick || S.flags.sib_cured" },
      { t: "정우는 패널 안으로 다시 사라졌다가, 고양이를 먼저 밀어내고 그 뒤로 기어 나왔다. 마른 얼굴. 열네 살." },
      { s: "정우", t: "……어른은 믿지 말라고 했어요. 엄마가. 근데 엄마도 어른이었고." },
      { t: "정우는 더 말하지 않았다. 고양이를 안고 나를 봤다. 나를 오래 봤다." },
    ],
    next: "school_jungwoo_talk",
  },

  school_jungwoo_barge: {
    bg: "school",
    set: { "flags.school_jungwoo": true },
    fx: { mind: -4, trust: -2 },
    lines: [
      { t: "구멍으로 몸을 밀어 넣었다. 어둠. 그리고 얼굴 앞에 뭔가 날카로운 것이 멈췄다. 커터칼." },
      { s: "정우", t: "나가요. 나가. 나가라고." },
      { s: "sib", t: "정우야! 나야! 칼 내려! 야, 나라고!", if: "S.flags.school_sib_along" },
      { s: "me", t: "……미안. 미안해. 나갈게. {{sib}} 가족이야. 해치려는 거 아니야.", if: "!S.flags.school_sib_along" },
      { t: "커터칼이 천천히 내려갔다. 어둠 속에서 고양이가 울었다." },
      { s: "정우", t: "……문으로 들어오는 사람은 다 저것들이었어요. 그래서." },
      { t: "정우가 패널 밖으로 먼저 나왔다. 열네 살. 3주 동안 열 살은 더 먹은 얼굴." },
    ],
    next: "school_jungwoo_talk",
  },

  school_jungwoo_talk: {
    bg: "school",
    lines: [
      { t: "컨테이너 안은 정우가 만든 세계였다. 담요, 생수병, 고양이 사료, 그리고 벽에 테이프로 붙인 동탄 지도." },
      { t: "지도에는 빨간 펜으로 X가 여러 개. 그리고 대학병원 뒤편에 작은 동그라미 하나." },
      { s: "정우", t: "엄마 아빠, 병원에 갔어요. 둘 다 열이 나서. 저는 밖에서 기다리라고 했어요." },
      { s: "정우", t: "사흘 기다렸어요. 병원 뒤 주차장에서. 거기 구급차가 한 대 있는데, 아무도 안 타요. 열쇠가 없어서." },
      { s: "정우", t: "간호사 누나가 그랬어요. 열쇠는 주민센터에 있다고. 그러고 나서 저한테 집에 가라고 했어요. 집이 없는데." },
      { s: "sib", t: "……그래서 여기 숨어 있었어? 3주 동안?", if: "S.flags.school_sib_along" },
      { s: "정우", t: "회색이가 있으니까. 혼자 아니니까." },
    ],
    set: { "flags.school_amb_hint": true },
    choices: [
      { t: "\"우리 집으로 가자.\"", go: "school_jungwoo_persuade" },
      { t: "고양이 얘기를 먼저 꺼낸다", go: "school_jungwoo_cat", if: "!S.flags.school_cat_talked" },
      { t: "식량을 나눠준다", go: "school_jungwoo_food", if: "S.food >= 1 && !S.flags.school_jungwoo_fed" },
      { t: "정보만 얻고 돌아간다", go: "school_jungwoo_leave" },
    ],
  },

  school_jungwoo_cat: {
    bg: "school",
    set: { "flags.school_cat_talked": true },
    fx: { mind: 4, trust: 2 },
    lines: [
      { s: "me", t: "회색이. 이름이 왜 회색이야?" },
      { s: "정우", t: "……회색이라서요. 병 생기기 전에 지은 이름이에요. 바꿀까 했는데, 얘가 자기 이름 알아들어서." },
      { s: "sib", t: "급식실 뒤에서 몰래 키웠잖아. 급식 아줌마들이 다 알면서 모른 척했는데.", if: "S.flags.school_sib_along" },
      { s: "정우", t: "……알았어요? 다?" },
      { s: "sib", t: "학교 전체가 알았어. 너만 몰랐어.", if: "S.flags.school_sib_along" },
      { t: "정우가 아주 잠깐, 3주 만에 처음인 것처럼 웃었다. 고양이가 정우의 턱을 머리로 밀었다." },
      { t: "고양이는 내 손 냄새를 맡고, 허락한다는 듯 한 번 울었다.", if: "!S.flags.school_sib_along" },
    ],
    next: "school_jungwoo_talk",
  },

  school_jungwoo_food: {
    bg: "school",
    set: { "flags.school_jungwoo_fed": true },
    fx: { food: -1, mind: 3 },
    lines: [
      { t: "배낭에서 먹을 것을 꺼내 건넸다. 정우는 받지 않고 한참 쳐다봤다." },
      { s: "정우", t: "……저 사료 있어요. 고양이 사료. 사람도 먹을 수 있어요. 맛은 없는데." },
      { s: "me", t: "이건 사람 거. 먹어." },
      { t: "정우는 반을 떼어 고양이 그릇 옆에 두고, 나머지를 천천히 먹었다. 3주 만에 처음 먹는 속도로." },
      { s: "sib", t: "……야. 쟤 먹는 거 보니까 나 지금 배고픈 게 미안하다.", if: "S.flags.school_sib_along" },
      { t: "정우는 다 먹고 나서, 지도의 병원 뒤 동그라미를 손가락으로 두드렸다." },
      { s: "정우", t: "구급차. 열쇠. 주민센터. ……말했으니까 갚은 거예요." },
    ],
    next: "school_jungwoo_talk",
  },

  school_jungwoo_persuade: {
    bg: "school",
    lines: [
      { s: "정우", t: "……거기 먹을 거 있어요? 셋이 먹을 만큼?" },
      { t: "정우의 질문은 열네 살의 질문이 아니었다. 3주를 혼자 버틴 사람의 질문이었다." },
      { s: "me", t: "많진 않아. 그래도 혼자보다는 나아." },
      { s: "sib", t: "……야. 잠깐. 식량 그거 우리 둘도 간당간당한데.", if: "S.flags.school_sib_along && S.food <= 3" },
      { s: "sib", t: "오라고 해. 내 몫 반 떼줄게. 정우 쟤 급식도 반만 먹어.", if: "S.flags.school_sib_along && S.food > 3" },
      { s: "정우", t: "회색이도 같이요. 안 되면 안 가요." },
    ],
    choices: [
      { t: "\"고양이도 같이. 당연하지.\"", go: "school_jungwoo_join", set: { "flags.school_jungwoo_join": true } },
      { t: "[유대 60↑] 동생에게 결정을 맡긴다", go: "school_jungwoo_join", if: "S.flags.school_sib_along && S.trust >= 60", set: { "flags.school_jungwoo_join": true, "flags.school_sib_decided": true }, fx: { trust: 6 } },
      { t: "\"……미안. 지금은 둘도 벅차.\"", go: "school_jungwoo_leave", fx: { mind: -6, trust: -4 } },
    ],
  },

  school_jungwoo_join: {
    bg: "school",
    fx: { mind: 6, trust: 3 },
    lines: [
      { s: "sib", t: "……그래. 오라고 해. 내가 결정할게. 쟤 혼자 두고 가면 나 밤에 잠 못 자.", if: "S.flags.school_sib_decided" },
      { s: "정우", t: "……진짜요?" },
      { s: "sib", t: "대신 지우개는 못 돌려줘. 그거 이제 공동재산이야.", if: "S.flags.school_sib_along" },
      { t: "정우는 담요와 사료, 그리고 지도를 챙겼다. 고양이는 정우의 패딩 안으로 들어가 머리만 내밀었다." },
      { t: "컨테이너 벽에 매직으로 적었다. '정우 — {{sib}}네 집으로 감.' 누군가 찾아올 때를 위해." },
      { s: "정우", t: "……그 집, 문 몇 번 두드려요?" },
      { s: "me", t: "그냥 들어와. 네 집이야. 이제." },
      { t: "셋이 걸었다. 아니, 셋과 고양이 한 마리. 식량은 더 빨리 줄겠지만, 밤은 조금 덜 길 것이다." },
    ],
    next: "school_leave",
  },

  school_jungwoo_leave: {
    bg: "school",
    lines: [
      { s: "정우", t: "……괜찮아요. 익숙해요." },
      { s: "sib", t: "정우야. 내가 다시 올게. 진짜로. 사물함에 초코바 있었던 거 알지, 그거 하나 네 거야.", if: "S.flags.school_sib_along" },
      { s: "정우", t: "……갈 때 패널 다시 막아주세요. 바람 들어와요." },
      { t: "패널을 원래대로 세웠다. 안에서 고양이 우는 소리가 작게 들리다가 멈췄다." },
      { t: "돌아가는 길, 동생은 아무 말도 하지 않았다. 나도.", if: "S.flags.school_sib_along" },
      { t: "돌아가는 길이 평소보다 길었다. 컨테이너를 두 번 돌아봤다.", if: "!S.flags.school_sib_along" },
    ],
    fx: { mind: -3 },
    next: "school_leave",
  },

  school_revisit_jungwoo: {
    bg: "school",
    lines: [
      { t: "컨테이너. 패널이 그대로 세워져 있었다. 바깥에 고양이 발자국이 서리 위에 찍혀 있었다." },
      { s: "sib", t: "정우야! 나 왔어. 초코바 가져왔어.", if: "S.flags.school_sib_along && has('초코바')" },
      { s: "sib", t: "정우야! 나야. 문 열어.", if: "S.flags.school_sib_along && !has('초코바')" },
      { s: "me", t: "정우야. 나야. 지난번에 왔던.", if: "!S.flags.school_sib_along" },
      { t: "패널이 안에서 밀렸다. 정우의 얼굴은 지난번보다 더 말라 있었다. 입술이 텄다. 고양이는 정우 품에서 자고 있었다." },
      { s: "정우", t: "……왔네요. 진짜 왔네." },
      { s: "정우", t: "사료 떨어졌어요. 회색이 거. 제 건 아직 있는데, 걔가 안 먹어요." },
      { t: "컨테이너 안 온도는 바깥과 다르지 않았다. 담요 하나로 버티는 밤이 며칠이나 더 남았는지, 정우도 모를 것이다." },
    ],
    choices: [
      { t: "\"이번엔 같이 가자. 고양이도.\"", go: "school_revisit_jungwoo_join" },
      { t: "식량을 나눠주고 돌아간다", go: "school_revisit_jungwoo_feed", if: "S.food >= 1" },
      { t: "아무것도 줄 게 없다. 돌아간다", go: "school_jungwoo_leave", if: "S.food < 1" },
    ],
  },

  school_revisit_jungwoo_feed: {
    bg: "school",
    fx: { food: -1, mind: 2, trust: 2 },
    lines: [
      { t: "먹을 것을 건넸다. 정우는 이번엔 바로 받았다. 반을 떼어 고양이 앞에 놓았다. 고양이가 먹었다." },
      { s: "정우", t: "……먹네. 사람 거는 먹네." },
      { s: "sib", t: "다음엔 진짜 데리러 올게. 그때는 싫다고 해도 끌고 갈 거야.", if: "S.flags.school_sib_along" },
      { s: "정우", t: "……다음에." },
      { t: "패널을 다시 세웠다. 이번엔 안에서 먼저 '고마워요'가 들렸다. 작게." },
    ],
    next: "school_leave",
  },

  school_revisit_jungwoo_join: {
    bg: "school",
    set: { "flags.school_jungwoo_join": true },
    fx: { mind: 6, trust: 4 },
    lines: [
      { s: "정우", t: "……저번엔 안 된다고 했잖아요.", if: "!S.flags.school_jungwoo_fed" },
      { s: "me", t: "저번엔 내가 틀렸어." },
      { s: "정우", t: "……회색이도요?" },
      { s: "sib", t: "회색이가 먼저지. 너는 덤이야.", if: "S.flags.school_sib_along" },
      { t: "정우는 담요와 지도를 챙겼다. 고양이 사료 봉지는 비어 있어서 두고 왔다." },
      { t: "컨테이너 벽에 매직으로 적었다. '정우 — {{sib}}네 집으로 감.'" },
      { s: "정우", t: "……병원 뒤 구급차. 열쇠는 주민센터. 그거 꼭 확인해요. 제가 아는 건 그게 다예요." },
      { t: "셋이 걸었다. 식량은 더 빨리 줄겠지만, 컨테이너를 돌아보지 않아도 된다는 건 확실했다." },
    ],
    next: "school_leave",
  },

  // ───────────────────────── 귀가 ─────────────────────────
  school_leave: {
    bg: "street",
    lines: [
      { t: "학교를 나왔다. 해가 아파트 뒤로 넘어가고 있었다. 그림자가 길었다." },
      { t: "동생은 교문 앞에서 한 번 뒤돌아봤다. 운동장의 회색인들은 여전히 느리게 돌고 있었다.", if: "S.flags.school_sib_along && S.flags.school_class_seen" },
      { s: "sib", t: "……나 다시 학교 다닐 수 있을까.", if: "S.flags.school_sib_along && S.flags.school_class_seen && S.flags.school_visits <= 1" },
      { s: "me", t: "다니게 될 거야. 숙제도 다시 하게 될 거고.", if: "S.flags.school_sib_along && S.flags.school_class_seen && S.flags.school_visits <= 1" },
      { s: "sib", t: "……그 말은 안 해도 됐잖아.", if: "S.flags.school_sib_along && S.flags.school_class_seen && S.flags.school_visits <= 1" },
      { t: "정우는 우리 뒤를 세 걸음 떨어져서 따라왔다. 고양이 머리가 패딩 밖으로 나와 주변을 살폈다.", if: "S.flags.school_jungwoo_join && S.visited.school_jungwoo_join === 1 || (S.flags.school_jungwoo_join && S.visited.school_revisit_jungwoo_join === 1)" },
      { t: "라디오를 켜봤다. 잡음 속에서 같은 목소리. '매주 토요일 새벽 5시……' 날짜는 세고 있다.", if: "has('라디오') && !S.flags.info_fake && !S.flags.school_broadcast_off" },
      { t: "라디오를 켜봤다. 잡음뿐이었다. 방송은 꺼졌다. 내가 껐다.", if: "has('라디오') && S.flags.school_broadcast_off" },
      { t: "라디오를 켜봤다. 3주 전 목소리가 나왔다. 가짜라는 걸 아는 채로 듣는 방송은 이상하게 더 외로웠다.", if: "has('라디오') && S.flags.info_fake && !S.flags.school_broadcast_off" },
      { t: "집으로 가는 길. 혼자 걷는 저녁은 더 빨리 어두워진다.", if: "!S.flags.school_sib_along && !S.flags.school_jungwoo_join" },
      { t: "집 문 앞. 동생이 안에서 문을 열어줬다. 얼굴이 붉었다. 열.", if: "!S.flags.school_sib_along && S.flags.sib_sick && !S.flags.sib_cured" },
      { t: "집 문 앞. 동생이 안에서 문을 열어줬다. 문 잠금 소리가 세 번 났다.", if: "!S.flags.school_sib_along && (!S.flags.sib_sick || S.flags.sib_cured)" },
    ],
    choices: [
      { t: "집으로 돌아간다", go: "@home" },
    ],
  },
});
