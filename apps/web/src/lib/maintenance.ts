// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

/**
 * Check if the site is in maintenance mode
 * @returns Promise<boolean>
 */
export async function isMaintenanceMode(): Promise<boolean> {
    // TODO: Fetch from Main API instead of direct DB
    // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    // try {
    //     const res = await fetch(`${API_URL}/settings/maintenance`);
    //     return res.json().enabled;
    // } catch (e) { return false; }

    return false;
}

/**
 * Enable maintenance mode
 * @returns Promise<boolean>
 */
export async function enableMaintenanceMode(): Promise<boolean> {
    // try {
    //     await prisma.settings.upsert({
    //         where: { key: 'maintenanceMode' },
    //         update: { value: 'true' },
    //         create: { key: 'maintenanceMode', value: 'true' },
    //     });
    //     return true;
    // } catch (error) {
    //     console.error('Error enabling maintenance mode:', error);
    //     return false;
    // }
    return true; // No-op
}

/**
 * Disable maintenance mode
 * @returns Promise<boolean>
 */
export async function disableMaintenanceMode(): Promise<boolean> {
    // try {
    //     await prisma.settings.upsert({
    //         where: { key: 'maintenanceMode' },
    //         update: { value: 'false' },
    //         create: { key: 'maintenanceMode', value: 'false' },
    //     });
    //     return true;
    // } catch (error) {
    //     console.error('Error disabling maintenance mode:', error);
    //     return false;
    // }
    return true; // No-op
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
