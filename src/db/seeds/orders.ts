import { db } from '@/db';
import { orders } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const sampleOrders = [
        {
            tableId: 11,
            garsonId: 3,
            status: 'preparing',
            totalAmount: 28.50,
            discountAmount: 0,
            finalAmount: 28.50,
            paymentMethod: null,
            notes: 'No onions on kebab',
            createdAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
            completedAt: null,
        },
        {
            tableId: 12,
            garsonId: 4,
            status: 'served',
            totalAmount: 35.00,
            discountAmount: 5.00,
            finalAmount: 30.00,
            paymentMethod: null,
            notes: 'Birthday celebration',
            createdAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 20 * 60 * 1000).toISOString(),
            completedAt: null,
        },
        {
            tableId: 6,
            garsonId: 3,
            status: 'paid',
            totalAmount: 22.00,
            discountAmount: 0,
            finalAmount: 22.00,
            paymentMethod: 'cash',
            notes: null,
            createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        },
        {
            tableId: 8,
            garsonId: 4,
            status: 'paid',
            totalAmount: 45.50,
            discountAmount: 0,
            finalAmount: 45.50,
            paymentMethod: 'card',
            notes: null,
            createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString(),
        },
        {
            tableId: 7,
            garsonId: 3,
            status: 'pending',
            totalAmount: 18.00,
            discountAmount: 0,
            finalAmount: 18.00,
            paymentMethod: null,
            notes: 'Extra sugar for tea',
            createdAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
            completedAt: null,
        },
        {
            tableId: 13,
            garsonId: 4,
            status: 'ready',
            totalAmount: 52.00,
            discountAmount: 2.00,
            finalAmount: 50.00,
            paymentMethod: null,
            notes: 'Table for 6 people',
            createdAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
            completedAt: null,
        },
        {
            tableId: 9,
            garsonId: 3,
            status: 'cancelled',
            totalAmount: 15.00,
            discountAmount: 0,
            finalAmount: 15.00,
            paymentMethod: null,
            notes: 'Customer left',
            createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 3.5 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(now.getTime() - 3.5 * 60 * 60 * 1000).toISOString(),
        },
        {
            tableId: 5,
            garsonId: 4,
            status: 'paid',
            totalAmount: 38.50,
            discountAmount: 3.50,
            finalAmount: 35.00,
            paymentMethod: 'mixed',
            notes: null,
            createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 4.5 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(now.getTime() - 4.5 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(orders).values(sampleOrders);
    
    console.log('✅ Orders seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});