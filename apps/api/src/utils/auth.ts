import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// CRITICAL: JWT_SECRET must be set in environment variables
// Server will crash on startup if missing to prevent silent security degradation
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error(
        'FATAL SECURITY ERROR: JWT_SECRET environment variable is not set. ' +
        'This is required for secure token generation. Server cannot start without it. ' +
        'Please configure JWT_SECRET in your environment variables.'
    );
}

export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
