# Deployment Guide: MJ Fabrication to Hostinger

## Prerequisites

1. Hostinger VPS or Web Hosting account
2. PostgreSQL database access
3. Java 17+ installed on the server
4. Maven installed (or use the wrapper)

## Step 1: Database Setup on Hostinger

### Option A: Using Hostinger's PostgreSQL Service

1. Log into your Hostinger control panel
2. Navigate to "Databases" → "PostgreSQL"
3. Create a new database:
   - Database name: `mj_fabrication`
   - Username: `mjfab_user`
   - Password: `[generate-strong-password]`
4. Note down the connection details:
   - Host: `[your-db-host]`
   - Port: `5432` (default)
   - Database: `mj_fabrication`

### Option B: Using External PostgreSQL Service (recommended)

Consider using services like:

- ElephantSQL (free tier available)
- Railway
- Supabase
- AWS RDS

## Step 2: Environment Configuration

### Create .env File

1. Copy the environment template:

```bash
cp backend/.env.template backend/.env
```

2. Edit `backend/.env` with your actual values:

```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://your-actual-db-host:5432/mj_fabrication
DATABASE_USERNAME=your-actual-username
DATABASE_PASSWORD=your-actual-password

# Server Configuration
PORT=8080
SPRING_PROFILES_ACTIVE=prod

# Frontend Domain (for CORS)
FRONTEND_URL=https://your-actual-frontend-domain.com

# Security (optional)
JWT_SECRET=your-secure-jwt-secret-key

# Logging Level (optional)
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_MJFABRICATION=INFO
```

### Update CORS Configuration

The CORS configuration will automatically use the `FRONTEND_URL` from your .env file.

## Step 3: Build and Deploy

### Quick Deployment (Recommended)

Use the automated deployment script:

```bash
# Make sure you have created and configured backend/.env first
./deploy.sh
```

### Manual Build

Run in your project root:

```bash
cd backend
./mvnw clean package -DskipTests
```

This creates: `target/backend-1.0.0.jar`

## Step 4: Server Deployment

### Option A: VPS Deployment

1. Upload the JAR file to your VPS
2. Install Java 17:

```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

3. Run the application:

```bash
java -jar -Dspring.profiles.active=prod backend-1.0.0.jar
```

4. Setup as a service (optional but recommended):

```bash
sudo nano /etc/systemd/system/mjfabrication.service
```

Add:

```ini
[Unit]
Description=MJ Fabrication API
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/your/app
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod backend-1.0.0.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable mjfabrication
sudo systemctl start mjfabrication
```

### Option B: Shared Hosting (if Java is supported)

1. Upload JAR file via FTP/File Manager
2. Create a startup script if supported
3. Configure port forwarding if needed

## Step 5: Alternative Manual Environment Setup

If you prefer not to use .env files, you can set environment variables manually:

Set environment variables:

```bash
export DATABASE_URL=jdbc:postgresql://your-host:5432/mj_fabrication
export DATABASE_USERNAME=your-username
export DATABASE_PASSWORD=your-password
export PORT=8080
```

## Step 6: Frontend Deployment

1. Update frontend API endpoints to point to your server
2. Build frontend:

```bash
cd frontend
npm run build
```

3. Deploy frontend to Hostinger's static hosting or CDN

## Step 7: SSL Certificate

1. Use Hostinger's free SSL certificate
2. Ensure all communication is over HTTPS
3. Update CORS configuration to use HTTPS URLs

## Step 8: Monitoring and Logs

Check application logs:

```bash
# If running as service
sudo journalctl -u mjfabrication -f

# If running directly
java -jar -Dspring.profiles.active=prod backend-1.0.0.jar > app.log 2>&1 &
tail -f app.log
```

## Step 9: Database Migration

Run SQL scripts in order:

1. `sql/insert_india_states.sql`
2. `sql/V20250625__add_company_name_to_customers.sql`
3. `sql/V20250627__add_adjustment_and_notes_to_invoices.sql`
4. `sql/V20250627__add_product_id_to_inventory_item.sql`
5. `sql/V20250627__dummy_products.sql`

## Troubleshooting

### Common Issues:

1. **Port already in use**: Change port in application-prod.properties
2. **Database connection failed**: Check credentials and network access
3. **CORS errors**: Update CorsConfig.java with correct frontend URL
4. **Out of memory**: Increase JVM memory: `-Xmx512m`

### Health Check:

Test your API: `curl https://your-domain.com/api/v1/customers`

## Security Checklist:

- [ ] Database credentials are secure
- [ ] SSL certificate is installed
- [ ] CORS is configured correctly
- [ ] Sensitive data is not logged
- [ ] Regular database backups are configured
- [ ] Server is updated and secured

## Cost Optimization:

- Use Hostinger's basic VPS plan ($3.95/month)
- Consider external database services for better reliability
- Implement caching if needed
- Monitor resource usage
