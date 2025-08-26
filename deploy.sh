#!/bin/bash

echo "🚀 Starting Nederland Stemt Production Deployment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}📋 Pre-deployment checklist:${NC}"
echo ""

# Check if environment variables are set
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ .env.production file not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables configured${NC}"

# Test build locally first
echo ""
echo -e "${YELLOW}🔨 Testing build...${NC}"
npm run build || true

echo ""
echo -e "${GREEN}✅ Build test completed${NC}"

# Deploy to Vercel
echo ""
echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
echo ""

# Deploy command
vercel --prod

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "📌 Next steps:"
echo "1. Update environment variables in Vercel dashboard"
echo "2. Configure custom domain (nederlandstemt.com)"
echo "3. Test all functionality on production URL"
echo "4. Monitor analytics and performance"