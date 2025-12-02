import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';

const registerTokenSchema = z.object({
    fcmToken: z.string(),
});

export const registerFcmToken = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const { fcmToken } = registerTokenSchema.parse(req.body);

        await prisma.user.update({
            where: { id: userId },
            data: { fcmToken },
        });

        res.json({ message: 'FCM token registered successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            console.error('Register FCM token error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Placeholder for sending notifications (to be used by other controllers)
export const sendNotification = async (userId: string, title: string, body: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user?.fcmToken) return;

        // In a real app, you would use firebase-admin here
        console.log(`[MOCK FCM] Sending to ${user.email} (${user.fcmToken}): ${title} - ${body}`);

        // Example implementation if firebase-admin was installed:
        // await admin.messaging().send({
        //   token: user.fcmToken,
        //   notification: { title, body },
        // });

    } catch (error) {
        console.error('Send notification error:', error);
    }
};
