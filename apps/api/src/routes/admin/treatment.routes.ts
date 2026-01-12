import { Router } from 'express';
import {
    getAllTreatments,
    getTreatment,
    createTreatment,
    updateTreatment,
    deleteTreatment
} from '../../controllers/admin/treatment.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

// Public routes (if needed, move to public router)
// But this is admin router
router.use(authenticateToken);

router.get('/', getAllTreatments);
router.get('/:id', getTreatment);
router.post('/', createTreatment);
router.put('/:id', updateTreatment);
router.delete('/:id', deleteTreatment);

export default router;
