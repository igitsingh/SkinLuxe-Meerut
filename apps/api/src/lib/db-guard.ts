
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DATABASE_URL = process.env.DATABASE_URL || '';

// SAFETY GUARD: Prevent writes if connected to wrong DB in Production-like contexts
// This is a soft-check helper. Ideally, this runs on server start.

function checkDatabaseSafety() {
    if (!DATABASE_URL) return;

    // If we are definitely NOT targeting skinluxe_meerut BUT we think we are in production...
    // Use a heuristic or explicit check.

    const isProd = process.env.NODE_ENV === 'production';
    const dbName = DATABASE_URL.split('/').pop()?.split('?')[0];

    console.log(`[DB SAFETY] Connected to: ${dbName} (Env: ${process.env.NODE_ENV})`);

    if (isProd && dbName !== 'skinluxe_meerut' && dbName !== 'skinluxe_production') {
        // NOTE: Render DB names are random strings (e.g. dpg-...), so strict name check fails on Render.
        // Instead, we verify we are NOT using the known restricted Pizza Box DB in prod.
        if (dbName === 'the_pizza_box') {
            throw new Error('CRITICAL: Attempting to use "the_pizza_box" database in PRODUCTION mode. Operation Aborted.');
        }
    }
}

checkDatabaseSafety();

export default prisma;
