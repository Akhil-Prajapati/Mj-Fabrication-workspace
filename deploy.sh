#!/bin/bash

# MJ Fabrication Deployment Script (Railway + Hostinger)

echo "🚀 Starting MJ Fabrication deployment..."

# Function to check if Railway CLI is installed
check_railway_cli() {
    if ! command -v railway &> /dev/null; then
        echo "⚠️  Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
}

# Function to deploy backend to Railway
deploy_backend() {
    echo "📦 Building and deploying backend to Railway..."
    cd backend
    
    # Build the application
    echo "� Building application..."
    ./mvnw clean package -DskipTests
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
    else
        echo "❌ Build failed!"
        exit 1
    fi
    
    # Deploy to Railway
    echo "🚂 Deploying to Railway..."
    railway up
    
    if [ $? -eq 0 ]; then
        echo "✅ Railway deployment successful!"
        echo "🌐 Backend deployed! Check Railway dashboard for URL"
    else
        echo "❌ Railway deployment failed!"
        exit 1
    fi
    
    cd ..
}

# Function to build frontend
build_frontend() {
    echo "🎨 Building frontend for production..."
    cd frontend
    
    # Install dependencies
    echo "� Installing dependencies..."
    npm install
    
    # Build for production
    echo "🏗️  Building frontend..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend build successful!"
        echo "📁 Built files are in frontend/dist/"
        echo "📤 Upload the contents of frontend/dist/ to your Hostinger public_html folder"
    else
        echo "❌ Frontend build failed!"
        exit 1
    fi
    
    cd ..
}

# Main deployment logic
echo "🎯 Choose deployment option:"
echo "1) Deploy backend to Railway"
echo "2) Build frontend for Hostinger"
echo "3) Deploy both (backend + frontend)"
echo "4) Local development build"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        check_railway_cli
        deploy_backend
        ;;
    2)
        build_frontend
        ;;
    3)
        check_railway_cli
        deploy_backend
        build_frontend
        echo ""
        echo "🎉 Deployment complete!"
        echo "📋 Next steps:"
        echo "   1. Check Railway dashboard for backend URL"
        echo "   2. Upload frontend/dist/ contents to Hostinger"
        echo "   3. Update environment variables if needed"
        ;;
    4)
        echo "🔧 Building for local development..."
        cd backend
        ./mvnw clean package -DskipTests
        echo "✅ Backend build complete!"
        echo "🎯 Start with: java -jar target/backend-1.0.0.jar"
        cd ..
        ;;
    *)
        echo "❌ Invalid choice!"
        exit 1
        ;;
esac

echo "✨ Script complete!"
