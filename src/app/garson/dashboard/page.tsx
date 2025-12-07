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
import { Users, LogOut, Plus, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Table {
  id: number;
  tableNumber: number;
  capacity: number;
  status: string;
  currentOrderId: number | null;
}

interface Order {
  id: number;
  tableNumber: number;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export default function GarsonDashboard() {
  const { t } = useI18n();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [tables, setTables] = useState<Table[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/garson/login');
    } else if (session?.user) {
      fetchData();
    }
  }, [session, isPending, router]);

  const fetchData = async () => {
    try {
      const [tablesRes, ordersRes] = await Promise.all([
        fetch('/api/tables'),
        fetch('/api/orders?status=pending,preparing,ready,served'),
      ]);

      const tablesData = await tablesRes.json();
      const ordersData = await ordersRes.json();

      setTables(tablesData.tables || []);
      setOrders(ordersData.orders || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      router.push('/garson/login');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'preparing':
        return 'secondary';
      case 'ready':
        return 'default';
      case 'served':
        return 'outline';
      default:
        return 'outline';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{t('garson.title')}</h1>
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
              <CardTitle className="text-sm font-medium">{t('orders.activeOrders')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('tables.available')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {tables.filter((t) => t.status === 'available').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('tables.occupied')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {tables.filter((t) => t.status === 'occupied').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{t('garson.myTables')}</h2>
          </div>
          
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tables.map((table) => (
                <Card
                  key={table.id}
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${
                    table.status === 'occupied' ? 'border-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {t('tables.tableNumber')} {table.tableNumber}
                      </CardTitle>
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(table.status)}`} />
                    </div>
                    <CardDescription>
                      {t('tables.capacity')}: {table.capacity} {t('common.people')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={table.status === 'available' ? 'default' : 'secondary'}>
                      {t(`tables.${table.status}`)}
                    </Badge>
                    {table.status === 'occupied' && (
                      <Button className="w-full mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('garson.takeOrder')}
                      </Button>
                    )}
                    {table.status === 'available' && (
                      <Button className="w-full mt-4" variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('orders.newOrder')}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Active Orders */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('orders.activeOrders')}</h2>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
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
                        <CardTitle className="text-lg">
                          {t('orders.orderNumber')}{order.id}
                        </CardTitle>
                        <CardDescription>
                          {t('tables.tableNumber')} {order.tableNumber}
                        </CardDescription>
                      </div>
                      <Badge variant={getOrderStatusColor(order.status) as any}>
                        {t(`orders.${order.status}`)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button size="sm">{t('garson.orderDetails')}</Button>
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
