
import './lib/db-guard';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import rateLimit from 'express-rate-limit';
import { initSentry } from './config/monitoring';

dotenv.config();

// Initialize monitoring (Sentry, etc.)
initSentry();

const app = express();
const httpServer = createServer(app);

// Trust Proxy (Required for proper Rate Limiting on Render)
app.set('trust proxy', 1);

// Rate limiting configuration
// Rate limiting configuration
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Fixed limit
    message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests, please try again later.' } },
    standardHeaders: true,
    legacyHeaders: false,
});

const formLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // Strict for forms
    message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many form submissions, please wait a minute.' } },
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 20, // Strict for login/auth endpoints
    message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts, please try again later.' } },
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
import adminPasswordResetRoutes from './routes/admin/password-reset.routes';

// Error Handler Import
import { globalErrorHandler } from './middleware/error.middleware';
import { AppError } from './utils/AppError';

// Middleware
app.use(express.json());
app.use(cookieParser());
// CORS Lockdown
const ALLOWED_ORIGINS = [
    // Production Frontends
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'https://skinluxe-meerut.vercel.app',
    'https://admin-skinluxe-meerut.vercel.app',
    'https://skinluxe-meerut-admin-og.vercel.app', // Added specific user URL
    'https://skinluxe-meerut-web-og.vercel.app', // <--- ADDED: Production Customer Website
    // Local Development
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
].filter(Boolean).map(url => (url as string).replace(/\/$/, ''));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`BLOCKED CORS ORIGIN: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
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
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/appointments', formLimiter, publicAppointmentRoutes); // Public appointment bookings with rate limit
// Note: Blog public routes should also be added if we want public reading. I'll reuse admin route for GET for now or add public one.
// Let's add simple public blog route too.
app.use('/api/blog', adminBlogRoutes); // Reuse for read-only (admin route has getAllPosts)
app.use('/api/inquiries', formLimiter, publicInquiryRoutes); // Public inquiry submissions with rate limit (SECURED: POST ONLY)

// Admin
app.use('/api/admin/auth', authLimiter, adminAuthRoutes);
app.use('/api/admin/password-reset', formLimiter, adminPasswordResetRoutes); // Password reset (public but rate-limited)
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
        // Verify database connectivity without exposing details
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        // Return 503 Service Unavailable if database is down
        res.status(503).json({ status: 'unavailable' });
    }
});

const PORT = process.env.PORT || 5001;

// 404 Handler for undefined routes
// 404 Handler for undefined routes
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404, 'NOT_FOUND'));
});

// GLOBAL ERROR HANDLER (MUST BE LAST)
app.use(globalErrorHandler);

// ==========================================
// SOCKET.IO INITIALIZATION
// ==========================================
import { initSocket } from './socket';
import { setupOrderSockets } from './sockets/order.socket';

const io = initSocket(httpServer);
setupOrderSockets(io);
console.log('✓ Socket.io initialized with order tracking namespace');

httpServer.listen(PORT, () => {
    console.log(`SkinLuxe Server running on port ${PORT}`);
});

export default app;
