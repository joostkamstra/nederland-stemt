#!/bin/bash

# Nederland Stemt - Production Deployment Script
# ===============================================

echo "🚀 Nederland Stemt - Production Deployment"
echo "==========================================="
echo ""

# Check if logged into Vercel
echo "📋 Checking Vercel authentication..."
if ! vercel whoami &>/dev/null; then
    echo "❌ Not logged into Vercel"
    echo ""
    echo "Please run: vercel login"
    echo "Then run this script again: ./deploy-prod.sh"
    exit 1
fi

echo "✅ Authenticated with Vercel"
echo ""

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🌐 Your site is now live with dark mode support!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Check the production URL provided above"
    echo "2. Test dark mode by changing your system preferences"
    echo "3. Verify all functionality works correctly"
else
    echo "❌ Deployment failed"
    echo "Please check the error messages above"
    exit 1
fi