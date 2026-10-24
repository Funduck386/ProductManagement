export interface Product {
  id: string;
  name: string;
  category: 'Audio' | 'Wearables' | 'Gaming' | 'Electronics' | string;
  price: number;
  inventory: number; // In-stock units (replaces Quantity in metadata)
  quantity: number;  // Selected purchase quantity (starts with 0)
  rating: number;
  imageUrl: string;
  description: string;
  specification: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CategoryFilter = 'All' | 'Audio' | 'Wearables' | 'Gaming' | 'Electronics';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
