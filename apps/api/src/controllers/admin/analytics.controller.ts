import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const [treatmentCount, inquiryCount, appointmentCount, blogCount] = await Promise.all([
            prisma.treatment.count(),
            prisma.inquiry.count(),
            prisma.appointment.count(),
            prisma.blogPost.count(),
        ]);

        const [statusCounts, inquiryStatusCountsRaw] = await Promise.all([
            prisma.appointment.groupBy({
                by: ['status'],
                _count: { status: true }
            }),
            prisma.inquiry.groupBy({
                by: ['status'],
                _count: { status: true }
            })
        ]);

        const appointmentStatusCounts = statusCounts.reduce((acc, curr) => {
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>);

        const inquiryStatusCounts = inquiryStatusCountsRaw.reduce((acc, curr) => {
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>);

        const recentAppointments = await prisma.appointment.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: { treatment: true }
        });

        res.json({
            stats: {
                totalTreatments: treatmentCount,
                totalInquiries: inquiryCount,
                totalAppointments: appointmentCount,
                totalRevenue: 0,
                appointmentStatusCounts,
                inquiryStatusCounts
            },
            recentAppointments
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
