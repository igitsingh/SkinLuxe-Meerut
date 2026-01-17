
#!/bin/bash
echo "======================================================="
echo "       SKINLUXE MEERUT - PRODUCTION RESTORE TOOL"
echo "======================================================="
echo "WARNING: This will overwrite data in the target database."
echo ""
echo "Please paste your Render Database Connection String (External or Internal):"
read -s RENDER_URL

if [ -z "$RENDER_URL" ]; then
    echo "Error: No URL provided. Aborting."
    exit 1
fi

echo ""
echo "Target: $RENDER_URL (masked)"
echo "Restoring from: ./skinluxe_meerut_DATA_ONLY.sql"
echo ""

# Run Restore
psql "$RENDER_URL" < ./skinluxe_meerut_DATA_ONLY.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ RESTORE COMPLETED SUCCESSFULLY."
else
    echo ""
    echo "❌ RESTORE FAILED. Please check the logs above."
fi
