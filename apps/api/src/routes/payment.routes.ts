import { Router } from 'express';
import { createPaymentIntent, handleWebhook, createRazorpayOrder, verifyRazorpayPayment } from '../controllers/payment.controller';
import { authenticate } from '../middlewares/auth.middleware';
import express from 'express';

const router = Router();

router.post('/create-intent', authenticate, createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.post('/razorpay/create-order', authenticate, createRazorpayOrder);
router.post('/razorpay/verify', authenticate, verifyRazorpayPayment);

export default router;
