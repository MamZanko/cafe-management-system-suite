import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tables, orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allTables = await db
      .select({
        id: tables.id,
        tableNumber: tables.tableNumber,
        qrCode: tables.qrCode,
        capacity: tables.capacity,
        status: tables.status,
        currentOrderId: tables.currentOrderId,
      })
      .from(tables)
      .orderBy(tables.tableNumber);

    return NextResponse.json({ tables: allTables });
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tables' },
      { status: 500 }
    );
  }
}
