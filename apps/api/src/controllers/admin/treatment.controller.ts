import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all treatments
export const getAllTreatments = async (req: Request, res: Response) => {
    try {
        const treatments = await prisma.treatment.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(treatments);
    } catch (error) {
        console.error('Get treatments error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get single treatment
export const getTreatment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const treatment = await prisma.treatment.findUnique({
            where: { id }
        });
        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }
        res.json(treatment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create treatment
export const createTreatment = async (req: Request, res: Response) => {
    try {
        const {
            name, slug, description, shortDescription,
            duration, downtime, painLevel, price,
            icon, image, category, isFeatured
        } = req.body;

        const existing = await prisma.treatment.findUnique({ where: { slug } });
        if (existing) {
            return res.status(400).json({ message: 'Slug already exists' });
        }

        const treatment = await prisma.treatment.create({
            data: {
                name,
                slug,
                description,
                shortDescription,
                duration,
                downtime,
                painLevel,
                price,
                icon,
                image,
                category,
                isFeatured: isFeatured || false,
            }
        });

        res.status(201).json(treatment);
    } catch (error) {
        console.error('Create treatment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update treatment
export const updateTreatment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const treatment = await prisma.treatment.update({
            where: { id },
            data: {
                ...data
            }
        });

        res.json(treatment);
    } catch (error) {
        console.error('Update treatment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete treatment
export const deleteTreatment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.treatment.delete({ where: { id } });
        res.json({ message: 'Treatment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
