#!/usr/bin/env bash
# 部署后线上复核：关键路径、资源版本、404 与归档路径。
# 用法：./scripts/verify-live.sh [https://xxyouka.github.io]
set -euo pipefail

BASE="${1:-https://xxyouka.github.io}"
BASE="${BASE%/}"
fail=0

check() {
  local url="$1" expected="${2:-200}"
  local code
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$url")"
  if [[ "$code" != "$expected" ]]; then
    echo "FAIL $code $url（期望 $expected）" >&2
    fail=1
  else
    echo "OK   $code $url"
  fi
}

html="$(curl -fsSL --max-time 15 "$BASE/")"
if ! grep -qi 'xxyouka' <<<"$html"; then
  echo "FAIL 首页没有 xxyouka 标识" >&2
  fail=1
fi

check "$BASE/"
check "$BASE/projects.html"
check "$BASE/sitemap.xml"
check "$BASE/robots.txt"
check "$BASE/404.html"
check "$BASE/portfolio/" 404

# 首页引用的 CSS / JS 版本必须真实可访问
for query in $(grep -oE '(site\.css|site\.js)\?v=[A-Za-z0-9._-]+' <<<"$html" | sort -u); do
  check "$BASE/$query"
done

js_query="$(grep -oE 'site\.js\?v=[A-Za-z0-9._-]+' <<<"$html" | head -1)"
if [[ -n "$js_query" ]]; then
  js_body="$(curl -fsSL --max-time 15 "$BASE/$js_query")"
  for query in $(grep -oE '(ocean|pixel-preview)\.js\?v=[A-Za-z0-9._-]+' <<<"$js_body" | sort -u); do
    check "$BASE/$query"
  done
fi

if [[ "$fail" -ne 0 ]]; then
  echo "线上复核未通过。" >&2
  exit 1
fi
echo "线上复核通过：$BASE"
