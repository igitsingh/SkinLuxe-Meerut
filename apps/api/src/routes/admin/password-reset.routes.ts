import { Router } from 'express';
import {
    requestPasswordReset,
    verifyResetToken,
    resetPassword
} from '../../controllers/admin/password-reset.controller';

const router = Router();

// Request password reset (public - no auth required)
router.post('/request-reset', requestPasswordReset);

// Verify reset token (public - used by frontend to validate token)
router.get('/verify-token/:token', verifyResetToken);

// Reset password with token (public - no auth required)
router.post('/reset-password', resetPassword);

export default router;
