const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateSettings() {
    console.log('🔄 Updating Settings to Business Card Data...\n');

    const settingsData = {
        siteName: 'SkinLuxe Aesthetics & Academy',
        siteTagline: 'LASER / SKIN / HAIR',
        contactEmail: 'skinluxemeerut@gmail.com',
        contactPhone: '9318452282 / 7451910272',
        address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut',
        socialMedia: { instagram: 'https://instagram.com/skinluxe_clinic_meerut' },
        businessHours: {
            weekdays: '10:00 AM - 08:00 PM',
            sunday: 'Closed'
        }
    };

    try {
        // Try to find existing settings
        const existing = await prisma.settings.findFirst();

        if (existing) {
            await prisma.settings.update({
                where: { id: existing.id },
                data: settingsData
            });
            console.log('✅ Settings Updated Successfully!');
        } else {
            await prisma.settings.create({
                data: settingsData
            });
            console.log('✅ Settings Created Successfully!');
        }

    } catch (error) {
        console.error('❌ Error updating settings:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateSettings();
