import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'skinluxe-secret-key-change-in-production';

// POST login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find patient by email
        const patient = await prisma.patient.findUnique({
            where: { email: email.toLowerCase() },
            select: {
                id: true,
                email: true,
                password_hash: true,
                full_name: true,
                phone: true,
                date_of_birth: true,
                created_at: true,
            },
        });

        if (!patient) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, patient.password_hash);

        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: patient.id,
                email: patient.email,
                name: patient.full_name,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success with token and patient data
        return NextResponse.json({
            success: true,
            token,
            patient: {
                id: patient.id,
                email: patient.email,
                full_name: patient.full_name,
                phone: patient.phone,
                date_of_birth: patient.date_of_birth,
            },
            message: 'Login successful',
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Login failed. Please try again.' },
            { status: 500 }
        );
    }
}
