import { NextRequest, NextResponse } from 'next/server';

// Mock database
let collections: any[] = [
    {
        id: '1',
        name: 'Bridal Collection',
        slug: 'bridal',
        description: 'Exquisite bridal jewellery',
        status: 'PUBLISHED',
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// GET all collections
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        let filteredCollections = collections;

        if (status && status !== 'ALL') {
            filteredCollections = filteredCollections.filter((c) => c.status === status);
        }

        if (search) {
            filteredCollections = filteredCollections.filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredCollections,
            total: filteredCollections.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch collections' },
            { status: 500 }
        );
    }
}

// POST create collection
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.slug) {
            return NextResponse.json(
                { success: false, error: 'Name and slug are required' },
                { status: 400 }
            );
        }

        const existingCollection = collections.find((c) => c.slug === body.slug);
        if (existingCollection) {
            return NextResponse.json(
                { success: false, error: 'Slug already exists' },
                { status: 400 }
            );
        }

        const newCollection = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        collections.push(newCollection);

        return NextResponse.json({
            success: true,
            data: newCollection,
            message: 'Collection created successfully',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create collection' },
            { status: 500 }
        );
    }
}
