
import { ShippingMethod, ShippingZone } from "../types";

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
