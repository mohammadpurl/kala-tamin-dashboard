
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Search, FileText, Upload, Edit, Trash2, Eye } from "lucide-react";
import { products, Product } from "@/data/mockData";

const Products = () => {
  const [productList, setProductList] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    stockQuantity: 0,
    priceTiers: [{ minQuantity: 1, price: 0 }]
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewingProduct, setIsViewingProduct] = useState(false);

  const { toast } = useToast();

  const handleAddProduct = () => {
    const id = Date.now().toString();
    const product: Product = {
      ...newProduct as Product,
      id,
      images: ["/placeholder.svg"],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setProductList([product, ...productList]);
    toast({
      title: "محصول جدید اضافه شد",
      description: `${product.name} با موفقیت به لیست محصولات اضافه شد.`,
    });
    
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      description: '',
      category: '',
      stockQuantity: 0,
      priceTiers: [{ minQuantity: 1, price: 0 }]
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(productList.filter(product => product.id !== id));
    toast({
      title: "محصول حذف شد",
      description: "محصول با موفقیت از لیست محصولات حذف شد.",
      variant: "destructive"
    });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewingProduct(true);
  };

  const filteredProducts = productList.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePriceTierChange = (index: number, field: 'minQuantity' | 'price', value: number) => {
    const updatedPriceTiers = [...(newProduct.priceTiers || [])];
    updatedPriceTiers[index] = {
      ...updatedPriceTiers[index],
      [field]: value
    };
    
    setNewProduct({
      ...newProduct,
      priceTiers: updatedPriceTiers
    });
  };

  const addPriceTier = () => {
    const lastTier = newProduct.priceTiers?.[newProduct.priceTiers.length - 1];
    const newMinQty = lastTier ? lastTier.minQuantity * 5 : 1;
    
    setNewProduct({
      ...newProduct,
      priceTiers: [
        ...(newProduct.priceTiers || []),
        { minQuantity: newMinQty, price: 0 }
      ]
    });
  };

  const removePriceTier = (index: number) => {
    const updatedPriceTiers = [...(newProduct.priceTiers || [])];
    updatedPriceTiers.splice(index, 1);
    
    setNewProduct({
      ...newProduct,
      priceTiers: updatedPriceTiers
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مدیریت محصولات</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <FileText size={18} />
            خروجی اکسل
          </Button>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle size={18} />
                محصول جدید
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rtl">
              <DialogHeader>
                <DialogTitle>افزودن محصول جدید</DialogTitle>
                <DialogDescription>
                  مشخصات محصول جدید را وارد کنید.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">نام محصول</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="نام محصول"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">دسته‌بندی</Label>
                    <Select
                      onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="لپ تاپ">لپ تاپ</SelectItem>
                        <SelectItem value="موبایل">موبایل</SelectItem>
                        <SelectItem value="تبلت">تبلت</SelectItem>
                        <SelectItem value="مانیتور">مانیتور</SelectItem>
                        <SelectItem value="صوتی">صوتی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="توضیحاتی درباره محصول وارد کنید"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">موجودی</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value) || 0})}
                    placeholder="تعداد موجودی"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>قیمت‌گذاری پلکانی</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addPriceTier}
                    >
                      افزودن پله قیمت
                    </Button>
                  </div>
                  
                  {newProduct.priceTiers?.map((tier, index) => (
                    <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end">
                      <div className="space-y-2">
                        <Label htmlFor={`min-qty-${index}`}>حداقل تعداد</Label>
                        <Input
                          id={`min-qty-${index}`}
                          type="number"
                          value={tier.minQuantity}
                          onChange={(e) => handlePriceTierChange(index, 'minQuantity', parseInt(e.target.value) || 0)}
                          placeholder="حداقل تعداد"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`price-${index}`}>قیمت (تومان)</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          value={tier.price}
                          onChange={(e) => handlePriceTierChange(index, 'price', parseInt(e.target.value) || 0)}
                          placeholder="قیمت"
                        />
                      </div>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removePriceTier(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">تصاویر محصول</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">تصاویر را اینجا بکشید یا کلیک کنید</p>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingProduct(false)}>انصراف</Button>
                <Button onClick={handleAddProduct}>ثبت محصول</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>لیست محصولات</CardTitle>
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="جستجوی محصول..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>مدیریت محصولات و قیمت‌گذاری</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">همه محصولات</TabsTrigger>
              <TabsTrigger value="active">فعال</TabsTrigger>
              <TabsTrigger value="outOfStock">اتمام موجودی</TabsTrigger>
            </TabsList>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-3 px-4">محصول</th>
                    <th className="text-right py-3 px-4">دسته‌بندی</th>
                    <th className="text-right py-3 px-4">قیمت پایه</th>
                    <th className="text-right py-3 px-4">موجودی</th>
                    <th className="text-right py-3 px-4">آخرین بروزرسانی</th>
                    <th className="text-right py-3 px-4">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-3">
                            <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full" />
                          </div>
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">{product.priceTiers[0].price.toLocaleString()} تومان</td>
                      <td className="py-3 px-4">{product.stockQuantity}</td>
                      <td className="py-3 px-4">{new Intl.DateTimeFormat('fa-IR').format(product.updatedAt)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewProduct(product)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
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
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">نمایش {filteredProducts.length} از {filteredProducts.length} محصول</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>قبلی</Button>
            <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
            <Button variant="outline" size="sm" disabled>بعدی</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isViewingProduct} onOpenChange={setIsViewingProduct}>
        <DialogContent className="sm:max-w-[600px] rtl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.category}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="max-w-full max-h-full" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">توضیحات محصول</h4>
                  <p className="text-sm">{selectedProduct.description}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">قیمت‌گذاری پلکانی</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-2">حداقل تعداد</th>
                        <th className="text-right py-2">قیمت (تومان)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.priceTiers.map((tier, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{tier.minQuantity.toLocaleString()}</td>
                          <td className="py-2">{tier.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">موجودی</h4>
                    <p>{selectedProduct.stockQuantity} عدد</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">تاریخ ایجاد</h4>
                    <p>{new Intl.DateTimeFormat('fa-IR').format(selectedProduct.createdAt)}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewingProduct(false)}>بستن</Button>
                <Button>ویرایش محصول</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
