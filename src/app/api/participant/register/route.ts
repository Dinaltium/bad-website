import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { name, yearOfStudy, collegeName, location, usn, password } = await request.json();

    // Validation
    if (!name || !yearOfStudy || !collegeName || !location || !usn || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (![1, 2, 3, 4].includes(Number(yearOfStudy))) {
      return NextResponse.json(
        { error: 'Year of study must be 1, 2, 3, or 4' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const normalizedUSN = usn.toUpperCase();

    // Check if USN already exists
    const existingParticipant = await prisma.participant.findUnique({
      where: { usn: normalizedUSN },
    });

    if (existingParticipant) {
      return NextResponse.json(
        { error: 'A participant with this USN already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const participant = await prisma.participant.create({
      data: {
        name,
        yearOfStudy: Number(yearOfStudy),
        collegeName,
        location,
        usn: normalizedUSN,
        password: hashedPassword,
      },
    });

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
    }, { status: 201 });
  } catch (error: any) {
    console.error('Participant registration error details:', {
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
