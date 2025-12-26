import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Decode mock JWT (in production, verify with real JWT library)
    const token = authHeader.substring(7);
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));

      // Return mock user
      const user = {
        id: decoded.userId,
        email: decoded.email,
        fullName: 'Test User',
        role: 'customer',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return NextResponse.json({
        success: true,
        data: user,
      });
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
