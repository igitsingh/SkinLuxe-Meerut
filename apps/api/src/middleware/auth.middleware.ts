import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('FATAL: JWT_SECRET environment variable is required but not set');
}

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        let token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            // Check for cookie fallback (Primary for Admin Panel)
            const cookieToken = req.cookies?.admin_token;
            if (cookieToken) {
                token = cookieToken;
            }
        }

        if (!token) {
            return next(new AppError('No authentication token provided.', 401, 'UNAUTHORIZED'));
        }

        // Verify token (Synchronous call to let global handler catch errors)
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        // Let global error handler (which handles JsonWebTokenError/TokenExpiredError) take over
        next(error);
    }
};
