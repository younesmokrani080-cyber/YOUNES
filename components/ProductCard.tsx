
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onOrder: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onOrder }) => {
  return (
    <div className="glass rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-white/50 flex flex-col text-right" dir="rtl">
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={onClick}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md uppercase tracking-widest">
            {product.category} 🔦
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-3xl font-extrabold text-gray-800 mb-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={onClick}>
          {product.name}
        </h3>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed font-medium">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between flex-row-reverse">
          <div className="flex flex-col items-start">
            <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">السعر الحالي</span>
            <div className="text-3xl font-black text-blue-700">
              {product.price.toLocaleString()} <span className="text-sm font-bold text-blue-400">دج</span>
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOrder();
            }}
            className="bg-blue-600 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/20 font-black"
          >
            اطلب الآن 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
