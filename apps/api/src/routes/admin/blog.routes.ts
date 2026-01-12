import { Router } from 'express';
import { getAllPosts, createPost, deletePost } from '../../controllers/admin/blog.controller';

const router = Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);

export default router;
