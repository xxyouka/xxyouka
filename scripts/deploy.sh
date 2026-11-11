#!/usr/bin/env bash
# 只发布根站：https://xxyouka.github.io/
# 线上源码来自本仓库的 site/ 子树；portfolio/ 保留为归档源码，不再单独部署。
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="git@github.com:xxyouka/xxyouka.github.io.git"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "工作区不干净，先提交改动再部署。" >&2
  exit 1
fi

echo "先跑仓库体检…"
python3 scripts/check.py

check_target() {
  local url="$1"
  if ! GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=10" git ls-remote "$url" >/dev/null 2>&1; then
    echo "无法访问部署仓库：$url" >&2
    echo "仓库可能已被删除或改名。请先在 GitHub 创建同名仓库并启用 Pages，再运行本脚本。" >&2
    return 1
  fi
}
check_target "$TARGET" || exit 1

if [[ "${1:-}" == "--dry-run" ]]; then
  echo "dry-run：将执行"
  echo "  git subtree push --prefix=site ${TARGET} main"
  exit 0
fi

git subtree push --prefix=site "$TARGET" main

echo "已推送。GitHub Pages 通常在一分钟内更新：https://xxyouka.github.io/"
