import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const beatId = searchParams.get('beatId');
    const type = searchParams.get('type') || 'similar'; // similar, trending, new, related

    // Mock recommendations
    const recommendations = {
      similar: [
        {
          id: '2',
          title: 'Trap Energy',
          bpm: 140,
          genre: 'Trap',
          price: 29,
          plays: 980,
        },
        {
          id: '3',
          title: 'Hard Trap',
          bpm: 140,
          genre: 'Trap',
          price: 49,
          plays: 1200,
        },
      ],
      trending: [
        {
          id: '1',
          title: 'Dark Drill',
          bpm: 180,
          genre: 'Drill',
          price: 49,
          plays: 2150,
        },
        {
          id: '4',
          title: 'Afrobeats Flow',
          bpm: 96,
          genre: 'Afrobeats',
          price: 29,
          plays: 1890,
        },
      ],
      new: [
        {
          id: '5',
          title: 'New Wave 2025',
          bpm: 128,
          genre: 'Electronic',
          price: 39,
          plays: 180,
        },
        {
          id: '6',
          title: 'Fresh Hip Hop',
          bpm: 92,
          genre: 'Hip Hop',
          price: 29,
          plays: 245,
        },
      ],
      byProducer: [
        {
          id: '7',
          title: 'Another Banger',
          bpm: 140,
          genre: 'Trap',
          price: 29,
          plays: 650,
        },
      ],
    };

    let result = recommendations[type as keyof typeof recommendations] || [];

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}
