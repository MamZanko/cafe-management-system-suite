import { db } from '@/db';
import { orderItems } from '@/db/schema';

async function main() {
    const sampleOrderItems = [
        // ORDER 1 (orderId: 1) - Total: $28.50
        {
            orderId: 1,
            menuItemId: 5,
            quantity: 2,
            unitPrice: 12.00,
            subtotal: 24.00,
            status: 'preparing',
            notes: 'No onions',
            createdAt: new Date('2024-01-20T10:15:00').toISOString(),
        },
        {
            orderId: 1,
            menuItemId: 4,
            quantity: 2,
            unitPrice: 2.00,
            subtotal: 4.00,
            status: 'ready',
            notes: null,
            createdAt: new Date('2024-01-20T10:15:00').toISOString(),
        },
        {
            orderId: 1,
            menuItemId: 13,
            quantity: 1,
            unitPrice: 5.00,
            subtotal: 5.00,
            status: 'preparing',
            notes: null,
            createdAt: new Date('2024-01-20T10:15:00').toISOString(),
        },
        
        // ORDER 2 (orderId: 2) - Total: $35.00
        {
            orderId: 2,
            menuItemId: 7,
            quantity: 2,
            unitPrice: 11.00,
            subtotal: 22.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T11:30:00').toISOString(),
        },
        {
            orderId: 2,
            menuItemId: 12,
            quantity: 1,
            unitPrice: 4.50,
            subtotal: 4.50,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T11:30:00').toISOString(),
        },
        {
            orderId: 2,
            menuItemId: 9,
            quantity: 2,
            unitPrice: 5.00,
            subtotal: 10.00,
            status: 'served',
            notes: 'With extra syrup',
            createdAt: new Date('2024-01-20T11:30:00').toISOString(),
        },
        
        // ORDER 3 (orderId: 3) - Total: $22.00
        {
            orderId: 3,
            menuItemId: 8,
            quantity: 1,
            unitPrice: 13.00,
            subtotal: 13.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T12:45:00').toISOString(),
        },
        {
            orderId: 3,
            menuItemId: 2,
            quantity: 2,
            unitPrice: 4.00,
            subtotal: 8.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T12:45:00').toISOString(),
        },
        {
            orderId: 3,
            menuItemId: 4,
            quantity: 1,
            unitPrice: 2.00,
            subtotal: 2.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T12:45:00').toISOString(),
        },
        
        // ORDER 4 (orderId: 4) - Total: $45.50
        {
            orderId: 4,
            menuItemId: 6,
            quantity: 2,
            unitPrice: 10.00,
            subtotal: 20.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T14:00:00').toISOString(),
        },
        {
            orderId: 4,
            menuItemId: 14,
            quantity: 2,
            unitPrice: 5.50,
            subtotal: 11.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T14:00:00').toISOString(),
        },
        {
            orderId: 4,
            menuItemId: 10,
            quantity: 2,
            unitPrice: 6.00,
            subtotal: 12.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T14:00:00').toISOString(),
        },
        {
            orderId: 4,
            menuItemId: 3,
            quantity: 1,
            unitPrice: 3.00,
            subtotal: 3.00,
            status: 'served',
            notes: null,
            createdAt: new Date('2024-01-20T14:00:00').toISOString(),
        },
        
        // ORDER 5 (orderId: 5) - Total: $18.00
        {
            orderId: 5,
            menuItemId: 4,
            quantity: 3,
            unitPrice: 2.00,
            subtotal: 6.00,
            status: 'pending',
            notes: 'Extra sugar',
            createdAt: new Date('2024-01-20T15:20:00').toISOString(),
        },
        {
            orderId: 5,
            menuItemId: 12,
            quantity: 1,
            unitPrice: 4.50,
            subtotal: 4.50,
            status: 'pending',
            notes: null,
            createdAt: new Date('2024-01-20T15:20:00').toISOString(),
        },
        {
            orderId: 5,
            menuItemId: 1,
            quantity: 2,
            unitPrice: 3.50,
            subtotal: 7.00,
            status: 'pending',
            notes: null,
            createdAt: new Date('2024-01-20T15:20:00').toISOString(),
        },
        
        // ORDER 6 (orderId: 6) - Total: $52.00
        {
            orderId: 6,
            menuItemId: 5,
            quantity: 3,
            unitPrice: 12.00,
            subtotal: 36.00,
            status: 'ready',
            notes: null,
            createdAt: new Date('2024-01-20T16:10:00').toISOString(),
        },
        {
            orderId: 6,
            menuItemId: 13,
            quantity: 2,
            unitPrice: 5.00,
            subtotal: 10.00,
            status: 'ready',
            notes: null,
            createdAt: new Date('2024-01-20T16:10:00').toISOString(),
        },
        {
            orderId: 6,
            menuItemId: 11,
            quantity: 2,
            unitPrice: 5.50,
            subtotal: 11.00,
            status: 'ready',
            notes: null,
            createdAt: new Date('2024-01-20T16:10:00').toISOString(),
        },
        
        // ORDER 7 (orderId: 7) - Total: $15.00
        {
            orderId: 7,
            menuItemId: 15,
            quantity: 1,
            unitPrice: 4.75,
            subtotal: 4.75,
            status: 'pending',
            notes: null,
            createdAt: new Date('2024-01-20T17:30:00').toISOString(),
        },
    ];

    await db.insert(orderItems).values(sampleOrderItems);
    
    console.log('✅ Order items seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});