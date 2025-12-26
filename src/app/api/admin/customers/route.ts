import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'newest'; // newest, email, purchases, revenue
    const filter = searchParams.get('filter') || 'all'; // all, active, inactive, vip

    // Mock customer database
    const allCustomers = [
      {
        id: 'user-1',
        email: 'john@example.com',
        fullName: 'John Doe',
        country: 'US',
        totalPurchases: 12,
        totalSpent: 450.5,
        lastPurchase: '2025-12-15',
        joinDate: '2025-01-10',
        status: 'active',
      },
      {
        id: 'user-2',
        email: 'jane@example.com',
        fullName: 'Jane Smith',
        country: 'UK',
        totalPurchases: 8,
        totalSpent: 320.0,
        lastPurchase: '2025-12-20',
        joinDate: '2025-02-14',
        status: 'active',
      },
      {
        id: 'user-3',
        email: 'artist@example.com',
        fullName: 'Alex Johnson',
        country: 'NG',
        totalPurchases: 45,
        totalSpent: 2150.75,
        lastPurchase: '2025-12-22',
        joinDate: '2024-06-01',
        status: 'vip',
      },
      {
        id: 'user-4',
        email: 'producer@example.com',
        fullName: 'Chris Productions',
        country: 'CA',
        totalPurchases: 2,
        totalSpent: 80.0,
        lastPurchase: '2025-10-30',
        joinDate: '2025-10-01',
        status: 'active',
      },
      {
        id: 'user-5',
        email: 'old@example.com',
        fullName: 'Old User',
        country: 'AU',
        totalPurchases: 1,
        totalSpent: 29.0,
        lastPurchase: '2025-03-15',
        joinDate: '2024-12-01',
        status: 'inactive',
      },
    ];

    // Filter customers
    let filtered = allCustomers;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        customer =>
          customer.email.toLowerCase().includes(searchLower) ||
          customer.fullName.toLowerCase().includes(searchLower) ||
          customer.country.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filter !== 'all') {
      filtered = filtered.filter(customer => customer.status === filter);
    }

    // Sort
    if (sort === 'email') {
      filtered.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sort === 'purchases') {
      filtered.sort((a, b) => b.totalPurchases - a.totalPurchases);
    } else if (sort === 'revenue') {
      filtered.sort((a, b) => b.totalSpent - a.totalSpent);
    } else {
      // newest
      filtered.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedCustomers = filtered.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      data: {
        customers: paginatedCustomers,
        total,
        page,
        limit,
        totalPages,
        summary: {
          totalCustomers: allCustomers.length,
          activeCustomers: allCustomers.filter(c => c.status === 'active').length,
          vipCustomers: allCustomers.filter(c => c.status === 'vip').length,
          inactiveCustomers: allCustomers.filter(c => c.status === 'inactive').length,
          totalRevenue: allCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
          avgCustomerValue: (allCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / allCustomers.length).toFixed(2),
        },
      },
    });
  } catch (error) {
    console.error('Customer management error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

// Update customer status or information
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, updates } = body;

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId is required' },
        { status: 400 }
      );
    }

    // In production, update customer in database
    // Supported updates: status, tags, notes, etc.

    return NextResponse.json({
      success: true,
      data: {
        message: 'Customer updated successfully',
        customerId,
        updates,
      },
    });
  } catch (error) {
    console.error('Customer update error:', error);
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}
