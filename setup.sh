#!/bin/bash

# Quick Setup Script for MJ Fabrication Deployment

echo "🔧 MJ Fabrication Quick Setup"
echo "=============================="

# Check if .env.template exists
if [ ! -f "backend/.env.template" ]; then
    echo "❌ .env.template not found!"
    exit 1
fi

# Create .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📋 Creating .env file from template..."
    cp backend/.env.template backend/.env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists"
fi

echo ""
echo "🚀 Next Steps:"
echo "1. Edit backend/.env with your actual database credentials"
echo "2. Run: ./deploy.sh"
echo ""
echo "📝 Required .env values to update:"
echo "   - DATABASE_URL"
echo "   - DATABASE_USERNAME" 
echo "   - DATABASE_PASSWORD"
echo "   - FRONTEND_URL"
echo ""
echo "💡 Example .env values:"
echo "   DATABASE_URL=jdbc:postgresql://your-db-host:5432/mj_fabrication"
echo "   DATABASE_USERNAME=your-username"
echo "   DATABASE_PASSWORD=your-password"
echo "   FRONTEND_URL=https://your-frontend.com"
