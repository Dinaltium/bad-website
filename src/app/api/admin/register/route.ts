import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json();

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Name and password are required' },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { name },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.admin.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    const token = generateToken({
      id: admin.id,
      name: admin.name,
      type: 'admin',
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: admin.id,
        name: admin.name,
        type: 'admin',
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Admin registration error details:', {
      message: error.message,
      stack: error.stack,
      error
    });
    return NextResponse.json(
      { error: `Internal server error: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
