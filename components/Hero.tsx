
import React from 'react';
import { FEATURED_PRODUCT, STORE_NAME } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative dark-gradient text-white min-h-[80vh] flex items-center overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/4"></div>
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 text-right">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
              <span className="text-xs font-black tracking-widest uppercase">نخبة المنتجات في الجزائر 🇩🇿</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="text-accent italic">Elite</span><br/>
              Prestige DZ
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light">
              مرحباً بك في عالم <span className="text-white font-bold">نخبة الفخامة</span>. نوفر لك أرقى الحلول والمنتجات التي تجمع بين الذكاء والأناقة والفعالية.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gold-gradient text-slate-900 px-12 py-5 rounded-full font-black text-xl hover:shadow-[0_0_30px_-5px_#fbbf24] transition-all transform hover:-translate-y-1 active:scale-95"
              >
                اكتشف الفخامة الآن
              </button>
              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex -space-x-2 space-x-reverse">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                      VIP
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold">انضم لـ +5000 زبون سعيد</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10">
              <img 
                src={FEATURED_PRODUCT.image} 
                className="w-full max-w-lg mx-auto rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-white/5"
                alt="Product"
              />
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl hidden md:block">
                <div className="text-accent text-3xl font-black mb-1">PREMIUM</div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-tighter">جودة النخبة</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
