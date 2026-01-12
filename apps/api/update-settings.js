const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateSettings() {
    console.log('🔄 Updating Settings to Business Card Data...\n');

    const settingsData = {
        siteName: 'SkinLuxe Aesthetics & Academy',
        siteTagline: 'LASER / SKIN / HAIR',
        contactEmail: 'skinluxemeerut@gmail.com',
        contactPhone: null, // Placeholder to allow update below
        // The business card shows two numbers, but schema might expect String.
        // I will use String.
        // address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut',
        // socialMedia: { instagram: 'https://instagram.com/skinluxe_clinic_meerut' }
    };

    // Need to match Schema EXACTLY.
    // Schema Step 809:
    // contactPhone String
    // address String?
    // socialMedia Json?

    // I will construct the object carefully.
    const updatePayload = {
        siteName: 'SkinLuxe Aesthetics & Academy',
        siteTagline: 'LASER / SKIN / HAIR',
        contactEmail: 'skinluxemeerut@gmail.com',
        contactPhone: '9318452282 / 7451910272',
        address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut',
        socialMedia: { instagram: 'https://instagram.com/skinluxe_clinic_meerut' }
    };

    try {
        const existing = await prisma.settings.findFirst();

        if (existing) {
            await prisma.settings.update({
                where: { id: existing.id },
                data: updatePayload
            });
            console.log('✅ Settings Updated Successfully!');
        } else {
            await prisma.settings.create({
                data: updatePayload
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
