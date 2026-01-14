
import { Router } from 'express';
import { getInquiries, createInquiry, updateInquiryStatus, deleteInquiry } from '../../controllers/admin/inquiry.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getInquiries);
router.post('/', createInquiry); // Admins can also create inquiries manually if needed
router.put('/:id', updateInquiryStatus);
router.delete('/:id', deleteInquiry);

export default router;
