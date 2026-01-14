import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all appointments
export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const { email, phone } = req.query;

        let where: any = {};
        if (email) where.email = String(email);
        if (phone) where.phone = String(phone);

        const appointments = await prisma.appointment.findMany({
            where,
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
        const { userId, name, phone, email, treatmentId, date, time, timeSlot, notes, status } = req.body;

        let appointmentData: any = {
            treatmentId,
            date: new Date(date),
            timeSlot: timeSlot || time || '00:00', // Accept either timeSlot or time
            notes,
            status: status || 'PENDING'
        };

        // If userId is provided, fetch user details
        if (userId) {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            appointmentData.name = user.name;
            appointmentData.phone = user.phone || '';
            appointmentData.email = user.email;
        } else {
            // Guest booking - use provided details
            appointmentData.name = name;
            appointmentData.phone = phone;
            appointmentData.email = email;
        }

        const appointment = await prisma.appointment.create({
            data: appointmentData,
            include: {
                treatment: true
            }
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({ message: 'Internal server error', error: String(error) });
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
