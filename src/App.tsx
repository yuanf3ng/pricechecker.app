import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { Product, ProductFormData } from './types';
import { AddProductForm } from './components/AddProductForm';
import { ProductGroupCard } from './components/ProductGroup/ProductGroupCard';
import { groupProductsByName } from './utils/groupUtils';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: formData.name,
      currentPrice: formData.price,
      location: formData.location,
      photoUrl: formData.photoUrl,
      photoData: formData.photoData,
      lastChecked: new Date().toISOString(),
      priceHistory: [{ price: formData.price, date: new Date().toISOString() }],
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const productGroups = groupProductsByName(products);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <LineChart size={32} className="text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Price Tracker</h1>
        </div>

        <AddProductForm onAdd={handleAddProduct} />

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products added yet. Add your first product above!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Array.from(productGroups.entries()).map(([name, groupProducts]) => (
              <ProductGroupCard
                key={name}
                name={name}
                products={groupProducts}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;