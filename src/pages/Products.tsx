
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
        <Button>افزودن محصول جدید</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="h-48 bg-muted">
                {product.images.length > 0 && (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
              <div className="p-6 pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">موجودی: {product.stockQuantity}</div>
                <div className="font-semibold">{product.priceTiers[0].price.toLocaleString()} تومان</div>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <Button variant="outline" size="sm" className="w-full">ویرایش</Button>
                <Button variant="outline" size="sm" className="w-full">مشاهده</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
