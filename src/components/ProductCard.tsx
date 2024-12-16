import React from 'react';
import { MapPin, Trash2, Clock } from 'lucide-react';
import { Product } from '../types';
import { PriceDisplay } from './ui/PriceDisplay';
import { PriceChange } from './ui/PriceChange';
import { ProductImage } from './ui/ProductImage';
import { formatDate, formatTime } from '../utils/dateUtils';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const initialPrice = product.priceHistory[0].price;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <ProductImage url={product.photoUrl} data={product.photoData} alt={product.name} />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <button
            onClick={() => onDelete(product.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete product"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <PriceDisplay price={product.currentPrice} />
          <PriceChange currentPrice={product.currentPrice} initialPrice={initialPrice} />
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            {product.location}
          </div>
          
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            Last checked: {formatDate(product.lastChecked)} at {formatTime(product.lastChecked)}
          </div>
        </div>
      </div>
    </div>
  );
}