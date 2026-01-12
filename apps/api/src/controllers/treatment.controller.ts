import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPublicTreatments = async (req: Request, res: Response) => {
    try {
        const treatments = await prisma.treatment.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                shortDescription: true,
                category: true,
                price: true,
                duration: true,
                isFeatured: true,
                icon: true,
                image: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        res.json(treatments);
    } catch (error) {
        console.error('Get public treatments error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTreatmentBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const treatment = await prisma.treatment.findUnique({
            where: { slug }
        });

        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }

        res.json(treatment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
