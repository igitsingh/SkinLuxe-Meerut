
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Load env from api folder
dotenv.config({ path: path.join(__dirname, '../../.env') });

const prisma = new PrismaClient();

async function guard() {
    console.log("🛡️  ANTIGRAVITY DEPLOYMENT GUARD: Checking Production Data Integrity...");

    const dbUrl = process.env.DATABASE_URL || '';

    // 1. Environment Detection
    console.log(`Checked DB Host: ${dbUrl.split('@')[1]?.split('/')[0] || 'Hidden'}`);

    // High Risk Check: Are we pointing to localhost in production?
    if (process.env.NODE_ENV === 'production' && dbUrl.includes('localhost')) {
        console.error("❌ CRITICAL: Attempting to use Localhost DB in Production Mode.");
        process.exit(1);
    }

    try {
        // 2. Data Existence Check (The "Row Count" Rule)
        // We check 'Treatment' as it is the core business entity for SkinLuxe.
        const treatmentCount = await prisma.treatment.count();
        console.log(`📊 Treatment Count: ${treatmentCount}`);

        if (treatmentCount === 0) {
            console.error("\n❌ BLOCKING DEPLOYMENT: Production Database is EMPTY.");
            console.error("   Reason: 'Treatment' table has 0 rows.");
            console.error("   Requirement: Production must have reference data before deploy.");
            console.error("\n   ACTION REQUIRED:");
            console.error("   1. Run 'npm run restore:prod' to restore data from backup.");
            console.error("   2. OR run 'npm run seed' if this is a brand new instance (Option B).");
            process.exit(1);
        }

        const userCount = await prisma.user.count();
        if (userCount === 0) {
            console.warn("⚠️  WARNING: No Users found. You won't be able to log in.");
            // We don't block deploy for this (maybe creating first user), but we warn.
        }

        console.log("✅ DATA INTEGRITY CHECK PASSED: Database contains reference data.");
        process.exit(0);

    } catch (error) {
        console.error("❌ DB CONNECTION FAILED:", error);
        process.exit(1); // Block deploy on connection error
    } finally {
        await prisma.$disconnect();
    }
}

guard();
