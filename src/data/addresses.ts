
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
