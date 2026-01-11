const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
    try {
        console.log('🔍 Testing database connection...\n');

        // Test connection
        await prisma.$connect();
        console.log('✅ Database connected successfully!\n');

        // Try to query settings table
        console.log('📊 Querying settings table...');
        const settings = await prisma.settings.findMany();
        console.log(`✅ Found ${settings.length} settings\n`);

        // Try to query treatments table
        console.log('💊 Querying treatments table...');
        const treatments = await prisma.treatment.findMany();
        console.log(`✅ Found ${treatments.length} treatments\n`);

        // Try to query patients table
        console.log('👥 Querying patients table...');
        const patients = await prisma.patient.findMany();
        console.log(`✅ Found ${patients.length} patients\n`);

        console.log('🎉 All database tables are accessible!');
        console.log('✅ Database setup is complete and working!\n');

    } catch (error) {
        console.error('❌ Database connection failed!');
        console.error('Error:', error.message);
        console.error('\n💡 Troubleshooting:');
        console.error('1. Check your DATABASE_URL in .env file');
        console.error('2. Verify database is running');
        console.error('3. Make sure schema.sql was executed');
        console.error('4. Run: npx prisma db push\n');
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
