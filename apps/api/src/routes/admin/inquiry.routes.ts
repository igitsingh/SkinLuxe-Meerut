
import { Router } from 'express';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../controllers/admin/inquiry.controller';

const router = Router();

router.get('/', getInquiries);
router.put('/:id', updateInquiryStatus);
router.delete('/:id', deleteInquiry);

export default router;
