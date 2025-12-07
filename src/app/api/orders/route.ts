import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems, menuItems, tables, users } from '@/db/schema';
import { eq, inArray, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const garsonId = searchParams.get('garsonId');

    let query = db
      .select({
        id: orders.id,
        tableId: orders.tableId,
        tableNumber: tables.tableNumber,
        garsonId: orders.garsonId,
        garsonName: users.fullName,
        status: orders.status,
        totalAmount: orders.totalAmount,
        discountAmount: orders.discountAmount,
        finalAmount: orders.finalAmount,
        paymentMethod: orders.paymentMethod,
        notes: orders.notes,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        completedAt: orders.completedAt,
      })
      .from(orders)
      .leftJoin(tables, eq(orders.tableId, tables.id))
      .leftJoin(users, eq(orders.garsonId, users.id))
      .orderBy(desc(orders.createdAt));

    if (status) {
      query = query.where(eq(orders.status, status));
    }

    if (garsonId) {
      query = query.where(eq(orders.garsonId, parseInt(garsonId)));
    }

    const allOrders = await query;

    return NextResponse.json({ orders: allOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, garsonId, items, notes } = body;

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    // Create order
    const [newOrder] = await db
      .insert(orders)
      .values({
        tableId,
        garsonId,
        status: 'pending',
        totalAmount: total,
        discountAmount: 0,
        finalAmount: total,
        notes: notes || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    // Create order items
    const orderItemsData = items.map((item: any) => ({
      orderId: newOrder.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.unitPrice * item.quantity,
      notes: item.notes || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }));

    await db.insert(orderItems).values(orderItemsData);

    // Update table status
    await db
      .update(tables)
      .set({ status: 'occupied', currentOrderId: newOrder.id })
      .where(eq(tables.id, tableId));

    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
