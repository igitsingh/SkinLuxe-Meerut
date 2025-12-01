import { Router } from 'express';
import { createCategory, updateCategory, deleteCategory, getAllCategories } from '../../controllers/admin/category.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
