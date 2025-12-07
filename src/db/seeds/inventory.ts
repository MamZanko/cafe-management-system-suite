import { db } from '@/db';
import { inventory } from '@/db/schema';

async function main() {
    const now = new Date().toISOString();
    
    const sampleInventory = [
        {
            itemName: 'Coffee Beans',
            unit: 'kg',
            currentStock: 25,
            minimumStock: 10,
            lastRestockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Milk',
            unit: 'liters',
            currentStock: 40,
            minimumStock: 15,
            lastRestockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Sugar',
            unit: 'kg',
            currentStock: 30,
            minimumStock: 10,
            lastRestockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Tea Leaves',
            unit: 'kg',
            currentStock: 15,
            minimumStock: 5,
            lastRestockedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Orange Juice',
            unit: 'liters',
            currentStock: 20,
            minimumStock: 8,
            lastRestockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Chicken Breast',
            unit: 'kg',
            currentStock: 35,
            minimumStock: 15,
            lastRestockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Rice',
            unit: 'kg',
            currentStock: 50,
            minimumStock: 20,
            lastRestockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Flour',
            unit: 'kg',
            currentStock: 40,
            minimumStock: 15,
            lastRestockedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Cheese',
            unit: 'kg',
            currentStock: 18,
            minimumStock: 8,
            lastRestockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        },
        {
            itemName: 'Fresh Vegetables',
            unit: 'kg',
            currentStock: 25,
            minimumStock: 10,
            lastRestockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: now,
            updatedAt: now,
        }
    ];

    await db.insert(inventory).values(sampleInventory);
    
    console.log('✅ Inventory seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});