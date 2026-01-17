# 🎯 Sentry Setup Guide for Admin Panel - COMPLETE STEPS

**Date:** January 17, 2026  
**Status:** ✅ Code Ready - Waiting for Your Configuration

---

## ✅ **WHAT I'VE DONE FOR YOU (Completed)**

I've already installed and configured everything! Here's what's ready:

### Files Created:
1. ✅ `/apps/admin/sentry.client.config.ts` - Tracks browser errors
2. ✅ `/apps/admin/sentry.server.config.ts` - Tracks server errors
3. ✅ `/apps/admin/sentry.edge.config.ts` - Tracks Edge runtime errors
4. ✅ `/apps/admin/instrumentation.ts` - Initializes Sentry properly
5. ✅ `/apps/admin/next.config.ts` - Updated with Sentry integration

### Packages Installed:
- ✅ `@sentry/nextjs` - Complete Sentry SDK for Next.js

---

## 🎯 **WHAT YOU NEED TO DO (7 Simple Steps)**

### **STEP 1: Get Your Sentry DSN** (2 minutes)

1. Open your browser
2. Go to: https://sentry.io
3. Log in
4. Click **"Projects"** in the left sidebar
5. Click **"Create Project"** button
6. Select: **"Next.js"**
7. Project name: `skinluxe-meerut-admin`
8. Click **"Create Project"**
9. **COPY THE DSN** - It looks like:
   ```
   https://xxxxxxxxxxxxx@xxxxxxxxxxxxx.ingest.sentry.io/xxxxxxxxxxxxx
   ```
10. Keep this DSN - you'll need it in Step 4

---

### **STEP 2: Create .env.local File** (1 minute)

1. Open your code editor
2. Navigate to: `/apps/admin/`
3. Create a new file called: `.env.local`
4. Leave it empty for now (we'll add content in Step 4)

---

### **STEP 3: Check if .env.local is in .gitignore** (1 minute)

1. Open: `/apps/admin/.gitignore`
2. Look for this line: `.env*.local`
3. If it's there ✅ - Great! Move to Step 4
4. If it's NOT there ❌ - Add this line:
   ```
   .env*.local
   ```
5. Save the file

---

### **STEP 4: Add Sentry DSN to .env.local** (1 minute)

1. Open: `/apps/admin/.env.local`
2. Paste this line (replace with YOUR actual DSN from Step 1):
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxx@xxxxxxxxxxxxx.ingest.sentry.io/xxxxxxxxxxxxx
   ```
3. Save the file

**Example:**
```env
NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/7890123
```

---

### **STEP 5: Add Sentry DSN to Vercel** (3 minutes)

1. Go to: https://vercel.com
2. Find your **Admin Panel** project: `skinluxe-meerut-admin-og`
3. Click on it
4. Go to **Settings** tab
5. Click **Environment Variables** in the left sidebar
6. Click **Add New** button
7. Fill in:
   - **Key:** `NEXT_PUBLIC_SENTRY_DSN`
   - **Value:** (paste your DSN from Step 1)
   - **Environments:** Check all three boxes (Production, Preview, Development)
8. Click **Save**

---

### **STEP 6: Add Sentry Auth Token to Vercel** (Optional - For Source Maps)

This step is optional but recommended for better error tracking.

1. Go to: https://sentry.io/settings/account/api/auth-tokens/
2. Click **"Create New Token"**
3. Name: `Vercel Admin Panel`
4. Scopes: Check these boxes:
   - ✅ `project:read`
   - ✅ `project:releases`
   - ✅ `org:read`
5. Click **"Create Token"**
6. **COPY THE TOKEN** (you can only see it once!)
7. Go back to Vercel → Admin Panel → Settings → Environment Variables
8. Click **Add New**
9. Fill in:
   - **Key:** `SENTRY_AUTH_TOKEN`
   - **Value:** (paste the token you just copied)
   - **Environments:** Check all three boxes
10. Click **Save**

---

### **STEP 7: Test Locally** (2 minutes)

1. Open your terminal
2. Navigate to admin folder:
   ```bash
   cd /Users/isachinsingh/Desktop/SkinLuxe-Meerut/apps/admin
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open browser: http://localhost:3001
5. Check the terminal - you should see:
   ```
   ✓ Compiled successfully
   ```
6. If you see errors about Sentry, check that your `.env.local` file has the correct DSN

---

## 🎉 **DEPLOYMENT (Automatic)**

Once you've completed Steps 1-7:

1. **Commit the code** (when you're ready):
   ```bash
   git add .
   git commit -m "feat: add Sentry error tracking to admin panel"
   git push origin main
   ```

2. **Vercel will auto-deploy** with Sentry enabled

3. **Check Sentry Dashboard** after deployment:
   - Go to: https://sentry.io
   - Click on `skinluxe-meerut-admin` project
   - You should start seeing errors (if any occur)

---

## 🧪 **HOW TO TEST IF IT'S WORKING**

### Test 1: Trigger a Test Error (Local)

1. Open any admin page file (e.g., `/apps/admin/app/dashboard/page.tsx`)
2. Add this code at the top of the component:
   ```typescript
   if (typeof window !== 'undefined') {
     throw new Error('Sentry Test Error - Admin Panel');
   }
   ```
3. Refresh the page in browser
4. Check Sentry dashboard - you should see the error!
5. **Remove the test code** after confirming

### Test 2: Check Sentry Dashboard

1. Go to: https://sentry.io
2. Click on `skinluxe-meerut-admin`
3. Click **"Issues"** in the left sidebar
4. You should see any errors that occurred

---

## 📊 **WHAT SENTRY WILL TRACK**

Once set up, Sentry will automatically track:

### ✅ Client-Side Errors (Browser)
- JavaScript errors
- React component errors
- API call failures
- Form submission errors

### ✅ Server-Side Errors
- Next.js API route errors
- Server-side rendering errors
- Database query errors

### ✅ Performance Issues
- Slow page loads
- Slow API calls
- Memory leaks

### ✅ User Sessions (Replay)
- Watch recordings of user sessions when errors occur
- See exactly what the user did before the error

---

## 🔒 **SECURITY NOTES**

✅ **Safe:** `.env.local` is in `.gitignore` - your DSN won't be committed to Git
✅ **Safe:** `NEXT_PUBLIC_` prefix means it's safe to expose in browser
✅ **Safe:** Sentry automatically filters sensitive data (passwords, tokens)

---

## ❓ **TROUBLESHOOTING**

### Problem: "Sentry DSN not configured"
**Solution:** Check that `.env.local` has `NEXT_PUBLIC_SENTRY_DSN=...`

### Problem: Build fails with Sentry error
**Solution:** Make sure you added `SENTRY_AUTH_TOKEN` to Vercel (Step 6)

### Problem: No errors showing in Sentry
**Solution:** 
1. Check that DSN is correct
2. Trigger a test error (see Test 1 above)
3. Wait 1-2 minutes for errors to appear

---

## 📞 **NEED HELP?**

If you get stuck on any step, just ask me and I'll help you! 🚀

---

## ✅ **CHECKLIST**

Use this to track your progress:

- [ ] Step 1: Got Sentry DSN from sentry.io
- [ ] Step 2: Created `.env.local` file
- [ ] Step 3: Verified `.gitignore` has `.env*.local`
- [ ] Step 4: Added DSN to `.env.local`
- [ ] Step 5: Added DSN to Vercel environment variables
- [ ] Step 6: (Optional) Added auth token to Vercel
- [ ] Step 7: Tested locally - admin panel loads without errors
- [ ] Committed and pushed code to GitHub
- [ ] Verified Vercel deployed successfully
- [ ] Checked Sentry dashboard for errors

---

**Status:** 🟡 **Waiting for your configuration**  
**Next:** Complete Steps 1-7 above, then you're done! 🎉
