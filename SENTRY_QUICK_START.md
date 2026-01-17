# 🚀 QUICK START - Sentry Admin Panel Setup

## ✅ What's Done (By Me)
- Installed `@sentry/nextjs` package
- Created all configuration files
- Updated `next.config.ts`

## 🎯 What You Need to Do (7 Steps)

### 1️⃣ Get DSN (2 min)
- Go to https://sentry.io
- Create project: `skinluxe-meerut-admin` (Next.js)
- Copy the DSN

### 2️⃣ Create Local Config (1 min)
Create file: `/apps/admin/.env.local`
```env
NEXT_PUBLIC_SENTRY_DSN=your-dsn-here
```

### 3️⃣ Add to Vercel (3 min)
- Go to Vercel → Admin Panel → Settings → Environment Variables
- Add: `NEXT_PUBLIC_SENTRY_DSN` = your DSN
- Check all 3 environments

### 4️⃣ Test Locally (2 min)
```bash
cd apps/admin
npm run dev
```
Open http://localhost:3001

### 5️⃣ Deploy (1 min)
```bash
git add .
git commit -m "feat: add Sentry to admin panel"
git push origin main
```

### 6️⃣ Verify
- Check Vercel deployment succeeds
- Check Sentry dashboard for errors

## 📖 Full Guide
See: `SENTRY_ADMIN_SETUP_GUIDE.md` for detailed instructions

## ❓ Stuck?
Just ask me! 🚀
