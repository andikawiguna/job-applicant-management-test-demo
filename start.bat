@echo off
echo Starting Job Applicant Management System...
echo.
echo Starting JSON Server on port 3001...
start "JSON Server" cmd /k "npm run server"
timeout /t 3 /nobreak > nul
echo.
echo Starting React App on port 3000...
start "React App" cmd /k "npm start"
echo.
echo Both servers are starting...
echo JSON Server: http://localhost:3001
echo React App: http://localhost:3000
pause