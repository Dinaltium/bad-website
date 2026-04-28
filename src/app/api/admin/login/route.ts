import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Login attempt for name:', body.name);
    const { name, password } = body;

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Name and password are required' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { name },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

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
    });
  } catch (error: any) {
    console.error('Admin login error details:', {
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
