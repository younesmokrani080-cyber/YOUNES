
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (p: Product) => void;
  onOrderClick: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onOrderClick }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
        <div className="text-6xl mb-4">🔎</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">عذراً، لم نجد أي منتجات!</h3>
        <p className="text-gray-500">حاول تغيير خيارات التصفية أو البحث عن شيء آخر.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick(product)}
          onOrder={() => onOrderClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
