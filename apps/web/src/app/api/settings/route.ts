import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to get settings from database
async function getSettings() {
    try {
        const settingsRecords = await prisma.settings.findMany();

        // Convert array of settings to object
        const settings: any = {
            // Default SkinLuxe values
            siteName: 'SkinLuxe Aesthetics & Academy',
            siteTagline: 'Your Journey to Radiant Skin',
            logo: '/skinluxe-logo-dark.png',
            favicon: '/skinluxe-logo.png',
            contactEmail: 'info@skinluxe-meerut.com',
            contactPhone: '+91 121 XXX XXXX',
            address: 'Meerut, Uttar Pradesh, India',
            instagram: 'https://instagram.com/skinluxe_clinic_meerut',
            facebook: 'https://facebook.com/skinluxe',
            twitter: 'https://twitter.com/skinluxe',
            youtube: '',
            primaryColor: '#E91E63',
            secondaryColor: '#000000',
            accentColor: '#C2185B',
            seoTitle: 'SkinLuxe | Premier Aesthetics Clinic in Meerut',
            seoDescription: 'Advanced aesthetic treatments and professional training academy in Meerut',
            googleAnalyticsId: '',
            footerText: 'Your Journey to Radiant Skin',
            copyrightText: '© 2024 SkinLuxe Aesthetics & Academy. All rights reserved.',
            maintenanceMode: false,
            customCSS: '',
            customJS: '',
        };

        // Override with database values
        settingsRecords.forEach(record => {
            settings[record.key] = record.value;
        });

        return settings;
    } catch (error) {
        console.error('Error fetching settings:', error);
        // Return defaults if database fails
        return {
            siteName: 'SkinLuxe Aesthetics & Academy',
            siteTagline: 'Your Journey to Radiant Skin',
            logo: '/skinluxe-logo-dark.png',
            favicon: '/skinluxe-logo.png',
            contactEmail: 'info@skinluxe-meerut.com',
            contactPhone: '+91 121 XXX XXXX',
            address: 'Meerut, Uttar Pradesh, India',
            instagram: 'https://instagram.com/skinluxe_clinic_meerut',
            facebook: 'https://facebook.com/skinluxe',
            twitter: 'https://twitter.com/skinluxe',
            youtube: '',
            primaryColor: '#E91E63',
            secondaryColor: '#000000',
            accentColor: '#C2185B',
            seoTitle: 'SkinLuxe | Premier Aesthetics Clinic in Meerut',
            seoDescription: 'Advanced aesthetic treatments and professional training academy in Meerut',
            googleAnalyticsId: '',
            footerText: 'Your Journey to Radiant Skin',
            copyrightText: '© 2024 SkinLuxe Aesthetics & Academy. All rights reserved.',
            maintenanceMode: false,
            customCSS: '',
            customJS: '',
        };
    }
}

// GET settings
export async function GET(request: NextRequest) {
    try {
        const settings = await getSettings();

        return NextResponse.json(
            {
                success: true,
                data: settings,
            },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

// PUT update settings
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Save each setting to database
        for (const [key, value] of Object.entries(body)) {
            await prisma.settings.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) },
            });
        }

        // Get updated settings
        const settings = await getSettings();

        return NextResponse.json({
            success: true,
            data: settings,
            message: 'Settings updated successfully',
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
