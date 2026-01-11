import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single treatment
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const treatment = await prisma.treatment.findUnique({
            where: { id: params.id },
        });

        if (!treatment) {
            return NextResponse.json(
                { success: false, error: 'Treatment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: treatment });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// PUT update treatment
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const treatment = await prisma.treatment.update({
            where: { id: params.id },
            data: {
                name: body.name,
                slug: body.slug,
                category: body.category,
                description: body.description,
                benefits: body.benefits,
                duration: parseInt(body.duration),
                price: parseFloat(body.price),
                discount_price: body.discount_price ? parseFloat(body.discount_price) : null,
                image_url: body.image_url,
                is_active: body.is_active,
                is_featured: body.is_featured,
            },
        });

        return NextResponse.json({ success: true, data: treatment });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// DELETE treatment
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.treatment.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true, message: 'Treatment deleted' });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
