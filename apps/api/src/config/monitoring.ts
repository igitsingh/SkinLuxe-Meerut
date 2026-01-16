/**
 * Sentry Error Tracking Configuration
 * 
 * To enable Sentry monitoring:
 * 1. Sign up at https://sentry.io
 * 2. Create a new project for "SkinLuxe API"
 * 3. Copy your DSN from project settings
 * 4. Add to environment variables: SENTRY_DSN=https://...
 */

import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

export const initSentry = () => {
    const SENTRY_DSN = process.env.SENTRY_DSN;

    if (!SENTRY_DSN) {
        console.warn('⚠️  Sentry DSN not configured. Error tracking disabled.');
        return;
    }

    Sentry.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',

        // Performance Monitoring
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

        // Profiling
        profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        integrations: [
            new ProfilingIntegration(),
        ],

        // Filter sensitive data
        beforeSend(event, hint) {
            // Remove sensitive headers
            if (event.request?.headers) {
                delete event.request.headers['authorization'];
                delete event.request.headers['cookie'];
            }

            // Remove password fields from request data
            if (event.request?.data) {
                const data = event.request.data;
                if (typeof data === 'object' && data !== null) {
                    if ('password' in data) delete data.password;
                    if ('newPassword' in data) delete data.newPassword;
                }
            }

            return event;
        },
    });

    console.log('✓ Sentry error tracking initialized');
};

export const captureException = (error: Error, context?: Record<string, any>) => {
    if (process.env.SENTRY_DSN) {
        Sentry.captureException(error, { extra: context });
    }
    console.error('Error:', error, context);
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
    if (process.env.SENTRY_DSN) {
        Sentry.captureMessage(message, level);
    }
    console.log(`[${level.toUpperCase()}]`, message);
};
