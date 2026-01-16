import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const appointmentSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    email: z.string().email("Invalid email format").optional().or(z.literal('')),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    timeSlot: z.string().optional(),
    treatmentId: z.string().uuid().optional().nullable(),  // Accept treatment UUID
    notes: z.string().optional()
});

export const createPublicAppointment = async (req: Request, res: Response) => {
    try {
        // Validate input using Zod
        const validation = appointmentSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validation.error.format()
            });
        }

        const { name, phone, email, date, timeSlot, treatmentId, notes } = validation.data;

        const appointment = await prisma.appointment.create({
            data: {
                name: name.trim(),
                phone: phone.replace(/\s/g, '').trim(),
                email: email?.toLowerCase().trim() || null,
                date: new Date(date),
                timeSlot: timeSlot || 'Pending',
                treatmentId: treatmentId || null,  // Link to Treatment if provided
                notes: notes?.trim() || null,
                status: 'PENDING'
            }
        });

        console.log('Public appointment created successfully:', appointment.id);
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Create public appointment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
