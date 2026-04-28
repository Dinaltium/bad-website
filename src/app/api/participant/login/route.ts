import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Login attempt for USN:', body.usn);
    const { usn, password } = body;

    if (!usn || !password) {
      return NextResponse.json(
        { error: 'USN and password are required' },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.findUnique({
      where: { usn: usn.toUpperCase() },
    });

    if (!participant) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, participant.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: participant.id,
      name: participant.name,
      type: 'participant',
      usn: participant.usn,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: participant.id,
        name: participant.name,
        yearOfStudy: participant.yearOfStudy,
        collegeName: participant.collegeName,
        location: participant.location,
        usn: participant.usn,
        type: 'participant',
      },
    });
  } catch (error: any) {
    console.error('Participant login error details:', {
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
