#!/bin/bash
# Strict Restore Script for SkinLuxe Production
# Target: skinluxe_meerut_db_strict

BACKUP_FILE="/Users/isachinsingh/Desktop/SkinLuxe-Meerut/database-backups/skinluxe_meerut_DATA_ONLY.sql"
HOST="dpg-d5kkonlactks7393fk8g-a.singapore-postgres.render.com"
USER="skinluxe_meerut_db_strict_user"
DB="skinluxe_meerut_db_strict"

echo "======================================================="
echo "   RESTORING SKINLUXE PRODUCTION DATA"
echo "======================================================="
echo "Target DB: $DB"
echo "Source File: $BACKUP_FILE"
echo ""
echo "Please enter the password for user $USER (will be hidden):"
read -s PGPASSWORD
export PGPASSWORD

echo ""
echo "⏳ Restoring data (this may take a few seconds)..."
# Using the user-approved command format (for .sql)
psql -h $HOST -U $USER $DB < $BACKUP_FILE

RESTORE_EXIT_CODE=$?

echo ""
echo "======================================================="
echo "   VERIFICATION"
echo "======================================================="

if [ $RESTORE_EXIT_CODE -eq 0 ]; then
    echo "✅ Restore command executed successfully."
else
    echo "❌ Restore command failed with exit code $RESTORE_EXIT_CODE."
    exit $RESTORE_EXIT_CODE
fi

echo ""
echo "Checking Row Counts (Should be > 0)..."

echo "1. Users:"
psql -h $HOST -U $USER $DB -c 'SELECT COUNT(*) FROM "User";'

echo "2. Treatments (Services):"
psql -h $HOST -U $USER $DB -c 'SELECT COUNT(*) FROM "Treatment";'

echo "3. Appointments:"
psql -h $HOST -U $USER $DB -c 'SELECT COUNT(*) FROM "Appointment";'

echo ""
echo "======================================================="
echo "   DONE"
echo "======================================================="
