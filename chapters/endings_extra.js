// chapters/endings_extra.js — 엔딩 변형 모음 (챗지피티 작성분을 여기에 이어 붙인다)
// variant.of 의 기본 엔딩에 도달했을 때 if 가 참인 변형 중 priority 가 가장 높은 것으로 대체된다.
Object.assign(SCENES, {
  end_escape_both_v00: {
    variant: { of: "end_escape_both", if: "flag('school_jungwoo_join')", priority: 10 },
    ending: { title: "셋이서 넘은 담", grade: "S", art: "img/end/A-10.webp" },
    bg: "street",
    lines: [
      { t: "검문소 너머 첫 번째 마을에서, 우리는 셋이었다." },
      { s: "sib", t: "정우야. 고양이 이름 아직도 회색이야?" },
      { t: "정우는 대답 대신 품에서 고양이를 꺼내 보였다. 잿빛 털이 아침 햇빛에 거의 흰색으로 보였다." },
      { s: "me", t: "이제 잿빛 아니네." },
      { t: "{{sib}}이 웃었다. 3주 만에 처음 듣는 소리처럼 들렸다." },
      { t: "우리는 수원행 트럭 짐칸에 나란히 앉았다. 아무도 뒤를 돌아보지 않았다." },
    ],
  },
});
