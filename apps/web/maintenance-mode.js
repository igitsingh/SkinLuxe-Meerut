const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testMaintenanceMode() {
    console.log('🔧 Maintenance Mode Test & Toggle\n');

    try {
        // Check current status
        const currentSetting = await prisma.settings.findUnique({
            where: { key: 'maintenanceMode' }
        });

        const currentStatus = currentSetting?.value === 'true';

        console.log('📊 Current Status:');
        console.log(`   Maintenance Mode: ${currentStatus ? '🔴 ENABLED' : '🟢 DISABLED'}\n`);

        // Ask user what to do
        const args = process.argv.slice(2);
        const command = args[0];

        if (command === 'enable' || command === 'on') {
            console.log('🔄 Enabling maintenance mode...');
            await prisma.settings.upsert({
                where: { key: 'maintenanceMode' },
                update: { value: 'true' },
                create: { key: 'maintenanceMode', value: 'true' },
            });
            console.log('✅ Maintenance mode ENABLED');
            console.log('🚫 Public website is now blocked');
            console.log('✅ Admin panel is still accessible at /admin\n');
        } else if (command === 'disable' || command === 'off') {
            console.log('🔄 Disabling maintenance mode...');
            await prisma.settings.upsert({
                where: { key: 'maintenanceMode' },
                update: { value: 'false' },
                create: { key: 'maintenanceMode', value: 'false' },
            });
            console.log('✅ Maintenance mode DISABLED');
            console.log('🟢 Public website is now accessible\n');
        } else if (command === 'toggle') {
            const newStatus = !currentStatus;
            console.log(`🔄 Toggling maintenance mode to ${newStatus ? 'ENABLED' : 'DISABLED'}...`);
            await prisma.settings.upsert({
                where: { key: 'maintenanceMode' },
                update: { value: String(newStatus) },
                create: { key: 'maintenanceMode', value: String(newStatus) },
            });
            console.log(`✅ Maintenance mode ${newStatus ? 'ENABLED' : 'DISABLED'}`);
            if (newStatus) {
                console.log('🚫 Public website is now blocked');
                console.log('✅ Admin panel is still accessible at /admin\n');
            } else {
                console.log('🟢 Public website is now accessible\n');
            }
        } else {
            console.log('📖 Usage:');
            console.log('   node maintenance-mode.js enable   - Enable maintenance mode');
            console.log('   node maintenance-mode.js disable  - Disable maintenance mode');
            console.log('   node maintenance-mode.js toggle   - Toggle current state');
            console.log('   node maintenance-mode.js          - Check current status\n');
        }

        // Show final status
        const finalSetting = await prisma.settings.findUnique({
            where: { key: 'maintenanceMode' }
        });
        const finalStatus = finalSetting?.value === 'true';

        console.log('📊 Final Status:');
        console.log(`   Maintenance Mode: ${finalStatus ? '🔴 ENABLED' : '🟢 DISABLED'}`);
        console.log(`   Public Access: ${finalStatus ? '🚫 BLOCKED' : '✅ ALLOWED'}`);
        console.log(`   Admin Access: ✅ ALWAYS ALLOWED`);
        console.log(`   API Access: ✅ ALWAYS ALLOWED\n`);

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

testMaintenanceMode()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
