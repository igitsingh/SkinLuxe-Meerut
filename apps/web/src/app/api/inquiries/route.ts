import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all inquiries
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        const where: any = {};

        if (status && status !== 'all') where.status = status;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
            ];
        }

        const inquiries = await prisma.inquiry.findMany({
            where,
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json({ success: true, data: inquiries });
    } catch (error: any) {
        console.error('Error fetching inquiries:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST create new inquiry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.phone || !body.service) {
            return NextResponse.json(
                { success: false, error: 'Name, email, phone, and service are required' },
                { status: 400 }
            );
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                name: body.name,
                email: body.email.toLowerCase(),
                phone: body.phone,
                service: body.service,
                message: body.message || null,
                status: 'new',
            },
        });

        return NextResponse.json({
            success: true,
            data: inquiry,
            message: 'Inquiry submitted successfully!'
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating inquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit inquiry. Please try again.' },
            { status: 500 }
        );
    }
}
