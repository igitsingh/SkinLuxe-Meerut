import { Router } from 'express';
import { signup, login, googleLogin, guestLogin, getMe } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/guest', guestLogin);

router.get('/me', authenticateToken, getMe);

export default router;
