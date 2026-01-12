import { Router } from 'express';
import {
    getAllAppointments,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment
} from '../../controllers/admin/appointment.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointmentStatus); // Usually limit update to status for appointments
router.delete('/:id', deleteAppointment);

export default router;
