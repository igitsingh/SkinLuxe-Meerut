import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await prisma.doctor.findMany({
            orderBy: { isHead: 'desc' } // Head doctors first
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create doctor
export const createDoctor = async (req: Request, res: Response) => {
    try {
        const { name, role, bio, qualifications, specialties, image, isHead } = req.body;

        const doctor = await prisma.doctor.create({
            data: {
                name,
                role,
                bio,
                qualifications,
                specialties: specialties || [],
                image,
                isHead: isHead || false,
            }
        });

        res.status(201).json(doctor);
    } catch (error) {
        console.error('Create doctor error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update doctor
export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const doctor = await prisma.doctor.update({
            where: { id },
            data: { ...data }
        });

        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete doctor
export const deleteDoctor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.doctor.delete({ where: { id } });
        res.json({ message: 'Doctor deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
