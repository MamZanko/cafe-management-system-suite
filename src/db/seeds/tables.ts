import { db } from '@/db';
import { tables } from '@/db/schema';

async function main() {
    const sampleTables = [
        {
            tableNumber: 1,
            qrCode: 'QR-TABLE-001',
            capacity: 2,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 2,
            qrCode: 'QR-TABLE-002',
            capacity: 2,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 3,
            qrCode: 'QR-TABLE-003',
            capacity: 2,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 4,
            qrCode: 'QR-TABLE-004',
            capacity: 2,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 5,
            qrCode: 'QR-TABLE-005',
            capacity: 2,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 6,
            qrCode: 'QR-TABLE-006',
            capacity: 4,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 7,
            qrCode: 'QR-TABLE-007',
            capacity: 4,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 8,
            qrCode: 'QR-TABLE-008',
            capacity: 4,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 9,
            qrCode: 'QR-TABLE-009',
            capacity: 4,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 10,
            qrCode: 'QR-TABLE-010',
            capacity: 4,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 11,
            qrCode: 'QR-TABLE-011',
            capacity: 6,
            status: 'occupied',
            currentOrderId: null,
        },
        {
            tableNumber: 12,
            qrCode: 'QR-TABLE-012',
            capacity: 6,
            status: 'occupied',
            currentOrderId: null,
        },
        {
            tableNumber: 13,
            qrCode: 'QR-TABLE-013',
            capacity: 6,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 14,
            qrCode: 'QR-TABLE-014',
            capacity: 8,
            status: 'available',
            currentOrderId: null,
        },
        {
            tableNumber: 15,
            qrCode: 'QR-TABLE-015',
            capacity: 8,
            status: 'available',
            currentOrderId: null,
        },
    ];

    await db.insert(tables).values(sampleTables);
    
    console.log('✅ Tables seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});