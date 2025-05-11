
import { Product, Order, Address, User, ShippingMethod, ShippingZone, ProductStats, SalesData, OrderStatus } from "../types";

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

// Generate mock orders
export const orders: Order[] = [
  {
    id: "1",
    productId: "1",
    productName: "لپ تاپ گیمینگ ایسوس",
    quantity: 3,
    price: 24000000,
    total: 72000000,
    status: "processing",
    buyerName: "محمد رضایی",
    buyerEmail: "mohammad@example.com",
    shippingAddress: {
      id: "addr1",
      title: "دفتر مرکزی",
      street: "خیابان ولیعصر، پلاک 158",
      city: "تهران",
      state: "تهران",
      postalCode: "1234567890",
      isWarehouse: false,
      isDefault: true,
    },
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-16"),
  },
  {
    id: "2",
    productId: "2",
    productName: "موبایل سامسونگ گلکسی",
    quantity: 15,
    price: 11500000,
    total: 172500000,
    status: "shipped",
    buyerName: "علی محمدی",
    buyerEmail: "ali@example.com",
    shippingAddress: {
      id: "addr2",
      title: "فروشگاه اصلی",
      street: "خیابان شریعتی، کوچه بهار، پلاک 42",
      city: "اصفهان",
      state: "اصفهان",
      postalCode: "8765432109",
      isWarehouse: false,
      isDefault: true,
    },
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-12"),
  },
  {
    id: "3",
    productId: "4",
    productName: "هدفون بلوتوثی سونی",
    quantity: 30,
    price: 2300000,
    total: 69000000,
    status: "pending",
    buyerName: "سارا کریمی",
    buyerEmail: "sara@example.com",
    shippingAddress: {
      id: "addr3",
      title: "شعبه غرب",
      street: "بلوار اشرفی اصفهانی، خیابان گلستان، پلاک 75",
      city: "تهران",
      state: "تهران",
      postalCode: "2345678901",
      isWarehouse: false,
      isDefault: false,
    },
    createdAt: new Date("2023-05-18"),
    updatedAt: new Date("2023-05-18"),
  },
];

// Export Order type from types for other components to use
export type { Order, OrderStatus, Product };

// Generate mock addresses
export const addresses: Address[] = [
  {
    id: "addr1",
    title: "دفتر مرکزی",
    street: "خیابان ولیعصر، پلاک 158",
    city: "تهران",
    state: "تهران",
    postalCode: "1234567890",
    isWarehouse: false,
    isDefault: true,
  },
  {
    id: "addr2",
    title: "انبار اصلی",
    street: "شهرک صنعتی، خیابان صنعت، پلاک 42",
    city: "تهران",
    state: "تهران",
    postalCode: "8765432109",
    isWarehouse: true,
    isDefault: true,
  },
  {
    id: "addr3",
    title: "انبار شرق",
    street: "بزرگراه شرق، خیابان سوم، پلاک 15",
    city: "مشهد",
    state: "خراسان رضوی",
    postalCode: "2345678901",
    isWarehouse: true,
    isDefault: false,
  },
];

// Generate mock users
export const users: User[] = [
  {
    id: "1",
    name: "حسین مدیر",
    email: "admin@example.com",
    role: "admin",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "مریم محمدی",
    email: "maryam@example.com",
    role: "manager",
    permissions: ["products.read", "products.write", "orders.read", "orders.write"],
  },
  {
    id: "3",
    name: "رضا احمدی",
    email: "reza@example.com",
    role: "staff",
    permissions: ["products.read", "orders.read"],
  },
];

// Generate mock shipping methods
export const shippingMethods: ShippingMethod[] = [
  {
    id: "1",
    name: "ارسال معمولی",
    description: "ارسال با پست معمولی - تحویل 3 تا 5 روز کاری",
    price: 200000,
    estimatedDeliveryDays: 5,
    isSupplierDelivery: false,
  },
  {
    id: "2",
    name: "ارسال سریع",
    description: "ارسال با پست پیشتاز - تحویل 1 تا 2 روز کاری",
    price: 350000,
    estimatedDeliveryDays: 2,
    isSupplierDelivery: false,
  },
  {
    id: "3",
    name: "تحویل توسط تامین کننده",
    description: "ارسال توسط وسایل نقلیه شرکت",
    price: 450000,
    estimatedDeliveryDays: 1,
    isSupplierDelivery: true,
  },
];

// Generate mock shipping zones
export const shippingZones: ShippingZone[] = [
  {
    id: "1",
    name: "تهران و حومه",
    regions: ["تهران", "کرج", "شهریار", "اسلامشهر"],
    shippingMethods: [
      {
        id: "1",
        name: "ارسال معمولی",
        description: "ارسال با پست معمولی - تحویل 3 تا 5 روز کاری",
        price: 200000,
        estimatedDeliveryDays: 5,
        isSupplierDelivery: false,
      },
      {
        id: "2",
        name: "ارسال سریع",
        description: "ارسال با پست پیشتاز - تحویل 1 تا 2 روز کاری",
        price: 350000,
        estimatedDeliveryDays: 2,
        isSupplierDelivery: false,
      },
      {
        id: "3",
        name: "تحویل توسط تامین کننده",
        description: "ارسال توسط وسایل نقلیه شرکت",
        price: 450000,
        estimatedDeliveryDays: 1,
        isSupplierDelivery: true,
      },
    ],
  },
  {
    id: "2",
    name: "مراکز استان‌ها",
    regions: ["اصفهان", "شیراز", "مشهد", "تبریز", "اهواز"],
    shippingMethods: [
      {
        id: "1",
        name: "ارسال معمولی",
        description: "ارسال با پست معمولی - تحویل 3 تا 5 روز کاری",
        price: 250000,
        estimatedDeliveryDays: 5,
        isSupplierDelivery: false,
      },
      {
        id: "2",
        name: "ارسال سریع",
        description: "ارسال با پست پیشتاز - تحویل 1 تا 2 روز کاری",
        price: 400000,
        estimatedDeliveryDays: 2,
        isSupplierDelivery: false,
      },
    ],
  },
];

// Generate mock sales data for chart
export const salesData: SalesData[] = [
  { date: "فروردین", amount: 245000000 },
  { date: "اردیبهشت", amount: 312000000 },
  { date: "خرداد", amount: 284000000 },
  { date: "تیر", amount: 385000000 },
  { date: "مرداد", amount: 430000000 },
  { date: "شهریور", amount: 475000000 },
];

// Generate mock product stats data
export const productStats: ProductStats[] = [
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

// List of suppliers followers
export const followers = [
  { id: "1", name: "فروشگاه دیجیتال برتر", email: "info@bartar.com", since: "1402/02/15" },
  { id: "2", name: "هایپر تکنو", email: "contact@hypertechno.ir", since: "1402/04/20" },
  { id: "3", name: "فروشگاه زنجیره‌ای مگا", email: "support@megastore.com", since: "1402/01/10" },
  { id: "4", name: "تکنو سنتر", email: "info@technocenter.ir", since: "1402/03/05" },
  { id: "5", name: "دیجی مارکت", email: "contact@digimarket.com", since: "1402/05/12" },
];
