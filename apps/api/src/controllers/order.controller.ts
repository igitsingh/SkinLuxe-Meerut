import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';
import { getIO } from '../socket';

const createOrderSchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        quantity: z.number().min(1),
        options: z.any().optional(),
        addons: z.array(z.any()).optional(),
    })),
    addressId: z.string().optional(),
    paymentMethod: z.enum(['COD', 'UPI', 'CARD', 'NET_BANKING']),
    instructions: z.string().optional(),
    isGuest: z.boolean().optional(),
    guestAddress: z.object({
        street: z.string(),
        city: z.string(),
        zip: z.string(),
    }).optional(),
    guestPhone: z.string().optional(),
    guestName: z.string().optional(),
});

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items, addressId, paymentMethod, instructions, isGuest, guestAddress, guestPhone, guestName } = createOrderSchema.parse(req.body);

        // @ts-ignore
        const userId = req.user?.userId;

        if (!userId && !isGuest) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        if (isGuest && !guestAddress) {
            res.status(400).json({ message: 'Guest address is required' });
            return;
        }

        if (!isGuest && !addressId) {
            res.status(400).json({ message: 'Address ID is required for logged-in users' });
            return;
        }

        // Calculate total
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const dbItem = await prisma.item.findUnique({ where: { id: item.id } });
            if (!dbItem) {
                res.status(404).json({ message: `Item not found: ${item.id}` });
                return;
            }

            let itemPrice = dbItem.price;
            // Add options price logic here if needed
            // Add addons price logic here if needed

            subtotal += itemPrice * item.quantity;
            orderItems.push({
                itemId: dbItem.id,
                name: dbItem.name,
                price: itemPrice,
                quantity: item.quantity,
                options: item.options,
                addons: item.addons,
            });
        }

        const tax = subtotal * 0.05;
        const deliveryFee = 50; // Fixed for now
        const total = subtotal + tax + deliveryFee;

        const order = await prisma.order.create({
            data: {
                userId: userId || undefined,
                status: 'PENDING',
                total,
                subtotal,
                tax,
                deliveryFee,
                paymentMethod,
                instructions,
                addressId: isGuest ? undefined : addressId,
                guestInfo: isGuest ? {
                    address: guestAddress,
                    phone: guestPhone,
                    name: guestName
                } : undefined,
                items: {
                    create: orderItems,
                },
            },
        });

        // Notify admins about new order
        try {
            getIO().of('/orders').emit('new_order', order);
        } catch (error) {
            console.error("Socket notification failed:", error);
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
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
                user: true,
                address: true  // Include user info for admin view
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
            include: { items: true, address: true },
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
