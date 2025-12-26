import { NextRequest, NextResponse } from 'next/server';

// Mock user database - Replace with real database
const mockUsers: { [key: string]: any } = {
  'test@example.com': {
    id: '1',
    email: 'test@example.com',
    fullName: 'Test User',
    passwordHash: '$2a$12$mockhashedpassword', // Would be bcrypt hash
    role: 'customer',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = mockUsers[email];
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Simple password check (in production, use bcrypt comparison)
    // For demo, accept password "password123"
    if (password !== 'password123') {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate mock JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString(
      'base64'
    );

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
