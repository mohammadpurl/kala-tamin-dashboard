export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  stockQuantity: number;
  priceTiers: {
    minQuantity: number;
    price: number;
  }[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const products: Product[] = [
  {
    id: "1",
    name: "لپ تاپ لنوو",
    description: "لپ تاپ لنوو با پردازنده Core i7",
    category: "لپ تاپ",
    stockQuantity: 10,
    priceTiers: [
      { minQuantity: 1, price: 25000000 },
      { minQuantity: 5, price: 24000000 }
    ],
    images: ["/placeholder.svg"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "2",
    name: "گوشی سامسونگ",
    description: "گوشی سامسونگ گلکسی S24",
    category: "موبایل",
    stockQuantity: 15,
    priceTiers: [
      { minQuantity: 1, price: 35000000 },
      { minQuantity: 3, price: 34000000 }
    ],
    images: ["/placeholder.svg"],
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
  }
]; 