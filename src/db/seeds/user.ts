import { db } from '@/db';
import { user, account } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const now = new Date();
    const SALT_ROUNDS = 10;

    // Hash passwords
    const garsonPasswordHash = await bcrypt.hash('garson123', SALT_ROUNDS);
    const cashierPasswordHash = await bcrypt.hash('cashier123', SALT_ROUNDS);
    const adminPasswordHash = await bcrypt.hash('admin123', SALT_ROUNDS);

    // Create user records
    const sampleUsers = [
        {
            id: 'user_garson_1',
            name: 'Garson Demo User',
            email: 'garson1@cafe.com',
            emailVerified: false,
            image: null,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'user_cashier_1',
            name: 'Cashier Demo User',
            email: 'cashier@cafe.com',
            emailVerified: false,
            image: null,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'user_admin_1',
            name: 'Admin Demo User',
            email: 'admin@cafe.com',
            emailVerified: false,
            image: null,
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Create account records with hashed passwords
    const sampleAccounts = [
        {
            id: 'account_garson_1',
            accountId: 'garson1@cafe.com',
            providerId: 'credential',
            userId: 'user_garson_1',
            password: garsonPasswordHash,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'account_cashier_1',
            accountId: 'cashier@cafe.com',
            providerId: 'credential',
            userId: 'user_cashier_1',
            password: cashierPasswordHash,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'account_admin_1',
            accountId: 'admin@cafe.com',
            providerId: 'credential',
            userId: 'user_admin_1',
            password: adminPasswordHash,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: now,
            updatedAt: now,
        },
    ];

    await db.insert(user).values(sampleUsers);
    await db.insert(account).values(sampleAccounts);

    console.log('✅ User and account seeder completed successfully');
    console.log('Demo accounts created:');
    console.log('  - Garson: garson1@cafe.com / garson123');
    console.log('  - Cashier: cashier@cafe.com / cashier123');
    console.log('  - Admin: admin@cafe.com / admin123');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});