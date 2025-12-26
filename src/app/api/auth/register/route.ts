import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName } = body;

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    // In production, check if email already exists, hash password, save to database
    // For now, just return success
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      role: 'customer',
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Generate mock JWT token
    const token = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email })).toString(
      'base64'
    );

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
