import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const saltRounds = 10;
    
    const sampleUsers = [
        {
            email: 'admin@cafe.com',
            passwordHash: await bcrypt.hash('admin123', saltRounds),
            fullName: 'Admin User',
            role: 'admin',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'cashier@cafe.com',
            passwordHash: await bcrypt.hash('cashier123', saltRounds),
            fullName: 'Cashier User',
            role: 'cashier',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'garson1@cafe.com',
            passwordHash: await bcrypt.hash('garson123', saltRounds),
            fullName: 'Garson One',
            role: 'garson',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'garson2@cafe.com',
            passwordHash: await bcrypt.hash('garson123', saltRounds),
            fullName: 'Garson Two',
            role: 'garson',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});