#!/usr/bin/env bash
set -euo pipefail
cd /root/values
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
