import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const inquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional().nullable(),
    service: z.string().optional(),
    message: z.string().min(3, "Message is too short")
});

export const createPublicInquiry = async (req: Request, res: Response) => {
    try {
        // Validate input using Zod
        const validation = inquirySchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validation.error.format()
            });
        }

        const { name, email, phone, service, message } = validation.data;

        const inquiry = await prisma.inquiry.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone?.trim() || null,
                subject: service || 'General Inquiry',
                message: message.trim(),
                status: 'NEW'
            }
        });

        // For public, we might not want to return the full object with ID, but it's usually fine. 
        // Let's return a success message and limited data.
        res.status(201).json({
            message: "Inquiry received successfully",
            id: inquiry.id
        });

    } catch (error) {
        console.error('Create public inquiry error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
