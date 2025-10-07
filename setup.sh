#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Node.js Project Setup...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building and starting Docker containers...${NC}"
docker compose down --remove-orphans
docker compose up -d --build

# Wait for database to be healthy
echo -e "${YELLOW}⏳ Waiting for database to be ready...${NC}"
timeout=60
counter=0

while [ $counter -lt $timeout ]; do
    if docker compose exec db pg_isready -U user -d backend > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Database is ready!${NC}"
        break
    fi
    
    echo -e "${YELLOW}⏳ Database not ready yet... waiting (${counter}s/${timeout}s)${NC}"
    sleep 2
    counter=$((counter + 2))
done

if [ $counter -ge $timeout ]; then
    echo -e "${RED}❌ Database failed to start within ${timeout} seconds${NC}"
    echo -e "${RED}📋 Container logs:${NC}"
    docker compose logs db
    exit 1
fi

# Run database migrations
echo -e "${YELLOW}🔄 Running database migrations...${NC}"
if npm run prisma:migrate; then
    echo -e "${GREEN}✅ Database migrations completed successfully!${NC}"
else
    echo -e "${RED}❌ Database migrations failed${NC}"
    exit 1
fi

# Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
if npm run prisma:generate; then
    echo -e "${GREEN}✅ Prisma client generated successfully!${NC}"
else
    echo -e "${RED}❌ Prisma client generation failed${NC}"
    exit 1
fi

# Build the project
echo -e "${YELLOW}🏗️  Building TypeScript project...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Project built successfully!${NC}"
else
    echo -e "${RED}❌ Project build failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo -e "${BLUE}📋 Available commands:${NC}"
echo -e "  ${GREEN}npm run dev${NC}     - Start development server"
echo -e "  ${GREEN}npm run test${NC}    - Run unit tests"
echo -e "  ${GREEN}npm run test:all${NC} - Run all tests (unit + integration)"
echo -e "  ${GREEN}npm start${NC}       - Start production server"
echo -e "  ${GREEN}docker compose logs${NC} - View container logs"
echo -e "  ${GREEN}docker compose down${NC} - Stop all containers"
echo ""
echo -e "${BLUE}🌐 Services running:${NC}"
echo -e "  ${GREEN}Database:${NC} localhost:5432"
echo -e "  ${GREEN}Application:${NC} localhost:3000 (when started)"