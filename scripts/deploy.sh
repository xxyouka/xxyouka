#!/usr/bin/env bash
# 把本仓库里的 site/、portfolio/ 部署回原来的两个 GitHub Pages 仓库。
# 线上地址保持不变：https://xxyouka.github.io/ 与 https://xxyouka.github.io/portfolio/
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -n "$(git status --porcelain)" ]]; then
  echo "工作区不干净，先提交改动再部署。" >&2
  exit 1
fi

git subtree push --prefix=site git@github.com:xxyouka/xxyouka.github.io.git main
git subtree push --prefix=portfolio git@github.com:xxyouka/portfolio.git main

echo "已推送。GitHub Pages 通常在一分钟内更新。"
