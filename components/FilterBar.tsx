
import React from 'react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceLimit: number;
  maxPrice: number;
  onPriceChange: (price: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceLimit,
  maxPrice,
  onPriceChange,
}) => {
  return (
    <div className="glass p-5 rounded-[2rem] shadow-xl border border-white flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
      {/* Category Filter */}
      <div className="flex flex-col w-full sm:w-auto">
        <label className="text-xs font-black text-blue-600 mb-2 mr-1 uppercase tracking-wider">التصنيف المفضل</label>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 4).map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block w-px h-12 bg-gray-200"></div>

      {/* Price Filter */}
      <div className="flex flex-col w-full sm:w-72">
        <div className="flex justify-between items-center mb-2 mr-1">
          <label className="text-xs font-black text-blue-600 uppercase tracking-wider">السعر الأقصى</label>
          <span className="bg-orange-100 text-orange-600 px-3 py-0.5 rounded-full text-xs font-black">
            {priceLimit.toLocaleString()} دج
          </span>
        </div>
        <input 
          type="range"
          min="0"
          max={maxPrice}
          step="100"
          value={priceLimit}
          onChange={(e) => onPriceChange(parseInt(e.target.value))}
          className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between mt-1 px-1">
          <span className="text-[10px] font-bold text-gray-400">0 دج</span>
          <span className="text-[10px] font-bold text-gray-400">{maxPrice.toLocaleString()} دج</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
