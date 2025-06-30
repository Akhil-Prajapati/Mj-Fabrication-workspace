#!/bin/bash

# MJ Fabrication Deployment Script for Hostinger

echo "🚀 Starting MJ Fabrication deployment..."

# Check if .env file exists
if [ -f "backend/.env" ]; then
    echo "📋 Loading environment variables from .env file..."
    export $(cat backend/.env | grep -v '#' | awk '/=/ {print $1}')
else
    echo "⚠️  No .env file found. Please create backend/.env from backend/.env.template"
    echo "📝 Copy template: cp backend/.env.template backend/.env"
    echo "✏️  Then edit backend/.env with your actual values"
    exit 1
fi

# Validate required environment variables
if [ -z "$DATABASE_URL" ] || [ -z "$DATABASE_USERNAME" ] || [ -z "$DATABASE_PASSWORD" ]; then
    echo "❌ Missing required environment variables!"
    echo "   Please set DATABASE_URL, DATABASE_USERNAME, and DATABASE_PASSWORD"
    exit 1
fi

echo "✅ Environment variables loaded"
echo "🔗 Database: $DATABASE_URL"
echo "👤 Username: $DATABASE_USERNAME"
echo "🌐 Frontend URL: ${FRONTEND_URL:-http://localhost:3000}"
echo "🚪 Port: ${PORT:-8080}"

# Build the application
echo "📦 Building application..."
cd backend
./mvnw clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Stop existing application (if running)
echo "🛑 Stopping existing application..."
pkill -f "backend-1.0.0.jar" || true

# Start the application
echo "🎯 Starting application in production mode..."
nohup java -jar -Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-prod} target/backend-1.0.0.jar > ../app.log 2>&1 &

echo "📝 Application started! PID: $!"
echo "📊 Check logs with: tail -f app.log"
echo "🌐 API should be available at: http://localhost:${PORT:-8080}/api/v1/customers"
echo "✨ Deployment complete!"
