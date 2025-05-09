
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash2, MapPin, TruckIcon } from "lucide-react";
import { shippingMethods, shippingZones } from "@/data/mockData";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  description: z.string().optional(),
  price: z.string().transform((val) => Number(val)),
  estimatedDeliveryDays: z.string().transform((val) => Number(val)),
  isSupplierDelivery: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

const Shipping = () => {
  const [methodsList, setMethodsList] = useState(shippingMethods);
  const [zonesList, setZonesList] = useState(shippingZones);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [activeTab, setActiveTab] = useState('methods');
  
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimatedDeliveryDays: "",
      isSupplierDelivery: false,
    },
  });

  const onSubmitMethod = (data: FormData) => {
    const newMethod = {
      id: `method_${Date.now()}`,
      name: data.name,
      description: data.description || "",
      price: data.price,
      estimatedDeliveryDays: data.estimatedDeliveryDays,
      isSupplierDelivery: data.isSupplierDelivery,
    };

    setMethodsList([...methodsList, newMethod]);
    setIsAddingMethod(false);
    
    toast({
      title: "روش ارسال اضافه شد",
      description: `روش ارسال "${data.name}" با موفقیت اضافه شد.`,
    });
    
    form.reset();
  };

  const handleDeleteMethod = (id: string) => {
    setMethodsList(methodsList.filter(method => method.id !== id));
    toast({
      title: "روش ارسال حذف شد",
      description: "روش ارسال با موفقیت حذف شد.",
    });
  };

  const filteredMethods = methodsList.filter(method => 
    method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredZones = zonesList.filter(zone => 
    zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.regions.some(region => region.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مدیریت ارسال و تحویل</h1>
        <div>
          {activeTab === 'methods' ? (
            <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={18} />
                  افزودن روش ارسال
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] rtl">
                <DialogHeader>
                  <DialogTitle>افزودن روش ارسال جدید</DialogTitle>
                  <DialogDescription>مشخصات روش ارسال جدید را وارد کنید.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitMethod)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نام روش ارسال</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: پست پیشتاز" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>توضیحات</FormLabel>
                          <FormControl>
                            <Input placeholder="توضیحات روش ارسال" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>قیمت (تومان)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="250000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="estimatedDeliveryDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>زمان تقریبی تحویل (روز)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="isSupplierDelivery"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>ارسال توسط تامین کننده</FormLabel>
                            <FormDescription>
                              در صورت انتخاب، ارسال توسط خود تامین کننده انجام خواهد شد.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddingMethod(false)}>انصراف</Button>
                      <Button type="submit">افزودن روش ارسال</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={isAddingZone} onOpenChange={setIsAddingZone}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={18} />
                  افزودن منطقه ارسال
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] rtl">
                <DialogHeader>
                  <DialogTitle>افزودن منطقه ارسال جدید</DialogTitle>
                  <DialogDescription>مشخصات منطقه ارسال جدید را وارد کنید.</DialogDescription>
                </DialogHeader>
                {/* محتوای فرم اضافه کردن منطقه ارسال */}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingZone(false)}>انصراف</Button>
                  <Button onClick={() => {
                    setIsAddingZone(false);
                    toast({
                      title: "منطقه ارسال اضافه شد",
                      description: "منطقه ارسال جدید با موفقیت اضافه شد.",
                    });
                  }}>افزودن منطقه</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>مدیریت ارسال و تحویل</CardTitle>
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="جستجو..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>مدیریت روش‌های ارسال و مناطق تحت پوشش</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="methods" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="methods">روش‌های ارسال</TabsTrigger>
              <TabsTrigger value="zones">مناطق تحت پوشش</TabsTrigger>
            </TabsList>
            
            <TabsContent value="methods">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">نام روش ارسال</th>
                      <th className="text-right py-3 px-4">توضیحات</th>
                      <th className="text-right py-3 px-4">هزینه (تومان)</th>
                      <th className="text-right py-3 px-4">زمان تحویل (روز)</th>
                      <th className="text-right py-3 px-4">نوع ارسال</th>
                      <th className="text-right py-3 px-4">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMethods.map(method => (
                      <tr key={method.id} className="border-b">
                        <td className="py-3 px-4">{method.name}</td>
                        <td className="py-3 px-4">{method.description}</td>
                        <td className="py-3 px-4">{method.price.toLocaleString()}</td>
                        <td className="py-3 px-4">{method.estimatedDeliveryDays} روز</td>
                        <td className="py-3 px-4">
                          {method.isSupplierDelivery ? 'ارسال توسط تامین کننده' : 'ارسال از طریق سیستم'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteMethod(method.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="zones">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">نام منطقه</th>
                      <th className="text-right py-3 px-4">استان‌ها/شهرهای تحت پوشش</th>
                      <th className="text-right py-3 px-4">تعداد روش‌های ارسال</th>
                      <th className="text-right py-3 px-4">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredZones.map(zone => (
                      <tr key={zone.id} className="border-b">
                        <td className="py-3 px-4">{zone.name}</td>
                        <td className="py-3 px-4">{zone.regions.join('، ')}</td>
                        <td className="py-3 px-4">{zone.shippingMethods.length}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Shipping;
