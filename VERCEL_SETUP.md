# Vercel Environment Variables Setup Guide

## Quick Fix for "Internal Server Error" on Guest Login

### Problem
The web and admin apps on Vercel are trying to connect to `localhost:5001` instead of the production API.

### Solution
Set the `NEXT_PUBLIC_API_URL` environment variable in Vercel.

---

## Method 1: Vercel Dashboard (Fastest - 2 minutes)

### For Web App (`the-pizza-box-web`)

1. Go to: https://vercel.com/dashboard
2. Click on **`the-pizza-box-web`** project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New**
6. Enter:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://the-pizza-box-api.vercel.app/api`
   - **Environments**: Check all (Production, Preview, Development)
7. Click **Save**
8. Go to **Deployments** tab
9. Click the **3 dots** on the latest deployment → **Redeploy**

### For Admin App (`the-pizza-box-admin`)

Repeat the same steps for the admin app.

---

## Method 2: Vercel CLI (Automated)

### Step 1: Login to Vercel
```bash
vercel login
```

### Step 2: Run the setup script
```bash
cd /Users/isachinsingh/.gemini/antigravity/scratch/the-pizza-box
./setup-vercel-env.sh
```

---

## Method 3: Manual CLI Commands

### For Web App
```bash
cd apps/web

# Add for production
vercel env add NEXT_PUBLIC_API_URL production
# When prompted, enter: https://the-pizza-box-api.vercel.app/api

# Add for preview
vercel env add NEXT_PUBLIC_API_URL preview
# When prompted, enter: https://the-pizza-box-api.vercel.app/api

# Add for development
vercel env add NEXT_PUBLIC_API_URL development
# When prompted, enter: https://the-pizza-box-api.vercel.app/api

# Redeploy
vercel --prod
```

### For Admin App
```bash
cd apps/admin

# Repeat the same commands as above
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_API_URL preview
vercel env add NEXT_PUBLIC_API_URL development
vercel --prod
```

---

## Verification

After setting the environment variables and redeploying:

1. Go to: https://the-pizza-box-web.vercel.app/login
2. Click **"Continue as Guest"**
3. It should work without errors ✅

---

## Current Environment Variables Needed

| App | Variable | Value |
|-----|----------|-------|
| Web | `NEXT_PUBLIC_API_URL` | `https://the-pizza-box-api.vercel.app/api` |
| Admin | `NEXT_PUBLIC_API_URL` | `https://the-pizza-box-api.vercel.app/api` |
| API | `DATABASE_URL` | (Your PostgreSQL connection string) |
| API | `JWT_SECRET` | (Your secret key) |
| API | `FRONTEND_URL` | `https://the-pizza-box-web.vercel.app` |
| API | `ADMIN_URL` | `https://the-pizza-box-admin.vercel.app` |

---

## Troubleshooting

### If guest login still fails:
1. Check browser console for the actual API URL being called
2. Verify the environment variable is set correctly in Vercel
3. Make sure you redeployed after adding the variable
4. Check API logs in Vercel for any errors

### If CORS errors appear:
The API needs to allow requests from your Vercel domains. This should already be configured, but verify in `apps/api/src/index.ts` that the CORS origins include your production URLs.
