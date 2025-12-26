import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'beats'; // beats, tags, producers

    // In production, search across database
    const results = {
      beats: [
        { id: '1', title: 'Trap Wave', type: 'beat' },
        { id: '2', title: 'Summer Vibes', type: 'beat' },
        { id: '3', title: 'Dark Drill', type: 'beat' },
      ],
      tags: [
        { id: 'trap', label: 'Trap', type: 'tag', count: 245 },
        { id: 'hip-hop', label: 'Hip Hop', type: 'tag', count: 189 },
        { id: 'dark', label: 'Dark', type: 'tag', count: 156 },
      ],
      producers: [
        { id: 'djayy', name: 'David Jayy', type: 'producer', beats: 450 },
      ],
    };

    // Filter by type if specified
    let filtered: any[] = [];
    
    if (type === 'beats') {
      filtered = results.beats.filter((b: any) =>
        b.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'tags') {
      filtered = results.tags.filter((t: any) =>
        t.label.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'producers') {
      filtered = results.producers.filter((p: any) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'all') {
      filtered = [
        ...results.beats.filter((b: any) =>
          b.title.toLowerCase().includes(query.toLowerCase())
        ),
        ...results.tags.filter((t: any) =>
          t.label.toLowerCase().includes(query.toLowerCase())
        ),
        ...results.producers.filter((p: any) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        ),
      ];
    } else {
      // Default to all if type is invalid
      filtered = [
        ...results.beats,
        ...results.tags,
        ...results.producers,
      ].filter((item: any) => {
        const searchTerm = item.title || item.label || item.name;
        return searchTerm.toLowerCase().includes(query.toLowerCase());
      });
    }

    return NextResponse.json({
      success: true,
      data: filtered.slice(0, 10), // Limit to 10 results
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
