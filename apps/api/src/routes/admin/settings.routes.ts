import { Router } from 'express';
import { getSettings, updateSettings } from '../../controllers/admin/settings.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getSettings);
router.put('/', updateSettings);

export default router;
