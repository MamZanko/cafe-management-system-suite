"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { 
  CreditCard, 
  ArrowLeft, 
  Wallet, 
  Smartphone, 
  Percent,
  Printer,
  Check,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface OrderItem {
  id: number;
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes: string | null;
  menuItemName: string;
}

interface Order {
  id: number;
  tableNumber: number;
  status: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function PaymentProcessingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t } = useI18n();
  const { data: session, isPending } = useSession();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'cash',
    cashAmount: 0,
    cardAmount: 0,
  });
  
  const [discountData, setDiscountData] = useState({
    type: 'percentage',
    value: 0,
    reason: '',
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/cashier/login');
    } else if (session?.user) {
      fetchOrder();
    }
  }, [session, isPending, id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      
      if (data.order) {
        setOrder(data.order);
        setPaymentData({
          paymentMethod: 'cash',
          cashAmount: data.order.finalAmount,
          cardAmount: 0,
        });
      } else {
        toast.error(t('common.error'));
        router.push('/cashier/dashboard');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error(t('common.error'));
      router.push('/cashier/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const applyDiscount = () => {
    if (!order) return;
    
    let discountAmount = 0;
    if (discountData.type === 'percentage') {
      discountAmount = (order.totalAmount * discountData.value) / 100;
    } else {
      discountAmount = discountData.value;
    }
    
    const newFinalAmount = Math.max(0, order.totalAmount - discountAmount);
    
    setOrder({
      ...order,
      discountAmount,
      finalAmount: newFinalAmount,
    });
    
    setPaymentData({
      ...paymentData,
      cashAmount: newFinalAmount,
    });
    
    setShowDiscountDialog(false);
    toast.success(t('discount.applied'));
  };

  const calculateChange = () => {
    if (!order) return 0;
    
    if (paymentData.paymentMethod === 'cash') {
      return Math.max(0, paymentData.cashAmount - order.finalAmount);
    } else if (paymentData.paymentMethod === 'mixed') {
      const total = paymentData.cashAmount + paymentData.cardAmount;
      return Math.max(0, total - order.finalAmount);
    }
    return 0;
  };

  const processPayment = async () => {
    if (!order) return;
    
    // Validate payment
    const totalPaid = paymentData.paymentMethod === 'mixed' 
      ? paymentData.cashAmount + paymentData.cardAmount
      : paymentData.paymentMethod === 'cash'
      ? paymentData.cashAmount
      : order.finalAmount;
    
    if (totalPaid < order.finalAmount) {
      toast.error(t('payment.insufficientAmount'));
      return;
    }
    
    setProcessing(true);
    
    try {
      // Update order with discount if applied
      if (order.discountAmount > 0) {
        await fetch(`/api/orders/${order.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            discountAmount: order.discountAmount,
            finalAmount: order.finalAmount,
          }),
        });
      }
      
      // Process payment
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          cashierId: 1, // Get from session in production
          amountPaid: totalPaid,
          paymentMethod: paymentData.paymentMethod,
          cashAmount: paymentData.paymentMethod === 'card' ? 0 : paymentData.cashAmount,
          cardAmount: paymentData.paymentMethod === 'cash' ? 0 : 
            paymentData.paymentMethod === 'card' ? order.finalAmount : paymentData.cardAmount,
          changeGiven: calculateChange(),
        }),
      });

      if (response.ok) {
        toast.success(t('payment.paymentSuccess'));
        router.push('/cashier/dashboard');
      } else {
        toast.error(t('payment.paymentError'));
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error(t('common.error'));
    } finally {
      setProcessing(false);
    }
  };

  const handlePrintReceipt = () => {
    toast.info(t('payment.receiptPrinting'));
    // In production, integrate with receipt printer
  };

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const changeAmount = calculateChange();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/cashier/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">{t('payment.processPayment')}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Table & Order Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl">
                      {t('tables.tableNumber')} {order.tableNumber}
                    </CardTitle>
                    <CardDescription>
                      {t('orders.orderNumber')} {order.id}
                    </CardDescription>
                  </div>
                  <Badge className="text-lg px-4 py-2">{t(`orders.${order.status}`)}</Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>{t('orders.items')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{item.menuItemName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold">${item.subtotal.toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span>{t('orders.subtotal')}:</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-lg text-destructive">
                      <span>{t('orders.discount')}:</span>
                      <span>-${order.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-2xl font-bold">
                    <span>{t('orders.total')}:</span>
                    <span className="text-primary">${order.finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>{t('payment.paymentMethod')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('payment.selectMethod')}</Label>
                  <Select
                    value={paymentData.paymentMethod}
                    onValueChange={(value) =>
                      setPaymentData({ 
                        ...paymentData, 
                        paymentMethod: value,
                        cashAmount: value === 'cash' ? order.finalAmount : 0,
                        cardAmount: value === 'card' ? order.finalAmount : 0,
                      })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          <span>{t('payment.cash')}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>{t('payment.card')}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mixed">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>{t('payment.mixed')}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cash Payment */}
                {(paymentData.paymentMethod === 'cash' || paymentData.paymentMethod === 'mixed') && (
                  <div className="space-y-2">
                    <Label>{t('payment.cashAmount')}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentData.cashAmount}
                      onChange={(e) =>
                        setPaymentData({ 
                          ...paymentData, 
                          cashAmount: parseFloat(e.target.value) || 0 
                        })
                      }
                      className="h-12 text-lg"
                    />
                  </div>
                )}

                {/* Card Payment for Mixed */}
                {paymentData.paymentMethod === 'mixed' && (
                  <div className="space-y-2">
                    <Label>{t('payment.cardAmount')}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentData.cardAmount}
                      onChange={(e) =>
                        setPaymentData({ 
                          ...paymentData, 
                          cardAmount: parseFloat(e.target.value) || 0 
                        })
                      }
                      className="h-12 text-lg"
                    />
                  </div>
                )}

                {/* Change Amount */}
                {(paymentData.paymentMethod === 'cash' || paymentData.paymentMethod === 'mixed') && changeAmount > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">{t('payment.change')}:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${changeAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={processPayment}
                disabled={processing}
                className="w-full h-14 text-lg"
                size="lg"
              >
                <Check className="h-5 w-5 mr-2" />
                {processing ? t('common.loading') : t('payment.completePayment')}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => setShowDiscountDialog(true)}
                  variant="outline"
                  className="h-12"
                >
                  <Percent className="h-4 w-4 mr-2" />
                  {t('discount.apply')}
                </Button>
                
                <Button 
                  onClick={handlePrintReceipt}
                  variant="outline"
                  className="h-12"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  {t('payment.printReceipt')}
                </Button>
              </div>
              
              <Button 
                onClick={() => router.push('/cashier/dashboard')}
                variant="ghost"
                className="w-full h-12"
              >
                <X className="h-4 w-4 mr-2" />
                {t('common.cancel')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Discount Dialog */}
      <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('discount.apply')}</DialogTitle>
            <DialogDescription>
              {t('discount.description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t('discount.type')}</Label>
              <Select
                value={discountData.type}
                onValueChange={(value) =>
                  setDiscountData({ ...discountData, type: value, value: 0 })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">{t('discount.percentage')}</SelectItem>
                  <SelectItem value="fixed">{t('discount.fixedAmount')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                {discountData.type === 'percentage' 
                  ? t('discount.percentageValue') 
                  : t('discount.amountValue')}
              </Label>
              <Input
                type="number"
                step={discountData.type === 'percentage' ? '1' : '0.01'}
                min="0"
                max={discountData.type === 'percentage' ? '100' : order?.totalAmount}
                value={discountData.value}
                onChange={(e) =>
                  setDiscountData({ 
                    ...discountData, 
                    value: parseFloat(e.target.value) || 0 
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>{t('discount.reason')}</Label>
              <Input
                value={discountData.reason}
                onChange={(e) =>
                  setDiscountData({ ...discountData, reason: e.target.value })
                }
                placeholder={t('discount.reasonPlaceholder')}
              />
            </div>

            {discountData.value > 0 && order && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('orders.original')}:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-destructive">
                  <span>{t('orders.discount')}:</span>
                  <span>
                    -${(discountData.type === 'percentage' 
                      ? (order.totalAmount * discountData.value) / 100 
                      : discountData.value
                    ).toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>{t('orders.newTotal')}:</span>
                  <span className="text-primary">
                    ${Math.max(0, order.totalAmount - (
                      discountData.type === 'percentage' 
                        ? (order.totalAmount * discountData.value) / 100 
                        : discountData.value
                    )).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDiscountDialog(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button 
              onClick={applyDiscount}
              disabled={discountData.value <= 0}
            >
              {t('discount.apply')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
