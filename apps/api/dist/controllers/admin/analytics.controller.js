"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardStats = async (req, res) => {
    try {
        const [treatmentCount, inquiryCount, appointmentCount, blogCount] = await Promise.all([
            prisma.treatment.count(),
            prisma.inquiry.count(),
            prisma.appointment.count(),
            prisma.blogPost.count(),
        ]);
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
                totalRevenue: 0, // Placeholder
            },
            recentAppointments
        });
    }
    catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getDashboardStats = getDashboardStats;
