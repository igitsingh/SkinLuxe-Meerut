import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all appointments
export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                treatment: true
            },
            orderBy: { date: 'desc' }
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create appointment (Admin or Public?) -> This is Admin, but can share logic
export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { name, phone, email, treatmentId, date, timeSlot, notes, status } = req.body;

        const appointment = await prisma.appointment.create({
            data: {
                name,
                phone,
                email,
                treatmentId,
                date: new Date(date),
                timeSlot,
                notes,
                status: status || 'PENDING'
            }
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update status
export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status }
        });

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete
export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.appointment.delete({ where: { id } });
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
