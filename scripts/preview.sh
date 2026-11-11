#!/usr/bin/env bash
# 本地预览：在仓库根目录起静态服务器。
# 用法：./scripts/preview.sh [端口]
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${1:-8766}"

echo "主站   http://127.0.0.1:${PORT}/site/"
echo "作品集 http://127.0.0.1:${PORT}/portfolio/"
echo "按 Ctrl+C 停止。"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
