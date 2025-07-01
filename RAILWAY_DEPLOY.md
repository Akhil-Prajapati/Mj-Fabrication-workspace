# Railway Deployment Guide for MJ Fabrication Backend

This backend is configured for easy deployment on Railway with PostgreSQL database.

## Quick Deploy to Railway

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository
2. **Connect to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Sign in with GitHub
   - Create new project
   - Select "Deploy from GitHub repo"
3. **Configure Service**:
   - Root directory: `backend`
   - Build command: `mvn clean package -DskipTests`
   - Start command: `java -jar target/backend-1.0.0.jar`

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
cd backend
railway link
railway up
```

## Database Setup

1. **Add PostgreSQL Service**:

   - In Railway project, click "New Service"
   - Select "Database" → "PostgreSQL"
   - Railway auto-configures connection variables

2. **Run Migrations**:
   - Connect to Railway PostgreSQL
   - Run SQL scripts from `sql/` folder in order

## Environment Variables

Set these in Railway dashboard under "Variables":

```bash
# Database (auto-populated by Railway)
DATABASE_URL=${DATABASE_URL}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}

# App Configuration
PORT=8080
SPRING_PROFILES_ACTIVE=prod

# Security
JWT_SECRET=your-secure-jwt-secret-32-characters-long

# CORS (update with your frontend domain)
FRONTEND_URL=https://yourdomain.com

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_MJFABRICATION=DEBUG
```

## Health Check

The application includes a health check endpoint:

- URL: `/api/v1/health`
- Method: GET
- Response: JSON with status, timestamp, service info

## Build Configuration

The `railway.json` file is included with optimal settings:

- Java 17 runtime
- Maven build
- Automatic health checks
- Restart policy configured

## Cost Estimation

**Railway Starter Plan**: $5/month includes:

- 512MB RAM, 1GB storage
- PostgreSQL database
- 100GB bandwidth
- Custom domains
- Automatic SSL

## Support

For deployment issues:

- Check Railway logs in dashboard
- Verify environment variables
- Test health endpoint: `https://yourapp.railway.app/api/v1/health`
- See main [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for complete setup
