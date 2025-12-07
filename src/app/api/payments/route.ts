import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { payments, orders, tables } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      cashierId,
      amountPaid,
      paymentMethod,
      cashAmount,
      cardAmount,
      changeGiven,
    } = body;

    // Create payment record
    const [newPayment] = await db
      .insert(payments)
      .values({
        orderId,
        cashierId,
        amountPaid,
        paymentMethod,
        cashAmount: cashAmount || 0,
        cardAmount: cardAmount || 0,
        changeGiven: changeGiven || 0,
        paymentDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })
      .returning();

    // Update order status
    const [updatedOrder] = await db
      .update(orders)
      .set({
        status: 'paid',
        paymentMethod,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(orders.id, orderId))
      .returning();

    // Update table status to available
    if (updatedOrder.tableId) {
      await db
        .update(tables)
        .set({ status: 'available', currentOrderId: null })
        .where(eq(tables.id, updatedOrder.tableId));
    }

    return NextResponse.json({ payment: newPayment }, { status: 201 });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
