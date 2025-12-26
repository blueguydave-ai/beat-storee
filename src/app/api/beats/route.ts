import { NextRequest, NextResponse } from 'next/server';
import { PaginatedResponse, Beat } from '@/types';

// Mock beats database
const mockBeats: Beat[] = [
  {
    id: '1',
    title: 'Trap Wave',
    slug: 'trap-wave',
    producerId: '1',
    description: 'Hard hitting trap beat with modern sound design',
    bpm: 140,
    musicalKey: 'Cm',
    duration: 150,
    genre: 'Trap',
    moodTags: ['Dark', 'Energetic', 'Modern'],
    instrumentTags: ['Drums', 'Bass', 'Synths'],
    artworkUrl: '/beats/trap-wave.jpg',
    audioPreviewUrl: '/audio/trap-wave-preview.mp3',
    status: 'active',
    isTrending: true,
    isFeatured: true,
    playCount: 1250,
    favoriteCount: 89,
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2025-12-15'),
  },
  {
    id: '2',
    title: 'Summer Vibes',
    slug: 'summer-vibes',
    producerId: '1',
    description: 'Tropical vibes with laid-back groove',
    bpm: 95,
    musicalKey: 'Am',
    duration: 160,
    genre: 'Hip Hop',
    moodTags: ['Happy', 'Chill', 'Relaxing'],
    instrumentTags: ['Piano', 'Strings', 'Drums'],
    artworkUrl: '/beats/summer-vibes.jpg',
    audioPreviewUrl: '/audio/summer-vibes-preview.mp3',
    status: 'active',
    isTrending: false,
    isFeatured: true,
    playCount: 856,
    favoriteCount: 54,
    createdAt: new Date('2025-12-10'),
    updatedAt: new Date('2025-12-10'),
  },
  {
    id: '3',
    title: 'Dark Drill',
    slug: 'dark-drill',
    producerId: '1',
    description: 'Aggressive drill beat with dark atmosphere',
    bpm: 180,
    musicalKey: 'Dm',
    duration: 140,
    genre: 'Drill',
    moodTags: ['Dark', 'Aggressive', 'Hard'],
    instrumentTags: ['Synths', 'Bass', 'Drums'],
    artworkUrl: '/beats/dark-drill.jpg',
    audioPreviewUrl: '/audio/dark-drill-preview.mp3',
    status: 'active',
    isTrending: true,
    isFeatured: false,
    playCount: 2150,
    favoriteCount: 123,
    createdAt: new Date('2025-12-08'),
    updatedAt: new Date('2025-12-08'),
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '24');
    const sort = searchParams.get('sort') || 'newest';
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    let filtered = [...mockBeats];

    // Filter by genre
    if (genre) {
      filtered = filtered.filter((b) => b.genre.toLowerCase() === genre.toLowerCase());
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    switch (sort) {
      case 'trending':
        filtered.sort((a, b) => b.playCount - a.playCount);
        break;
      case 'popular':
        filtered.sort((a, b) => b.favoriteCount - a.favoriteCount);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Pagination
    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    const response: PaginatedResponse<Beat> = {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch beats' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // In production, validate and save to database
    const newBeat: Beat = {
      id: Math.random().toString(36).substr(2, 9),
      title: body.title,
      slug: body.slug,
      producerId: body.producerId,
      description: body.description,
      bpm: body.bpm,
      musicalKey: body.musicalKey,
      duration: body.duration,
      genre: body.genre,
      moodTags: body.moodTags || [],
      instrumentTags: body.instrumentTags || [],
      artworkUrl: body.artworkUrl || '',
      audioPreviewUrl: body.audioPreviewUrl || '',
      status: body.status || 'draft',
      isTrending: false,
      isFeatured: false,
      playCount: 0,
      favoriteCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newBeat,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create beat' },
      { status: 500 }
    );
  }
}
