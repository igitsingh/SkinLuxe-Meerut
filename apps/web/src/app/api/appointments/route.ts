import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all appointments
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        // Add filtering logic if needed matching new schema

        const appointments = await prisma.appointment.findMany({
            orderBy: { date: 'desc' },
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

        // New Schema: name, phone, email?, treatmentId?, date, timeSlot, notes
        const appointment = await prisma.appointment.create({
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email || null,
                date: new Date(body.date), // Expects ISO string or date
                timeSlot: body.timeSlot,
                status: 'PENDING',
                notes: body.notes || null,
                // treatmentId: ... we skip relation if IDs don't match or look up via name
            },
        });

        return NextResponse.json({ success: true, data: appointment }, { status: 201 });
    } catch (error: any) {
        console.error("Appointment Create Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
