import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (user.type === 'admin') {
      const admin = await prisma.admin.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        user: { ...admin, type: 'admin' },
      });
    } else {
      const participant = await prisma.participant.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          yearOfStudy: true,
          collegeName: true,
          location: true,
          usn: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        user: { ...participant, type: 'participant' },
      });
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
