
// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  priceTiers: PriceTier[];
  category: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceTier {
  minQuantity: number;
  price: number;
}

// Order types
export type OrderStatus = 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  status: OrderStatus;
  buyerName: string;
  buyerEmail: string;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

// Address types
export interface Address {
  id: string;
  title: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isWarehouse: boolean;
  isDefault: boolean;
  location?: GeoLocation;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  formattedAddress?: string;
}

// User types
export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

// Shipping types
export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDeliveryDays: number;
  isSupplierDelivery: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  shippingMethods: ShippingMethod[];
}

// Analytics types
export interface SalesData {
  date: string;
  amount: number;
}

export interface ProductStats {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
}
