"use client";

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Skeleton } from '@/components/ui/skeleton';
import { Coffee, Search, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  nameEn: string;
  nameKu: string;
  descriptionEn: string;
  descriptionKu: string;
  imageUrl: string;
}

interface MenuItem {
  id: number;
  categoryId: number;
  nameEn: string;
  nameKu: string;
  descriptionEn: string;
  descriptionKu: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  preparationTime: number;
  categoryNameEn: string;
  categoryNameKu: string;
}

export default function MenuPage() {
  const { t, locale } = useI18n();
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [menuItems, selectedCategory, searchQuery, locale]);

  const fetchData = async () => {
    try {
      const [categoriesRes, menuRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/menu'),
      ]);

      const categoriesData = await categoriesRes.json();
      const menuData = await menuRes.json();

      setCategories(categoriesData.categories || []);
      setMenuItems(menuData.items || []);
      setFilteredItems(menuData.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = menuItems;

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.categoryId === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        locale === 'en'
          ? item.nameEn.toLowerCase().includes(query) ||
            item.descriptionEn?.toLowerCase().includes(query)
          : item.nameKu.toLowerCase().includes(query) ||
            item.descriptionKu?.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Coffee className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">{t('menu.title')}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('menu.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('menu.categories')}</h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
            >
              {t('menu.allCategories')}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
              >
                {locale === 'en' ? category.nameEn : category.nameKu}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t('common.noResults')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted">
                  <Image
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                    alt={locale === 'en' ? item.nameEn : item.nameKu}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2">
                    {locale === 'en' ? item.categoryNameEn : item.categoryNameKu}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">
                    {locale === 'en' ? item.nameEn : item.nameKu}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {locale === 'en' ? item.descriptionEn : item.descriptionKu}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{item.preparationTime} {t('menu.minutes')}</span>
                    </div>
                  </div>
                  {!item.isAvailable && (
                    <Badge variant="destructive" className="w-full justify-center">
                      {t('menu.notAvailable')}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
