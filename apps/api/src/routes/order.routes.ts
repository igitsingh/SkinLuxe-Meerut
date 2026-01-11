import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrderStatus } from '../controllers/order.controller';
import { authenticate, authorizeAdmin, optionalAuthenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', optionalAuthenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrder);
router.put('/:id/status', authenticate, authorizeAdmin, updateOrderStatus);

export default router;
