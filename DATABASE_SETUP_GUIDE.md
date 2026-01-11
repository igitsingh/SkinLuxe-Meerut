# 🗄️ SKINLUXE DATABASE SETUP - STEP BY STEP

## Quick Setup Guide (15-20 minutes)

---

## 📋 **OPTION 1: SUPABASE (RECOMMENDED - FREE)**

### **Step 1: Create Supabase Account**
1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Verify your email

### **Step 2: Create New Project**
1. Click "New Project"
2. Fill in details:
   - **Name:** SkinLuxe-Meerut
   - **Database Password:** (Create a strong password - SAVE THIS!)
   - **Region:** Choose closest to India (e.g., Mumbai or Singapore)
   - **Pricing Plan:** Free
3. Click "Create new project"
4. Wait 2-3 minutes for setup

### **Step 3: Get Connection String**
1. In your project, click "Settings" (gear icon)
2. Click "Database" in sidebar
3. Scroll to "Connection string"
4. Copy the "URI" connection string
5. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`
6. Replace `[YOUR-PASSWORD]` with your actual password

### **Step 4: Run Database Schema**
1. In Supabase, click "SQL Editor" in sidebar
2. Click "New query"
3. Copy the entire contents of `database/schema.sql` from your project
4. Paste into the SQL editor
5. Click "Run" (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned"

### **Step 5: Verify Tables Created**
1. Click "Table Editor" in sidebar
2. You should see all tables:
   - patients
   - treatments
   - appointments
   - treatment_records
   - prescriptions
   - payments
   - notifications
   - admin_users
   - settings

---

## 📋 **OPTION 2: NEON (ALTERNATIVE - FREE)**

### **Step 1: Create Neon Account**
1. Go to: https://neon.tech
2. Click "Sign up"
3. Sign up with GitHub or email

### **Step 2: Create New Project**
1. Click "Create a project"
2. Fill in:
   - **Name:** skinluxe-meerut
   - **Region:** Choose closest to India
   - **Postgres version:** 16 (latest)
3. Click "Create project"

### **Step 3: Get Connection String**
1. After creation, you'll see connection details
2. Copy the "Connection string"
3. It looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb`

### **Step 4: Run Database Schema**
1. Click "SQL Editor" tab
2. Paste contents of `database/schema.sql`
3. Click "Run"

---

## 📋 **OPTION 3: LOCAL POSTGRESQL (FOR DEVELOPMENT)**

### **Step 1: Install PostgreSQL**

**On Mac (using Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**On Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the password you set

### **Step 2: Create Database**
```bash
# Open terminal
psql postgres

# In psql prompt:
CREATE DATABASE skinluxe;
\c skinluxe
```

### **Step 3: Run Schema**
```bash
# Exit psql (type \q)
# Then run:
psql skinluxe < database/schema.sql
```

### **Step 4: Get Connection String**
```
postgresql://postgres:YOUR_PASSWORD@localhost:5432/skinluxe
```

---

## 🔧 **CONFIGURE YOUR PROJECT**

### **Step 1: Install Prisma (Database ORM)**
```bash
cd /Users/isachinsingh/.gemini/antigravity/scratch/SkinLuxe-Meerut/apps/web
npm install @prisma/client prisma
```

### **Step 2: Create .env File**
```bash
# In apps/web directory
touch .env
```

### **Step 3: Add Database URL to .env**
Open `.env` and add:
```env
# Database
DATABASE_URL="YOUR_CONNECTION_STRING_HERE"
DIRECT_URL="YOUR_CONNECTION_STRING_HERE"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-generate-random-string"
NEXTAUTH_URL="http://localhost:3001"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3001"
NEXT_PUBLIC_SITE_NAME="SkinLuxe Aesthetics & Academy"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### **Step 4: Create Prisma Schema**
Create file: `apps/web/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Patient {
  id            String   @id @default(uuid())
  email         String   @unique
  password_hash String
  full_name     String
  phone         String
  date_of_birth DateTime?
  gender        String?
  address       String?
  medical_history String?
  allergies     String?
  emergency_contact String?
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  appointments  Appointment[]
  records       TreatmentRecord[]
  
  @@map("patients")
}

model Treatment {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  category    String
  description String
  benefits    String[]
  duration    Int
  price       Decimal
  discount_price Decimal?
  image_url   String?
  is_active   Boolean  @default(true)
  is_featured Boolean  @default(false)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
  
  appointments Appointment[]
  
  @@map("treatments")
}

model Appointment {
  id              String   @id @default(uuid())
  patient_id      String
  treatment_id    String
  appointment_date DateTime
  appointment_time String
  status          String   @default("pending")
  duration        Int
  patient_notes   String?
  admin_notes     String?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  
  patient         Patient  @relation(fields: [patient_id], references: [id])
  treatment       Treatment @relation(fields: [treatment_id], references: [id])
  
  @@map("appointments")
}

model TreatmentRecord {
  id              String   @id @default(uuid())
  patient_id      String
  treatment_name  String
  treatment_date  DateTime
  performed_by    String
  notes           String?
  before_photos   String[]
  after_photos    String[]
  created_at      DateTime @default(now())
  
  patient         Patient  @relation(fields: [patient_id], references: [id])
  
  @@map("treatment_records")
}

model AdminUser {
  id            String   @id @default(uuid())
  email         String   @unique
  password_hash String
  full_name     String
  role          String   @default("admin")
  is_active     Boolean  @default(true)
  created_at    DateTime @default(now())
  
  @@map("admin_users")
}

model Settings {
  id         String   @id @default(uuid())
  key        String   @unique
  value      String
  updated_at DateTime @updatedAt
  
  @@map("settings")
}
```

### **Step 5: Generate Prisma Client**
```bash
npx prisma generate
npx prisma db push
```

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify:

- [ ] Database created successfully
- [ ] All tables visible in database
- [ ] Connection string added to .env
- [ ] Prisma installed
- [ ] Prisma schema created
- [ ] Prisma client generated
- [ ] No connection errors

---

## 🧪 **TEST DATABASE CONNECTION**

Create test file: `apps/web/test-db.js`

```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Try to query settings table
    const settings = await prisma.settings.findMany();
    console.log('✅ Database connected successfully!');
    console.log('Settings count:', settings.length);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
```

Run test:
```bash
node test-db.js
```

---

## 🎯 **NEXT STEPS AFTER DATABASE SETUP**

Once database is set up:

1. ✅ Database connected
2. Create API routes for CRUD operations
3. Connect admin pages to API
4. Connect patient portal to API
5. Implement authentication
6. Test end-to-end flow

---

## 🆘 **TROUBLESHOOTING**

### **Connection Error:**
- Check connection string is correct
- Verify password has no special characters (or is URL-encoded)
- Check database is running
- Verify firewall/network allows connection

### **Schema Error:**
- Make sure you copied entire schema.sql
- Check for syntax errors
- Verify PostgreSQL version compatibility

### **Prisma Error:**
- Run `npx prisma generate` again
- Delete `node_modules/.prisma` and regenerate
- Check .env file is in correct location

---

## 📞 **READY TO PROCEED?**

Once you've completed these steps, we can:
1. Create API routes
2. Connect admin panel
3. Enable real-time updates
4. Deploy to production

---

**Choose your database option and follow the steps above!**

**I recommend Supabase for easiest setup with free tier.**
