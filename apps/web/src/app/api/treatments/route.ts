import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all treatments
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const active = searchParams.get('active');

        const where: any = {};

        if (category) where.category = category;
        if (featured === 'true') where.is_featured = true;
        if (active === 'true') where.is_active = true;

        const treatments = await prisma.treatment.findMany({
            where,
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json({ success: true, data: treatments });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST create new treatment
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const treatment = await prisma.treatment.create({
            data: {
                name: body.name,
                slug: body.slug,
                category: body.category,
                description: body.description,
                benefits: body.benefits || [],
                duration: parseInt(body.duration),
                price: parseFloat(body.price),
                discount_price: body.discount_price ? parseFloat(body.discount_price) : null,
                image_url: body.image_url || null,
                is_active: body.is_active ?? true,
                is_featured: body.is_featured ?? false,
            },
        });

        return NextResponse.json({ success: true, data: treatment }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
