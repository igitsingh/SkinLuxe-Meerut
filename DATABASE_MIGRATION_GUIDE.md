# ZEVARAZ CMS - Database Migration Guide

## 🎯 Overview
This guide will help you migrate from the old Pizza Box schema to the new ZEVARAZ CMS schema.

## ⚠️ IMPORTANT: Backup First!

Before proceeding, **BACKUP YOUR DATABASE**:

```bash
# For PostgreSQL
pg_dump -U your_username -d your_database > backup_$(date +%Y%m%d).sql

# Or use your hosting provider's backup tool
```

## 📋 Migration Steps

### Step 1: Review New Schema

The new CMS schema is located at:
```
apps/api/prisma/schema-cms.prisma
```

Key changes:
- ✅ New User model with CMS roles
- ✅ Page & Section models for content
- ✅ Media library model
- ✅ Collection & Product models for jewellery
- ✅ SEO, Navigation, Settings models
- ✅ Blog, Testimonials, Inquiries

### Step 2: Replace Schema

**Option A: Fresh Database (Recommended for Development)**

```bash
cd apps/api

# 1. Backup old schema
cp prisma/schema.prisma prisma/schema-old-backup.prisma

# 2. Replace with new CMS schema
cp prisma/schema-cms.prisma prisma/schema.prisma

# 3. Reset database (⚠️ DELETES ALL DATA)
npx prisma migrate reset --force

# 4. Generate Prisma client
npx prisma generate

# 5. Push schema to database
npx prisma db push
```

**Option B: Gradual Migration (For Production)**

```bash
cd apps/api

# 1. Create migration
npx prisma migrate dev --name add_cms_models

# 2. Review migration file in prisma/migrations/
# 3. Apply migration
npx prisma migrate deploy

# 4. Generate client
npx prisma generate
```

### Step 3: Seed Initial Data

Create seed file: `apps/api/prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@zevaraz.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create default settings
  const settings = await prisma.settings.create({
    data: {
      siteName: 'ZEVARAZ',
      siteTagline: 'Timeless Luxury Handcrafted Heritage',
      contactEmail: 'contact@zevaraz.com',
      contactPhone: '+91 1234567890',
      primaryColor: '#D4AF37',
      secondaryColor: '#1A1A1A',
      accentColor: '#E8D5C4',
    },
  });

  console.log('✅ Created default settings');

  // Create homepage
  const homepage = await prisma.page.create({
    data: {
      title: 'Home',
      slug: '/',
      status: 'PUBLISHED',
      isHomePage: true,
      seo: {
        create: {
          metaTitle: 'ZEVARAZ | Luxury Jewellery from Jaipur',
          metaDescription: 'Discover exquisite handcrafted jewellery',
          keywords: ['jewellery', 'jaipur', 'luxury', 'kundan', 'polki'],
        },
      },
    },
  });

  console.log('✅ Created homepage');

  // Create collections
  const bridalCollection = await prisma.collection.create({
    data: {
      name: 'Bridal Collection',
      slug: 'bridal',
      description: 'Exquisite bridal jewellery for your special day',
      status: 'PUBLISHED',
      isFeatured: true,
      featuredImage: '/hero-bridal.jpg',
    },
  });

  const fineCollection = await prisma.collection.create({
    data: {
      name: 'Fine Jewellery',
      slug: 'fine-jewellery',
      description: 'Contemporary fine jewellery pieces',
      status: 'PUBLISHED',
      isFeatured: true,
      featuredImage: '/hero-fine.jpg',
    },
  });

  console.log('✅ Created collections');

  // Create navigation
  const headerNav = await prisma.navigation.create({
    data: {
      name: 'header',
      items: {
        create: [
          { label: 'Home', url: '/', order: 0 },
          { label: 'Collections', url: '/collections', order: 1 },
          { label: 'Bridal', url: '/bridal', order: 2 },
          { label: 'Fine Jewellery', url: '/fine-jewellery', order: 3 },
          { label: 'Heritage', url: '/heritage', order: 4 },
          { label: 'About', url: '/about', order: 5 },
          { label: 'Contact', url: '/contact', order: 6 },
        ],
      },
    },
  });

  console.log('✅ Created navigation');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run seed:
```bash
cd apps/api
npx prisma db seed
```

### Step 4: Update package.json

Add to `apps/api/package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

### Step 5: Environment Variables

Update `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/zevaraz_cms"

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# Upload (Optional)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-app-id"

# API
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

### Step 6: Install Dependencies

```bash
cd apps/api
npm install @prisma/client bcryptjs
npm install -D prisma ts-node @types/bcryptjs

cd ../web
npm install @prisma/client
```

### Step 7: Test Connection

Create test file: `apps/api/test-db.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log('✅ Database connected!');
    console.log('Users:', users);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
```

Run test:
```bash
cd apps/api
npx ts-node test-db.ts
```

## 🔧 Troubleshooting

### Issue: "Can't reach database server"
**Solution**: Check DATABASE_URL and ensure PostgreSQL is running

### Issue: "Migration failed"
**Solution**: Drop database and recreate:
```bash
npx prisma migrate reset
```

### Issue: "Prisma Client not generated"
**Solution**: Run:
```bash
npx prisma generate
```

### Issue: "Seed script not found"
**Solution**: Install ts-node:
```bash
npm install -D ts-node
```

## ✅ Verification Checklist

- [ ] Database backup created
- [ ] New schema applied
- [ ] Prisma client generated
- [ ] Seed data created
- [ ] Admin user can login
- [ ] API endpoints working
- [ ] No migration errors

## 🚀 Next Steps

After successful migration:

1. Test admin login at `/admin/login`
2. Create a test page
3. Upload test media
4. Create a collection
5. Verify all CRUD operations

## 📞 Support

If you encounter issues:
1. Check Prisma logs
2. Verify DATABASE_URL
3. Ensure PostgreSQL is running
4. Check for port conflicts
5. Review migration files

## 🎯 Production Deployment

For production:

1. Use managed database (AWS RDS, Supabase, etc.)
2. Set strong NEXTAUTH_SECRET
3. Enable SSL for database
4. Set up automated backups
5. Use environment-specific .env files
6. Test thoroughly before deploying

---

**Last Updated**: 2025-12-06
**Version**: 1.0.0
**Status**: Ready for migration
