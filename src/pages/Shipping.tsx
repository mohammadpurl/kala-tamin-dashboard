
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { shippingMethods, shippingZones, orders, addresses } from "@/data/mockData";
import { ShippingMethod, ShippingZone, GeoLocation } from "@/types";
import { MapPin, Check, Truck, Package, MapIcon } from "lucide-react";

const Shipping = () => {
  const [selectedTab, setSelectedTab] = useState("delivery");
  
  const getMethodById = (id: string): ShippingMethod | undefined => {
    return shippingMethods.find(method => method.id === id);
  };

  const getZoneById = (id: string): ShippingZone | undefined => {
    return shippingZones.find(zone => zone.id === id);
  };

  const warehouseAddresses = addresses.filter(address => address.isWarehouse);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ارسال و تحویل</h1>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="delivery">روش‌های ارسال</TabsTrigger>
          <TabsTrigger value="zones">مناطق ارسال</TabsTrigger>
          <TabsTrigger value="warehouses">انبارها</TabsTrigger>
          <TabsTrigger value="tracking">پیگیری ارسال</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>روش‌های ارسال</CardTitle>
              <CardDescription>مدیریت روش‌های ارسال کالا</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>لیست روش‌های ارسال فعال</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام روش ارسال</TableHead>
                    <TableHead>توضیحات</TableHead>
                    <TableHead>هزینه (تومان)</TableHead>
                    <TableHead>زمان تحویل</TableHead>
                    <TableHead>نوع ارسال</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell className="font-medium">{method.name}</TableCell>
                      <TableCell>{method.description}</TableCell>
                      <TableCell>{method.price.toLocaleString()}</TableCell>
                      <TableCell>{method.estimatedDeliveryDays} روز کاری</TableCell>
                      <TableCell>
                        {method.isSupplierDelivery ? 
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ارسال توسط تامین کننده</Badge> : 
                          <Badge variant="outline">ارسال توسط پست</Badge>
                        }
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">ویرایش</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>مناطق ارسال</CardTitle>
              <CardDescription>مدیریت مناطق ارسال و محدودیت‌ها</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>لیست مناطق ارسال</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام منطقه</TableHead>
                    <TableHead>استان‌ها</TableHead>
                    <TableHead>روش‌های ارسال</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingZones.map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell className="font-medium">{zone.name}</TableCell>
                      <TableCell>{zone.regions.join("، ")}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {zone.shippingMethods.map((methodId) => {
                            const method = getMethodById(methodId.id);
                            return method ? (
                              <Badge key={methodId.id} variant="outline" className="mr-1">
                                {method.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">ویرایش</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>انبارها</CardTitle>
              <CardDescription>مدیریت انبارها و موجودی</CardDescription>
            </CardHeader>
            <CardContent>
              {warehouseAddresses.length > 0 ? (
                <Table>
                  <TableCaption>لیست انبارها</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام انبار</TableHead>
                      <TableHead>آدرس</TableHead>
                      <TableHead>شهر</TableHead>
                      <TableHead>استان</TableHead>
                      <TableHead>موقعیت</TableHead>
                      <TableHead>عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouseAddresses.map((warehouse) => (
                      <TableRow key={warehouse.id}>
                        <TableCell className="font-medium">{warehouse.title}</TableCell>
                        <TableCell>{warehouse.street}</TableCell>
                        <TableCell>{warehouse.city}</TableCell>
                        <TableCell>{warehouse.state}</TableCell>
                        <TableCell>
                          {warehouse.location ? (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>دارای موقعیت</span>
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-800">
                              فاقد موقعیت
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <a href="/addresses">مدیریت</a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <MapIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">هیچ انباری ثبت نشده است</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    برای مدیریت انبارها، لطفا به بخش آدرس‌ها مراجعه کنید و آدرس جدیدی با نوع "انبار" ایجاد کنید.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <a href="/addresses">مدیریت آدرس‌ها</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>پیگیری ارسال</CardTitle>
              <CardDescription>وضعیت ارسال سفارشات</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>آخرین وضعیت ارسال سفارشات</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره سفارش</TableHead>
                    <TableHead>محصول</TableHead>
                    <TableHead>مشتری</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>پیشرفت ارسال</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => {
                    // تعیین درصد پیشرفت بر اساس وضعیت سفارش
                    let progress = 0;
                    switch (order.status) {
                      case "pending":
                        progress = 10;
                        break;
                      case "processing":
                        progress = 30;
                        break;
                      case "ready":
                        progress = 50;
                        break;
                      case "shipped":
                        progress = 75;
                        break;
                      case "delivered":
                        progress = 100;
                        break;
                      default:
                        progress = 0;
                    }

                    return (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id.substring(0, 8)}</TableCell>
                        <TableCell className="font-medium">{order.productName}</TableCell>
                        <TableCell>{order.buyerName}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>
                          <div className="w-full flex items-center gap-2">
                            <Progress value={progress} className="h-2" />
                            <span className="text-xs w-8">{progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">بررسی</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="text-yellow-600 bg-yellow-50">در انتظار تایید</Badge>;
    case "processing":
      return <Badge variant="outline" className="text-blue-600 bg-blue-50">در حال پردازش</Badge>;
    case "ready":
      return <Badge variant="outline" className="text-purple-600 bg-purple-50">آماده ارسال</Badge>;
    case "shipped":
      return <Badge variant="outline" className="text-indigo-600 bg-indigo-50">ارسال شده</Badge>;
    case "delivered":
      return <Badge variant="outline" className="text-green-600 bg-green-50" 
        title="تحویل داده شده">
          <Check className="h-3.5 w-3.5 mr-1" />
          <span>تحویل شده</span>
      </Badge>;
    case "cancelled":
      return <Badge variant="outline" className="text-red-600 bg-red-50">لغو شده</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default Shipping;
