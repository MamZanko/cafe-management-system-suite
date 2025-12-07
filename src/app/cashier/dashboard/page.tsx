"use client";

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useSession, authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { CreditCard, LogOut, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Order {
  id: number;
  tableNumber: number;
  status: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  createdAt: string;
}

export default function CashierDashboard() {
  const { t } = useI18n();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/cashier/login');
    } else if (session?.user) {
      fetchOrders();
    }
  }, [session, isPending, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders?status=served');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    if (!error) {
      localStorage.removeItem("bearer_token");
      router.push('/cashier/login');
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const todayOrders = orders.length;
  const todaySales = orders.reduce((sum, order) => sum + order.finalAmount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{t('cashier.title')}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {session.user.email}
              </span>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Button variant="outline" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('cashier.todaySales')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${todaySales.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('reports.totalOrders')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('cashier.pendingPayments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Payments */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('cashier.pendingPayments')}</h2>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                {t('common.noData')}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {t('orders.orderNumber')}{order.id}
                        </CardTitle>
                        <CardDescription>
                          {t('tables.tableNumber')} {order.tableNumber} • {new Date(order.createdAt).toLocaleTimeString()}
                        </CardDescription>
                      </div>
                      <Badge>{t(`orders.${order.status}`)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{t('orders.total')}:</span>
                          <span className="font-semibold">${order.totalAmount.toFixed(2)}</span>
                        </div>
                        {order.discountAmount > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{t('orders.discount')}:</span>
                            <span className="text-sm text-destructive">-${order.discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{t('orders.finalAmount')}:</span>
                          <span className="text-xl font-bold text-primary">${order.finalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button onClick={() => router.push(`/cashier/payment/${order.id}`)}>
                        {t('cashier.processPayment')}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}