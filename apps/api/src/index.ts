
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Rate limiting configuration
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Higher limit for development
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const formLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: process.env.NODE_ENV === 'production' ? 5 : 50, // Higher limit for development
    message: 'Too many form submissions, please wait a minute.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Public Routes Imports
import authRoutes from './routes/auth.routes';
import treatmentRoutes from './routes/treatment.routes';
import publicAppointmentRoutes from './routes/public/appointment.routes';
import publicInquiryRoutes from './routes/public/inquiry.routes';

// Admin Routes Imports
import adminAuthRoutes from './routes/admin/auth.routes';
import adminUserRoutes from './routes/admin/user.routes';
import adminSettingsRoutes from './routes/admin/settings.routes';
import adminTreatmentRoutes from './routes/admin/treatment.routes';
import adminDoctorRoutes from './routes/admin/doctor.routes';
import adminAppointmentRoutes from './routes/admin/appointment.routes';
import adminAnalyticsRoutes from './routes/admin/analytics.routes';
import adminBlogRoutes from './routes/admin/blog.routes';
import adminInquiryRoutes from './routes/admin/inquiry.routes';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        // Development
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        // Production (update these with your actual Vercel URLs)
        process.env.FRONTEND_URL,
        process.env.ADMIN_URL,
        'https://skinluxe-meerut.vercel.app',
        'https://admin-skinluxe-meerut.vercel.app'
    ].filter(Boolean).map(url => (url as string).replace(/\/$/, '')),
    credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// ==========================================
// ROUTES
// ==========================================

// Apply general rate limiting to all API routes
app.use('/api/', generalLimiter);

// Public
app.use('/api/auth', authRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/appointments', formLimiter, publicAppointmentRoutes); // Public appointment bookings with rate limit
// Note: Blog public routes should also be added if we want public reading. I'll reuse admin route for GET for now or add public one.
// Let's add simple public blog route too.
app.use('/api/blog', adminBlogRoutes); // Reuse for read-only (admin route has getAllPosts)
app.use('/api/inquiries', formLimiter, publicInquiryRoutes); // Public inquiry submissions with rate limit (SECURED: POST ONLY)

// Admin
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);

// SkinLuxe Specific Admin Routes
app.use('/api/admin/treatments', adminTreatmentRoutes);
app.use('/api/admin/doctors', adminDoctorRoutes);
app.use('/api/admin/appointments', adminAppointmentRoutes);
app.use('/api/admin/blog', adminBlogRoutes);
app.use('/api/admin/inquiries', adminInquiryRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'SkinLuxe Aesthetics & Academy API' });
});

import prisma from './config/db';

app.get('/healthz', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: 'ok',
            uptime: process.uptime(),
            env: process.env.NODE_ENV,
            db: 'connected'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            uptime: process.uptime(),
            env: process.env.NODE_ENV,
            db: 'disconnected'
        });
    }
});

const PORT = process.env.PORT || 5001;

httpServer.listen(PORT, () => {
    console.log(`SkinLuxe Server running on port ${PORT}`);
});

export default app;
