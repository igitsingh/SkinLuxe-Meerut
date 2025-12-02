import { Router } from 'express';
import { registerFcmToken } from '../controllers/notification.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register-token', authenticate, registerFcmToken);

export default router;
