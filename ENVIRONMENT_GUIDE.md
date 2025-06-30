# Environment Configuration Guide

## Frontend Environment Variables

### Development (.env)

```bash
# Development API URL - Backend running on port 4000
VITE_API_URL=http://localhost:4000/api/v1

# Development frontend port (Vite default is 5173)
VITE_PORT=5173

# Development mode
VITE_NODE_ENV=development
```

### Production (.env.production)

```bash
# Production API URL - Replace with your actual Hostinger domain
VITE_API_URL=https://your-domain.com/api/v1

# Production mode
VITE_NODE_ENV=production
```

## Backend Environment Variables

### For Development

Backend will use default values in `application-dev.properties`

### For Production (backend/.env)

Create `backend/.env` file:

```bash
# Database Configuration - Replace with your Hostinger database details
DATABASE_URL=jdbc:postgresql://your-db-host.hostinger.com:5432/mj_fabrication
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-secure-password

# Server Configuration
PORT=8080
SPRING_PROFILES_ACTIVE=prod

# Frontend Domain (for CORS) - Replace with your actual frontend URL
FRONTEND_URL=https://your-frontend-domain.com
```

## Port Configuration Summary

### Development:

- **Backend**: Port 4000 (configured in `application-dev.properties`)
- **Frontend**: Port 5173 (Vite default, configurable via `VITE_PORT`)

### Production:

- **Backend**: Port 8080 (configurable via `PORT` environment variable)
- **Frontend**: Built static files (no specific port, served by web server)

## Quick Setup Commands

### For Development:

```bash
# Backend
cd backend
./mvnw spring-boot:run

# Frontend (in new terminal)
cd frontend
npm run dev
```

### For Production Build:

```bash
# Build Frontend
cd frontend
npm run build:prod

# Build Backend
cd backend
./mvnw clean package -DskipTests
```

### For Production Deployment:

```bash
# Make sure backend/.env is configured first
./deploy.sh
```

## Important Notes:

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use `.env.template` files** as reference for required variables
3. **Frontend URLs** must match exactly in CORS configuration
4. **Database credentials** should be secure and not shared
5. **Use HTTPS** in production for all URLs

## Hostinger-Specific Configuration:

1. **Database**: Use Hostinger's PostgreSQL service or external service like Supabase
2. **Domain**: Update `FRONTEND_URL` with your actual Hostinger domain
3. **SSL**: Ensure SSL certificate is enabled in Hostinger panel
4. **Port**: Most shared hosting uses port 80/443, VPS can use custom ports
