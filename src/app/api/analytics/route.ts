import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '30'; // days
    const metric = searchParams.get('metric') || 'all'; // revenue, sales, conversion, traffic

    // Mock analytics data
    const analytics = {
      revenue: {
        total: 12450,
        trend: '+12.5%',
        chart: [
          { date: '2025-12-01', value: 350 },
          { date: '2025-12-02', value: 420 },
          { date: '2025-12-03', value: 380 },
          { date: '2025-12-04', value: 500 },
          { date: '2025-12-05', value: 620 },
        ],
      },
      sales: {
        total: 456,
        trend: '+8.2%',
        byLicense: {
          basic_lease: 245,
          premium_lease: 156,
          unlimited_lease: 45,
          exclusive: 10,
        },
      },
      conversion: {
        rate: '3.2%',
        trend: '-0.5%',
        visitors: 14250,
        conversions: 456,
      },
      traffic: {
        total: 14250,
        trend: '+18.3%',
        sources: {
          organic: 8500,
          direct: 3200,
          social: 2000,
          referral: 550,
        },
      },
      topBeats: [
        {
          id: '1',
          title: 'Trap Wave',
          plays: 1250,
          sales: 145,
          revenue: 4205,
        },
        {
          id: '2',
          title: 'Summer Vibes',
          plays: 856,
          sales: 98,
          revenue: 2842,
        },
        {
          id: '3',
          title: 'Dark Drill',
          plays: 2150,
          sales: 87,
          revenue: 2522,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
