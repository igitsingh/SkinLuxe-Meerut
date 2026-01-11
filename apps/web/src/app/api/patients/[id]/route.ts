import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single patient
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const patient = await prisma.patient.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                email: true,
                full_name: true,
                phone: true,
                date_of_birth: true,
                gender: true,
                address: true,
                medical_history: true,
                allergies: true,
                emergency_contact: true,
                created_at: true,
                _count: {
                    select: {
                        appointments: true,
                        records: true,
                    },
                },
            },
        });

        if (!patient) {
            return NextResponse.json(
                { success: false, error: 'Patient not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: patient });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// PUT update patient
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const patient = await prisma.patient.update({
            where: { id: params.id },
            data: {
                email: body.email?.toLowerCase(),
                full_name: body.full_name,
                phone: body.phone,
                date_of_birth: body.date_of_birth ? new Date(body.date_of_birth) : null,
                gender: body.gender || null,
                address: body.address || null,
                medical_history: body.medical_history || null,
                allergies: body.allergies || null,
                emergency_contact: body.emergency_contact || null,
            },
            select: {
                id: true,
                email: true,
                full_name: true,
                phone: true,
                date_of_birth: true,
                gender: true,
                address: true,
                created_at: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: patient,
            message: 'Patient updated successfully'
        });
    } catch (error: any) {
        console.error('Update patient error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update patient' },
            { status: 500 }
        );
    }
}

// DELETE patient
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.patient.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            success: true,
            message: 'Patient deleted successfully'
        });
    } catch (error: any) {
        console.error('Delete patient error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete patient' },
            { status: 500 }
        );
    }
}
