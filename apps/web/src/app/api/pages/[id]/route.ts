import { NextRequest, NextResponse } from 'next/server';

// Mock database
let pages: any[] = [];

// GET single page
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const page = pages.find((p) => p.id === params.id);

        if (!page) {
            return NextResponse.json(
                { success: false, error: 'Page not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: page,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch page' },
            { status: 500 }
        );
    }
}

// PUT update page
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const pageIndex = pages.findIndex((p) => p.id === params.id);

        if (pageIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Page not found' },
                { status: 404 }
            );
        }

        pages[pageIndex] = {
            ...pages[pageIndex],
            ...body,
            updatedAt: new Date().toISOString(),
        };

        return NextResponse.json({
            success: true,
            data: pages[pageIndex],
            message: 'Page updated successfully',
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to update page' },
            { status: 500 }
        );
    }
}

// DELETE page
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const pageIndex = pages.findIndex((p) => p.id === params.id);

        if (pageIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Page not found' },
                { status: 404 }
            );
        }

        pages.splice(pageIndex, 1);

        return NextResponse.json({
            success: true,
            message: 'Page deleted successfully',
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete page' },
            { status: 500 }
        );
    }
}
