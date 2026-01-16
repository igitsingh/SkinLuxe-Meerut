
import { PrismaClient } from '@prisma/client';

// CRITICAL: DATABASE_URL must be set - no fallback allowed
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error(
        'FATAL DATABASE ERROR: DATABASE_URL environment variable is not set. ' +
        'Database connection is required for the API to function. ' +
        'Please configure DATABASE_URL in your environment variables.'
    );
}

const prisma = new PrismaClient();

// SAFETY GUARD: Prevent accidental cross-project database usage
function checkDatabaseSafety() {
    // DATABASE_URL is guaranteed to be defined here due to the check above
    const dbUrl = DATABASE_URL!;

    const isProd = process.env.NODE_ENV === 'production';
    const dbName = dbUrl.split('/').pop()?.split('?')[0];

    console.log(`[DB SAFETY] Connected to: ${dbName} (Env: ${process.env.NODE_ENV})`);

    // Explicit blocklist: Prevent using other project databases
    const FORBIDDEN_DBS = ['the_pizza_box', 'zevaraz_cms', 'test_db'];

    if (FORBIDDEN_DBS.includes(dbName || '')) {
        throw new Error(
            `CRITICAL DATABASE ERROR: Attempting to use forbidden database "${dbName}" in ${process.env.NODE_ENV} mode. ` +
            'This appears to be a different project\'s database. Operation aborted for data safety.'
        );
    }

    // Production-specific validation
    if (isProd) {
        // Ensure we're using a production-grade database (not SQLite, not local)
        if (dbUrl.includes('sqlite') || dbUrl.includes('localhost')) {
            throw new Error(
                'CRITICAL: Production mode cannot use SQLite or localhost database. ' +
                'Please configure a production PostgreSQL database URL.'
            );
        }
    }
}

checkDatabaseSafety();

export default prisma;
