
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure correct import path for Next.js app

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: service || 'General Inquiry',
                message,
                status: 'NEW', // Default status
            },
        });

        return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (error: any) {
        console.error('Inquiry submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit inquiry.' },
            { status: 500 }
        );
    }
}
