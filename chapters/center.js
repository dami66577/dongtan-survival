// chapters/center.js — 동탄 주민센터 (최 주무관)
Object.assign(SCENES, {
  center_enter: {
    bg: "center",
    set: { "flags.went_center": true, "flags.center_visits": "+1" },
    lines: [
      { t: "주민센터까지는 1분. 아파트 단지 정문을 나서면 바로 보이는 3층짜리 회색 건물." },
      { t: "현관 유리문에 A4 종이가 스무 장쯤 테이프로 붙어 있었다. 반은 비에 젖어 글씨가 번졌다.", if: "S.flags.center_visits == 1" },
      { s: "sib", t: "여기 아직 사람 있어? 불 켜진 적 한 번도 못 봤는데.", if: "S.flags.center_visits == 1" },
      { s: "me", t: "깃발은 누가 계속 올리잖아. 누군가는 있다는 거지.", if: "S.flags.center_visits == 1" },
      { t: "두 번째 방문. 유리문 안쪽에서 형광등 하나가 깜빡이고 있었다. 발전기 소리.", if: "S.flags.center_visits == 2" },
      { t: "익숙해진 길. 깃발은 오늘도 올라가 있었다. 그게 이상하게 위안이 됐다.", if: "S.flags.center_visits >= 3 && !(S.flags.center_choi_gone || (S.flags.center_choi_invited && S.day >= 7 && !S.flags.center_choi_stays))" },
      { t: "깃발이 내려가 있었다. 주무관이 떠난 뒤로 아무도 올리지 않는다.", if: "(S.flags.center_choi_gone || (S.flags.center_choi_invited && S.day >= 7 && !S.flags.center_choi_stays))" },
      { s: "sib", t: "야, 저 아줌마 또 명단 얘기하면 나 먼저 나갈 거야.", if: "S.flags.center_visits >= 2 && !(S.flags.center_choi_gone || (S.flags.center_choi_invited && S.day >= 7 && !S.flags.center_choi_stays))" },
      { t: "동생은 내 옷자락을 잡고 걸었다. 열 때문에 손이 뜨거웠다.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
    ],
    choices: [
      { t: "게시판부터 본다", go: "center_board", if: "S.flags.center_visits == 1" },
      { t: "바로 안으로 들어간다", go: "center_inside", if: "S.flags.center_visits == 1" },
      { t: "최 주무관을 찾는다", go: "center_revisit", if: "S.flags.center_visits >= 2 && !(S.flags.center_choi_gone || (S.flags.center_choi_invited && S.day >= 7 && !S.flags.center_choi_stays))" },
      { t: "텅 빈 사무실을 둘러본다", go: "center_empty", if: "(S.flags.center_choi_gone || (S.flags.center_choi_invited && S.day >= 7 && !S.flags.center_choi_stays))" },
      { t: "그냥 돌아간다", go: "@home", if: "S.flags.center_visits >= 2" },
    ],
  },

  center_board: {
    bg: "center",
    lines: [
      { t: "게시판. 맨 위에 공식 공문 한 장. 『화성시 재난안전대책본부. 동탄 전 지역 이동 제한. 자택 대기 권고.』 날짜는 3주 전." },
      { t: "그 아래는 전부 손글씨였다. 『502동 1203호 김OO, 수원 처가로 감. 연락 주세요.』 『강아지 봤어요? 갈색 푸들, 이름은 콩이.』" },
      { t: "『물 있어요. 라면이랑 바꿔요. 나란히 상가 2층 치킨집.』" },
      { s: "sib", t: "치킨집… 아직 영업하나?" },
      { s: "me", t: "영업은 아니겠지. 근데 사람은 있나 보네." },
      { t: "실종자 전단이 한 줄로 붙어 있었다. 사진 속 얼굴들이 전부 웃고 있어서 더 이상했다." },
    ],
    choices: [
      { t: "전단을 하나하나 읽는다", go: "center_board_flyers" },
      { t: "그만 보고 안으로 들어간다", go: "center_inside", fx: { mind: 2 } },
    ],
  },

  center_board_flyers: {
    bg: "center",
    fx: { mind: -4 },
    lines: [
      { t: "열두 장. 할머니, 초등학생, 배달 기사, 동생 학교 교복을 입은 남학생." },
      { s: "sib", t: "…얘 우리 학교 애야. 2학년 3반. 이름은 모르는데." },
      { t: "동생이 전단을 한참 봤다. 내가 어깨를 건드리자 흠칫 놀랐다." },
      { s: "sib", t: "우리도 누가 전단 붙여 줄까? 엄마 아빠가?" },
      { s: "me", t: "우리는 붙일 사람 없어. 우리가 붙이는 쪽이지." },
      { s: "sib", t: "아, 그러네. 그게 더 낫네." },
      { t: "마지막 전단은 부모님이 아니었다. 다행이라고 생각한 내가 조금 싫었다." },
    ],
    next: "center_inside",
  },

  center_inside: {
    bg: "center",
    lines: [
      { t: "로비는 어두웠다. 발전기 냄새. 민원 번호표 기계가 『대기 0명』을 띄운 채 죽어 있었다." },
      { s: "최 주무관", t: "거기. 멈추세요. 신분 확인부터 하겠습니다." },
      { t: "카운터 뒤에서 여자가 일어섰다. 50대, 패딩 조끼 위에 공무원 신분증을 걸고 있었다. 손에는 볼펜과 클립보드." },
      { s: "최 주무관", t: "이 동네 주민이십니까? 동, 호수, 세대주 성함." },
      { s: "sib", t: "(작게) 야, 진짜로 물어보는 거야?" },
    ],
    choices: [
      { t: "농담으로 받는다: \"주민등록번호 뒷자리도 외울까요?\"", go: "center_id_joke" },
      { t: "진지하게 대답한다", go: "center_id_serious" },
      { t: "동생이 대신 대답하게 둔다", go: "center_id_sib" },
    ],
  },

  center_id_joke: {
    bg: "center",
    lines: [
      { s: "me", t: "주민등록번호 뒷자리도 외울까요? 요즘 그거 외우는 사람 없을 텐데." },
      { s: "최 주무관", t: "…앞자리면 됩니다. 뒷자리는 개인정보라 수기로 받지 않습니다." },
      { t: "진지한 얼굴이었다. 농담이 전혀 통하지 않았다. 동생이 옆에서 웃음을 참느라 어깨를 떨었다." },
      { s: "최 주무관", t: "웃을 일 아닙니다. 명단 없이 움직이면 나중에 아무도 찾지 못해요. 그게 제 일입니다." },
      { s: "me", t: "…죄송합니다." },
      { t: "동, 호수, 이름을 불러 줬다. 주무관은 클립보드에 또박또박 적었다." },
    ],
    next: "center_choi_talk",
  },

  center_id_serious: {
    bg: "center",
    fx: { mind: 2 },
    lines: [
      { t: "동, 호수, 세대주 이름, 그리고 우리 둘 이름. 주무관은 한 글자씩 확인하며 적었다." },
      { s: "최 주무관", t: "세대주 분은요. 부모님은 같이 안 계십니까." },
      { s: "me", t: "3주 전에 서울로 출근하시고 연락이 안 됩니다." },
      { s: "최 주무관", t: "…그렇군요. 비고란에 적어 두겠습니다. 『보호자 부재. 미성년 1명 포함.』" },
      { t: "미성년 1명. 종이 위에서 동생은 그 다섯 글자가 됐다." },
      { s: "sib", t: "나 이름 있는데." },
      { s: "최 주무관", t: "이름도 적었습니다. 학생. 둘 다요." },
    ],
    next: "center_choi_talk",
  },

  center_id_sib: {
    bg: "center",
    fx: { trust: 3 },
    lines: [
      { s: "sib", t: "저희 503동이고요, 세대주는 아빠인데 지금 없고요. 얘는 {{me}}, 저는 {{sib}}. 우리 학교 2학년이요." },
      { t: "동생은 거침없었다. 학교에서 출석 부르듯이." },
      { s: "최 주무관", t: "동생 학교. …학생, 급식실 쪽 창문 아직 깨져 있습니까?" },
      { s: "sib", t: "네? 어, 모르겠는데요. 3주 동안 안 갔으니까." },
      { s: "최 주무관", t: "그렇겠죠. 제가 괜한 걸 물었네요. 아들이 거기 급식 조리원이었습니다." },
      { t: "『이었습니다』. 과거형. 아무도 그 말을 받지 않았다." },
    ],
    next: "center_choi_talk",
  },

  center_choi_talk: {
    bg: "center",
    lines: [
      { s: "최 주무관", t: "저는 최입니다. 주민센터에 남은 건 저 하나고요. 동장은 둘째 주에 나갔습니다." },
      { s: "최 주무관", t: "여기서 하는 일은 세 가지. 깃발 올리기, 명단 적기, 게시판 정리. 그 이상은 제 권한이 아닙니다." },
      { s: "me", t: "구호물자 같은 건요?" },
      { s: "최 주무관", t: "창고에 조금. 배분 기준이 없어서 아직 풀지 못했습니다." },
      { s: "sib", t: "(작게) 기준이 없어서 안 준대. 사람이 둘뿐인데." },
      { t: "주무관은 들었을 텐데 못 들은 척했다. 원칙이 그 사람을 서 있게 하는 유일한 뼈대처럼 보였다." },
    ],
    choices: [
      { t: "생존자 명단을 보여달라고 한다", go: "center_list", if: "!S.flags.center_list" },
      { t: "창고 물자에 대해 묻는다", go: "center_storage_ask", if: "!S.flags.center_key" },
      { t: "부모님 소식을 묻는다", go: "center_parents_ask", if: "!S.flags.parents_note" },
      { t: "이만 돌아간다", go: "center_leave" },
    ],
  },

  center_list: {
    bg: "center",
    set: { "flags.center_list": true },
    lines: [
      { t: "클립보드 세 장. 손글씨로 빽빽했다. 『생존 확인』 『이동』 『미확인』 세 칸." },
      { t: "손가락으로 ㄱ부터 훑었다. 우리 성씨 줄. 아빠 이름이 없었다. 엄마 이름도." },
      { s: "최 주무관", t: "여기 적힌 건 제가 직접 보거나, 본 사람이 와서 말한 경우뿐입니다. 없다고 해서 나쁜 뜻은 아닙니다." },
      { s: "sib", t: "…그럼 좋은 뜻도 아니잖아요." },
      { t: "동생이 명단에서 눈을 떼지 않았다. 다른 성씨 줄까지 전부 읽고 있었다. 혹시 오타일까 봐." },
      { t: "『이동』 칸에 『나란히 상가 치킨집 박, 외 6명』. 『동생 학교 김 교사, 외 1명』. 『대학병원 간호사 서』.", if: "!S.flags.went_mall || !S.flags.went_school" },
    ],
    choices: [
      { t: "동생의 어깨를 감싼다", go: "center_list_comfort", fx: { trust: 5 } },
      { t: "담담하게 다음 줄을 읽는다", go: "center_list_after", fx: { mind: 2 } },
      { t: "주무관에게 미확인 명단이 어디 있는지 묻는다", go: "center_list_unknown" },
    ],
  },

  center_list_comfort: {
    bg: "center",
    lines: [
      { s: "me", t: "없는 거지, 아닌 게 아니야. 서울에 계시면 여기 적힐 리가 없잖아." },
      { s: "sib", t: "알아. 아는데." },
      { t: "동생이 내 손을 떼어내지 않았다. 그게 요즘 들어 처음이었다." },
      { s: "sib", t: "…집에 가면 아빠 번호로 문자 한 번만 더 보내 볼래. 안 가는 거 아는데." },
      { s: "me", t: "그래. 배터리 남으면." },
    ],
    next: "center_list_after",
  },

  center_list_unknown: {
    bg: "center",
    lines: [
      { s: "최 주무관", t: "미확인은 명단이 아니라 전체입니다. 이 동네 인구 2만 3천. 확인된 사람이 백 명이 안 됩니다." },
      { s: "최 주무관", t: "그래서 적는 겁니다. 백 명이라도. 나중에 누가 오면 백 명은 찾을 수 있게." },
      { s: "sib", t: "나중에 누가 와요?" },
      { s: "최 주무관", t: "…옵니다. 공문에 그렇게 돼 있습니다." },
      { t: "공문은 3주 전 것이었다. 주무관도 알고 있었다." },
    ],
    next: "center_list_after",
  },

  center_list_after: {
    bg: "center",
    lines: [
      { t: "명단을 돌려줬다. 주무관이 우리 이름 옆에 작게 체크 표시를 했다. 『생존 확인』." },
      { s: "최 주무관", t: "다음에 오시면 다시 체크합니다. 안 오시면… 그것도 적습니다." },
    ],
    choices: [
      { t: "창고 물자에 대해 묻는다", go: "center_storage_ask", if: "!S.flags.center_key" },
      { t: "민원실 쪽을 둘러본다", go: "center_office", if: "!S.flags.parents_note" },
      { t: "부모님 소식을 묻는다", go: "center_parents_ask", if: "!S.flags.parents_note" },
      { t: "이만 돌아간다", go: "center_leave" },
    ],
  },

  center_parents_ask: {
    bg: "center",
    lines: [
      { s: "me", t: "혹시 저희 부모님이 여기 들른 적 있을까요. 2주쯤 전에." },
      { s: "최 주무관", t: "성함이… 잠깐만요." },
      { t: "주무관이 민원실 서류함 쪽을 돌아봤다. 잠시 망설이는 얼굴." },
      { s: "최 주무관", t: "둘째 주에 외부에서 들어온 분들이 몇 있었습니다. 봉쇄선 넘어서. 명단엔 안 적었어요. 주민이 아니라서." },
      { s: "최 주무관", t: "그중 한 분이 뭘 두고 갔습니다. 아이들한테 전해 달라고. 성함이 같으면 민원실 2번 서랍입니다." },
      { s: "sib", t: "…야. 가자. 지금." },
    ],
    next: "center_office",
  },

  center_office: {
    bg: "center",
    lines: [
      { t: "민원실. 서류함 2번 서랍. 안에는 전입신고서 뭉치와, 그 위에 접힌 A4 한 장." },
      { t: "엄마 글씨였다. 급하게 쓴 글씨. 볼펜이 중간에 끊겨 다른 색으로 이어졌다." },
      { s: "me", t: "…" },
      { t: "『{{me}}, {{sib}}. 엄마야. 서울에서 걸어서 왔어. 집에 갔는데 문이 잠겨 있고 아무 소리도 안 나서 너희가 대피한 줄 알았어.』" },
      { t: "『아빠는 수원 집결지에 남아 있어. 병원 뒤쪽 외곽 마을 길로 가면 봉쇄선 넘을 수 있어. 검문소 군인한테 「3팀 이정민」 찾으면 돼.』" },
      { t: "『서랍 사진 꼭 챙겨. 사진 뒷면에 번호 적어 놨어. 사랑해. 꼭.』" },
      { s: "sib", t: "엄마 왔었어? 집에? 우리 있었는데. 우리 그때 집에 있었는데!" },
      { t: "둘째 주 수요일. 우리는 그날 베란다에서 숨죽이고 있었다. 복도에서 발소리가 났을 때. 문을 두드리는 소리가 났을 때." },
    ],
    choices: [
      { t: "편지를 동생에게 건넨다", go: "center_letter_show" },
      { t: "편지를 접어 주머니에 넣는다", go: "center_letter_hide" },
    ],
  },

  center_letter_show: {
    bg: "center",
    set: { "flags.parents_note": true, "flags.center_letter_shared": true },
    item: ["편지"],
    fx: { trust: 8, mind: -5 },
    lines: [
      { t: "동생이 편지를 세 번 읽었다. 세 번째에는 소리 내서 읽었다. 목소리가 중간에 갈라졌다." },
      { s: "sib", t: "문 두드린 거… 엄마였어. 우리가 안 열어 준 거야." },
      { s: "me", t: "그때 열었으면 둘 다 위험했어. 엄마도 그렇게 썼잖아. 대피한 줄 알았다고." },
      { s: "sib", t: "그래도." },
      { t: "주무관이 조용히 자리를 비켜 줬다. 원칙주의자가 할 수 있는 가장 다정한 일이었다." },
      { s: "sib", t: "사진. 집에 가면 서랍 뒤져 보자. 뒷면에 번호 있대." },
    ],
    next: "center_leave",
  },

  center_letter_hide: {
    bg: "center",
    set: { "flags.parents_note": true, "flags.center_letter_hidden": true },
    item: ["편지"],
    fx: { mind: -3 },
    lines: [
      { s: "sib", t: "뭐야? 뭐라고 써 있는데?" },
      { s: "me", t: "엄마가 왔었대. 아빠는 수원에 있고. 자세한 건 집에 가서." },
      { s: "sib", t: "지금 읽으면 되잖아. 왜 숨겨?" },
      { t: "동생이 내 주머니를 노려봤다. 『문을 두드렸을 때』라는 문장을 지금 읽히고 싶지 않았다. 그게 보호인지 비겁인지 몰랐다." },
      { s: "sib", t: "…됐어. 어차피 나중에 볼 거니까." },
      { t: "동생은 그 뒤로 집까지 말을 하지 않았다." },
    ],
    next: "center_leave",
  },

  center_storage_ask: {
    bg: "center",
    lines: [
      { s: "me", t: "창고 물자요. 저희 식량이 거의 없습니다. 동생은 미성년이고요." },
      { s: "최 주무관", t: "기준이 없습니다. 지금 드리면 다음 분한테는 뭐라고 합니까." },
      { s: "sib", t: "다음 분이 오긴 와요?" },
      { s: "최 주무관", t: "…" },
      { t: "주무관의 손이 열쇠꾸러미를 만졌다. 허리춤에 매달린, 스무 개쯤 되는 열쇠 뭉치. 창고, 차고, 그리고 무엇인지 모를 열쇠들." },
    ],
    choices: [
      { t: "[정신력 50↑] 차분하게 설득한다: 기준을 같이 만들자고", go: "center_storage_persuade", if: "S.mind >= 50" },
      { t: "동생이 아프다고 호소한다", go: "center_storage_plead", if: "S.flags.sib_sick || S.sib < 60" },
      { t: "주무관이 자리를 비운 사이 몰래 들어간다", go: "center_storage_sneak" },
      { t: "포기하고 다른 걸 알아본다", go: "center_choi_talk_short" },
    ],
  },

  center_choi_talk_short: {
    bg: "center",
    lines: [
      { s: "최 주무관", t: "죄송합니다. 제가 할 수 있는 건 적는 것뿐이라." },
      { s: "me", t: "압니다." },
    ],
    choices: [
      { t: "민원실 쪽을 둘러본다", go: "center_office", if: "!S.flags.parents_note" },
      { t: "이만 돌아간다", go: "center_leave" },
    ],
  },

  center_storage_persuade: {
    bg: "center",
    fx: { mind: 3 },
    lines: [
      { s: "me", t: "그럼 기준을 지금 만들죠. 미성년 포함 세대, 보호자 부재, 식량 3일분 이하. 이 세 개 다 해당하면 1차 배분. 제가 서명할게요." },
      { s: "최 주무관", t: "…" },
      { t: "주무관이 클립보드 뒷장을 넘겨 새 종이를 꺼냈다. 그리고 내가 말한 세 줄을 그대로 적었다." },
      { s: "최 주무관", t: "『동탄 주민센터 비축물자 임시 배분 기준. 작성자 최OO, 입회인 {{me}}.』 됐습니다. 이제 기준이 있습니다." },
      { s: "sib", t: "(작게) 와, 진짜 됐다." },
      { s: "최 주무관", t: "창고 열겠습니다. 필요한 것만. 그리고 수령 서명하세요." },
    ],
    next: "center_storage_in",
  },

  center_storage_plead: {
    bg: "center",
    lines: [
      { s: "me", t: "동생이 열이 있어요. 사흘째입니다. 먹는 게 없으면 더 나빠져요." },
      { t: "주무관이 동생을 봤다. 동생의 눈가가 붉었다. 그건 연기가 아니었다." },
      { s: "최 주무관", t: "…회색열입니까." },
      { s: "sib", t: "아니에요. 그냥 감기예요." },
      { t: "주무관은 믿지 않는 눈치였지만, 더 묻지 않았다. 열쇠꾸러미를 풀었다." },
      { s: "최 주무관", t: "『긴급 의료 사유』. 그건 기준 없어도 됩니다. 제가 적습니다." },
    ],
    next: "center_storage_in",
  },

  center_storage_sneak: {
    bg: "center",
    lines: [
      { t: "주무관이 깃발을 올리러 옥상에 올라간 사이. 창고 문은 잠겨 있었지만 옆 창문이 손가락 두 개만큼 열려 있었다." },
      { s: "sib", t: "야, 이거 도둑질이야." },
      { s: "me", t: "배분이야. 기준이 없을 뿐이지." },
    ],
    choices: [
      { t: "[아이템: 손전등] 창문으로 들어가 빠르게 챙긴다", go: "center_storage_in", if: "has('손전등')", set: { "flags.center_sneaked": true } },
      { t: "동생을 망보게 하고 들어간다", go: "center_storage_caught", set: { "flags.center_sneaked": true } },
      { t: "그만둔다", go: "center_choi_talk_short" },
    ],
  },

  center_storage_caught: {
    bg: "center",
    fx: { mind: -6, trust: -4 },
    set: { "flags.center_hostile": true },
    lines: [
      { t: "창고 안은 캄캄했다. 손으로 더듬다 선반을 쳤다. 깡통이 쏟아졌다." },
      { s: "sib", t: "야! 온다, 온다!" },
      { s: "최 주무관", t: "…거기서 뭐 하는 겁니까." },
      { t: "손전등 불빛이 내 얼굴을 비췄다. 주무관의 목소리는 화나지도 않았다. 그냥 아주 피곤했다." },
      { s: "최 주무관", t: "명단에서 지우진 않겠습니다. 그래도 사람이니까. 하지만 다시는 이 창고에 손대지 마세요." },
      { t: "라면 두 개를 쥐고 있었다. 주무관은 그것까지 빼앗진 않았다." },
    ],
    next: "center_leave_caught",
  },

  center_leave_caught: {
    bg: "center",
    fx: { food: 1 },
    lines: [
      { t: "라면 두 개. 동생은 주민센터를 나올 때까지 한마디도 안 했다." },
      { s: "sib", t: "…다음부턴 나 끼우지 마. 망보는 거." },
    ],
    next: "@home",
  },

  center_storage_in: {
    bg: "center",
    set: { "flags.center_key": true },
    item: ["열쇠꾸러미"],
    lines: [
      { t: "창고. 선반 세 칸. 생각보다 적었다. 생수 한 묶음, 라면 한 상자 반, 즉석밥, 담요 뭉치, 구급상자 둘, 그리고 건전지로 돌아가는 소형 라디오." },
      { s: "최 주무관", t: "열쇠는 주민센터 전체 꾸러미입니다. 창고 말고도 차고, 옥상, 그리고… 동네 공용시설 몇 군데. 잠시 맡기는 겁니다.", if: "!S.flags.center_sneaked" },
      { t: "열쇠꾸러미가 못에 걸려 있었다. 스무 개. 창고 열쇠 말고도 이름표 없는 열쇠가 많았다. 챙겼다.", if: "S.flags.center_sneaked" },
      { s: "sib", t: "라디오! 이거 되는 거야?" },
      { t: "다 들고 갈 수는 없었다. 둘이 들 수 있는 만큼만." },
    ],
    choices: [
      { t: "식량 위주로 챙긴다 (식량 +4)", go: "center_storage_food", fx: { food: 4 } },
      { t: "구급상자와 담요를 챙긴다 (의약품 +2, 담요)", go: "center_storage_med", fx: { meds: 2 }, item: ["담요", "구급상자"] },
      { t: "라디오를 챙기고 식량은 조금만 (라디오, 식량 +2)", go: "center_radio", fx: { food: 2 }, item: ["라디오"] },
    ],
  },

  center_storage_food: {
    bg: "center",
    lines: [
      { t: "라면과 즉석밥을 배낭에 꽉 채웠다. 동생이 생수 두 병을 양손에 들었다." },
      { s: "sib", t: "라디오는? 저거 두고 가?" },
      { s: "me", t: "다음에. 먹는 게 먼저야." },
      { s: "sib", t: "…알았어. 근데 다음에 없으면 네 탓이다." },
      { s: "최 주무관", t: "수령 서명하세요. 여기. 날짜도.", if: "!S.flags.center_sneaked" },
    ],
    next: "center_leave",
  },

  center_storage_med: {
    bg: "center",
    lines: [
      { t: "구급상자를 열었다. 해열제, 붕대, 소독약, 반창고. 항생제는 없었다." },
      { s: "sib", t: "담요 좋다. 집에 있는 건 다 눅눅해." },
      { t: "담요를 동생 어깨에 둘렀다. 동생이 창고 바닥에 잠깐 앉았다가 일어났다.", if: "S.flags.sib_sick" },
      { s: "최 주무관", t: "해열제는 아껴 쓰세요. 그거 떨어지면 저도 없습니다.", if: "!S.flags.center_sneaked" },
    ],
    next: "center_leave",
  },

  center_radio: {
    bg: "center",
    set: { "flags.radio": true, "flags.center_broadcast": true },
    lines: [
      { t: "라디오. 건전지를 넣고 다이얼을 돌렸다. 잡음, 잡음, 잡음. 99.9에서 목소리." },
      { s: "라디오", t: "…수원 비상대책본부입니다. 반복합니다. 동탄 지역 잔류 주민께 알립니다. 수송 차량은 동탄역 북광장에서 출발합니다. 매주 토요일…" },
      { t: "거기서 잡음이 덮였다. 다이얼을 아무리 돌려도 『토요일』 뒤는 들리지 않았다." },
      { s: "sib", t: "토요일. 토요일 뭐? 몇 시?" },
      { s: "me", t: "몰라. 끊겼어." },
      { s: "최 주무관", t: "저도 그 방송 압니다. 매일 같은 시간에 같은 말을 합니다. 토씨 하나 안 틀리고.", if: "!S.flags.center_sneaked" },
      { s: "최 주무관", t: "…그게 좋은 신호인지 나쁜 신호인지는 모르겠습니다.", if: "!S.flags.center_sneaked" },
      { t: "동탄역 북광장. 나란히 상가 지나서 10분. 일단 그것만 알아도 뭔가가 생긴 기분이었다." },
    ],
    choices: [
      { t: "방송을 믿기로 한다", go: "center_leave", set: { "flags.info_route": true }, fx: { mind: 5 } },
      { t: "일단 정보로만 담아 둔다", go: "center_leave", set: { "flags.info_route": true } },
    ],
  },

  center_leave: {
    bg: "center",
    lines: [
      { t: "주민센터를 나왔다. 깃발이 아직 올라가 있었다." },
      { s: "최 주무관", t: "내일도 오시면 체크합니다. 안 오셔도… 적습니다.", if: "!S.flags.center_hostile" },
      { s: "sib", t: "저 아줌마 좀 무서운데, 좀 멋있어.", if: "!S.flags.center_hostile" },
      { s: "sib", t: "…집 가자. 편지 다시 읽을래.", if: "S.flags.center_letter_shared" },
      { t: "집까지 1분. 그 1분이 오늘따라 길었다." },
    ],
    next: "@home",
  },

  // ───────── 재방문 ─────────
  center_revisit: {
    bg: "center",
    lines: [
      { s: "최 주무관", t: "다시 오셨군요. 체크합니다." },
      { t: "주무관은 어제보다 야위어 보였다. 클립보드는 네 장이 됐다.", if: "S.day >= 4" },
      { s: "최 주무관", t: "…창고 일은 잊지 않았습니다. 하지만 명단은 명단입니다.", if: "S.flags.center_hostile" },
      { s: "최 주무관", t: "학생, 열이 있어 보이는데. 해열제는 있습니까.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
      { s: "sib", t: "있어요. 아니, 없어요. 모르겠어요.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
      { t: "책상 위에 편지 봉투가 하나 더 늘어 있었다. 주무관 본인 이름이 적힌." },
    ],
    choices: [
      { t: "주무관이 부탁할 게 있어 보인다", go: "center_errand", if: "!S.flags.center_errand_done && !S.flags.center_hostile" },
      { t: "봉쇄선과 검문소에 대해 묻는다", go: "center_checkpoint", if: "!S.flags.center_backroad" },
      { t: "주무관에게 떠날 생각은 없는지 묻는다", go: "center_choi_leave", if: "!S.flags.center_choi_decided && (S.day >= 5 || S.flags.center_visits >= 3)" },
      { t: "창고 물자에 대해 다시 묻는다", go: "center_storage_ask", if: "!S.flags.center_key && !S.flags.center_hostile" },
      { t: "민원실 서류함을 본다", go: "center_office", if: "!S.flags.parents_note" },
      { t: "체크만 하고 돌아간다", go: "center_revisit_leave" },
    ],
  },

  center_revisit_leave: {
    bg: "center",
    lines: [
      { t: "주무관이 우리 이름 옆에 체크를 하나 더 그었다. 체크가 쌓여 가는 걸 보는 게 이상하게 안심이 됐다." },
      { s: "sib", t: "우리 출석률 좋다." },
    ],
    next: "@home",
  },

  center_errand: {
    bg: "center",
    lines: [
      { s: "최 주무관", t: "부탁이 하나 있습니다. 명단에 『생존 확인』으로 적힌 분 중에 504동 1502호 할머니가 계세요. 닷새째 안 오십니다." },
      { s: "최 주무관", t: "제가 가면 여기가 빕니다. 깃발, 명단. 누가 와도 아무도 없는 게 됩니다." },
      { s: "sib", t: "그냥 자리 비우면 되지 않아요?" },
      { s: "최 주무관", t: "안 됩니다. 그게 제 일입니다." },
      { t: "504동. 우리 옆 동. 걸어서 3분. 하지만 그 동은 2주 전부터 복도에 뭔가가 돌아다녔다." },
      { s: "최 주무관", t: "확인만 하고 오세요. 문 열지 말고. 대답 있으면 있다고, 없으면 없다고. 대가는… 창고에서 식량 사흘치." },
    ],
    choices: [
      { t: "같이 간다", go: "center_errand_go" },
      { t: "동생은 여기 남기고 혼자 간다", go: "center_errand_alone", fx: { trust: -3 } },
      { t: "거절한다", go: "center_errand_refuse" },
    ],
  },

  center_errand_refuse: {
    bg: "center",
    fx: { mind: -2 },
    set: { "flags.center_errand_done": true },
    lines: [
      { s: "me", t: "죄송해요. 지금은 저희도 벅차서." },
      { s: "최 주무관", t: "…압니다. 제가 가야죠. 언젠가." },
      { t: "주무관은 깃발 끈을 만지작거렸다. 가지 않을 거였다. 우리도 알았다." },
    ],
    next: "@home",
  },

  center_errand_alone: {
    bg: "street",
    set: { "flags.center_errand_solo": true },
    lines: [
      { s: "sib", t: "왜 나만 두고 가? 나 짐이야?" },
      { s: "me", t: "짐이 아니라 보험이야. 내가 안 돌아오면 주무관이 명단에 적어 줄 거 아냐." },
      { s: "sib", t: "그런 농담 하지 마." },
      { t: "동생은 로비 의자에 앉았다. 주무관이 옆에 클립보드를 놓고 앉았다. 둘이 어색하게 마주 보는 걸 뒤로하고 나갔다." },
    ],
    next: "center_errand_hall",
  },

  center_errand_go: {
    bg: "street",
    lines: [
      { t: "504동 입구. 자동문은 열린 채 멈춰 있었다. 1층 우편함이 전부 뜯겨 있었다." },
      { s: "sib", t: "엘리베이터 안 되지?" },
      { s: "me", t: "15층. 계단." },
      { s: "sib", t: "…나 열 있는데.", if: "S.flags.sib_sick && !S.flags.sib_cured" },
      { s: "sib", t: "좋아. 계단 올라가기 챌린지.", if: "!S.flags.sib_sick || S.flags.sib_cured" },
    ],
    next: "center_errand_hall",
  },

  center_errand_hall: {
    bg: "night",
    fx: { hp: -5 },
    lines: [
      { t: "15층 복도. 창문이 깨져 바람이 들어왔다. 복도 끝에서 뭔가가 벽에 몸을 비비며 서 있었다." },
      { t: "회색인. 한 명. 등을 돌리고 있었다. 1502호는 그 바로 옆집이었다." },
      { s: "sib", t: "(숨소리만)", if: "!S.flags.center_errand_solo" },
    ],
    choices: [
      { t: "[아이템: 손전등] 불을 비춰 멈칫하게 하고 문을 두드린다", go: "center_errand_found", if: "has('손전등')" },
      { t: "소리 없이 벽을 타고 1502호 문까지 간다", go: "center_errand_sneak" },
      { t: "[아이템: 호루라기] 호루라기를 불어 반대쪽으로 유인한다", go: "center_errand_found", if: "has('호루라기')", fx: { mind: -3 } },
      { t: "포기하고 내려간다", go: "center_errand_fail" },
    ],
  },

  center_errand_sneak: {
    bg: "night",
    lines: [
      { t: "벽을 따라 한 걸음. 두 걸음. 회색인은 벽에 머리를 박는 데 열중하고 있었다." },
      { t: "문 앞. 손을 들었다. 두드리면 소리가 난다. 두드리지 않으면 확인이 안 된다." },
    ],
    choices: [
      { t: "아주 작게, 세 번 두드린다", go: "center_errand_found", fx: { mind: -4 } },
      { t: "[정신력 60↑] 문틈에 입을 대고 속삭인다", go: "center_errand_found", if: "S.mind >= 60" },
      { t: "돌아선다", go: "center_errand_fail" },
    ],
  },

  center_errand_found: {
    bg: "night",
    lines: [
      { t: "문 안에서 한참 아무 소리도 없었다. 회색인이 천천히 고개를 돌리는 게 보였다." },
      { t: "그때. 안에서 쇠사슬 걸쇠가 달그락거렸다. 문이 손가락 하나만큼 열렸다.", if: "S.day <= 6" },
      { s: "최 주무관", t: "(회상) 문 열지 말고. 대답만.", if: "S.day <= 6" },
      { t: "『…누구요. 주민센터에서 왔소?』 쉰 목소리. 살아 있었다.", if: "S.day <= 6" },
      { t: "문 안에서 끝내 아무 소리도 없었다. 문틈 아래로 뭔가 마른 냄새가 났다. 더 두드리지 않았다.", if: "S.day > 6" },
      { t: "회색인이 이쪽으로 첫걸음을 뗐다. 계단. 뛰었다." },
    ],
    choices: [
      { t: "계단으로 뛰어 내려간다", go: "center_errand_back", set: { "flags.center_grandma": true }, if: "S.day <= 6" },
      { t: "계단으로 뛰어 내려간다", go: "center_errand_back", set: { "flags.center_grandma": false }, if: "S.day > 6" },
    ],
  },

  center_errand_fail: {
    bg: "center",
    set: { "flags.center_errand_done": true },
    fx: { mind: -4 },
    lines: [
      { t: "내려왔다. 확인하지 못했다. 주무관에게 그대로 말했다." },
      { s: "최 주무관", t: "…『미확인』. 적겠습니다. 고맙습니다. 가 주신 것만으로도." },
      { s: "sib", t: "식량은요?" },
      { s: "최 주무관", t: "확인이 안 됐으니까요. 미안합니다. 기준은 기준이라." },
      { t: "동생이 뭐라고 하려는 걸 내가 막았다. 주무관의 손이 떨리고 있었다." },
    ],
    next: "@home",
  },

  center_errand_back: {
    bg: "center",
    set: { "flags.center_errand_done": true },
    fx: { food: 3, mind: 3 },
    lines: [
      { t: "주민센터 로비. 숨을 고르고 보고했다." },
      { s: "me", t: "살아 계세요. 문은 안 열었고요. 목소리로 확인했습니다.", if: "S.flags.center_grandma" },
      { s: "최 주무관", t: "…살아 계시다. 적었습니다. 『생존 확인, 재확인.』", if: "S.flags.center_grandma" },
      { s: "me", t: "…대답이 없었어요. 냄새가 났습니다.", if: "!S.flags.center_grandma" },
      { s: "최 주무관", t: "…알겠습니다. 『사망 추정』. 적었습니다. 그래도 가서 두드려 준 사람이 있었다는 건 적어 둘게요.", if: "!S.flags.center_grandma" },
      { t: "주무관이 창고에서 사흘치 식량을 꺼내 줬다. 약속대로. 서명도 받았다." },
      { s: "sib", t: "나 안 데려가서 삐진 거 아직 안 풀렸어.", if: "S.flags.center_errand_solo" },
      { s: "최 주무관", t: "열쇠꾸러미. 창고 말고 차고 열쇠도 거기 있습니다. 쓰실 일이 있을지 모르니.", if: "!S.flags.center_key" },
    ],
    choices: [
      { t: "열쇠꾸러미를 받는다", go: "center_errand_key", if: "!S.flags.center_key" },
      { t: "돌아간다", go: "@home", if: "S.flags.center_key" },
    ],
  },

  center_errand_key: {
    bg: "center",
    set: { "flags.center_key": true },
    item: ["열쇠꾸러미"],
    lines: [
      { t: "열쇠꾸러미. 묵직했다. 이름표 없는 열쇠가 절반이었다." },
      { s: "최 주무관", t: "뭐가 뭔지는 저도 다 모릅니다. 전임자가 넘긴 거라." },
    ],
    next: "@home",
  },

  center_checkpoint: {
    bg: "center",
    set: { "flags.center_backroad": true, "flags.info_route": true },
    lines: [
      { s: "me", t: "봉쇄선이요. 넘을 수 있는 데가 있을까요." },
      { s: "최 주무관", t: "공식적으로는 없습니다." },
      { t: "주무관이 지도를 펼쳤다. 주민센터 벽에 붙어 있던 동탄2 관내도. 빨간 펜으로 선이 그어져 있었다." },
      { s: "최 주무관", t: "비공식적으로. 고속도로 나들목 쪽 큰길 검문소는 2주 전에 폐쇄됐습니다. 차단벽을 쌓았어요. 그런데 대학병원 뒤편, 외곽 마을 방면 농로는 바리케이드만 있고 사람이 없을 때가 있습니다." },
      { s: "최 주무관", t: "구급차나 관용차는 그쪽으로 다녔습니다. 지금도 다니는지는… 모릅니다." },
      { s: "sib", t: "엄마 편지에 나온 데야. 외곽 마을 길.", if: "S.flags.parents_note" },
      { t: "병원 뒤 외곽 농로. 머릿속 지도에 빨간 선 하나가 생겼다." },
      { s: "최 주무관", t: "북광장 방송은… 저라면 안 믿습니다. 매일 같은 말을 하는 건 사람이 아니라 기계예요.", if: "S.flags.center_broadcast || S.flags.radio" },
    ],
    next: "center_revisit_leave",
  },

  center_choi_leave: {
    bg: "center",
    lines: [
      { s: "me", t: "주무관님은요. 안 떠나세요?" },
      { s: "최 주무관", t: "…" },
      { t: "주무관이 책상 위 봉투를 봤다. 본인 이름이 적힌 봉투. 아들 글씨였을까." },
      { s: "최 주무관", t: "아들이 급식실에서 일했다고 했죠. 셋째 날에 동생 학교에서 전화가 왔습니다. 그게 마지막이었어요." },
      { s: "최 주무관", t: "제가 여기를 비우면, 아들이 돌아왔을 때 아무도 없는 겁니다. 명단도, 깃발도." },
      { s: "sib", t: "…아저씨가 돌아오면 저희가 말해 줄게요. 아줌마 어디 갔는지." },
      { t: "주무관이 동생을 한참 봤다." },
    ],
    choices: [
      { t: "같이 가자고 한다", go: "center_choi_decide", set: { "flags.center_choi_invited": true } },
      { t: "남는 것도 선택이라고 말한다", go: "center_choi_decide", fx: { mind: 2 } },
      { t: "아무 말도 하지 않는다", go: "center_choi_decide" },
    ],
  },

  center_choi_decide: {
    bg: "center",
    set: { "flags.center_choi_decided": true },
    lines: [
      { s: "최 주무관", t: "…생각해 보겠습니다. 학생들이 떠나는 날, 깃발이 내려가 있으면 저도 간 겁니다. 올라가 있으면 남은 거고요.", if: "S.day < 7" },
      { s: "최 주무관", t: "저는 남습니다. 결정했습니다. 그 대신 이걸 드리죠.", if: "S.day >= 7" },
      { t: "주무관이 허리춤에서 열쇠꾸러미를 풀었다.", if: "S.day >= 7 && !S.flags.center_key" },
      { s: "최 주무관", t: "창고, 차고, 그리고 모르는 열쇠들. 어디 맞을지 모릅니다. 가져가세요.", if: "S.day >= 7 && !S.flags.center_key" },
      { s: "최 주무관", t: "창고 남은 건 다 가져가세요. 기준은… 제가 방금 폐지했습니다.", if: "S.day >= 7" },
      { s: "sib", t: "아줌마." },
      { s: "최 주무관", t: "최 주무관입니다. 학생." },
      { s: "sib", t: "…최 주무관님. 깃발 계속 올려 주세요. 우리 돌아올 때 보게." },
      { s: "최 주무관", t: "그게 제 일입니다." },
    ],
    choices: [
      { t: "열쇠와 식량을 받는다", go: "center_choi_gift", if: "S.day >= 7" },
      { t: "돌아간다", go: "@home", if: "S.day < 7" },
    ],
  },

  center_choi_gift: {
    bg: "center",
    set: { "flags.center_key": true, "flags.center_choi_stays": true },
    item: ["열쇠꾸러미"],
    fx: { food: 3, meds: 1, trust: 3 },
    lines: [
      { t: "식량 사흘치, 해열제 한 통, 열쇠꾸러미. 주무관은 수령 서명을 받지 않았다. 처음이었다." },
      { s: "최 주무관", t: "서명은 됐습니다. 이건 배분이 아니라… 그냥 주는 겁니다." },
      { t: "주민센터를 나오는데 뒤에서 깃발 도르래 소리가 났다. 내려갔다가, 다시 올라갔다. 점검이었다." },
    ],
    next: "@home",
  },

  center_empty: {
    bg: "center",
    set: { "flags.center_choi_gone": true },
    fx: { mind: -5 },
    lines: [
      { t: "로비. 발전기는 꺼져 있었다. 카운터 위에 클립보드가 가지런히 놓여 있었다." },
      { t: "맨 윗장. 우리 이름 옆에 체크가 여럿. 그 아래 새 줄. 『최OO. 이동. 수원 방면. 아들 돌아오면 전해 주세요.』" },
      { s: "sib", t: "…갔네. 진짜 갔네." },
      { t: "창고 문이 열려 있었다. 안에 남은 라면 몇 개와 쪽지. 『가져가세요. 기준 없음.』" },
    ],
    choices: [
      { t: "남은 것을 챙긴다 (식량 +2)", go: "@home", fx: { food: 2 } },
      { t: "깃발을 올리고 돌아간다", go: "@home", fx: { mind: 6, trust: 2 }, set: { "flags.center_flag_raised": true } },
    ],
  },
});
