import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to get settings from database (Single Row Model)
async function getSettings() {
    try {
        const settingsRecord = await prisma.settings.findFirst();

        // Default SkinLuxe values
        const defaults = {
            siteName: 'SkinLuxe Aesthetics & Academy',
            siteTagline: 'LASER / SKIN / HAIR',
            logo: '/skinluxe-logo-dark.png',
            favicon: '/skinluxe-logo.png',
            contactEmail: 'skinluxemeerut@gmail.com',
            contactPhone: '9318452282 / 7451910272',
            address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut',
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
            copyrightText: '© 2026 SkinLuxe Aesthetics & Academy. All rights reserved.',
            maintenanceMode: false,
            customCSS: '',
            customJS: '',
        };

        if (settingsRecord) {
            // Merge DB record into defaults.
            // Note: DB Record has flat fields (siteName, etc.) + socialMedia JSON.
            // We need to extract instagram from socialMedia if present.
            const social = settingsRecord.socialMedia as any;
            return {
                ...defaults,
                ...settingsRecord,
                instagram: social?.instagram || defaults.instagram,
                facebook: social?.facebook || defaults.facebook,
                // Ensure we don't return nulls if DB has nulls for required fields, rely on defaults or empty string
            };
        }

        return defaults;
    } catch (error) {
        console.error('Error fetching settings:', error);
        // Return defaults if database fails
        return {
            siteName: 'SkinLuxe Aesthetics & Academy',
            siteTagline: 'LASER / SKIN / HAIR',
            logo: '/skinluxe-logo-dark.png',
            favicon: '/skinluxe-logo.png',
            contactEmail: 'skinluxemeerut@gmail.com',
            contactPhone: '9318452282 / 7451910272',
            address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut',
            instagram: 'https://instagram.com/skinluxe_clinic_meerut',
            // ... strict defaults
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

// PUT update settings (Not really used by Admin Panel, as Admin uses /api/admin/settings, 
// but useful if we built a frontend settings editor in Web app?)
// We can leave PUT as placeholder or implement if needed. 
// Admin Panel uses separate API.
