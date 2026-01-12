import { Request, Response } from 'express';
import prisma from '../config/db';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const { name, phone } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name, phone },
            select: { id: true, email: true, name: true, role: true, phone: true },
        });

        res.json(user);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
