
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Public Routes Imports
import authRoutes from './routes/auth.routes';
import treatmentRoutes from './routes/treatment.routes';

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
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        process.env.FRONTEND_URL,
        process.env.ADMIN_URL
    ].filter(Boolean).map(url => (url as string).replace(/\/$/, '')),
    credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// ==========================================
// ROUTES
// ==========================================

// Public
app.use('/api/auth', authRoutes);
app.use('/api/treatments', treatmentRoutes);
// Note: Blog public routes should also be added if we want public reading. I'll reuse admin route for GET for now or add public one.
// Let's add simple public blog route too.
app.use('/api/blog', adminBlogRoutes); // Reuse for read-only (admin route has getAllPosts)

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

const PORT = 5001;

if (process.env.NODE_ENV !== 'production') {
    httpServer.listen(PORT, () => {
        console.log(`SkinLuxe Server running on port ${PORT}`);
    });
}

export default app;
