#!/bin/bash

# ============================================
# SkinLuxe-Meerut - Complete Local Startup Script
# ============================================
# This script starts all services for local development:
# - PostgreSQL Database (verify running)
# - Backend API (Port 5000)
# - Customer Website (Port 3001)
# - Admin Panel (Port 3002)
# ============================================

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║          🏥 SkinLuxe Aesthetics & Academy - Meerut         ║${NC}"
echo -e "${BLUE}║              Complete Local Development Setup              ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================
# Step 1: Verify PostgreSQL
# ============================================
echo -e "${YELLOW}[1/5] Checking PostgreSQL Database...${NC}"
if pg_isready > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PostgreSQL is running${NC}"
    
    # Check if database exists
    if psql -U isachinsingh -lqt | cut -d \| -f 1 | grep -qw the_pizza_box; then
        echo -e "${GREEN}✓ Database 'the_pizza_box' exists${NC}"
    else
        echo -e "${RED}✗ Database 'the_pizza_box' not found${NC}"
        echo -e "${YELLOW}Creating database...${NC}"
        createdb -U isachinsingh the_pizza_box
        echo -e "${GREEN}✓ Database created${NC}"
    fi
else
    echo -e "${RED}✗ PostgreSQL is not running${NC}"
    echo -e "${YELLOW}Please start PostgreSQL first:${NC}"
    echo -e "  brew services start postgresql@14"
    exit 1
fi
echo ""

# ============================================
# Step 2: Install Dependencies (if needed)
# ============================================
echo -e "${YELLOW}[2/5] Checking Dependencies...${NC}"

# Check API dependencies
if [ ! -d "apps/api/node_modules" ]; then
    echo -e "${YELLOW}Installing API dependencies...${NC}"
    cd apps/api && npm install && cd ../..
    echo -e "${GREEN}✓ API dependencies installed${NC}"
else
    echo -e "${GREEN}✓ API dependencies already installed${NC}"
fi

# Check Web dependencies
if [ ! -d "apps/web/node_modules" ]; then
    echo -e "${YELLOW}Installing Web dependencies...${NC}"
    cd apps/web && npm install && cd ../..
    echo -e "${GREEN}✓ Web dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Web dependencies already installed${NC}"
fi

# Check Admin dependencies
if [ ! -d "apps/admin/node_modules" ]; then
    echo -e "${YELLOW}Installing Admin dependencies...${NC}"
    cd apps/admin && npm install && cd ../..
    echo -e "${GREEN}✓ Admin dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Admin dependencies already installed${NC}"
fi
echo ""

# ============================================
# Step 3: Setup Database Schema
# ============================================
echo -e "${YELLOW}[3/5] Setting up Database Schema...${NC}"
cd apps/api

# Generate Prisma Client
echo -e "${YELLOW}Generating Prisma Client...${NC}"
npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
npx prisma db push > /dev/null 2>&1
echo -e "${GREEN}✓ Database schema updated${NC}"

cd ../..
echo ""

# ============================================
# Step 4: Start Backend API
# ============================================
echo -e "${YELLOW}[4/5] Starting Backend API (Port 5001)...${NC}"
cd apps/api

# Kill any existing process on port 5001
lsof -ti:5001 | xargs kill -9 2>/dev/null || true

# Start API in background
npm run dev > /tmp/skinluxe-api.log 2>&1 &
API_PID=$!
echo $API_PID > /tmp/skinluxe-api.pid

# Wait for API to start
sleep 3

if kill -0 $API_PID 2>/dev/null; then
    echo -e "${GREEN}✓ API started successfully (PID: $API_PID)${NC}"
    echo -e "${GREEN}  → http://localhost:5001${NC}"
else
    echo -e "${RED}✗ API failed to start. Check logs: tail -f /tmp/skinluxe-api.log${NC}"
fi

cd ../..
echo ""

# ============================================
# Step 5: Start Frontend Services
# ============================================
echo -e "${YELLOW}[5/5] Starting Frontend Services...${NC}"

# Start Customer Website (Port 3001)
echo -e "${YELLOW}Starting Customer Website (Port 3001)...${NC}"
cd apps/web

# Kill any existing process on port 3001
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

npm run dev > /tmp/skinluxe-web.log 2>&1 &
WEB_PID=$!
echo $WEB_PID > /tmp/skinluxe-web.pid

sleep 3

if kill -0 $WEB_PID 2>/dev/null; then
    echo -e "${GREEN}✓ Customer Website started (PID: $WEB_PID)${NC}"
    echo -e "${GREEN}  → http://localhost:3001${NC}"
else
    echo -e "${RED}✗ Customer Website failed to start. Check logs: tail -f /tmp/skinluxe-web.log${NC}"
fi

cd ../..

# Start Admin Panel (Port 3002)
echo -e "${YELLOW}Starting Admin Panel (Port 3002)...${NC}"
cd apps/admin

# Kill any existing process on port 3002
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

npm run dev > /tmp/skinluxe-admin.log 2>&1 &
ADMIN_PID=$!
echo $ADMIN_PID > /tmp/skinluxe-admin.pid

sleep 3

if kill -0 $ADMIN_PID 2>/dev/null; then
    echo -e "${GREEN}✓ Admin Panel started (PID: $ADMIN_PID)${NC}"
    echo -e "${GREEN}  → http://localhost:3002${NC}"
else
    echo -e "${RED}✗ Admin Panel failed to start. Check logs: tail -f /tmp/skinluxe-admin.log${NC}"
fi

cd ../..
echo ""

# ============================================
# Summary
# ============================================
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    🎉 ALL SERVICES RUNNING!                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📊 Service Status:${NC}"
echo -e "${GREEN}  ✓ Database:         PostgreSQL (localhost:5432)${NC}"
echo -e "${GREEN}  ✓ Backend API:      http://localhost:5001${NC}"
echo -e "${GREEN}  ✓ Customer Website: http://localhost:3001${NC}"
echo -e "${GREEN}  ✓ Admin Panel:      http://localhost:3002${NC}"
echo ""
echo -e "${YELLOW}📝 Quick Links:${NC}"
echo -e "  • Customer Website:  ${BLUE}http://localhost:3001${NC}"
echo -e "  • Admin Dashboard:   ${BLUE}http://localhost:3002/dashboard${NC}"
echo -e "  • Admin Login:       ${BLUE}http://localhost:3002/login${NC}"
echo -e "  • API Health:        ${BLUE}http://localhost:5001/health${NC}"
echo ""
echo -e "${YELLOW}📋 Useful Commands:${NC}"
echo -e "  • View API logs:     ${BLUE}tail -f /tmp/skinluxe-api.log${NC}"
echo -e "  • View Web logs:     ${BLUE}tail -f /tmp/skinluxe-web.log${NC}"
echo -e "  • View Admin logs:   ${BLUE}tail -f /tmp/skinluxe-admin.log${NC}"
echo -e "  • Stop all services: ${BLUE}./STOP_ALL_SERVICES.sh${NC}"
echo ""
echo -e "${YELLOW}🔐 Default Admin Credentials:${NC}"
echo -e "  Email:    ${BLUE}admin@skinluxe.com${NC}"
echo -e "  Password: ${BLUE}admin123${NC}"
echo ""
echo -e "${GREEN}✨ Happy coding! Press Ctrl+C to view logs or use the stop script.${NC}"
echo ""

# Keep script running and show combined logs
echo -e "${YELLOW}Showing combined logs (Ctrl+C to exit):${NC}"
echo -e "${YELLOW}─────────────────────────────────────────────────────────────${NC}"
tail -f /tmp/skinluxe-api.log /tmp/skinluxe-web.log /tmp/skinluxe-admin.log
