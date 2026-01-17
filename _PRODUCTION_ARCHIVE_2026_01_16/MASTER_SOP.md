
# 🟢 SkinLuxe Meerut - MASTER SOP & RECOVERY ARCHIVE
**Date:** 2026-01-16
**Status:** PRODUCTION LIVE
**Validation:** Verified by USER & Antigravity

This folder contains the **100% Complete Production State** of the SkinLuxe system.
If the system crashes, is deleted, or needs to be moved, use these files to restore it exactly as it was on this date.

## 📂 Directory Structure

### 1. `/database`
Contains the Golden Copy of the production data.
*   `skinluxe_meerut_FULL_BACKUP.sql`: Restore this for a complete reset.
*   `skinluxe_meerut_DATA_ONLY.sql`: Restore this if Schema is already correct (safest).
*   `skinluxe_meerut_SCHEMA_ONLY.sql`: Use this to create empty tables.
*   `backup_manifest.json`: Verification checksums.

### 2. `/prisma`
Contains the **Exact Database Schema** code.
*   `schema.prisma`: The source of truth for the DB structure.
*   `migrations/`: All historical SQL changes.
*   `prisma_version.txt`: The version of the tool used.

### 3. `/env`
Contains the configuration keys (Passwords Hidden).
*   Reference these files when setting up new Vercel/Render projects.

### 4. `/deployment`
*   `deployment.config.md`: How to build and start the apps.

## 🚨 Recovery Instructions (SOP)

### Scenario A: Total Database Loss
1.  Connect to new Postgres DB.
2.  Run: `psql "NEW_DB_URL" < database/skinluxe_meerut_SCHEMA_ONLY.sql`
3.  Run: `psql "NEW_DB_URL" < database/skinluxe_meerut_DATA_ONLY.sql`
4.  Update `DATABASE_URL` in Render Env.

### Scenario B: Accidental Code Breakage
1.  Revert Git to Commit `3b930c1` (The "Mobile Search" commit).
2.  Verify `apps/api/src/index.ts` has the correct CORS URLs (from `/env`).
3.  Redeploy.

## ✅ Verification Checklist
*   [x] Database Backups Verified (Contains 21 Treatments)
*   [x] Prisma Schema Matches DB
*   [x] Env Vars Documented
*   [x] Deployment Commands Archived
*   [x] PizzaBox Data REMOVED (Verified via db-guard.ts)
