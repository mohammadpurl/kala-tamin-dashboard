
import { User } from "../types";

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

// List of suppliers followers
export const followers = [
  { id: "1", name: "فروشگاه دیجیتال برتر", email: "info@bartar.com", since: "1402/02/15" },
  { id: "2", name: "هایپر تکنو", email: "contact@hypertechno.ir", since: "1402/04/20" },
  { id: "3", name: "فروشگاه زنجیره‌ای مگا", email: "support@megastore.com", since: "1402/01/10" },
  { id: "4", name: "تکنو سنتر", email: "info@technocenter.ir", since: "1402/03/05" },
  { id: "5", name: "دیجی مارکت", email: "contact@digimarket.com", since: "1402/05/12" },
];
