import { NextRequest, NextResponse } from 'next/server';
import { Order, OrderStatus } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, validate, process payment, and save to database
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      orderNumber: `ORD-${Date.now()}`,
      userId: 'user-' + Math.random().toString(36).substr(2, 9),
      email: body.customerEmail,
      items: body.items.map((item: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        beatId: item.beatId,
        licenseId: item.licenseId,
        beatTitle: item.beat.title,
        licenseType: item.license.licenseType,
        price: item.license.price,
        downloadCount: 0,
        maxDownloads: 10,
      })),
      totalAmount: body.totalAmount,
      discountAmount: 0,
      taxAmount: 0,
      status: 'completed' as OrderStatus,
      paymentMethod: body.paymentMethod,
      paymentProvider: 'stripe',
      paymentId: 'pi_' + Math.random().toString(36).substr(2, 20),
      country: 'US',
      createdAt: new Date(),
      completedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    // Mock orders response
    const orders: Order[] = [];

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
