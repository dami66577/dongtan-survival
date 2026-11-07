# 동탄, 둘이서 — 텍스트 아포칼립스 게임

한국 전역이 "회색열"로 무너진 지 3주. 화성시 동탄, 동탄 주민센터 옆 아파트에 남은 둘(나 + 중2 동생)의 생존기.

## 구조
```
engine/core.js          상태·분기·하루 경과 처리 (DOM 없음, 노드/브라우저 공용)
engine/ui.template.html 화면(UI) — /*__CORE__*/, /*__CHAPTERS__*/ 자리에 빌드 시 삽입
chapters/home.js        프롤로그 · 홈 허브 · 아침 · 동생 대화 · 밤 이벤트
chapters/mall.js        나란히 상가 (식량)
chapters/hosp.js        대학병원 (의약품 · 파란 상자 · 구급차)
chapters/school.js      중학교 (정보 · 방송의 진실)
chapters/center.js      동탄 주민센터 (명단 · 열쇠 · 부모님 편지)
chapters/ending.js      피날레 분기 + 엔딩 전부
tools/validate.js       씬 링크·조건식 검사 + 랜덤 플레이 시뮬레이션
tools/build.py          dist/index.html (아티팩트용) · dist/local.html (브라우저로 바로 열기)
SPEC.md                 세계관 · 인물 · 플래그 · 씬 포맷 (씬을 추가할 때 이 문서 기준)
```

## 명령
```bash
node tools/validate.js --walk 500   # 전체 검사 + 랜덤 플레이 500회
python3 tools/build.py              # dist/ 생성
```
`dist/local.html` 을 브라우저로 열면 바로 플레이됩니다 (저장은 localStorage).

## 폰에 설치 (PWA)
`docs/` 폴더가 설치형 웹앱 빌드입니다. GitHub 저장소 **Settings → Pages → Branch: main, Folder: /docs** 로 켜면
`https://<아이디>.github.io/dongtan-survival/` 에서 열립니다.
- 안드로이드(크롬): 타이틀 화면의 "폰에 앱으로 설치" 버튼 또는 브라우저 메뉴의 "앱 설치".
- 아이폰(사파리): 공유 버튼 → "홈 화면에 추가".
설치 후에는 오프라인에서도 실행되고, 새 빌드를 올리면 다음 실행 때 자동으로 갱신됩니다.

## 엔딩 변형 추가하기
`chapters/endings_extra.js` 에 `variant: { of: "기본엔딩ID", if: "조건", priority: n }` 를 가진 엔딩 씬을 넣으면,
그 기본 엔딩에 도달했을 때 조건이 맞는 변형으로 대체됩니다. 챗지피티용 지시문은 `CHATGPT_PROMPT_ENDINGS.md`.

## 추가 사건 넣기
`chapters/extra.js` 에 `hook: { at: "씬ID", if, chance }` 로 시작하는 사건을 넣으면 기존 씬 앞에 끼어듭니다. 지시문은 `CHATGPT_PROMPT.md`.

## 씬 추가하기
`chapters/*.js` 의 `Object.assign(SCENES, { 씬ID: { lines: [...], choices: [...] } })` 형식. 자세한 규칙은 SPEC.md §4.
