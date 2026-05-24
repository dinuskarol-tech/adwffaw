#!/usr/bin/env bash
set -euo pipefail
npm install
npm run build
npm link
echo "Dinus Code installed. Run: dinus chat \"hello\""
