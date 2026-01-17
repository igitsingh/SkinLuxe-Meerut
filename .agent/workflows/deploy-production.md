
---
description: MANDATORY Production Deployment Workflow (The Antigravity Guard)
---

# 🛡️ SkinLuxe Production Deployment Protocol

**WARNING:** You (The Agent) are **NOT ALLOWED** to deploy or push to `main` without following this checklist.
This workflow enforces the "No Empty Prod" rule.

## 1. 🛑 Mandatory Data Strategy Check
Before modifying any production code or triggering a build:

1.  **classify_project**:
    *   Does `apps/api/prisma/schema.prisma` exist? -> REQUIRED.
    *   Does the app rely on seeded data (Treatments/Services)? -> YES (SkinLuxe).
    *   Is this a fresh "Hello World" app? -> NO.

2.  **Environment Audit**:
    *   Identify the target: `PRODUCTION`.
    *   Verify DB URL in `.env` matches the Production URI (Render).

## 2. 🧪 Pre-Flight Data Guard
Run the automated guard script locally or against the connection.

```bash
# This script MUST pass (Exit Code 0)
npx ts-node apps/api/scripts/pre-deploy-guard.ts
```

*   **IF SUCCESS:** Proceed to Step 3.
*   **IF FAILURE:**
    *   **STOP IMMEDIATELY.**
    *   **Option A (Preferred):** Restore from `database-backups/skinluxe_meerut_DATA_ONLY.sql`.
    *   **Option B (Only if fresh):** Run seeding.
    *   **Retest:** Run the guard script again. Verification must pass.

## 3. 🚀 Deployment Trigger
Only if Step 2 is Green.

1.  Push Code / Trigger Vercel.
2.  Trigger Render (if API changed).

## 4. 📸 One-Click Snapshot (Post-Success)
After a successful deployment where everything is working:

1.  Create a timestamped folder in `production-snapshots/`.
2.  Dump current schema and data (Sanitized).
3.  Save `restore.sh` alongside it.

## 5. 🔍 Post-Deploy Verification
Verify the LIVE URLs (not local).

```bash
# This script checks actual API connectivity and Data Row Counts
npx ts-node apps/api/scripts/post-deploy-verify.ts
```

## 🚨 Troubleshooting
*   **"Treatment Count: 0"**: You deployed schema without data. **IMMEDIATE ROLLBACK** or **IMMEDIATE RESTORE**.
*   **"Connection Refused"**: Vercel/Render is down, or CORS is blocking.

---
// turbo-all
