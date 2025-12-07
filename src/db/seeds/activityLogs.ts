import { db } from '@/db';
import { activityLogs } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const getTimeAgo = (hours: number, minutes: number = 0) => {
        const date = new Date(now);
        date.setHours(date.getHours() - hours);
        date.setMinutes(date.getMinutes() - minutes);
        return date.toISOString();
    };

    const sampleActivityLogs = [
        {
            userId: 1,
            action: 'user_login',
            entityType: 'user',
            entityId: 1,
            details: { role: 'admin', loginTime: '2024-01-15T08:00:00Z' },
            ipAddress: '192.168.1.100',
            createdAt: getTimeAgo(8),
        },
        {
            userId: 2,
            action: 'order_paid',
            entityType: 'order',
            entityId: 3,
            details: { orderId: 3, amount: 22.00, method: 'cash' },
            ipAddress: '192.168.1.101',
            createdAt: getTimeAgo(2),
        },
        {
            userId: 3,
            action: 'order_created',
            entityType: 'order',
            entityId: 1,
            details: { tableId: 11, items: 3, totalAmount: 28.50 },
            ipAddress: '192.168.1.102',
            createdAt: getTimeAgo(0, 45),
        },
        {
            userId: 4,
            action: 'order_updated',
            entityType: 'order',
            entityId: 2,
            details: { status: 'served', updatedFields: ['status'] },
            ipAddress: '192.168.1.103',
            createdAt: getTimeAgo(0, 20),
        },
        {
            userId: 1,
            action: 'menu_item_updated',
            entityType: 'menu_item',
            entityId: 5,
            details: { field: 'price', oldValue: 11.50, newValue: 12.00 },
            ipAddress: '192.168.1.100',
            createdAt: getTimeAgo(3),
        },
        {
            userId: 2,
            action: 'payment_processed',
            entityType: 'payment',
            entityId: 2,
            details: { orderId: 4, method: 'card', amount: 45.50 },
            ipAddress: '192.168.1.101',
            createdAt: getTimeAgo(2, 30),
        },
        {
            userId: 3,
            action: 'table_status_changed',
            entityType: 'table',
            entityId: 11,
            details: { tableNumber: 11, oldStatus: 'available', newStatus: 'occupied' },
            ipAddress: '192.168.1.102',
            createdAt: getTimeAgo(1),
        },
        {
            userId: 1,
            action: 'category_created',
            entityType: 'category',
            entityId: 5,
            details: { nameEn: 'Specials', nameKu: 'Taybetî' },
            ipAddress: '192.168.1.100',
            createdAt: getTimeAgo(5),
        },
        {
            userId: 4,
            action: 'order_cancelled',
            entityType: 'order',
            entityId: 7,
            details: { reason: 'Customer left', refundAmount: 0 },
            ipAddress: '192.168.1.103',
            createdAt: getTimeAgo(3, 30),
        },
        {
            userId: 2,
            action: 'user_login',
            entityType: 'user',
            entityId: 2,
            details: { role: 'cashier', loginTime: '2024-01-15T09:00:00Z' },
            ipAddress: '192.168.1.101',
            createdAt: getTimeAgo(7),
        },
        {
            userId: 1,
            action: 'inventory_updated',
            entityType: 'inventory',
            entityId: 1,
            details: { itemName: 'Coffee Beans', quantityAdded: 10, newStock: 25 },
            ipAddress: '192.168.1.100',
            createdAt: getTimeAgo(24),
        },
        {
            userId: 3,
            action: 'order_item_added',
            entityType: 'order_item',
            entityId: 1,
            details: { orderId: 1, menuItemId: 5, quantity: 2 },
            ipAddress: '192.168.1.102',
            createdAt: getTimeAgo(0, 45),
        },
        {
            userId: 4,
            action: 'user_login',
            entityType: 'user',
            entityId: 4,
            details: { role: 'garson', loginTime: '2024-01-15T10:00:00Z' },
            ipAddress: '192.168.1.103',
            createdAt: getTimeAgo(6),
        },
        {
            userId: 1,
            action: 'report_generated',
            entityType: 'report',
            entityId: null,
            details: { reportType: 'daily_sales', date: '2024-01-15', totalSales: 183.50 },
            ipAddress: '192.168.1.100',
            createdAt: getTimeAgo(4),
        },
        {
            userId: 2,
            action: 'discount_applied',
            entityType: 'order',
            entityId: 2,
            details: { orderId: 2, discountAmount: 5.00, reason: 'Birthday' },
            ipAddress: '192.168.1.101',
            createdAt: getTimeAgo(1, 30),
        },
    ];

    await db.insert(activityLogs).values(sampleActivityLogs);
    
    console.log('✅ Activity logs seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});