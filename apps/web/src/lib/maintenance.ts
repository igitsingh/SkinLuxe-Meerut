import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Check if the site is in maintenance mode
 * @returns Promise<boolean>
 */
export async function isMaintenanceMode(): Promise<boolean> {
    try {
        const setting = await prisma.settings.findUnique({
            where: { key: 'maintenanceMode' }
        });

        return setting?.value === 'true' || setting?.value === true;
    } catch (error) {
        console.error('Error checking maintenance mode:', error);
        return false; // Default to false on error
    }
}

/**
 * Enable maintenance mode
 * @returns Promise<boolean>
 */
export async function enableMaintenanceMode(): Promise<boolean> {
    try {
        await prisma.settings.upsert({
            where: { key: 'maintenanceMode' },
            update: { value: 'true' },
            create: { key: 'maintenanceMode', value: 'true' },
        });
        return true;
    } catch (error) {
        console.error('Error enabling maintenance mode:', error);
        return false;
    }
}

/**
 * Disable maintenance mode
 * @returns Promise<boolean>
 */
export async function disableMaintenanceMode(): Promise<boolean> {
    try {
        await prisma.settings.upsert({
            where: { key: 'maintenanceMode' },
            update: { value: 'false' },
            create: { key: 'maintenanceMode', value: 'false' },
        });
        return true;
    } catch (error) {
        console.error('Error disabling maintenance mode:', error);
        return false;
    }
}

/**
 * Toggle maintenance mode
 * @returns Promise<boolean> - New state
 */
export async function toggleMaintenanceMode(): Promise<boolean> {
    const currentState = await isMaintenanceMode();
    if (currentState) {
        await disableMaintenanceMode();
        return false;
    } else {
        await enableMaintenanceMode();
        return true;
    }
}
