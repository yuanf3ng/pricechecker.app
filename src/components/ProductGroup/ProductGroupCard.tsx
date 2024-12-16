import React from 'react';
import { Product } from '../../types';
import { PriceLineChart } from '../PriceChart/PriceLineChart';
import { getUniqueLocations } from '../../utils/groupUtils';
import { ProductList } from './ProductList';

interface ProductGroupCardProps {
  name: string;
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductGroupCard({ name, products, onDelete }: ProductGroupCardProps) {
  const locations = getUniqueLocations(products);
  const lowestPrice = Math.min(...products.map(p => p.currentPrice));
  const highestPrice = Math.max(...products.map(p => p.currentPrice));
  const priceRange = highestPrice - lowestPrice;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{name}</h2>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Price Range:</span>
          <span>${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Price Difference:</span>
          <span>${priceRange.toFixed(2)}</span>
        </div>
        
        <PriceLineChart products={products} locations={locations} />
      </div>

      <ProductList products={products} onDelete={onDelete} />
    </div>
  );
}