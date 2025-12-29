
import React, { useState } from 'react';
import { STORE_NAME, STORE_WHATSAPP } from '../constants';

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onLogoClick }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center py-4 md:h-28 gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* LUXURY LOGO DESIGN */}
            <div className="flex items-center cursor-pointer group" onClick={onLogoClick}>
              <div className="relative ml-4">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-orange-400 text-xl animate-bounce">👑</div>
                <div className="gold-gradient w-14 h-14 flex items-center justify-center rounded-full border-4 border-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <span className="text-slate-900 font-black text-2xl luxury-text">E</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">ELITE</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black text-orange-600 tracking-[0.3em] uppercase">Prestige DZ</span>
                  <div className="w-8 h-[2px] bg-orange-200"></div>
                </div>
              </div>
            </div>
            
            <a 
              href={`https://wa.me/${STORE_WHATSAPP}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="md:hidden bg-green-50 p-2 rounded-full border border-green-100 text-green-600 shadow-sm"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.459-2.702-1.454-1.146-.994-1.628-2.069-1.814-2.392-.187-.324-.015-.503.15-.633.13-.103.248-.267.373-.399.124-.132.16-.225.244-.375.082-.15.041-.282-.021-.405-.062-.124-.555-1.334-.761-1.83-.2-.482-.406-.415-.557-.423-.14-.007-.3-.008-.461-.008-.161 0-.422.061-.644.302-.221.241-.845.824-.845 2.01 0 1.185.862 2.33 1.019 2.536.157.206 1.62 2.474 3.924 3.468.548.237.976.379 1.309.484.55.174 1.051.15 1.447.091.442-.066 1.361-.556 1.551-1.093.19-.537.19-1.002.133-1.093-.056-.091-.208-.144-.436-.259z"/>
              </svg>
            </a>
          </div>

          <div className="relative w-full md:max-w-md lg:max-w-lg">
            <input 
              type="text"
              placeholder="ابحث في مجموعة النخبة..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pr-14 pl-4 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 transition-all outline-none font-bold shadow-inner"
            />
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-orange-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={() => document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-md font-black shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95 border-b-4 border-orange-500 flex items-center gap-3"
            >
              <span className="text-xl">💎</span>
              تسوق بتميز
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
