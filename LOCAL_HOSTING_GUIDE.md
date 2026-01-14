# 🚀 SkinLuxe-Meerut - Local Hosting Guide

## Complete Local Development Setup

This guide will help you host the **complete SkinLuxe system** locally on your Mac, including:
- ✅ **Customer Website** (Port 3001)
- ✅ **Admin Panel** (Port 3002)
- ✅ **Backend API** (Port 5000)
- ✅ **PostgreSQL Database** (Port 5432)

---

## 🎯 Quick Start (One Command)

```bash
./START_ALL_SERVICES.sh
```

This single script will:
1. ✅ Verify PostgreSQL is running
2. ✅ Install all dependencies (if needed)
3. ✅ Setup database schema
4. ✅ Start Backend API (Port 5000)
5. ✅ Start Customer Website (Port 3001)
6. ✅ Start Admin Panel (Port 3002)

---

## 📊 Service URLs

Once started, access your services at:

| Service | URL | Description |
|---------|-----|-------------|
| **Customer Website** | http://localhost:3001 | Public-facing SkinLuxe website |
| **Admin Panel** | http://localhost:3002 | Content management system |
| **Admin Login** | http://localhost:3002/login | Admin authentication |
| **Backend API** | http://localhost:5000 | REST API server |
| **API Health** | http://localhost:5000/health | API health check |
| **Database** | localhost:5432 | PostgreSQL database |

---

## 🔐 Default Credentials

### Admin Panel Login
- **Email:** `admin@skinluxe.com`
- **Password:** `admin123`

### Database Connection
- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `the_pizza_box`
- **User:** `isachinsingh`

---

## 📋 Manual Setup (Step by Step)

If you prefer to start services individually:

### 1. Start PostgreSQL
```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it
brew services start postgresql@14
```

### 2. Setup Database
```bash
cd apps/api

# Generate Prisma Client
npx prisma generate

# Create/update database schema
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

### 3. Start Backend API
```bash
cd apps/api
npm install  # First time only
npm run dev  # Starts on port 5000
```

### 4. Start Customer Website
```bash
cd apps/web
npm install  # First time only
npm run dev  # Starts on port 3001
```

### 5. Start Admin Panel
```bash
cd apps/admin
npm install  # First time only
npm run dev  # Starts on port 3002
```

---

## 🛑 Stop All Services

```bash
./STOP_ALL_SERVICES.sh
```

Or manually:
```bash
# Kill processes on specific ports
lsof -ti:5000 | xargs kill -9  # API
lsof -ti:3001 | xargs kill -9  # Web
lsof -ti:3002 | xargs kill -9  # Admin
```

---

## 📝 View Logs

### Combined Logs (All Services)
```bash
tail -f /tmp/skinluxe-*.log
```

### Individual Service Logs
```bash
# API logs
tail -f /tmp/skinluxe-api.log

# Customer Website logs
tail -f /tmp/skinluxe-web.log

# Admin Panel logs
tail -f /tmp/skinluxe-admin.log
```

---

## 🔧 Environment Configuration

### API Environment (.env)
Location: `apps/api/.env`

```env
DATABASE_URL="postgresql://isachinsingh@localhost:5432/the_pizza_box?schema=public"
JWT_SECRET="supersecretkey"
PORT=5000
```

### Web Environment (.env)
Location: `apps/web/.env`

```env
DATABASE_URL="postgresql://isachinsingh@localhost:5432/the_pizza_box?schema=public"
DIRECT_URL="postgresql://isachinsingh@localhost:5432/the_pizza_box?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### Admin Environment (.env)
Location: `apps/admin/.env`

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

---

## 🗄️ Database Management

### View Database Tables
```bash
psql -U isachinsingh -d the_pizza_box -c "\dt"
```

### Access Database Shell
```bash
psql -U isachinsingh -d the_pizza_box
```

### Prisma Studio (Visual Database Editor)
```bash
cd apps/api
npx prisma studio
# Opens at http://localhost:5555
```

### Reset Database
```bash
cd apps/api
npx prisma db push --force-reset
```

---

## 🏗️ Project Structure

```
SkinLuxe-Meerut/
├── apps/
│   ├── api/              # Backend API (Express + Prisma)
│   │   ├── src/          # Source code
│   │   ├── prisma/       # Database schema & migrations
│   │   └── package.json  # Port 5000
│   │
│   ├── web/              # Customer Website (Next.js)
│   │   ├── src/          # Source code
│   │   ├── public/       # Static assets
│   │   └── package.json  # Port 3001
│   │
│   └── admin/            # Admin Panel (Next.js)
│       ├── app/          # App router pages
│       ├── components/   # React components
│       └── package.json  # Port 3002
│
├── START_ALL_SERVICES.sh # 🚀 Start everything
├── STOP_ALL_SERVICES.sh  # 🛑 Stop everything
└── LOCAL_HOSTING_GUIDE.md # 📖 This file
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port
lsof -ti:3001 | xargs kill -9

# Or use the stop script
./STOP_ALL_SERVICES.sh
```

### PostgreSQL Not Running
```bash
# Start PostgreSQL
brew services start postgresql@14

# Check status
brew services list | grep postgresql
```

### Database Connection Error
```bash
# Verify PostgreSQL is accepting connections
pg_isready

# Check if database exists
psql -U isachinsingh -l | grep the_pizza_box

# Create database if missing
createdb -U isachinsingh the_pizza_box
```

### Dependencies Not Installed
```bash
# Install all dependencies
cd apps/api && npm install && cd ../..
cd apps/web && npm install && cd ../..
cd apps/admin && npm install && cd ../..
```

### Prisma Client Not Generated
```bash
cd apps/api
npx prisma generate
cd ../..
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf apps/web/.next
rm -rf apps/admin/.next

# Clear node_modules and reinstall
rm -rf apps/*/node_modules
./START_ALL_SERVICES.sh
```

---

## 🎯 Common Tasks

### Create Admin User
```bash
cd apps/api
npx prisma studio
# Navigate to User table and create new user with role: ADMIN
```

### Add Sample Data
```bash
cd apps/api
npx prisma db seed
```

### View API Routes
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/treatments
curl http://localhost:5000/api/appointments
```

### Test Admin Panel
1. Open http://localhost:3002/login
2. Login with admin credentials
3. Navigate to Dashboard
4. Manage treatments, appointments, blog posts, etc.

### Test Customer Website
1. Open http://localhost:3001
2. Browse treatments
3. Book an appointment
4. Submit contact form
5. Read blog posts

---

## 📱 Mobile Testing

### Test on iPhone/iPad (Same Network)
1. Find your Mac's IP address:
   ```bash
   ipconfig getifaddr en0
   ```
2. Access from mobile device:
   - Customer: `http://YOUR_IP:3001`
   - Admin: `http://YOUR_IP:3002`

---

## 🚀 Performance Tips

### Speed Up Development
```bash
# Use turbo mode for faster builds
npm install -g turbo

# Run all services with turbo
turbo run dev
```

### Reduce Memory Usage
```bash
# Limit Next.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

---

## 📚 Additional Resources

- **Main README:** [README.md](./README.md)
- **Quick Start:** [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)
- **Database Guide:** [DATABASE_SETUP_GUIDE.md](./DATABASE_SETUP_GUIDE.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **API Documentation:** [apps/api/README.md](./apps/api/README.md)

---

## ✅ Checklist

Before starting development, ensure:

- [ ] PostgreSQL is installed and running
- [ ] Node.js 18+ is installed
- [ ] All environment files (.env) are configured
- [ ] Dependencies are installed
- [ ] Database schema is up to date
- [ ] All services start without errors

---

## 🎉 Success!

If everything is working, you should see:

✅ Customer Website at http://localhost:3001  
✅ Admin Panel at http://localhost:3002  
✅ Backend API at http://localhost:5000  
✅ Database accessible at localhost:5432

**Happy coding! 🚀**

---

*Last Updated: January 13, 2026*  
*SkinLuxe Aesthetics & Academy - Meerut*
