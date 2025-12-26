import { NextRequest, NextResponse } from 'next/server';
import { getBeatFile, getFileExtension } from '@/lib/fileManager';

// Maximum age for download tokens: 48 hours
const TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: 'Download token is required' },
        { status: 400 }
      );
    }

    // In production, verify token from database:
    // 1. Check if token exists in Download table
    // 2. Check if token has expired
    // 3. Check if download limit hasn't been exceeded
    // 4. Increment download count

    // For now, this is a placeholder
    // You would decode the token and validate it

    // Example token format (base64 encoded JSON):
    // {
    //   beatId: "beat-123",
    //   userId: "user-456",
    //   fileType: "wav",
    //   filePath: "public/beats/beat-123/wav-1234567890.wav",
    //   issuedAt: timestamp,
    //   expiresAt: timestamp
    // }

    // Validate token age and signature
    // const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString());
    // const now = Date.now();
    // if (now > decodedToken.expiresAt) {
    //   return NextResponse.json(
    //     { error: 'Download token has expired' },
    //     { status: 401 }
    //   );
    // }

    // For demo purposes, construct a mock file path
    // In production, this would come from the Download record in database
    const mockFilePath = `./public/beats/sample-beat/${token}.wav`;

    try {
      const file = await getBeatFile(mockFilePath);

      // Return file with appropriate headers
      return new NextResponse(file as any, {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Disposition': 'attachment; filename="beat.wav"',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    } catch (fileError) {
      return NextResponse.json(
        { error: 'File not found or has been deleted' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    );
  }
}
