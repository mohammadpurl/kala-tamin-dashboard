
// Export everything from each data file
export * from './products';
export * from './orders';
export * from './addresses';
export * from './users';
export * from './shipping';
export * from './analytics';

// Re-export types that were used in the original mockData.ts
export type { Product, Order, OrderStatus } from '../types';
