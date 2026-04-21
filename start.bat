@echo off
echo === Khoi dong HAFOREXIM Web XNK ===
start "Backend :5013" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 2 >nul
start "Frontend :5174" cmd /k "cd /d "%~dp0frontend" && npm run dev"
echo Backend: http://localhost:5013
echo Frontend: http://localhost:5174
