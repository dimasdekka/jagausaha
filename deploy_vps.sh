#!/usr/bin/env bash
# ==============================================================================
# JagaUsaha Deployment Script for IDwebhost CloudBaik VPS
# Specification: 4 Core CPU / 4GB RAM / 20GB SSD (Ubuntu 22.04 / Debian 12)
# ==============================================================================

set -e

echo "========================================================"
echo "  Deploying JagaUsaha on IDwebhost CloudBaik VPS"
echo "  AI HackFest 2026: Build Agent, Deliver Impact"
echo "========================================================"

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo "[1/4] Checking Python & Node.js environment..."
command -v python3 >/dev/null 2>&1 || { echo "Installing Python3..."; sudo apt update && sudo apt install -y python3 python3-pip python3-venv; }
command -v node >/dev/null 2>&1 || { echo "Installing Node.js 20 LTS..."; curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs; }

echo "[2/4] Setting up Python virtual environment..."
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi
source .venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn rich numpy pydantic

echo "[3/4] Building React + TypeScript Frontend..."
cd frontend
npm install
npm run build
cd "$APP_DIR"

echo "[4/4] Creating systemd service for 24/7 background uptime..."
sudo tee /etc/systemd/system/jaga-usaha.service > /dev/null <<EOF
[Unit]
Description=JagaUsaha AI Autonomous Financial Guardian
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=$APP_DIR/.venv/bin/python -m uvicorn api.server:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable jaga-usaha.service
sudo systemctl restart jaga-usaha.service

echo ""
echo "========================================================"
echo "  [SUCCESS] JagaUsaha Deployed on CloudBaik VPS!"
echo "  Dashboard URL: http://$(curl -s ifconfig.me):8000"
echo "  Check Status : sudo systemctl status jaga-usaha.service"
echo "  Run CLI Demo : python3 cli_demo.py"
echo "========================================================"
