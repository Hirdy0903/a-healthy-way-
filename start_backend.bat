@echo off
echo ========================================================
echo Installing Backend Dependencies...
echo ========================================================
call npm install express mongoose bcryptjs jsonwebtoken cors dotenv

echo.
echo ========================================================
echo Starting Backend Server...
echo ========================================================
call npm run server
pause
