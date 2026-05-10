#!/bin/bash
set -e

echo "Pulling latest code..."
git pull origin master

echo "Rebuilding and restarting container..."
docker compose down
docker compose up -d --build

echo "Done. Running at http://localhost:8080"
