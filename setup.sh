#!/bin/bash

# Quick Setup Script for MJ Fabrication (Railway + Hostinger)

echo "🔧 MJ Fabrication Setup (Railway + Hostinger)"
echo "=============================================="

# Function to check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js not found! Please install Node.js 18+"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm not found! Please install npm"
        exit 1
    fi
    
    # Check Java
    if ! command -v java &> /dev/null; then
        echo "❌ Java not found! Please install Java 17+"
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

# Function to setup backend environment
setup_backend() {
    echo "🔧 Setting up backend environment..."
    
    # Create .env if it doesn't exist
    if [ ! -f "backend/.env" ]; then
        if [ -f "backend/.env.template" ]; then
            echo "📋 Creating .env file from template..."
            cp backend/.env.template backend/.env
            echo "✅ Created backend/.env"
        else
            echo "❌ .env.template not found!"
            exit 1
        fi
    else
        echo "⚠️  backend/.env already exists"
    fi
}

# Function to setup frontend environment
setup_frontend() {
    echo "🎨 Setting up frontend environment..."
    
    cd frontend
    
    # Install dependencies
    echo "� Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend dependencies installed"
    else
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Function to provide setup instructions
show_instructions() {
    echo ""
    echo "🚀 Setup Complete! Next Steps:"
    echo "=============================="
    echo ""
    echo "1. 🔑 Configure Railway (Backend + Database):"
    echo "   - Create account at https://railway.app"
    echo "   - Create new project"
    echo "   - Add PostgreSQL database"
    echo "   - Deploy backend from GitHub repo"
    echo ""
    echo "2. 📝 Update Environment Variables:"
    echo "   - In Railway dashboard, set environment variables:"
    echo "     * DATABASE_URL (auto-populated)"
    echo "     * DATABASE_USERNAME (auto-populated)"
    echo "     * DATABASE_PASSWORD (auto-populated)"
    echo "     * JWT_SECRET=your-secure-secret-key"
    echo "     * FRONTEND_URL=https://yourdomain.com"
    echo "     * SPRING_PROFILES_ACTIVE=prod"
    echo ""
    echo "3. 🗄️  Run Database Migrations:"
    echo "   - Connect to Railway PostgreSQL"
    echo "   - Run SQL scripts in sql/ folder"
    echo ""
    echo "4. 🌐 Configure Hostinger (Frontend):"
    echo "   - Update frontend/.env.production with Railway backend URL"
    echo "   - Run: npm run build"
    echo "   - Upload dist/ contents to Hostinger public_html"
    echo ""
    echo "5. 🚀 Deploy:"
    echo "   - Run: ./deploy.sh"
    echo ""
    echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
}

# Main execution
check_prerequisites
setup_backend
setup_frontend
show_instructions
