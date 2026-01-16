/**
 * API Configuration Utility
 * Ensures API URL is always defined in production to prevent silent failures
 */

export function getApiUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(
                'CRITICAL: NEXT_PUBLIC_API_URL is not defined in production environment. ' +
                'Please configure this environment variable in your deployment settings.'
            );
        }

        // Development fallback only
        console.warn('⚠️ NEXT_PUBLIC_API_URL not set, using localhost fallback (dev only)');
        return 'http://localhost:5001/api';
    }

    return apiUrl;
}

export function getSocketUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(
                'CRITICAL: NEXT_PUBLIC_API_URL is not defined in production environment. ' +
                'Cannot establish socket connection without API URL.'
            );
        }

        // Development fallback only - corrected port to 5001
        console.warn('⚠️ NEXT_PUBLIC_API_URL not set, using localhost fallback (dev only)');
        return 'http://localhost:5001';
    }

    return apiUrl.replace('/api', '');
}
