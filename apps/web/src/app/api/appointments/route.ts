import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all appointments
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const patientId = searchParams.get('patient_id');
        const date = searchParams.get('date');

        const where: any = {};

        if (status) where.status = status;
        if (patientId) where.patient_id = patientId;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            where.appointment_date = {
                gte: startDate,
                lt: endDate,
            };
        }

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                patient: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        phone: true,
                    },
                },
                treatment: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                        duration: true,
                        price: true,
                    },
                },
            },
            orderBy: { appointment_date: 'desc' },
        });

        return NextResponse.json({ success: true, data: appointments });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST create new appointment
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const appointment = await prisma.appointment.create({
            data: {
                patient_id: body.patient_id,
                treatment_id: body.treatment_id,
                appointment_date: new Date(body.appointment_date),
                appointment_time: body.appointment_time,
                status: body.status || 'pending',
                duration: parseInt(body.duration),
                patient_notes: body.patient_notes || null,
                admin_notes: body.admin_notes || null,
            },
            include: {
                patient: true,
                treatment: true,
            },
        });

        return NextResponse.json({ success: true, data: appointment }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
