import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { menuItems, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    let query = db
      .select({
        id: menuItems.id,
        categoryId: menuItems.categoryId,
        nameEn: menuItems.nameEn,
        nameKu: menuItems.nameKu,
        descriptionEn: menuItems.descriptionEn,
        descriptionKu: menuItems.descriptionKu,
        price: menuItems.price,
        imageUrl: menuItems.imageUrl,
        isAvailable: menuItems.isAvailable,
        preparationTime: menuItems.preparationTime,
        categoryNameEn: categories.nameEn,
        categoryNameKu: categories.nameKu,
      })
      .from(menuItems)
      .leftJoin(categories, eq(menuItems.categoryId, categories.id))
      .where(eq(menuItems.isAvailable, true));

    if (categoryId) {
      query = query.where(eq(menuItems.categoryId, parseInt(categoryId)));
    }

    const items = await query;

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}
