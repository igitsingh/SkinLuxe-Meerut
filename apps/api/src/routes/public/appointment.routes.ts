import { Router } from 'express';
import { createPublicAppointment } from '../../controllers/public/appointment.controller';

const router = Router();

// Public appointment booking (no authentication required)
router.post('/', createPublicAppointment);

export default router;
