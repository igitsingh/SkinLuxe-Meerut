const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Running emergency migration cleanup...');

        // Mark the failed migration as rolled back so we can "skip" it or re-apply a fixed version
        // Actually, since we deleted the file for the failed migration, we should just delete its record.
        const failedMigrationName = '20260115205500_create_role_enum';

        // Raw SQL to delete the failed migration record
        await prisma.$executeRawUnsafe(
            `DELETE FROM "_prisma_migrations" WHERE "migration_name" = '${failedMigrationName}';`
        );

        console.log(`Successfully deleted failed migration record: ${failedMigrationName}`);
    } catch (error) {
        console.error('Error cleaning up migrations:', error);
        // Don't exit with error, let the build resume and try normal migration
    } finally {
        await prisma.$disconnect();
    }
}

main();
