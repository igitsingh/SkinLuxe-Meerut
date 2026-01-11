import { NextRequest, NextResponse } from 'next/server';

// Mock database - will be replaced with Prisma
let pages: any[] = [
    {
        id: '1',
        title: 'Home',
        slug: '/',
        status: 'PUBLISHED',
        isHomePage: true,
        sections: [],
        seo: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// GET all pages
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        let filteredPages = pages;

        if (status && status !== 'ALL') {
            filteredPages = filteredPages.filter((p) => p.status === status);
        }

        if (search) {
            filteredPages = filteredPages.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredPages,
            total: filteredPages.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch pages' },
            { status: 500 }
        );
    }
}

// POST create new page
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.slug) {
            return NextResponse.json(
                { success: false, error: 'Title and slug are required' },
                { status: 400 }
            );
        }

        // Check for duplicate slug
        const existingPage = pages.find((p) => p.slug === body.slug);
        if (existingPage) {
            return NextResponse.json(
                { success: false, error: 'Slug already exists' },
                { status: 400 }
            );
        }

        const newPage = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        pages.push(newPage);

        return NextResponse.json({
            success: true,
            data: newPage,
            message: 'Page created successfully',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create page' },
            { status: 500 }
        );
    }
}
