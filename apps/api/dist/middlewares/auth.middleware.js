"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticate = exports.authorizeAdmin = exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
const authenticate = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token && req.cookies) {
        token = req.cookies.admin_token;
    }
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    // @ts-ignore
    if (req.user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
const optionalAuthenticate = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token && req.cookies) {
        token = req.cookies.admin_token;
    }
    if (!token) {
        next();
        return;
    }
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        // If token is invalid, just proceed as guest
        next();
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
