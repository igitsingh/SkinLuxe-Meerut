import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET all patients
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        const where: any = {};

        if (search) {
            where.OR = [
                { full_name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
            ];
        }

        const patients = await prisma.patient.findMany({
            where,
            select: {
                id: true,
                email: true,
                full_name: true,
                phone: true,
                date_of_birth: true,
                gender: true,
                created_at: true,
                _count: {
                    select: {
                        appointments: true,
                        records: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json({ success: true, data: patients });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST create new patient
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.email || !body.password || !body.full_name || !body.phone) {
            return NextResponse.json(
                { success: false, error: 'Email, password, full name, and phone are required' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingPatient = await prisma.patient.findUnique({
            where: { email: body.email.toLowerCase() },
        });

        if (existingPatient) {
            return NextResponse.json(
                { success: false, error: 'Email already registered. Please login instead.' },
                { status: 409 }
            );
        }

        // Hash password
        const password_hash = await bcrypt.hash(body.password, 10);

        const patient = await prisma.patient.create({
            data: {
                email: body.email.toLowerCase(),
                password_hash,
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
                created_at: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: patient,
            message: 'Account created successfully! Please login.'
        }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Registration failed. Please try again.' },
            { status: 500 }
        );
    }
}
