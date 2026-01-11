import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT update inquiry status
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const inquiry = await prisma.inquiry.update({
            where: { id: params.id },
            data: {
                status: body.status,
                notes: body.notes || null,
            },
        });

        return NextResponse.json({
            success: true,
            data: inquiry,
            message: 'Inquiry updated successfully'
        });
    } catch (error: any) {
        console.error('Update inquiry error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update inquiry' },
            { status: 500 }
        );
    }
}

// DELETE inquiry
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.inquiry.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            success: true,
            message: 'Inquiry deleted successfully'
        });
    } catch (error: any) {
        console.error('Delete inquiry error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete inquiry' },
            { status: 500 }
        );
    }
}
