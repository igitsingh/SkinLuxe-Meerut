#!/bin/bash

echo "🗄️  SkinLuxe Database Setup Script"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.template .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your database connection string!"
    echo ""
    echo "Steps:"
    echo "1. Create database on Supabase (https://supabase.com)"
    echo "2. Copy connection string"
    echo "3. Paste into .env file (DATABASE_URL and DIRECT_URL)"
    echo "4. Run this script again"
    echo ""
    exit 1
fi

echo "✅ .env file found!"
echo ""

# Check if DATABASE_URL is set
if grep -q "YOUR_PASSWORD" .env; then
    echo "⚠️  DATABASE_URL not configured!"
    echo ""
    echo "Please edit .env file and replace:"
    echo "  YOUR_PASSWORD with your actual database password"
    echo ""
    exit 1
fi

echo "📦 Installing Prisma..."
npm install @prisma/client prisma
echo ""

echo "🔧 Generating Prisma Client..."
npx prisma generate
echo ""

echo "📊 Pushing schema to database..."
npx prisma db push
echo ""

echo "🧪 Testing database connection..."
node test-db.js
echo ""

echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Check that test passed above"
echo "2. Start creating API routes"
echo "3. Connect admin panel to database"
echo ""
