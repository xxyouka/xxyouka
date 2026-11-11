#!/usr/bin/env bash
# 把本仓库里的 site/、portfolio/ 部署回原来的两个 GitHub Pages 仓库。
# 线上地址保持不变：https://xxyouka.github.io/ 与 https://xxyouka.github.io/portfolio/
set -euo pipefail

cd "$(dirname "$0")/.."

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
check_target git@github.com:xxyouka/xxyouka.github.io.git || exit 1
check_target git@github.com:xxyouka/portfolio.git || exit 1

if [[ "${1:-}" == "--dry-run" ]]; then
  echo "dry-run：将执行"
  echo "  git subtree push --prefix=site git@github.com:xxyouka/xxyouka.github.io.git main"
  echo "  git subtree push --prefix=portfolio git@github.com:xxyouka/portfolio.git main"
  exit 0
fi

git subtree push --prefix=site git@github.com:xxyouka/xxyouka.github.io.git main
git subtree push --prefix=portfolio git@github.com:xxyouka/portfolio.git main

echo "已推送。GitHub Pages 通常在一分钟内更新。"
