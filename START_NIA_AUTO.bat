@echo off
cd /d "%~dp0"
if not exist backend\.env (
  echo First create backend\.env from backend\.env.example and set JWT_SECRET.
  pause
  exit /b 1
)
if not exist backend\node_modules (
  echo Installing backend packages...
  cd backend
  call npm install
  cd ..
)
if not exist frontend\node_modules (
  echo Installing frontend packages...
  cd frontend
  call npm install
  cd ..
)
echo.
echo Starting Nia Auto API and Web App...
start "Nia Auto API" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 4 /nobreak >nul
start "Nia Auto Web - PC and Phone URL" cmd /k "cd /d "%~dp0frontend" && npm run dev"
echo.
echo Desktop: http://localhost:5175
echo Phone: check the Nia Auto Web terminal for http://YOUR-LAN-IP:5175
echo NOTE: Phone camera requires HTTPS. See README.md.
pause
