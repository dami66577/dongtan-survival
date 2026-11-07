#!/usr/bin/env python3
"""실명 건물·학교·동 이름을 일반 명사로 치환. 재실행 안전."""
import pathlib, re, sys
root = pathlib.Path(__file__).resolve().parent.parent
files = list((root / "chapters").glob("*.js")) + [root / "engine/ui.template.html", root / "SPEC.md", root / "README.md", root / "CHATGPT_PROMPT.md", root / "CHATGPT_PROMPT_ENDINGS.md", root / "docs/manifest.webmanifest", root / "art/README.md"]
# (정규식, 치환) 순서 중요: 긴 것 먼저
RULES = [
    (r"다원중\s*[·/]\s*동원중", "중학교"), (r"동원중\s*[→/]\s*다원중", "옆 학교에서 동생 학교"),
    (r"한림대동탄성심병원", "대학병원"), (r"한림대병원", "대학병원"), (r"동탄성심병원", "대학병원"), (r"한림대(?![가-힣])", "대학병원"),
    (r"동탄2신도시", "동탄"), (r"동탄신도시", "동탄"), (r"영천동 농로", "외곽 농로"), (r"영천동", "외곽 마을"), (r"동탄IC", "고속도로 나들목"),
    (r"동탄 *5동", "동탄"),
    # 동원중 → 옆 학교 (조사 보정)
    (r"동원중은", "옆 학교는"), (r"동원중을", "옆 학교를"), (r"동원중이랑", "옆 학교랑"), (r"동원중이다", "옆 학교다"), (r"동원중이(?=[ ,.])", "옆 학교가"), (r"동원중으로", "옆 학교로"), (r"동원중과", "옆 학교와"), (r"동원중학교", "옆 학교"), (r"동원중", "옆 학교"),
]
# 다원중: 화자에 따라 "우리 학교"(동생·김 선생·정우) / "동생 학교"(그 외)
def sub_dawon(line):
    who = "우리 학교" if re.search(r's:\s*"(sib|김동현 선생|정우|민재)"', line) else "동생 학교"
    base = {"은": "는", "을": "를", "이": "가", "과": "와", "으로": "로", "이다": "다", "이랑": "랑", "입니다": "입니다"}
    def rep(m):
        j = m.group(1) or ""
        return who + base.get(j, j)
    return re.sub(r"다원중학교|다원중(은|을|이랑|이다|입니다|이|과|으로)?", rep, line)
total = 0
for f in files:
    if not f.exists(): continue
    s = f.read_text(encoding="utf-8"); o = s
    for pat, rep in RULES: s = re.sub(pat, rep, s)
    s = "\n".join(sub_dawon(l) if "다원중" in l else l for l in s.split("\n"))
    if s != o:
        f.write_text(s, encoding="utf-8"); n = sum(1 for a, b in zip(o.split("\n"), s.split("\n")) if a != b); total += n; print(f"{f.relative_to(root)}: {n}줄 변경")
print("합계", total, "줄")
left = []
for f in files:
    if f.exists():
        for m in re.finditer(r"다원중|동원중|한림대|영천동|5동", f.read_text(encoding="utf-8")): left.append(f.name)
print("잔여:", set(left) or "없음")
