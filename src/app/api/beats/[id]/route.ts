import { NextRequest, NextResponse } from 'next/server';

// Mock database
const mockBeats: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Trap Wave',
    bpm: 140,
    key: 'Cm',
    genre: 'Trap',
  },
  '2': {
    id: '2',
    title: 'Summer Vibes',
    bpm: 95,
    key: 'Am',
    genre: 'Hip Hop',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const beat = mockBeats[id];

    if (!beat) {
      return NextResponse.json(
        { error: 'Beat not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: beat,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch beat' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Update beat in database
    mockBeats[id] = { ...mockBeats[id], ...body, updatedAt: new Date() };

    return NextResponse.json({
      success: true,
      data: mockBeats[id],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update beat' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    delete mockBeats[id];

    return NextResponse.json({
      success: true,
      message: 'Beat deleted',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete beat' },
      { status: 500 }
    );
  }
}
