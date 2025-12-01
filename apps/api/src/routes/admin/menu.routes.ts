import { Router } from 'express';
import { createItem, updateItem, deleteItem, getAllItems } from '../../controllers/admin/menu.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
