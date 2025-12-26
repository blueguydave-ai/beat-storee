import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const beatId = searchParams.get('beatId');
    const period = searchParams.get('period') || '30'; // days

    if (!beatId) {
      return NextResponse.json(
        { error: 'beatId is required' },
        { status: 400 }
      );
    }

    // Mock beat performance data
    const performanceData = {
      beatId,
      period: parseInt(period),
      summary: {
        totalPlays: 4250,
        totalDownloads: 340,
        totalRevenue: 8450.5,
        averageRating: 4.6,
        favoriteCount: 189,
      },
      trends: {
        plays: {
          thisMonth: 4250,
          lastMonth: 3200,
          trend: '+32.8%',
          chart: generateTrendChart('plays', parseInt(period)),
        },
        downloads: {
          thisMonth: 340,
          lastMonth: 210,
          trend: '+61.9%',
          chart: generateTrendChart('downloads', parseInt(period)),
        },
        revenue: {
          thisMonth: 8450.5,
          lastMonth: 6200.0,
          trend: '+36.3%',
          byLicense: {
            basic_lease: 2450.0,
            premium_lease: 3500.0,
            unlimited_lease: 1800.5,
            exclusive: 700.0,
          },
          chart: generateTrendChart('revenue', parseInt(period)),
        },
      },
      topCountries: [
        { country: 'US', plays: 1200, downloads: 95, revenue: 2850 },
        { country: 'UK', plays: 850, downloads: 68, revenue: 1950 },
        { country: 'NG', plays: 780, downloads: 62, revenue: 1680 },
        { country: 'CA', plays: 650, downloads: 52, revenue: 1420 },
        { country: 'AU', plays: 420, downloads: 35, revenue: 890 },
      ],
      reviews: {
        total: 34,
        averageRating: 4.6,
        distribution: {
          5: 20,
          4: 10,
          3: 3,
          2: 1,
          1: 0,
        },
        recentReviews: [
          {
            id: 'rev-1',
            userName: 'Producer A',
            rating: 5,
            comment: 'Amazing beat! Perfect for my track.',
            date: '2025-12-22',
          },
          {
            id: 'rev-2',
            userName: 'Artist B',
            rating: 4,
            comment: 'Great quality, very usable.',
            date: '2025-12-20',
          },
          {
            id: 'rev-3',
            userName: 'Music Lover C',
            rating: 5,
            comment: 'Top notch production!',
            date: '2025-12-18',
          },
        ],
      },
      demographics: {
        topGenres: ['Hip Hop', 'Trap', 'Drill'],
        topMoods: ['Dark', 'Aggressive', 'Energetic'],
        topInstruments: ['Drums', 'Bass', 'Strings'],
      },
    };

    return NextResponse.json({
      success: true,
      data: performanceData,
    });
  } catch (error) {
    console.error('Beat performance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beat performance data' },
      { status: 500 }
    );
  }
}

function generateTrendChart(type: string, days: number): Array<{ date: string; value: number }> {
  const chart = [];
  const today = new Date();
  const baseValues: Record<string, number> = {
    plays: 137,
    downloads: 11,
    revenue: 272,
  };

  const baseValue = baseValues[type] || 100;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const variance = Math.random() * baseValue * 0.4 - baseValue * 0.2;
    const value = Math.max(0, Math.round(baseValue + variance));

    chart.push({
      date: date.toISOString().split('T')[0],
      value,
    });
  }

  return chart;
}
