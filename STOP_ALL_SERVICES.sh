#!/bin/bash

# ============================================
# SkinLuxe-Meerut - Stop All Services Script
# ============================================

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Stopping all SkinLuxe services...${NC}"
echo ""

# Stop API
if [ -f /tmp/skinluxe-api.pid ]; then
    API_PID=$(cat /tmp/skinluxe-api.pid)
    if kill -0 $API_PID 2>/dev/null; then
        kill $API_PID
        echo -e "${GREEN}✓ Stopped API (PID: $API_PID)${NC}"
    fi
    rm /tmp/skinluxe-api.pid
fi

# Stop Web
if [ -f /tmp/skinluxe-web.pid ]; then
    WEB_PID=$(cat /tmp/skinluxe-web.pid)
    if kill -0 $WEB_PID 2>/dev/null; then
        kill $WEB_PID
        echo -e "${GREEN}✓ Stopped Customer Website (PID: $WEB_PID)${NC}"
    fi
    rm /tmp/skinluxe-web.pid
fi

# Stop Admin
if [ -f /tmp/skinluxe-admin.pid ]; then
    ADMIN_PID=$(cat /tmp/skinluxe-admin.pid)
    if kill -0 $ADMIN_PID 2>/dev/null; then
        kill $ADMIN_PID
        echo -e "${GREEN}✓ Stopped Admin Panel (PID: $ADMIN_PID)${NC}"
    fi
    rm /tmp/skinluxe-admin.pid
fi

# Kill any remaining processes on the ports
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

echo ""
echo -e "${GREEN}✓ All services stopped${NC}"
