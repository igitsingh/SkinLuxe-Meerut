/**
 * Maintenance Mode Configuration
 * 
 * This file contains configuration for the maintenance mode system.
 * All settings are stored in the database and can be managed via the admin panel.
 */

export const maintenanceConfig = {
    /**
     * Routes that are always accessible even in maintenance mode
     */
    allowedRoutes: [
        '/admin',
        '/admin/*',
        '/api/*',
        '/_next/*',
        '/static/*',
        '/maintenance',
    ],

    /**
     * File extensions that are always accessible
     */
    allowedExtensions: [
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.svg',
        '.webp',
        '.ico',
        '.css',
        '.js',
        '.woff',
        '.woff2',
        '.ttf',
        '.eot',
    ],

    /**
     * Maintenance page path
     */
    maintenancePage: '/maintenance',

    /**
     * Admin panel path
     */
    adminPath: '/admin',

    /**
     * API path
     */
    apiPath: '/api',

    /**
     * Cache control headers for maintenance check
     */
    cacheHeaders: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    },
};

/**
 * Check if a route should be accessible during maintenance mode
 * @param pathname - The route pathname
 * @returns boolean
 */
export function isRouteAllowed(pathname: string): boolean {
    // Check if route starts with any allowed route
    for (const route of maintenanceConfig.allowedRoutes) {
        if (route.endsWith('/*')) {
            const baseRoute = route.slice(0, -2);
            if (pathname.startsWith(baseRoute)) {
                return true;
            }
        } else if (pathname === route || pathname.startsWith(route + '/')) {
            return true;
        }
    }

    // Check if pathname has an allowed extension
    for (const ext of maintenanceConfig.allowedExtensions) {
        if (pathname.endsWith(ext)) {
            return true;
        }
    }

    return false;
}

/**
 * Check if a pathname contains a file extension
 * @param pathname - The route pathname
 * @returns boolean
 */
export function hasFileExtension(pathname: string): boolean {
    return /\.[a-zA-Z0-9]+$/.test(pathname);
}
