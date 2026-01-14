
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await prisma.inquiry.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(inquiries);
    } catch (error) {
        console.error('Fetch inquiries error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createInquiry = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                message: 'Name, email, and message are required'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

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

        console.log('Inquiry created successfully:', inquiry.id);
        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Create inquiry error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: { status },
        });
        res.json(inquiry);
    } catch (error) {
        console.error('Update inquiry error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteInquiry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.inquiry.delete({
            where: { id },
        });
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        console.error('Delete inquiry error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
