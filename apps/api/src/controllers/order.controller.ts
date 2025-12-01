import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';
import { getIO } from '../socket';

const createOrderSchema = z.object({
    items: z.array(
        z.object({
            itemId: z.string(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
            options: z.any().optional(),
            addons: z.any().optional(),
        })
    ),
    total: z.number(),
    addressId: z.string().optional(),
    paymentMethod: z.enum(['COD', 'UPI', 'CARD', 'NET_BANKING']).default('COD'),
    paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED']).default('PENDING'),
    paymentDetails: z.any().optional(),
});

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const { items, total, addressId, paymentMethod, paymentStatus, paymentDetails } = createOrderSchema.parse(req.body);

        const order = await prisma.order.create({
            data: {
                userId,
                total,
                status: 'PENDING',
                // @ts-ignore - addressId might not be in schema yet, but we will add it
                addressId: addressId,
                paymentMethod,
                paymentStatus,
                paymentDetails: paymentDetails || {},
                items: {
                    create: items.map((item) => ({
                        itemId: item.itemId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        options: item.options,
                        addons: item.addons,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        // Notify admin (or specific room)
        getIO().of('/orders').emit('new_order', order);

        // Send Notification
        const fullOrder = await prisma.order.findUnique({
            where: { id: order.id },
            include: { user: true }
        });

        if (fullOrder) {
            const { NotificationService } = require('../services/notification.service');
            NotificationService.sendOrderConfirmation(fullOrder);
        }

        res.status(201).json(order);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            console.error('Create order error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        // @ts-ignore
        const userRole = req.user?.role;

        // If admin, return all orders. Otherwise, return only user's orders
        const whereClause = userRole === 'ADMIN' ? {} : { userId };

        const orders = await prisma.order.findMany({
            where: whereClause,
            include: {
                items: true,
                user: true  // Include user info for admin view
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        // @ts-ignore
        const userId = req.user?.userId;

        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // @ts-ignore
        if (order.userId !== userId && req.user?.role !== 'ADMIN') {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });

        // Notify user via socket
        getIO().of('/orders').to(id).emit('order_status_updated', { orderId: id, status });

        // Send Notification
        const fullOrder = await prisma.order.findUnique({
            where: { id },
            include: { user: true }
        });

        if (fullOrder) {
            const { NotificationService } = require('../services/notification.service');
            NotificationService.sendStatusUpdate(fullOrder);
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
