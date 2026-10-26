@echo off
cd /d "%~dp0backend"
if not exist .env (echo Create backend\.env first. & pause & exit /b 1)
if not exist node_modules call npm install
node src/setup.js
pause
