import { NextRequest, NextResponse } from 'next/server';
import { License } from '@/types';

// Mock licenses database
const mockLicenses: License[] = [
  {
    id: 'lic-1',
    beatId: '1',
    licenseType: 'basic_lease',
    price: 29,
    isAvailable: true,
    distributionLimit: 2000,
    includeStems: false,
    includeMidi: false,
    audioFormats: ['mp3'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lic-2',
    beatId: '1',
    licenseType: 'premium_lease',
    price: 49,
    isAvailable: true,
    distributionLimit: 5000,
    includeStems: false,
    includeMidi: true,
    audioFormats: ['mp3', 'wav'],
    createdAt: new Date(),
    updatedAt: new Date(),
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

    const licenses = mockLicenses.filter((l) => l.beatId === beatId);

    return NextResponse.json({
      success: true,
      data: licenses,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch licenses' },
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

    const newLicense: License = {
      id: Math.random().toString(36).substr(2, 9),
      beatId: body.beatId,
      licenseType: body.licenseType,
      price: body.price,
      isAvailable: true,
      distributionLimit: body.distributionLimit,
      includeStems: body.includeStems || false,
      includeMidi: body.includeMidi || false,
      audioFormats: body.audioFormats || ['mp3'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockLicenses.push(newLicense);

    return NextResponse.json({
      success: true,
      data: newLicense,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create license' },
      { status: 500 }
    );
  }
}
