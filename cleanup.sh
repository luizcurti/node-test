#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛑 Stopping Node.js Project Services...${NC}"

# Stop all containers
echo -e "${YELLOW}📦 Stopping Docker containers...${NC}"
docker compose down --remove-orphans

# Remove unused Docker resources (optional)
echo -e "${YELLOW}🧹 Cleaning up Docker resources...${NC}"
docker system prune -f --volumes

echo -e "${GREEN}✅ All services stopped and cleaned up!${NC}"
echo -e "${BLUE}📋 To restart everything, run:${NC} ${GREEN}./setup.sh${NC}"