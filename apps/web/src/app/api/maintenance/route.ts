import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET maintenance mode status
export async function GET(request: NextRequest) {
    try {
        // Try to get from database first
        const maintenanceSetting = await prisma.settings.findUnique({
            where: { key: 'maintenanceMode' }
        });

        const isMaintenanceMode = maintenanceSetting?.value === 'true' ||
            maintenanceSetting?.value === true;

        return NextResponse.json(
            {
                success: true,
                maintenanceMode: isMaintenanceMode,
                message: isMaintenanceMode
                    ? 'Site is currently in maintenance mode'
                    : 'Site is operational',
            },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            }
        );
    } catch (error) {
        console.error('Error checking maintenance mode:', error);
        return NextResponse.json(
            {
                success: false,
                maintenanceMode: false,
                error: 'Failed to check maintenance mode'
            },
            { status: 500 }
        );
    }
}

// POST toggle maintenance mode (for quick toggle)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { enabled } = body;

        // Update in database
        await prisma.settings.upsert({
            where: { key: 'maintenanceMode' },
            update: { value: String(enabled) },
            create: { key: 'maintenanceMode', value: String(enabled) },
        });

        return NextResponse.json({
            success: true,
            maintenanceMode: enabled,
            message: enabled
                ? 'Maintenance mode enabled'
                : 'Maintenance mode disabled',
        });
    } catch (error) {
        console.error('Error toggling maintenance mode:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to toggle maintenance mode' },
            { status: 500 }
        );
    }
}
