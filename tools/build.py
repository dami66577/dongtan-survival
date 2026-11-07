#!/usr/bin/env python3
"""엔진 + 챕터를 하나의 HTML 로 합친다. dist/index.html (아티팩트용, 스켈레톤 없음) / dist/local.html (로컬 테스트용 완전한 문서)"""
import pathlib, re, sys, hashlib
root = pathlib.Path(__file__).resolve().parent.parent
tpl = (root / "engine/ui.template.html").read_text(encoding="utf-8")
core = (root / "engine/core.js").read_text(encoding="utf-8")
order = sys.argv[1:] or ["home", "mall", "hosp", "school", "center", "lake", "station", "apt", "sys", "ending", "extra", "endings_extra"]
chapters = "\n".join((root / f"chapters/{n}.js").read_text(encoding="utf-8") for n in order if (root / f"chapters/{n}.js").exists())
for src in (core, chapters):
    assert "</script" not in src.lower(), "스크립트 안에 </script> 문자열 금지"
# --- 일러스트: art/ → webp 변환, 매니페스트 ---
import json
GRADES = {"S":"S","A":"A","B":"B","C":"C","D":"D","F":"F","hidden":"히든"}
art = {"end": {}, "bg": {}}
def convert(src, dst, maxw=900):
    from PIL import Image
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime: return
    im = Image.open(src).convert("RGB")
    if im.width > maxw: im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=82, method=6)
exts = {".png", ".jpg", ".jpeg", ".webp"}
for folder, grade in GRADES.items():
    srcs = sorted(f for f in (root / "art/endings" / folder).glob("*") if f.suffix.lower() in exts)
    lst = []
    for i, f in enumerate(srcs, 1):
        rel = f"img/end/{folder}-{i:02d}.webp"
        convert(f, root / "dist" / rel); lst.append(rel)
    if lst: art["end"][grade] = lst
for f in sorted((root / "art/bg").glob("*")):
    if f.suffix.lower() in exts:
        rel = f"img/bg/{f.stem}.webp"; convert(f, root / "dist" / rel, 1200); art["bg"][f.stem] = rel
manifest = "window.ART = " + json.dumps(art, ensure_ascii=False) + ";"
out = tpl.replace("/*__CORE__*/", manifest + "\n" + core).replace("/*__CHAPTERS__*/", chapters)
(root / "dist").mkdir(exist_ok=True)
(root / "dist/index.html").write_text(out, encoding="utf-8")
local = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}</style></head><body>' + out + "</body></html>"
(root / "dist/local.html").write_text(local, encoding="utf-8")
# --- PWA (GitHub Pages: /docs 폴더) ---
h = hashlib.sha1(out.encode("utf-8")).hexdigest()[:10]
pwa_head = ('<!doctype html><html lang="ko"><head><meta charset="utf-8">'
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  '<meta name="theme-color" content="#15181d">'
  '<link rel="manifest" href="manifest.webmanifest">'
  '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">'
  '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">'
  '<meta name="apple-mobile-web-app-title" content="둘이서">'
  '<style>[hidden]{display:none!important}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}</style>'
  '<script>window.__PWA__=true</script></head><body>')
docs = root / "docs"; docs.mkdir(exist_ok=True)
(docs / "index.html").write_text(pwa_head + out + "</body></html>", encoding="utf-8")
import shutil
if (root / "dist/img").exists():
    if (docs / "img").exists(): shutil.rmtree(docs / "img")
    shutil.copytree(root / "dist/img", docs / "img")
n_art = sum(len(v) for v in art["end"].values()) + len(art["bg"])
print("art:", n_art, "images", {k: len(v) for k, v in art["end"].items()}, list(art["bg"]))
(docs / "sw.js").write_text(f"""// 오프라인 캐시 (빌드 {h})
const CACHE = "dongtan-{h}";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];
self.addEventListener("install", (e) => {{ e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); }});
self.addEventListener("activate", (e) => {{ e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); }});
self.addEventListener("fetch", (e) => {{
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) {{ e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); return; }}
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {{ const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; }})));
}});
""", encoding="utf-8")
print("pwa:", "docs/index.html", "sw", h)
print("built:", len(out) // 1024, "KB; 챕터", [n for n in order if (root / f"chapters/{n}.js").exists()])
