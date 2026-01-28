const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Updating contact phone in database...');

    // Find the current settings
    const settings = await prisma.settings.findFirst();

    if (settings) {
        await prisma.settings.update({
            where: { id: settings.id },
            data: {
                contactPhone: '7014681829'
            }
        });
        console.log('SUCCESS: Settings updated with phone 7014681829');
    } else {
        await prisma.settings.create({
            data: {
                siteName: 'SkinLuxe Aesthetics & Academy',
                contactPhone: '7014681829',
                contactEmail: 'skinluxemeerut@gmail.com',
                address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut'
            }
        });
        console.log('SUCCESS: Created new settings with phone 7014681829');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
