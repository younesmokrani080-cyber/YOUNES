
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onOrder: (p: Product) => void;
  isSingleProductMode?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onOrder, isSingleProductMode = false }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 0 });

  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {!isSingleProductMode && (
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
        >
          <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          العودة للمنتجات
        </button>
      )}

      <div className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row-reverse" dir="rtl">
        
        {/* Gallery Section */}
        <div className="lg:w-1/2 p-6 md:p-12 bg-slate-50/50">
          <div className="sticky top-32">
            <div className="relative aspect-square mb-6 group overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white shadow-inner">
              <img 
                src={activeImage} 
                className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                alt={product.name}
              />
              <div className="absolute top-8 right-8 gold-gradient text-slate-900 px-6 py-2 rounded-full font-black text-xs shadow-lg">
                عرض محدود ✨
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[product.image, ...(product.images || [])].filter((img, i, self) => self.indexOf(img) === i).slice(0, 4).map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === img ? 'border-accent scale-95 shadow-lg' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 p-8 md:p-16 text-right">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{product.category}</span>
            <div className="h-px flex-grow bg-slate-100"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            {product.name}
          </h2>

          {/* Urgency Timer */}
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-10 flex items-center justify-between">
            <span className="text-red-600 font-black flex items-center gap-2 text-sm md:text-base">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ينتهي العرض خلال:
            </span>
            <div className="flex gap-2">
              {[timeLeft.h, timeLeft.m, timeLeft.s].map((unit, i) => (
                <div key={i} className="bg-white px-3 py-1 rounded-lg shadow-sm font-black text-red-600 border border-red-100 min-w-[40px] text-center">
                  {unit.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-3 mb-12">
            <span className="text-5xl md:text-6xl font-black text-slate-900">{product.price.toLocaleString()}</span>
            <span className="text-2xl font-bold text-slate-400 pb-2">دج</span>
            <span className="text-slate-300 line-through text-xl md:text-2xl pb-2 mr-4">1,200 دج</span>
          </div>

          <div className="space-y-4 mb-12">
            {product.features.map((f, i) => (
              <div key={i} className="flex items-center gap-4 text-base md:text-lg font-semibold text-slate-700">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                </div>
                {f}
              </div>
            ))}
          </div>

          {/* Professional Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: 'توصيل سريع', icon: '🚚' },
              { label: 'دفع عند الاستلام', icon: '🤝' },
              { label: 'ضمان الجودة', icon: '⭐' }
            ].map((badge, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-[10px] font-black text-slate-500 uppercase">{badge.label}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onOrder(product)}
            className="w-full gold-gradient text-slate-900 text-2xl md:text-3xl font-black py-6 md:py-8 rounded-[2rem] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all flex flex-col items-center gap-1 active:scale-95"
          >
            <span>أطلب الآن - دفع عند الاستلام</span>
            <span className="text-xs md:text-sm opacity-70 font-bold">توصيل لباب المنزل في 24-48 ساعة ⚡</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
