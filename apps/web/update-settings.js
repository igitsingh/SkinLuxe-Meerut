const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateSettings() {
    console.log('🔄 Updating settings to SkinLuxe branding...\n');

    try {
        const settings = [
            { key: 'site_name', value: 'SkinLuxe Aesthetics & Academy' },
            { key: 'site_tagline', value: 'Your Journey to Radiant Skin' },
            { key: 'contact_email', value: 'info@skinluxe-meerut.com' },
            { key: 'contact_phone', value: '+91 121 XXX XXXX' },
            { key: 'address', value: 'Meerut, Uttar Pradesh, India' },
            { key: 'working_hours', value: 'Mon-Sat: 10:00 AM - 7:00 PM' },
            { key: 'booking_enabled', value: 'true' },
            { key: 'siteName', value: 'SkinLuxe Aesthetics & Academy' },
            { key: 'siteTagline', value: 'Your Journey to Radiant Skin' },
            { key: 'logo', value: '/skinluxe-logo-dark.png' },
            { key: 'favicon', value: '/skinluxe-logo.png' },
            { key: 'contactEmail', value: 'info@skinluxe-meerut.com' },
            { key: 'contactPhone', value: '+91 121 XXX XXXX' },
            { key: 'instagram', value: 'https://instagram.com/skinluxe_clinic_meerut' },
            { key: 'facebook', value: 'https://facebook.com/skinluxe' },
            { key: 'twitter', value: 'https://twitter.com/skinluxe' },
            { key: 'youtube', value: '' },
            { key: 'primaryColor', value: '#E91E63' },
            { key: 'secondaryColor', value: '#000000' },
            { key: 'accentColor', value: '#C2185B' },
            { key: 'seoTitle', value: 'SkinLuxe | Premier Aesthetics Clinic in Meerut' },
            { key: 'seoDescription', value: 'Advanced aesthetic treatments and professional training academy in Meerut' },
            { key: 'footerText', value: 'Your Journey to Radiant Skin' },
            { key: 'copyrightText', value: '© 2024 SkinLuxe Aesthetics & Academy. All rights reserved.' },
        ];

        for (const setting of settings) {
            await prisma.settings.upsert({
                where: { key: setting.key },
                update: { value: setting.value },
                create: setting,
            });
            console.log(`✅ Updated: ${setting.key} = ${setting.value}`);
        }

        console.log('\n🎉 All settings updated to SkinLuxe branding!');
        console.log('\n📊 Summary:');
        console.log(`   - Site Name: SkinLuxe Aesthetics & Academy`);
        console.log(`   - Tagline: Your Journey to Radiant Skin`);
        console.log(`   - Email: info@skinluxe-meerut.com`);
        console.log(`   - Location: Meerut, Uttar Pradesh`);
        console.log(`   - Primary Color: #E91E63 (Pink)`);
        console.log(`   - ${settings.length} settings updated\n`);

    } catch (error) {
        console.error('❌ Error updating settings:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateSettings()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
