#!/usr/bin/env bash
# Wait for the GitHub Pages deploy to finish, then print the live commit sha so
# you can confirm it matches what you pushed. Uses the public GitHub API (no
# auth needed for a public repo). Exits non-zero if the run fails or times out.
set -euo pipefail

REPO="${REPO:-mayab-byte/Keystone}"
WORKFLOW="${WORKFLOW:-deploy.yml}"
MAX="${MAX:-40}"        # attempts
SLEEP="${SLEEP:-15}"    # seconds between attempts
API="https://api.github.com/repos/$REPO"

head_sha=$(git -C /home/user/Keystone rev-parse --short HEAD 2>/dev/null || echo "?")
echo "pushed sha: $head_sha — waiting for $WORKFLOW ..."

status="" concl=""
for i in $(seq 1 "$MAX"); do
  read -r sha status concl < <(
    curl -s "$API/actions/workflows/$WORKFLOW/runs?per_page=1" \
    | python3 -c "import sys,json;r=json.load(sys.stdin)['workflow_runs'][0];print(r['head_sha'][:7],r['status'],r['conclusion'])"
  )
  echo "[$((i*SLEEP))s] run $sha $status ${concl}"
  [ "$status" = "completed" ] && break
  sleep "$SLEEP"
done

if [ "$status" != "completed" ]; then
  echo "TIMED OUT waiting for deploy" >&2
  exit 1
fi
if [ "$concl" != "success" ]; then
  echo "DEPLOY FAILED (conclusion: $concl) — inspect the run" >&2
  exit 1
fi

live=$(curl -s "$API/deployments?per_page=1" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)[0]['sha'][:7])")
echo "live sha: $live"
if [ "$live" = "$head_sha" ]; then
  echo "OK — live matches pushed commit. https://mayab-byte.github.io/Keystone/"
else
  echo "NOTE: live sha ($live) != pushed sha ($head_sha); Pages may still be propagating." >&2
fi
