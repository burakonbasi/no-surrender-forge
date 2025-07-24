@echo off
echo.
echo ====================================
echo   No-Surrender Development Setup
echo ====================================
echo.

REM Check if .env exists
if not exist "../../.env" (
    echo Creating .env file...
    copy "../../.env.example" "../../.env"
)

REM Navigate to docker directory
cd ..

REM Start services
echo Starting Docker services...
docker-compose up -d

REM Check if successful
if %errorlevel% neq 0 (
    echo.
    echo Error starting services!
    pause
    exit /b 1
)

echo.
echo ====================================
echo   Services are running!
echo ====================================
echo.
echo Web App: http://localhost:3000
echo API: http://localhost:3001
echo MongoDB: mongodb://localhost:27017
echo Redis: redis://localhost:6379
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
echo.
pause