const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://skinluxe-meerut-api.onrender.com/api';

/**
 * Check if the site is in maintenance mode
 * @returns Promise<boolean>
 */
export async function isMaintenanceMode(): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/settings/maintenance`, { next: { revalidate: 60 } });
        if (!res.ok) return false;
        const data = await res.json();
        return !!data.enabled;
    } catch (e) {
        return false;
    }
}

/**
 * Enable maintenance mode
 * @returns Promise<boolean>
 */
export async function enableMaintenanceMode(): Promise<boolean> {
    // Admin only action - requires auth context which this lib function may not have
    // Should be handled via Admin API hook
    return false;
}

/**
 * Disable maintenance mode
 * @returns Promise<boolean>
 */
export async function disableMaintenanceMode(): Promise<boolean> {
    // Admin only action
    return false;
}

/**
 * Toggle maintenance mode
 * @returns Promise<boolean> - New state
 */
export async function toggleMaintenanceMode(): Promise<boolean> {
    return false;
}

