# Render Database Restore Instructions

**WARNING: This operation overwrites the production database.**

## Prerequisites
- `psql` installed.
- Access to the Render Database External Connection String (`RENDER_DB_URL`).

## Restore Command
Run this command from your terminal:

```bash
psql "RENDER_DB_URL_HERE" < ./skinluxe_meerut_DATA_ONLY.sql
```

**Note:** We use `DATA_ONLY.sql` because the schema is arguably already synced via Prisma Migrations on Render. However, if you need a full reset:

1. **Reset Schema (Destructive):**
   ```bash
   psql "RENDER_DB_URL_HERE" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
   ```

2. **Full Restore:**
   ```bash
   psql "RENDER_DB_URL_HERE" < ./skinluxe_meerut_FULL_BACKUP.sql
   ```
