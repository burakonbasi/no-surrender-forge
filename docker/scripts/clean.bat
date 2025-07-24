@echo off
echo.
echo Cleaning Docker environment...
echo.

cd ..

REM Stop all containers
docker-compose down

REM Remove all images
docker rmi docker-web docker-api -f

REM Clean build cache
docker builder prune -a -f

REM Clean system
docker system prune -a -f

echo.
echo Cleanup completed!
echo.
pause