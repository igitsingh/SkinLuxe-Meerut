import { Router } from 'express';
import { createPublicInquiry } from '../../controllers/public/inquiry.controller';

const router = Router();

// Public inquiry submission (POST only)
router.post('/', createPublicInquiry);

export default router;
