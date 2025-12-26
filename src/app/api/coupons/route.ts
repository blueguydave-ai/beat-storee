import { NextRequest, NextResponse } from 'next/server';

// Mock coupons database
const mockCoupons: any = {
  SUMMER20: {
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minPurchase: 0,
    maxUses: 100,
    usedCount: 45,
    isActive: true,
    expiresAt: new Date('2025-12-31'),
  },
  FIRST10: {
    code: 'FIRST10',
    type: 'fixed',
    value: 10,
    minPurchase: 50,
    maxUses: 50,
    usedCount: 50,
    isActive: false,
    expiresAt: new Date('2025-12-25'),
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, totalAmount } = body;

    const coupon = mockCoupons[code.toUpperCase()];

    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { error: 'Coupon is expired or inactive' },
        { status: 400 }
      );
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { error: 'Coupon usage limit reached' },
        { status: 400 }
      );
    }

    if (coupon.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Coupon has expired' },
        { status: 400 }
      );
    }

    if (totalAmount < coupon.minPurchase) {
      return NextResponse.json(
        {
          error: `Minimum purchase of $${coupon.minPurchase} required`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (totalAmount * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        discount,
        type: coupon.type,
        message: `Saved $${discount.toFixed(2)}!`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Coupon validation failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Admin only - list all coupons
    const coupons = Object.values(mockCoupons);

    return NextResponse.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}
