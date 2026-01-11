import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always allow admin routes
    if (pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // Always allow API routes
    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Always allow static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Files with extensions (images, fonts, etc.)
    ) {
        return NextResponse.next();
    }

    // Check maintenance mode
    try {
        // Fetch settings from API
        const baseUrl = request.nextUrl.origin;
        const settingsResponse = await fetch(`${baseUrl}/api/settings`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (settingsResponse.ok) {
            const settingsData = await settingsResponse.json();
            const isMaintenanceMode = settingsData?.data?.maintenanceMode === true ||
                settingsData?.data?.maintenanceMode === 'true';

            // If maintenance mode is enabled and not on maintenance page
            if (isMaintenanceMode && pathname !== '/maintenance') {
                // Redirect to maintenance page
                return NextResponse.redirect(new URL('/maintenance', request.url));
            }

            // If maintenance mode is disabled and on maintenance page
            if (!isMaintenanceMode && pathname === '/maintenance') {
                // Redirect to home
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    } catch (error) {
        console.error('Middleware error checking maintenance mode:', error);
        // On error, allow the request to proceed
    }

    return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (handled separately)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|admin).*)',
    ],
};
