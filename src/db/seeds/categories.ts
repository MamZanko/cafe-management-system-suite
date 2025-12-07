import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            nameEn: 'Beverages',
            nameKu: 'Xwarinewa',
            descriptionEn: 'Coffee, Tea, Juices and refreshing drinks',
            descriptionKu: 'Qahwe, Çay, Aba mêwe û xwarinewayên serinker',
            imageUrl: '/images/categories/beverages.jpg',
            displayOrder: 1,
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            nameEn: 'Main Dishes',
            nameKu: 'Xwardni Serekî',
            descriptionEn: 'Traditional Kurdish dishes and international cuisine',
            descriptionKu: 'Xwarin û xwardnî Kurdî û navneteweyî',
            imageUrl: '/images/categories/main-dishes.jpg',
            displayOrder: 2,
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            nameEn: 'Desserts',
            nameKu: 'Şîrnok',
            descriptionEn: 'Sweet treats, cakes and pastries',
            descriptionKu: 'Şîrînî, cake û pastrî',
            imageUrl: '/images/categories/desserts.jpg',
            displayOrder: 3,
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            nameEn: 'Appetizers',
            nameKu: 'Mezze',
            descriptionEn: 'Fresh salads and delicious starters',
            descriptionKu: 'Salateya taze û destpêka xweşik',
            imageUrl: '/images/categories/appetizers.jpg',
            displayOrder: 4,
            isActive: true,
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});