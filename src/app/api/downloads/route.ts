import { NextRequest, NextResponse } from 'next/server';

// Mock downloads database
const mockDownloads: { [key: string]: any } = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderItemId, fileType } = body;

    // In production, verify purchase, generate secure token, etc.
    const token = Buffer.from(
      JSON.stringify({
        orderItemId,
        fileType,
        timestamp: Date.now(),
        expiresAt: Date.now() + 48 * 60 * 60 * 1000, // 48 hours
      })
    ).toString('base64');

    mockDownloads[token] = {
      orderItemId,
      fileType,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      downloadCount: 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        token,
        downloadUrl: `/api/downloads/file/${token}`,
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate download link' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderItemId = searchParams.get('orderItemId');

    if (!orderItemId) {
      return NextResponse.json(
        { error: 'orderItemId parameter required' },
        { status: 400 }
      );
    }

    // Fetch download history for this order item
    const downloads = Object.entries(mockDownloads)
      .filter(([, d]: [string, any]) => d.orderItemId === orderItemId)
      .map(([token, d]: [string, any]) => ({
        token,
        ...d,
      }));

    return NextResponse.json({
      success: true,
      data: downloads,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch downloads' },
      { status: 500 }
    );
  }
}
