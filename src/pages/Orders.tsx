
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, FileText, Eye, TruckIcon, CheckCircle, XCircle, DownloadIcon, Edit } from "lucide-react";
import { orders, Order, OrderStatus } from "@/data/mockData";

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-gray-100 text-gray-800",
  processing: "bg-yellow-100 text-yellow-800",
  ready: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  ready: "آماده ارسال",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده"
};

const Orders = () => {
  const [ordersList, setOrdersList] = useState<Order[]>(orders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewingOrder, setIsViewingOrder] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const { toast } = useToast();

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewingOrder(true);
  };

  const handleStatusChange = (status: OrderStatus) => {
    if (selectedOrder) {
      const updatedOrders = ordersList.map(order => 
        order.id === selectedOrder.id ? { ...order, status, updatedAt: new Date() } : order
      );
      
      setOrdersList(updatedOrders);
      setSelectedOrder({ ...selectedOrder, status, updatedAt: new Date() });
      setIsUpdatingStatus(false);
      
      toast({
        title: "وضعیت سفارش بروز شد",
        description: `وضعیت سفارش به "${statusLabels[status]}" تغییر یافت.`
      });
    }
  };

  const handleGenerateInvoice = () => {
    setIsGeneratingInvoice(false);
    toast({
      title: "پیش‌فاکتور صادر شد",
      description: "پیش‌فاکتور با موفقیت صادر شد و به ایمیل خریدار ارسال گردید."
    });
  };

  const filteredOrders = ordersList.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مدیریت سفارش‌ها</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <FileText size={18} />
            خروجی اکسل
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>لیست سفارش‌ها</CardTitle>
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="جستجوی سفارش..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>مدیریت سفارش‌ها و وضعیت آن‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">همه سفارش‌ها</TabsTrigger>
              <TabsTrigger value="pending">در انتظار</TabsTrigger>
              <TabsTrigger value="processing">در حال پردازش</TabsTrigger>
              <TabsTrigger value="ready">آماده ارسال</TabsTrigger>
              <TabsTrigger value="shipped">ارسال شده</TabsTrigger>
            </TabsList>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-3 px-4">شماره سفارش</th>
                    <th className="text-right py-3 px-4">محصول</th>
                    <th className="text-right py-3 px-4">خریدار</th>
                    <th className="text-right py-3 px-4">تعداد</th>
                    <th className="text-right py-3 px-4">قیمت کل</th>
                    <th className="text-right py-3 px-4">تاریخ</th>
                    <th className="text-right py-3 px-4">وضعیت</th>
                    <th className="text-right py-3 px-4">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.productName}</td>
                      <td className="py-3 px-4">{order.buyerName}</td>
                      <td className="py-3 px-4">{order.quantity}</td>
                      <td className="py-3 px-4">{order.total.toLocaleString()} تومان</td>
                      <td className="py-3 px-4">{new Intl.DateTimeFormat('fa-IR').format(order.createdAt)}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">نمایش {filteredOrders.length} از {filteredOrders.length} سفارش</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>قبلی</Button>
            <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
            <Button variant="outline" size="sm" disabled>بعدی</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isViewingOrder} onOpenChange={setIsViewingOrder}>
        <DialogContent className="sm:max-w-[600px] rtl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>جزئیات سفارش #{selectedOrder.id}</DialogTitle>
                <DialogDescription>وضعیت سفارش: <Badge className={statusColors[selectedOrder.status]}>{statusLabels[selectedOrder.status]}</Badge></DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">نام محصول</h4>
                    <p>{selectedOrder.productName}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">تعداد</h4>
                    <p>{selectedOrder.quantity} عدد</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">قیمت واحد</h4>
                    <p>{selectedOrder.price.toLocaleString()} تومان</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">قیمت کل</h4>
                    <p>{selectedOrder.total.toLocaleString()} تومان</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">اطلاعات خریدار</h4>
                  <p>{selectedOrder.buyerName}</p>
                  <p>{selectedOrder.buyerEmail}</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">آدرس تحویل</h4>
                  <p>{selectedOrder.shippingAddress.city}، {selectedOrder.shippingAddress.state}، {selectedOrder.shippingAddress.street}، کد پستی: {selectedOrder.shippingAddress.postalCode}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">تاریخ ثبت سفارش</h4>
                    <p>{new Intl.DateTimeFormat('fa-IR').format(selectedOrder.createdAt)}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">آخرین بروزرسانی</h4>
                    <p>{new Intl.DateTimeFormat('fa-IR').format(selectedOrder.updatedAt)}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <div className="flex gap-2 justify-between w-full">
                  <div>
                    <Dialog open={isUpdatingStatus} onOpenChange={setIsUpdatingStatus}>
                      <DialogTrigger asChild>
                        <Button variant="outline">تغییر وضعیت</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px] rtl">
                        <DialogHeader>
                          <DialogTitle>تغییر وضعیت سفارش</DialogTitle>
                          <DialogDescription>وضعیت جدید سفارش را انتخاب کنید.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Select onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب وضعیت" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">در انتظار</SelectItem>
                              <SelectItem value="processing">در حال پردازش</SelectItem>
                              <SelectItem value="ready">آماده ارسال</SelectItem>
                              <SelectItem value="shipped">ارسال شده</SelectItem>
                              <SelectItem value="delivered">تحویل شده</SelectItem>
                              <SelectItem value="cancelled">لغو شده</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsUpdatingStatus(false)}>انصراف</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isGeneratingInvoice} onOpenChange={setIsGeneratingInvoice}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <FileText size={16} />
                          صدور پیش‌فاکتور
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px] rtl">
                        <DialogHeader>
                          <DialogTitle>صدور پیش‌فاکتور</DialogTitle>
                          <DialogDescription>آیا از صدور پیش‌فاکتور برای این سفارش اطمینان دارید؟</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm">پیش‌فاکتور به ایمیل خریدار ارسال خواهد شد.</p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsGeneratingInvoice(false)}>انصراف</Button>
                          <Button onClick={handleGenerateInvoice}>تأیید و صدور</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => setIsViewingOrder(false)}>بستن</Button>
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
