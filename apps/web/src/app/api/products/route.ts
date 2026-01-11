import { NextRequest, NextResponse } from 'next/server';

// Mock database
let products: any[] = [];

// GET all products
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const collection = searchParams.get('collection');
        const search = searchParams.get('search');

        let filteredProducts = products;

        if (status && status !== 'ALL') {
            filteredProducts = filteredProducts.filter((p) => p.status === status);
        }

        if (collection && collection !== 'ALL') {
            filteredProducts = filteredProducts.filter((p) => p.collectionId === collection);
        }

        if (search) {
            filteredProducts = filteredProducts.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.sku?.toLowerCase().includes(search.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredProducts,
            total: filteredProducts.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST create product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.slug) {
            return NextResponse.json(
                { success: false, error: 'Name and slug are required' },
                { status: 400 }
            );
        }

        const newProduct = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        products.push(newProduct);

        return NextResponse.json({
            success: true,
            data: newProduct,
            message: 'Product created successfully',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
