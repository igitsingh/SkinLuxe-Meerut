import { Request, Response } from 'express';
import prisma from '../config/db';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';
import { z } from 'zod';

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    phone: z.string().optional(),
});

const loginSchema = z.object({
    identifier: z.string(),
    password: z.string(),
});

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, phone } = signupSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone: phone || null,
                role: 'CUSTOMER', // Default for public signup
            },
        });

        const token = generateToken(user.id, user.role);
        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { identifier, password } = loginSchema.parse(req.body);

        // Check if identifier is email or phone
        const isEmail = identifier.includes('@');

        let user;
        if (isEmail) {
            user = await prisma.user.findUnique({ where: { email: identifier } });
        } else {
            // Phone lookup
            user = await prisma.user.findUnique({ where: { phone: identifier } });
        }

        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id, user.role);

        if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
            res.cookie('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 24 * 60 * 60 * 1000,
            });
        }

        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone } });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name } = req.body; // Remove googleId usage for now, rely on email

        if (!email) {
            res.status(400).json({ message: 'Email is required' });
            return;
        }

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || 'Google User',
                    password: await hashPassword(Math.random().toString(36).slice(-8)),
                    role: 'CUSTOMER',
                },
            });
        }

        const token = generateToken(user.id, user.role);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone } });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const guestLogin = async (req: Request, res: Response): Promise<void> => {
    // Guest login creates a temp account or just token?
    // Creating temp account pollutes DB.
    // Let's create a temp account for now to keep logic consistent.
    try {
        const timestamp = Date.now();
        const email = `guest_${timestamp}@skinluxe.com`;
        const password = await hashPassword(`guest_${timestamp}`);

        const user = await prisma.user.create({
            data: {
                email,
                password,
                name: 'GUEST CUSTOMER',
                role: 'CUSTOMER',
            },
        });

        const token = generateToken(user.id, user.role);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, isGuest: true } });

        // Lazy Cleanup: Trigger cleanup of guests older than 24 hours
        // Fire and forget (don't await) avoids delaying the response
        cleanupOldGuests().catch(err => console.error('Background cleanup failed', err));

    } catch (error) {
        console.error('Guest login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Helper to clean up old guest accounts (Retention Policy: 24 Hours)
const cleanupOldGuests = async () => {
    try {
        // 1. Identify guests created > 24 hours ago
        const retentionLimit = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const oldGuests = await prisma.user.findMany({
            where: {
                email: { startsWith: 'guest_' },
                createdAt: { lt: retentionLimit }
            },
            select: { id: true }
        });

        if (oldGuests.length === 0) return;

        const guestIds = oldGuests.map(u => u.id);
        console.log(`Found ${guestIds.length} expired guest accounts to clean up.`);

        // 2. Delete related ActivityLogs first (Foreign Key constraint)
        await prisma.activityLog.deleteMany({
            where: { userId: { in: guestIds } }
        });

        // 3. Delete the Guest Users
        const deleted = await prisma.user.deleteMany({
            where: { id: { in: guestIds } }
        });

        console.log(`Successfully cleaned up ${deleted.count} old guest accounts.`);
    } catch (error) {
        console.error('Retention policy execution failed:', error);
    }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true, phone: true },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
