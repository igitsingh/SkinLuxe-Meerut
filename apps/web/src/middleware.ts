import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
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

    // MAINTENANCE MODE CHECK DISABLED (Static for now to prevent blocking)
    /*
    try {
        const baseUrl = request.nextUrl.origin;
        // ... fetch logic commented out ...
    } catch (error) { ... }
    */

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
