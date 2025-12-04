#!/bin/bash

# Script to set up Vercel environment variables for The Pizza Box project
# Run this script after logging in to Vercel CLI with: vercel login

echo "🚀 Setting up Vercel Environment Variables for The Pizza Box"
echo ""

# API URL for production
API_URL="https://the-pizza-box-api.vercel.app/api"

echo "📝 Setting environment variables..."
echo ""

# Set environment variable for web app
echo "Setting NEXT_PUBLIC_API_URL for the-pizza-box-web..."
vercel env add NEXT_PUBLIC_API_URL production <<EOF
$API_URL
EOF

vercel env add NEXT_PUBLIC_API_URL preview <<EOF
$API_URL
EOF

vercel env add NEXT_PUBLIC_API_URL development <<EOF
$API_URL
EOF

echo ""
echo "Setting NEXT_PUBLIC_API_URL for the-pizza-box-admin..."

# Set environment variable for admin app  
vercel env add NEXT_PUBLIC_API_URL production <<EOF
$API_URL
EOF

vercel env add NEXT_PUBLIC_API_URL preview <<EOF
$API_URL
EOF

vercel env add NEXT_PUBLIC_API_URL development <<EOF
$API_URL
EOF

echo ""
echo "✅ Environment variables set successfully!"
echo ""
echo "🔄 Now triggering redeployment..."
echo ""

# Trigger redeploy by pushing a dummy commit
cd apps/web
vercel --prod

cd ../admin
vercel --prod

echo ""
echo "🎉 Done! Your apps should be redeploying now."
echo "Check your Vercel dashboard for deployment status."
