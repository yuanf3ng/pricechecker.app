export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  location: string;
  photoUrl?: string;
  photoData?: string;
  lastChecked: string;
  priceHistory: PricePoint[];
}

export interface PricePoint {
  price: number;
  date: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  location: string;
  photoUrl?: string;
  photoData?: string;
}