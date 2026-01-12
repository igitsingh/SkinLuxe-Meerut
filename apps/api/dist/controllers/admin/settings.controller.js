"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSettings = async (req, res) => {
    try {
        let settings = await prisma.settings.findFirst();
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    siteName: 'SkinLuxe Aesthetics',
                    contactPhone: '',
                    contactEmail: '',
                    maintenanceMode: false
                },
            });
        }
        res.json(settings);
    }
    catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        const data = req.body;
        let settings = await prisma.settings.findFirst();
        if (settings) {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: { ...data },
            });
        }
        else {
            settings = await prisma.settings.create({
                data: {
                    siteName: 'SkinLuxe Aesthetics',
                    contactPhone: '',
                    contactEmail: '',
                    ...data
                },
            });
        }
        res.json(settings);
    }
    catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateSettings = updateSettings;
