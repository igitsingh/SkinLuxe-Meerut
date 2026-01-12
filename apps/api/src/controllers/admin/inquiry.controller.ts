
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
