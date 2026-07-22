#!/usr/bin/env bash
# Serve the built static site locally under the /Keystone/ sub-path, matching
# the GitHub Pages layout so screenshots reflect the real basePath.
# Idempotent: safe to run repeatedly; it (re)creates the symlink and starts the
# server only if the port is free.
set -euo pipefail

ROOT="/home/user/Keystone"
OUT="$ROOT/out"
SERVE_DIR="$ROOT/.serve"
PORT="${PORT:-3400}"

if [ ! -d "$OUT" ]; then
  echo "No build found at $OUT — run: NEXT_PUBLIC_BASE_PATH=/Keystone npm run build" >&2
  exit 1
fi

mkdir -p "$SERVE_DIR"
ln -sfn "$OUT" "$SERVE_DIR/Keystone"

if curl -s -o /dev/null "http://localhost:$PORT/Keystone/"; then
  echo "Server already up at http://localhost:$PORT/Keystone/"
  exit 0
fi

( cd "$SERVE_DIR" && nohup python3 -m http.server "$PORT" >/dev/null 2>&1 & )
sleep 1.5
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/Keystone/")
echo "Serving http://localhost:$PORT/Keystone/ (HTTP $code)"
