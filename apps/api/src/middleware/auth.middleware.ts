import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('FATAL: JWT_SECRET environment variable is required but not set');
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        // Check for cookie
        // @ts-ignore
        const cookieToken = req.cookies?.admin_token;
        console.log('Auth Middleware - Cookies:', req.cookies);
        console.log('Auth Middleware - Headers:', req.headers);
        if (cookieToken) {
            // Verify cookie token
            jwt.verify(cookieToken, JWT_SECRET, (err: any, user: any) => {
                if (err) return res.sendStatus(403);
                // @ts-ignore
                req.user = user;
                next();
            });
            return;
        }
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        // @ts-ignore
        req.user = user;
        next();
    });
};
