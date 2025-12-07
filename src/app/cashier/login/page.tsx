"use client";

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CashierLoginPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });

      if (error?.code) {
        toast.error(t('auth.loginError'));
        setLoading(false);
        return;
      }

      toast.success(t('auth.loginSuccess'));

      // Wait a bit for token to be saved, then redirect with full page load
      setTimeout(() => {
        window.location.href = '/cashier/dashboard';
      }, 500);
    } catch (error) {
      toast.error(t('common.error'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <CreditCard className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('cashier.title')}</CardTitle>
          <CardDescription>{t('auth.login')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="cashier@cafe.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required />

            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                autoComplete="off" />

            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                setFormData({ ...formData, rememberMe: checked as boolean })
                } />

              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">

                {t('auth.rememberMe')}
              </label>
            </div>

            <Button type="submit" className="w-full !block !opacity-100" disabled={loading}>
              {loading ? t('common.loading') : t('auth.login')}
            </Button>

            <div className="text-sm text-muted-foreground text-center mt-4 p-4 bg-muted rounded-md">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p>Email: cashier@cafe.com</p>
              <p>Password: cashier123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>);

}