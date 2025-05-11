
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash2, MapPin, Home, Warehouse, Map as MapIcon } from "lucide-react";
import { addresses } from "@/data/mockData";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import GoogleMapPicker from "@/components/GoogleMapPicker";
import GoogleMapConfig from "@/components/GoogleMapConfig";
import { Address, GeoLocation } from "@/types";
import { Separator } from "@/components/ui/separator";

const addressFormSchema = z.object({
  title: z.string().min(2, { message: "عنوان آدرس باید حداقل ۲ حرف باشد" }),
  street: z.string().min(5, { message: "آدرس خیابان باید حداقل ۵ حرف باشد" }),
  city: z.string().min(2, { message: "نام شهر باید حداقل ۲ حرف باشد" }),
  state: z.string().min(2, { message: "نام استان باید حداقل ۲ حرف باشد" }),
  postalCode: z.string().min(10, { message: "کد پستی باید ۱۰ رقم باشد" }).max(10),
  isWarehouse: z.boolean().default(false),
  isDefault: z.boolean().default(false),
  location: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    formattedAddress: z.string().optional()
  }).optional()
});

type AddressFormData = z.infer<typeof addressFormSchema>;

const Addresses = () => {
  const [addressesList, setAddressesList] = useState<Address[]>(addresses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation | null>(null);
  const [showMapConfig, setShowMapConfig] = useState<boolean>(false);
  
  const { toast } = useToast();
  
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      title: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      isWarehouse: false,
      isDefault: false,
      location: undefined
    },
  });

  React.useEffect(() => {
    // اگر آدرسی از نقشه انتخاب شده، فیلدهای فرم را به‌روزرسانی کنیم
    if (selectedLocation?.formattedAddress) {
      form.setValue("street", selectedLocation.formattedAddress || "");
      
      // بررسی وجود API key در localStorage
      const savedApiKey = localStorage.getItem('google_maps_api_key');
      if (savedApiKey) {
        setGoogleMapsApiKey(savedApiKey);
      }
    }
  }, [selectedLocation, form]);

  const handleApiKeySet = (apiKey: string) => {
    setGoogleMapsApiKey(apiKey);
    setShowMapConfig(false);
  };

  const handleLocationSelect = (location: GeoLocation & { address: string }) => {
    setSelectedLocation({
      lat: location.lat,
      lng: location.lng,
      formattedAddress: location.address
    });
    
    form.setValue("location", {
      lat: location.lat,
      lng: location.lng,
      formattedAddress: location.address
    });
    
    if (location.address) {
      form.setValue("street", location.address);
    }
    
    toast({
      title: "موقعیت انتخاب شد",
      description: location.address || "آدرس انتخاب شد.",
    });
  };

  const onSubmitAddress = (data: AddressFormData) => {
    // اگر آدرس پیش‌فرض باشد، آدرس‌های پیش‌فرض قبلی را آپدیت کنیم
    if (data.isDefault) {
      if (data.isWarehouse) {
        // فقط آدرس‌های پیش‌فرض انبار را به حالت غیر پیش‌فرض تغییر دهیم
        setAddressesList(addressesList.map(addr => 
          addr.isWarehouse && addr.isDefault ? { ...addr, isDefault: false } : addr
        ));
      } else {
        // فقط آدرس‌های پیش‌فرض غیر انبار را به حالت غیر پیش‌فرض تغییر دهیم
        setAddressesList(addressesList.map(addr => 
          !addr.isWarehouse && addr.isDefault ? { ...addr, isDefault: false } : addr
        ));
      }
    }

    const newAddress: Address = {
      id: `addr_${Date.now()}`,
      title: data.title,
      street: data.street,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      isWarehouse: data.isWarehouse,
      isDefault: data.isDefault,
      location: data.location
    };

    setAddressesList([...addressesList, newAddress]);
    setIsAddingAddress(false);
    
    toast({
      title: "آدرس اضافه شد",
      description: `آدرس "${data.title}" با موفقیت اضافه شد.`,
    });
    
    form.reset();
    setSelectedLocation(null);
  };

  const handleDeleteAddress = (id: string) => {
    setAddressesList(addressesList.filter(address => address.id !== id));
    toast({
      title: "آدرس حذف شد",
      description: "آدرس با موفقیت حذف شد.",
    });
  };

  const handleSetDefault = (id: string, isWarehouse: boolean) => {
    setAddressesList(addressesList.map(addr => {
      // اگر آدرس فعلی است، آن را به حالت پیش‌فرض تغییر دهیم
      if (addr.id === id) {
        return { ...addr, isDefault: true };
      }
      
      // اگر آدرس انبار است و آدرس مورد نظر هم انبار است، آن را از حالت پیش‌فرض خارج کنیم
      if (addr.isWarehouse && isWarehouse && addr.isDefault) {
        return { ...addr, isDefault: false };
      }
      
      // اگر آدرس غیر انبار است و آدرس مورد نظر هم غیر انبار است، آن را از حالت پیش‌فرض خارج کنیم
      if (!addr.isWarehouse && !isWarehouse && addr.isDefault) {
        return { ...addr, isDefault: false };
      }
      
      return addr;
    }));
    
    toast({
      title: "آدرس پیش‌فرض تنظیم شد",
      description: "آدرس انتخاب شده به عنوان آدرس پیش‌فرض تنظیم شد.",
    });
  };

  const filteredAddresses = addressesList.filter(address => {
    const matchesSearch = 
      address.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.state.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'warehouse') return matchesSearch && address.isWarehouse;
    if (activeTab === 'office') return matchesSearch && !address.isWarehouse;
    
    return matchesSearch;
  });

  const viewOnMap = (address: Address) => {
    if (!googleMapsApiKey) {
      setShowMapConfig(true);
      return;
    }

    if (!address.location) {
      toast({
        title: "موقعیت مکانی موجود نیست",
        description: "این آدرس دارای موقعیت مکانی نیست.",
        variant: "destructive"
      });
      return;
    }

    // اینجا میتوانید یک دیالوگ برای نمایش موقعیت آدرس روی نقشه باز کنید
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address.location.lat},${address.location.lng}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مدیریت آدرس‌ها</h1>
        <div>
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} />
                افزودن آدرس جدید
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] rtl">
              <DialogHeader>
                <DialogTitle>افزودن آدرس جدید</DialogTitle>
                <DialogDescription>مشخصات آدرس جدید را وارد کنید یا از روی نقشه انتخاب کنید.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitAddress)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان آدرس</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: دفتر مرکزی" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {!googleMapsApiKey && (
                    <div className="bg-muted/30 p-4 rounded-md border border-muted">
                      <div className="flex items-center gap-4 mb-2">
                        <MapIcon size={20} />
                        <p className="font-medium">انتخاب آدرس از روی نقشه</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">برای انتخاب آدرس از روی نقشه، ابتدا باید کلید API گوگل مپ را تنظیم کنید.</p>
                      <Button variant="outline" onClick={() => setShowMapConfig(true)}>تنظیم کلید API</Button>
                    </div>
                  )}
                  
                  {googleMapsApiKey && (
                    <>
                      <div className="bg-muted/30 p-4 rounded-md border border-muted">
                        <p className="font-medium mb-2">انتخاب آدرس از روی نقشه</p>
                        <p className="text-sm text-muted-foreground mb-4">روی نقشه کلیک کنید تا موقعیت انتخاب شود.</p>
                        <GoogleMapPicker 
                          apiKey={googleMapsApiKey} 
                          onLocationSelect={handleLocationSelect} 
                          initialLocation={selectedLocation || undefined}
                        />
                        {selectedLocation && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            <p>آدرس: {selectedLocation.formattedAddress}</p>
                            <p>مختصات: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</p>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="my-4" />
                    </>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>آدرس خیابان</FormLabel>
                        <FormControl>
                          <Input placeholder="خیابان، کوچه، پلاک" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>شهر</FormLabel>
                          <FormControl>
                            <Input placeholder="نام شهر" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>استان</FormLabel>
                          <FormControl>
                            <Input placeholder="نام استان" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کد پستی</FormLabel>
                        <FormControl>
                          <Input placeholder="کد پستی ۱۰ رقمی" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isWarehouse"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>آدرس انبار</FormLabel>
                          <FormDescription>
                            در صورت انتخاب، این آدرس به عنوان آدرس انبار در نظر گرفته می‌شود.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>آدرس پیش‌فرض</FormLabel>
                          <FormDescription>
                            در صورت انتخاب، این آدرس به عنوان آدرس پیش‌فرض در نظر گرفته می‌شود.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddingAddress(false)}>انصراف</Button>
                    <Button type="submit">افزودن آدرس</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Dialog open={showMapConfig} onOpenChange={setShowMapConfig}>
        <DialogContent className="sm:max-w-[550px]">
          <GoogleMapConfig onApiKeySet={handleApiKeySet} />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>آدرس‌های ثبت شده</CardTitle>
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="جستجوی آدرس..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>مدیریت آدرس‌های دفتر و انبارها</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">همه آدرس‌ها</TabsTrigger>
              <TabsTrigger value="warehouse">انبارها</TabsTrigger>
              <TabsTrigger value="office">دفاتر</TabsTrigger>
            </TabsList>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-3 px-4">عنوان</th>
                    <th className="text-right py-3 px-4">آدرس</th>
                    <th className="text-right py-3 px-4">شهر/استان</th>
                    <th className="text-right py-3 px-4">کد پستی</th>
                    <th className="text-right py-3 px-4">نوع</th>
                    <th className="text-right py-3 px-4">وضعیت</th>
                    <th className="text-right py-3 px-4">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAddresses.map(address => (
                    <tr key={address.id} className="border-b">
                      <td className="py-3 px-4">{address.title}</td>
                      <td className="py-3 px-4">{address.street}</td>
                      <td className="py-3 px-4">{address.city}، {address.state}</td>
                      <td className="py-3 px-4" dir="ltr">{address.postalCode}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {address.isWarehouse ? (
                            <>
                              <Warehouse className="h-4 w-4 ml-1" />
                              <span>انبار</span>
                            </>
                          ) : (
                            <>
                              <Home className="h-4 w-4 ml-1" />
                              <span>دفتر</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {address.isDefault && (
                          <Badge className="bg-green-100 text-green-800">
                            پیش‌فرض
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {address.location && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => viewOnMap(address)}
                              title="مشاهده روی نقشه"
                            >
                              <MapIcon className="h-4 w-4" />
                            </Button>
                          )}
                          {!address.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleSetDefault(address.id, address.isWarehouse)}
                              title="تنظیم به عنوان پیش‌فرض"
                            >
                              <MapPin className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteAddress(address.id)}
                            disabled={address.isDefault}
                            title={address.isDefault ? "آدرس پیش‌فرض قابل حذف نیست" : "حذف آدرس"}
                          >
                            <Trash2 className="h-4 w-4" />
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
      </Card>
    </div>
  );
};

export default Addresses;
