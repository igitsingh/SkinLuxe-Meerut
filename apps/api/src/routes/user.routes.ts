import { Router } from 'express';
import { addAddress, getAddresses, deleteAddress, updateAddress, updateProfile } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.put('/me', authenticate, updateProfile);
router.post('/addresses', authenticate, addAddress);
router.get('/addresses', authenticate, getAddresses);
router.delete('/addresses/:id', authenticate, deleteAddress);
router.put('/addresses/:id', authenticate, updateAddress);

export default router;
