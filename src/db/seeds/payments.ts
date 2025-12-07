import { db } from '@/db';
import { payments } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const samplePayments = [
        {
            orderId: 3,
            cashierId: 2,
            amountPaid: 22.00,
            paymentMethod: 'cash',
            cashAmount: 22.00,
            cardAmount: 0,
            changeGiven: 0,
            paymentDate: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
            orderId: 4,
            cashierId: 2,
            amountPaid: 45.50,
            paymentMethod: 'card',
            cashAmount: 0,
            cardAmount: 45.50,
            changeGiven: 0,
            paymentDate: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString(),
        },
        {
            orderId: 8,
            cashierId: 2,
            amountPaid: 35.00,
            paymentMethod: 'mixed',
            cashAmount: 20.00,
            cardAmount: 15.00,
            changeGiven: 0,
            paymentDate: new Date(now.getTime() - 4.5 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(now.getTime() - 4.5 * 60 * 60 * 1000).toISOString(),
        },
        {
            orderId: 3,
            cashierId: 2,
            amountPaid: 25.00,
            paymentMethod: 'cash',
            cashAmount: 25.00,
            cardAmount: 0,
            changeGiven: 3.00,
            paymentDate: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        }
    ];

    await db.insert(payments).values(samplePayments);
    
    console.log('✅ Payments seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});