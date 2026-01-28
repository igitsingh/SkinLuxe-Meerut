import express from 'express';
import prisma from '../config/db';

const router = express.Router();

// GET /api/settings - Public endpoint to fetch site settings
router.get('/', async (req, res) => {
    try {
        const settings = await prisma.settings.findFirst({
            select: {
                siteName: true,
                siteTagline: true,
                logo: true,
                contactEmail: true,
                contactPhone: true,
                address: true,
                socialMedia: true,
                businessHours: true,
                heroImage: true,
                heroImageMobile: true,
                updatedAt: true,
            }
        });

        if (!settings) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'SETTINGS_NOT_FOUND',
                    message: 'Settings not configured yet'
                }
            });
        }

        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Failed to fetch settings'
            }
        });
    }
});

export default router;
