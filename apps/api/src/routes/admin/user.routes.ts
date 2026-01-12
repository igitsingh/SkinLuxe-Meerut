import { Router } from 'express';
import { getAllUsers, getUserById, updateUserStatus, updateUserRole, createUser } from '../../controllers/admin/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id/status', updateUserStatus);
router.patch('/:id/role', updateUserRole);

export default router;
