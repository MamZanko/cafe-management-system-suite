"use client";

import { useI18n } from '@/lib/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Coffee, Users, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t, locale } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Cafe Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl font-bold tracking-tight">
            {locale === 'en' ? 'Welcome to Our Cafe' : 'بەخێربێن بۆ کافێکەمان'}
          </h2>
          <p className="text-xl text-muted-foreground">
            {locale === 'en'
              ? 'Complete management system with bilingual support'
              : 'سیستەمی بەڕێوەبردنی تەواو بە پشتگیری دوو زمانی'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/menu">{t('menu.title')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/garson/login">{t('garson.title')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Coffee className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t('menu.title')}</CardTitle>
              <CardDescription>
                {locale === 'en'
                  ? 'Browse our menu with bilingual support'
                  : 'سەیری لیستەکەمان بکە بە پشتگیری دوو زمانی'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/menu">View Menu</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t('garson.title')}</CardTitle>
              <CardDescription>
                {locale === 'en'
                  ? 'Manage tables and take orders'
                  : 'بەڕێوەبردنی مێزەکان و وەرگرتنی داواکاری'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/garson/login">{t('auth.login')}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t('cashier.title')}</CardTitle>
              <CardDescription>
                {locale === 'en'
                  ? 'Process payments and manage sales'
                  : 'پرۆسەی پارەدان و بەڕێوەبردنی فرۆشتن'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/cashier/login">{t('auth.login')}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t('admin.title')}</CardTitle>
              <CardDescription>
                {locale === 'en'
                  ? 'Complete system management'
                  : 'بەڕێوەبردنی تەواوی سیستەم'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/admin/login">{t('auth.login')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Cafe Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}