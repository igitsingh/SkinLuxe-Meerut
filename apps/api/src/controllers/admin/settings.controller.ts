import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response) => {
    try {
        let settings = await prisma.settings.findFirst();

        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    siteName: 'SkinLuxe Aesthetics',
                    contactPhone: '',
                    contactEmail: '',
                    maintenanceMode: false
                },
            });
        }

        res.json(settings);
    } catch (error: any) {
        console.error('Get settings error:', error);
        res.status(500).json({
            message: error.message || 'Internal server error',
            code: error.code,
            meta: error.meta
        });
    }
};

export const updateSettings = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        let settings = await prisma.settings.findFirst();

        if (settings) {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: { ...data },
            });
        } else {
            settings = await prisma.settings.create({
                data: {
                    siteName: 'SkinLuxe Aesthetics',
                    contactPhone: '',
                    contactEmail: '',
                    ...data
                },
            });
        }

        res.json(settings);
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
