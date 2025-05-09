
import { Address } from "../types";

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
    latitude: 35.7219,
    longitude: 51.3347,
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
    latitude: 35.6892,
    longitude: 51.3890,
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
    latitude: 36.2605,
    longitude: 59.6168,
  },
];
