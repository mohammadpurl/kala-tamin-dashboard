
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowUp, Package, ShoppingCart, DollarSign, TrendingUp, Users } from 'lucide-react';
import { salesData, productStats } from '@/data';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">داشبورد</h1>
      
      {/* Stats cards row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">کل محصولات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">75</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Package size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <ArrowUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="mr-1">نسبت به ماه گذشته</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">سفارشات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">24</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <ShoppingCart size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <ArrowUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">6%</span>
              <span className="mr-1">نسبت به ماه گذشته</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">فروش ماهانه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">۴۷۵ میلیون</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <ArrowUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">15%</span>
              <span className="mr-1">نسبت به ماه گذشته</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">دنبال کنندگان</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">32</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Users size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <ArrowUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">9%</span>
              <span className="mr-1">نسبت به ماه گذشته</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>گزارش فروش</CardTitle>
            <CardDescription>مقایسه فروش ۶ ماه گذشته</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="فروش (تومان)" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>عملکرد محصولات</CardTitle>
            <CardDescription>پنج محصول پرفروش</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="فروش (تومان)" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders table */}
      <Card>
        <CardHeader>
          <CardTitle>سفارشات اخیر</CardTitle>
          <CardDescription>لیست آخرین سفارشات دریافت شده</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">شناسه</th>
                  <th className="text-right py-3 px-4">محصول</th>
                  <th className="text-right py-3 px-4">خریدار</th>
                  <th className="text-right py-3 px-4">مقدار</th>
                  <th className="text-right py-3 px-4">قیمت</th>
                  <th className="text-right py-3 px-4">تاریخ</th>
                  <th className="text-right py-3 px-4">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">#1</td>
                  <td className="py-3 px-4">لپ تاپ گیمینگ ایسوس</td>
                  <td className="py-3 px-4">محمد رضایی</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">72,000,000 تومان</td>
                  <td className="py-3 px-4">1402/02/25</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">در حال پردازش</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">#2</td>
                  <td className="py-3 px-4">موبایل سامسونگ گلکسی</td>
                  <td className="py-3 px-4">علی محمدی</td>
                  <td className="py-3 px-4">15</td>
                  <td className="py-3 px-4">172,500,000 تومان</td>
                  <td className="py-3 px-4">1402/02/20</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">ارسال شده</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">#3</td>
                  <td className="py-3 px-4">هدفون بلوتوثی سونی</td>
                  <td className="py-3 px-4">سارا کریمی</td>
                  <td className="py-3 px-4">30</td>
                  <td className="py-3 px-4">69,000,000 تومان</td>
                  <td className="py-3 px-4">1402/02/28</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">در انتظار</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm">مشاهده همه سفارشات</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
