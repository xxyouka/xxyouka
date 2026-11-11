#!/usr/bin/env python3
"""零依赖的仓库体检：本地链接、锚点、重复 ID、JSON-LD、sitemap 和图片引用。

用法：python3 scripts/check.py
退出码：0 全部通过；1 存在错误（适合 CI）。
"""
from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
PORTFOLIO = ROOT / "portfolio"
PAGES = [SITE / "index.html", SITE / "404.html", PORTFOLIO / "index.html", PORTFOLIO / "404.html"]
DOCS = [ROOT / "README.md", ROOT / "仓库说明.md", ROOT / "GitHub主页.md",
        SITE / "README.md", SITE / "个人网站.md",
        PORTFOLIO / "README.md", PORTFOLIO / "作品集.md"]

problems: list[str] = []
notes: list[str] = []


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: dict[str, int] = {}
        self.refs: list[tuple[str, str]] = []
        self.images: list[dict[str, str | None]] = []
        self._in_script = False
        self.scripts: list[str] = []
        self._script_buf: list[str] = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids[a["id"]] = self.ids.get(a["id"], 0) + 1
        for key in ("href", "src"):
            if key in a and a[key]:
                self.refs.append((tag, a[key]))
        if tag == "img":
            self.images.append(a)
        if tag == "script" and a.get("type") == "application/ld+json":
            self._in_script = True
            self._script_buf = []

    def handle_endtag(self, tag):
        if tag == "script" and self._in_script:
            self.scripts.append("".join(self._script_buf))
            self._in_script = False

    def handle_data(self, data):
        if self._in_script:
            self._script_buf.append(data)


def local_target(base: Path, raw: str) -> Path | None:
    """把站内相对链接解析为文件；外链、锚点、data: 返回 None。"""
    raw = raw.strip()
    if not raw or raw.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    parts = urlsplit(raw)
    if parts.scheme or parts.netloc or raw.startswith("/"):
        return None
    path = unquote(parts.path)
    if not path:
        return None
    return (base / path).resolve()


def check_page(path: Path) -> None:
    rel = path.relative_to(ROOT)
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.close()

    for ident, count in parser.ids.items():
        if count > 1:
            problems.append(f"{rel}: 重复 id #{ident} ×{count}")

    for tag, ref in parser.refs:
        if ref.startswith("#"):
            target = ref[1:]
            # #project/<key> 是前端案例路由，不是 DOM 锚点。
            if target.startswith("project/"):
                continue
            if target and target not in parser.ids:
                problems.append(f"{rel}: <{tag}> 锚点 {ref} 不存在")
            continue
        target = local_target(path.parent, ref)
        if target and not target.exists():
            problems.append(f"{rel}: <{tag}> 指向不存在的文件 {ref}")

    for img in parser.images:
        src = img.get("src")
        alt = img.get("alt")
        if alt is None:
            problems.append(f"{rel}: <img src={src}> 缺少 alt 属性")
        if src and not str(src).startswith("data:") and not img.get("width"):
            notes.append(f"{rel}: <img src={src}> 未写 width/height")

    for block in parser.scripts:
        try:
            json.loads(block)
        except json.JSONDecodeError as exc:
            problems.append(f"{rel}: JSON-LD 不是合法 JSON：{exc}")

    text = path.read_text(encoding="utf-8")
    if not re.search(r"<html[^>]*\blang=", text):
        problems.append(f"{rel}: <html> 缺少 lang")
    if not re.search(r"<meta[^>]+name=[\"']description[\"']", text):
        problems.append(f"{rel}: 缺少 meta description")
    if "<title>" not in text:
        problems.append(f"{rel}: 缺少 <title>")


def check_css() -> None:
    for css in (SITE / "site.css",):
        text = css.read_text(encoding="utf-8")
        for raw in re.findall(r"url\((['\"]?)([^)'\"]+)\1\)", text):
            ref = raw[1]
            if ref.startswith(("#", "data:", "http")):
                continue
            target = (css.parent / ref).resolve()
            if not target.exists():
                problems.append(f"{css.relative_to(ROOT)}: url() 指向不存在的 {ref}")


def check_js_images() -> None:
    js = SITE / "site.js"
    text = js.read_text(encoding="utf-8")
    for ref in sorted(set(re.findall(r"assets/[A-Za-z0-9._/-]+\.(?:webp|png|jpg|jpeg|svg|woff2)", text))):
        if not (SITE / ref).exists():
            problems.append(f"site/site.js: 引用不存在的图片 {ref}")


def check_markdown() -> None:
    for doc in DOCS:
        text = doc.read_text(encoding="utf-8")
        for raw in re.findall(r"\[[^\]]*\]\(([^)]+)\)", text):
            ref = raw.strip().split(" ")[0]
            if ref.startswith(("#", "http:", "https:", "mailto:")):
                continue
            parts = urlsplit(ref)
            if not parts.path:
                continue
            target = (doc.parent / unquote(parts.path)).resolve()
            if not target.exists():
                problems.append(f"{doc.relative_to(ROOT)}: Markdown 链接不存在 {ref}")


def check_sitemaps() -> None:
    for sm in (SITE / "sitemap.xml", PORTFOLIO / "sitemap.xml"):
        try:
            ET.parse(sm)
        except ET.ParseError as exc:
            problems.append(f"{sm.relative_to(ROOT)}: XML 解析失败 {exc}")


def main() -> int:
    for page in PAGES:
        if not page.exists():
            problems.append(f"缺少页面 {page.relative_to(ROOT)}")
        else:
            check_page(page)
    check_css()
    check_js_images()
    check_markdown()
    check_sitemaps()

    for item in notes:
        print(f"提示  {item}")
    for item in problems:
        print(f"错误  {item}")
    print()
    if problems:
        print(f"体检未通过：{len(problems)} 个错误。")
        return 1
    print(f"体检通过：{len(PAGES)} 个页面，{len(DOCS)} 份文档，0 个错误。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
