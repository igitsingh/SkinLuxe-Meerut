const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting emergency migration cleanup...');
    const failedMigration = '20260115205500_create_role_enum';

    try {
        // Check if the failed migration exists
        const result = await prisma.$queryRawUnsafe(
            `SELECT * FROM "_prisma_migrations" WHERE "migration_name" = '${failedMigration}'`
        );

        console.log('Found migration record:', result);

        // Delete it explicitly to unblock the queue
        await prisma.$executeRawUnsafe(
            `DELETE FROM "_prisma_migrations" WHERE "migration_name" = '${failedMigration}'`
        );

        console.log(`SUCCESS: Deleted failed migration record: ${failedMigration}`);
    } catch (e) {
        console.error('Error during cleanup:', e);
        // We do NOT throw here because we want the deployment to continue even if this fails 
        // (e.g. if the record is already gone)
    } finally {
        await prisma.$disconnect();
    }
}

main();
