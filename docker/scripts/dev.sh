#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 Starting No-Surrender Development Environment${NC}"

# Check if .env exists
if [ ! -f ../.env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp ../.env.example ../.env
fi

# Start services
echo -e "${GREEN}Starting Docker services...${NC}"
docker-compose up -d

# Wait for services
echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 5

# Show logs
echo -e "${GREEN}Services are running!${NC}"
echo -e "Web App: http://localhost:3000"
echo -e "API: http://localhost:3001"
echo -e "MongoDB: mongodb://localhost:27017"
echo -e "Redis: redis://localhost:6379"
echo -e ""
echo -e "${YELLOW}To view logs:${NC} docker-compose logs -f"
echo -e "${YELLOW}To stop:${NC} docker-compose down"