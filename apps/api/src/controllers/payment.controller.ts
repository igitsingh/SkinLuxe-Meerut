import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../config/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    typescript: true,
});

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.body;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Mock for development if key is placeholder
        if (process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder' || !process.env.STRIPE_SECRET_KEY) {
            console.log('Using MOCK payment intent for development');
            res.json({ clientSecret: 'mock_client_secret_for_dev' });
            return;
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.total * 100), // Amount in cents
            currency: 'inr',
            metadata: {
                orderId: order.id,
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ message: 'Payment initiation failed' });
    }
};

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );
    } catch (err: any) {
        res.status(400).send(`Webhook Error: ${err.message} `);
        return;
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        if (orderId) {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'PREPARING' }, // Or a specific PAID status if we had one
            });
            // Emit socket event here if needed
        }
    }

    res.json({ received: true });
};

import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder',
});

export const createRazorpayOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.body;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        const options = {
            amount: Math.round(order.total * 100), // Amount in paise
            currency: 'INR',
            receipt: orderId,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        await prisma.order.update({
            where: { id: orderId },
            data: { razorpayOrderId: razorpayOrder.id },
        });

        res.json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Razorpay create order error:', error);
        res.status(500).json({ message: 'Failed to create Razorpay order' });
    }
};

export const verifyRazorpayPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const order = await prisma.order.findFirst({
                where: { razorpayOrderId: razorpay_order_id },
            });

            if (order) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        paymentStatus: 'PAID',
                        status: 'PREPARING', // Auto-accept paid orders
                        razorpayPaymentId: razorpay_payment_id,
                        razorpaySignature: razorpay_signature,
                    },
                });
            }

            res.json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Razorpay verify error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
