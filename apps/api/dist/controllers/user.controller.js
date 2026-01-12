"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const db_1 = __importDefault(require("../config/db"));
const updateProfile = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const { name, phone } = req.body;
        const user = await db_1.default.user.update({
            where: { id: userId },
            data: { name, phone },
            select: { id: true, email: true, name: true, role: true, phone: true },
        });
        res.json(user);
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateProfile = updateProfile;
