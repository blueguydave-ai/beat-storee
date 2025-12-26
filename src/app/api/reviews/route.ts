import { NextRequest, NextResponse } from 'next/server';

// Mock reviews database
const mockReviews: any[] = [
  {
    id: '1',
    beatId: '1',
    userId: 'user-1',
    userName: 'Artist Name',
    rating: 5,
    comment: 'Amazing beat! Perfect for my latest track.',
    createdAt: new Date('2025-12-20'),
  },
  {
    id: '2',
    beatId: '1',
    userId: 'user-2',
    userName: 'Producer Mike',
    rating: 4,
    comment: 'Great quality, loved the sound design.',
    createdAt: new Date('2025-12-18'),
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const beatId = searchParams.get('beatId');

    if (!beatId) {
      return NextResponse.json(
        { error: 'beatId parameter required' },
        { status: 400 }
      );
    }

    const reviews = mockReviews.filter((r) => r.beatId === beatId);

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        averageRating: parseFloat(avgRating as string),
        totalReviews: reviews.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      beatId: body.beatId,
      userId: body.userId,
      userName: body.userName,
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date(),
    };

    mockReviews.push(newReview);

    return NextResponse.json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
