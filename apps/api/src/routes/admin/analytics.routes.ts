import { Router } from 'express';
import { getDashboardStats } from '../../controllers/admin/analytics.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/dashboard', getDashboardStats);

export default router;
