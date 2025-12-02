import { Router } from 'express';
import { signup, login, getMe, googleLogin, whatsappLogin, guestLogin } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/whatsapp', whatsappLogin);
router.post('/guest', guestLogin);
router.get('/me', authenticate, getMe);

export default router;
