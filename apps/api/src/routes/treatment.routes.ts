import { Router } from 'express';
import { getPublicTreatments, getTreatmentBySlug } from '../controllers/treatment.controller';

const router = Router();

router.get('/', getPublicTreatments);
router.get('/:slug', getTreatmentBySlug);

export default router;
