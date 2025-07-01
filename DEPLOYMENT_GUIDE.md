# Deployment Guide: MJ Fabrication (Hostinger + Railway)

## Architecture Overview

- **Frontend**: Deployed on Hostinger (Static hosting)
- **Backend + Database**: Deployed on Railway (Backend service + PostgreSQL)

This architecture provides cost-effective, scalable deployment with Railway handling the backend infrastructure and Hostinger providing reliable frontend hosting.

## Prerequisites

1. **Hostinger Web Hosting** account (for frontend)
2. **Railway** account (for backend and database)
3. **Git repository** (GitHub recommended)
4. **Domain name** (optional, can use Railway's provided domain)

## Step 1: Railway Setup (Backend + Database)

### 1.1 Create Railway Account

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub account
3. Create a new project

### 1.2 Deploy PostgreSQL Database

1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a PostgreSQL instance
4. Note the connection details from the "Variables" tab:
   - `DATABASE_URL` (complete connection string)
   - `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

> **Note:** Railway provides these environment variables for your PostgreSQL service:
>
> - `DATABASE_URL` (full connection string)
> - `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`
> - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
> - `DATABASE_PUBLIC_URL` (for public access, if enabled)
>
> **Example Railway Variables (customized):**
>
> DATABASE_URL=postgresql://mj_ninja:Ninja@24199@postgres.railway.internal:5432/mj_fabrication
> PGHOST=postgres.railway.internal
> PGPORT=5432
> PGDATABASE=mj_fabrication
> PGUSER=mj_ninja
> PGPASSWORD=Ninja@24199
> POSTGRES_USER=mj_ninja
> POSTGRES_PASSWORD=Ninja@24199
> POSTGRES_DB=mj_fabrication
> DATABASE_PUBLIC_URL=postgresql://mj_ninja:Ninja@24199@<RAILWAY_TCP_PROXY_DOMAIN>:<RAILWAY_TCP_PROXY_PORT>/mj_fabrication
>
> Use `DATABASE_URL` for your backend connection string. The other variables are available for advanced configuration or manual connections.

### 1.3 Run Database Migrations

1. Connect to your Railway PostgreSQL using the provided credentials
2. Run the SQL scripts in order:
   - `sql/insert_india_states.sql`
   - `sql/V20250625__add_company_name_to_customers.sql`
   - `sql/V20250627__add_adjustment_and_notes_to_invoices.sql`
   - `sql/V20250627__add_product_id_to_inventory_item.sql`
   - `sql/V20250627__dummy_products.sql`

You can use Railway's built-in database console or any PostgreSQL client.

### 1.4 Deploy Backend to Railway

#### Option A: Direct Git Deployment (Recommended)

1. In your Railway project, click "New Service"
2. Select "GitHub Repo"
3. Connect your repository
4. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/backend-1.0.0.jar`

#### Option B: Railway CLI Deployment

1. Install Railway CLI:

   ```bash
   npm install -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   cd backend
   railway link
   railway up
   ```

### 1.5 Configure Environment Variables on Railway

In your Railway backend service, go to "Variables" and add:

```bash
# Database (auto-populated from Railway PostgreSQL)
DATABASE_URL=${DATABASE_URL}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}

# Server Configuration
PORT=8080
SPRING_PROFILES_ACTIVE=prod

# Security
JWT_SECRET=your-secure-jwt-secret-key-at-least-32-characters-long

# CORS (update with your actual frontend domain)
FRONTEND_URL=https://yoursite.hostinger.com

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_MJFABRICATION=DEBUG
```

### 1.6 Test Backend Deployment

1. Railway will provide a domain like `yourapp.railway.app`
2. Test the API: `https://yourapp.railway.app/api/v1/customers`
3. Check logs in Railway dashboard for any issues

## Step 2: Frontend Deployment on Hostinger

### 2.1 Build Frontend for Production

1. Update the frontend environment file:

```bash
# frontend/.env.production
VITE_API_URL=https://yourapp.railway.app/api/v1
```

2. Build the frontend:

```bash
cd frontend
npm install
npm run build
```

This creates a `dist` folder with static files.

### 2.2 Deploy to Hostinger

#### Option A: File Manager Upload

1. Log into Hostinger control panel
2. Go to "File Manager"
3. Navigate to `public_html` (or your domain's folder)
4. Upload all contents from the `frontend/dist` folder
5. Ensure `index.html` is in the root directory

#### Option B: FTP Upload

1. Use FTP client (FileZilla, WinSCP, etc.)
2. Connect using Hostinger FTP credentials
3. Upload `frontend/dist` contents to `public_html`

### 2.3 Configure Hostinger for SPA

Since this is a React SPA, create a `.htaccess` file in `public_html`:

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## Step 3: Domain and SSL Configuration

### 3.1 Domain Setup

If using a custom domain:

1. **Hostinger**: Point your domain to Hostinger's nameservers
2. **Railway**: Add your backend domain in Railway settings (optional)

### 3.2 SSL Certificates

1. **Hostinger**: Enable free SSL certificate in control panel
2. **Railway**: SSL is automatically provided for railway.app domains

### 3.3 Update CORS Configuration

Update the `FRONTEND_URL` environment variable in Railway to match your actual domain:

```bash
FRONTEND_URL=https://yourdomain.com
```

## Step 4: Environment-Specific Configuration

### Development Environment

```bash
# backend/.env
DATABASE_URL=jdbc:postgresql://localhost:5432/mj_fabrication
DATABASE_USERNAME=mjfab_user
DATABASE_PASSWORD=your-local-password
SPRING_PROFILES_ACTIVE=dev
FRONTEND_URL=http://localhost:5173
JWT_SECRET=dev-secret-key-at-least-32-characters-long
```

### Production Environment (Railway)

Environment variables are set directly in Railway dashboard.

## Step 5: Monitoring and Maintenance

### 5.1 Railway Monitoring

- Use Railway's built-in monitoring dashboard
- Check logs for errors and performance issues
- Monitor database usage and connections

### 5.2 Hostinger Monitoring

- Monitor website uptime through Hostinger control panel
- Check website speed and performance
- Monitor bandwidth usage

### 5.3 Health Checks

Create monitoring endpoints:

```bash
# Test backend health
curl https://yourapp.railway.app/api/v1/customers

# Test frontend
curl https://yourdomain.com
```

## Step 6: Backup Strategy

### 6.1 Database Backups

Railway provides automatic backups, but you can also:

1. Create manual backups using Railway dashboard
2. Set up scheduled backups to external storage
3. Export important data regularly

### 6.2 Code Backups

- Keep Git repository updated
- Tag releases for easy rollbacks
- Maintain environment configuration documentation

## Step 7: Security Checklist

- [ ] **Database**: Secure credentials, connection encryption
- [ ] **Backend**: HTTPS only, secure JWT secret, CORS configured
- [ ] **Frontend**: HTTPS only, secure headers in .htaccess
- [ ] **Environment**: Production secrets separate from development
- [ ] **Monitoring**: Error tracking and performance monitoring set up

## Step 8: Cost Optimization

### Railway Costs

- **Starter Plan**: $5/month (suitable for small applications)
- **PostgreSQL**: Included in Starter plan
- **Bandwidth**: 100GB included

### Hostinger Costs

- **Single Shared Hosting**: $2.99/month
- **Premium Shared Hosting**: $4.99/month (recommended)
- **SSL Certificate**: Free

**Total Monthly Cost**: ~$8-10/month for a production-ready setup

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Check `FRONTEND_URL` environment variable in Railway
   - Ensure frontend domain matches exactly (no trailing slash)

2. **Database Connection Issues**

   - Verify `DATABASE_URL` format in Railway
   - Check database service status in Railway dashboard

3. **Frontend Build Issues**

   - Ensure `VITE_API_URL` points to Railway backend
   - Clear build cache: `rm -rf dist node_modules && npm install`

4. **Railway Deployment Issues**
   - Check build logs in Railway dashboard
   - Verify Java version and Maven configuration
   - Ensure `PORT` environment variable is set

### Support Resources

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Hostinger**: 24/7 support chat
- **Project Issues**: Check application logs in Railway dashboard

## Quick Deployment Commands

```bash
# Complete deployment from scratch
./setup.sh

# Deploy backend changes
cd backend && railway up

# Deploy frontend changes
cd frontend && npm run build
# Then upload dist/ contents to Hostinger

# Check deployment status
railway status
```

This architecture provides a robust, scalable solution with clear separation between frontend and backend, professional hosting, and cost-effective scaling options.
