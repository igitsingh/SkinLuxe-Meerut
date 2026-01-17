
# Deployment Configuration & Commands
**Date Archived:** 2026-01-16
**Author:** Antigravity

## 1. Apps/API (Backend - Render)
*   **Build Command:** `npm install && npx prisma generate && npm run build`
*   **Start Command:** `npm start` (Runs `node dist/index.js`)
*   **Pre-Deploy Command:** `npx prisma migrate deploy` (Ensures DB schema is synced)
*   **Node Version:** 18.x or 20.x

## 2. Apps/Web (Customer Site - Vercel)
*   **Framework:** Next.js
*   **Build Command:** `cd apps/web && npm install && npm run build` (Handled automatically by Vercel monorepo detection)
*   **Output Directory:** `.next`
*   **Root Directory:** `.` (Fixed in Step 1025)

## 3. Apps/Admin (Admin Panel - Vercel)
*   **Framework:** Next.js
*   **Build Command:** `cd apps/admin && npm install && npm run build`
*   **Root Directory:** `.`

## 4. Key Configurations
*   **CORS:** `apps/api/src/index.ts` lines 106-117.
    *   MUST include `https://skinluxe-meerut-web-og.vercel.app`
    *   MUST include `https://skinluxe-meerut-admin-og.vercel.app`
*   **Database:** PostgreSQL (Render)
    *   Use `ssl: true` or `?sslmode=require` in production.
