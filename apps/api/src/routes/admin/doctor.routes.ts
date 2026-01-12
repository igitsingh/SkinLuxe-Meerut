import { Router } from 'express';
import {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
} from '../../controllers/admin/doctor.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllDoctors);
router.post('/', createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
