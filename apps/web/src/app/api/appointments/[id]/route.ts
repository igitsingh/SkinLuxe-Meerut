import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single appointment
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const appointment = await prisma.appointment.findUnique({
            where: { id: params.id },
            include: {
                patient: true,
                treatment: true,
            },
        });

        if (!appointment) {
            return NextResponse.json(
                { success: false, error: 'Appointment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: appointment });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// PUT update appointment
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const appointment = await prisma.appointment.update({
            where: { id: params.id },
            data: {
                appointment_date: body.appointment_date ? new Date(body.appointment_date) : undefined,
                appointment_time: body.appointment_time,
                status: body.status,
                duration: body.duration ? parseInt(body.duration) : undefined,
                patient_notes: body.patient_notes,
                admin_notes: body.admin_notes,
            },
            include: {
                patient: true,
                treatment: true,
            },
        });

        return NextResponse.json({ success: true, data: appointment });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// DELETE appointment
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.appointment.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true, message: 'Appointment cancelled' });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
