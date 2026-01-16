import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { hashPassword } from '../../utils/auth';

const prisma = new PrismaClient();

/**
 * Request Password Reset
 * Generates a secure token and sends reset email
 */
export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user (only ADMIN users can reset via this flow)
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, role: true, name: true }
        });

        // Always return success to prevent email enumeration
        // But only send email if user exists and is admin
        if (user && user.role === 'ADMIN') {
            // Generate secure random token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

            // Save token to database
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    resetToken,
                    resetTokenExpiry
                }
            });

            // TODO: Send email with reset link
            // For now, log the token (REMOVE IN PRODUCTION)
            console.log(`Password reset requested for ${email}`);
            console.log(`Reset token: ${resetToken}`);
            console.log(`Reset link: ${process.env.ADMIN_URL}/reset-password?token=${resetToken}`);

            // In production, use a service like SendGrid, AWS SES, or Nodemailer
            // Example:
            // await sendEmail({
            //     to: user.email,
            //     subject: 'Password Reset Request - SkinLuxe Admin',
            //     html: `Click here to reset your password: ${process.env.ADMIN_URL}/reset-password?token=${resetToken}`
            // });
        }

        // Always return success message (security best practice)
        res.json({
            message: 'If an admin account exists with that email, a password reset link has been sent.'
        });

    } catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Verify Reset Token
 * Checks if token is valid and not expired
 */
export const verifyResetToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gte: new Date() },
                role: 'ADMIN'
            },
            select: { email: true }
        });

        if (!user) {
            return res.status(400).json({
                valid: false,
                message: 'Invalid or expired reset token'
            });
        }

        res.json({ valid: true, email: user.email });

    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Reset Password
 * Updates password using valid token
 */
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Find user with valid token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gte: new Date() },
                role: 'ADMIN'
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);

        // Update password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        res.json({ message: 'Password reset successful. You can now log in with your new password.' });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
