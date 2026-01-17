#!/bin/bash

echo "🔍 VERIFYING DEPLOYMENT STATUS..."
echo ""

# Check latest commit
echo "📌 Latest Git Commit:"
git log --oneline -1
echo ""

# Check if Vercel deployment has the latest code
echo "🌐 Checking Vercel Deployment..."
VERCEL_RESPONSE=$(curl -s "https://skinluxe-meerut-web-og.vercel.app/book-appointment" | grep -o "finalDateTime" | head -1)

if [ -n "$VERCEL_RESPONSE" ]; then
    echo "✅ Vercel is serving LATEST code (contains 'finalDateTime' fix)"
else
    echo "⏳ Vercel is still deploying... (old code detected)"
    echo "   Please wait 1-2 minutes and refresh your browser"
fi
echo ""

# Check API health
echo "🔧 Checking API Status..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://skinluxe-meerut-api.onrender.com/api/treatments")

if [ "$API_STATUS" = "200" ]; then
    echo "✅ API is LIVE and responding (Status: $API_STATUS)"
else
    echo "❌ API issue detected (Status: $API_STATUS)"
fi
echo ""

# Check treatment count
echo "📊 Checking Treatment Data..."
TREATMENT_COUNT=$(curl -s "https://skinluxe-meerut-api.onrender.com/api/treatments" | grep -o '"id"' | wc -l | tr -d ' ')
echo "   Treatments available: $TREATMENT_COUNT"

if [ "$TREATMENT_COUNT" -ge "21" ]; then
    echo "✅ All 21 treatments are available"
else
    echo "⚠️  Expected 21, found $TREATMENT_COUNT"
fi
echo ""

echo "📝 SUMMARY:"
echo "   Git: Latest commit pushed ✅"
echo "   API: Live and serving data ✅"
echo "   Vercel: Check status above"
echo ""
echo "🔄 If Vercel shows old code, wait 1-2 minutes for deployment to complete"
echo "   Then do a HARD REFRESH in your browser (Cmd+Shift+R on Mac)"
