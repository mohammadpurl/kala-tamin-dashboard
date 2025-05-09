
import { Product } from "../types";

// Generate mock products
export const products: Product[] = [
  {
    id: "1",
    name: "لپ تاپ گیمینگ ایسوس",
    description: "لپ تاپ گیمینگ با پردازنده قدرتمند و کارت گرافیک حرفه ای",
    images: ["/placeholder.svg"],
    priceTiers: [
      { minQuantity: 1, price: 25000000 },
      { minQuantity: 5, price: 24000000 },
      { minQuantity: 10, price: 23000000 },
    ],
    category: "لپ تاپ",
    stockQuantity: 50,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-04-10"),
  },
  {
    id: "2",
    name: "موبایل سامسونگ گلکسی",
    description: "موبایل هوشمند با دوربین حرفه ای و باتری قدرتمند",
    images: ["/placeholder.svg"],
    priceTiers: [
      { minQuantity: 1, price: 12000000 },
      { minQuantity: 10, price: 11500000 },
      { minQuantity: 50, price: 11000000 },
    ],
    category: "موبایل",
    stockQuantity: 120,
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-05-05"),
  },
  {
    id: "3",
    name: "مانیتور اولترا واید ال جی",
    description: "مانیتور با کیفیت تصویر عالی و رنگ های دقیق",
    images: ["/placeholder.svg"],
    priceTiers: [
      { minQuantity: 1, price: 8500000 },
      { minQuantity: 5, price: 8200000 },
      { minQuantity: 15, price: 7900000 },
    ],
    category: "مانیتور",
    stockQuantity: 35,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    id: "4",
    name: "هدفون بلوتوثی سونی",
    description: "هدفون بی سیم با کیفیت صدای فوق العاده و عمر باتری طولانی",
    images: ["/placeholder.svg"],
    priceTiers: [
      { minQuantity: 1, price: 2500000 },
      { minQuantity: 20, price: 2300000 },
      { minQuantity: 50, price: 2100000 },
    ],
    category: "صوتی",
    stockQuantity: 200,
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-04-20"),
  },
  {
    id: "5",
    name: "تبلت اپل آیپد",
    description: "تبلت هوشمند با صفحه نمایش رتینا و عملکرد سریع",
    images: ["/placeholder.svg"],
    priceTiers: [
      { minQuantity: 1, price: 18000000 },
      { minQuantity: 5, price: 17500000 },
      { minQuantity: 10, price: 17000000 },
    ],
    category: "تبلت",
    stockQuantity: 45,
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-05-12"),
  },
];

// Export product stats
export const productStats = [
  {
    productId: "1",
    productName: "لپ تاپ گیمینگ ایسوس",
    totalSold: 42,
    revenue: 1050000000,
  },
  {
    productId: "2",
    productName: "موبایل سامسونگ گلکسی",
    totalSold: 78,
    revenue: 900000000,
  },
  {
    productId: "3",
    productName: "مانیتور اولترا واید ال جی",
    totalSold: 25,
    revenue: 210000000,
  },
  {
    productId: "4",
    productName: "هدفون بلوتوثی سونی",
    totalSold: 120,
    revenue: 300000000,
  },
  {
    productId: "5",
    productName: "تبلت اپل آیپد",
    totalSold: 36,
    revenue: 648000000,
  },
];
