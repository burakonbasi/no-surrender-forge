@echo off
echo.
echo Building Docker images...
echo.

cd ..

REM Build with no cache
docker-compose build --no-cache

if %errorlevel% neq 0 (
    echo.
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Build completed successfully!
echo.
pause