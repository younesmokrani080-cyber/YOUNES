
import React from 'react';
import { STORE_NAME, STORE_WHATSAPP } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-right">
          
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-6">
              <div className="gold-gradient w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-900 ml-3">
                <span className="text-slate-900 font-black text-lg">E</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{STORE_NAME}</h3>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium max-w-sm">
              الوجهة الأولى في الجزائر لكل من يبحث عن الفخامة، الجودة، والتميز. نحن نختار منتجاتنا بعناية لتناسب أسلوب حياتكم الراقي.
            </p>
          </div>

          <div>
            <h4 className="font-black text-slate-900 text-lg mb-8 relative inline-block">
              تواصل مباشر
              <div className="absolute -bottom-2 right-0 w-8 h-1 bg-orange-500 rounded-full"></div>
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 justify-end">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-slate-400 uppercase">دعم واتساب 24/7</span>
                  <a href={`https://wa.me/${STORE_WHATSAPP}`} className="text-xl font-black text-slate-800 hover:text-green-600 transition-colors" dir="ltr">
                    +{STORE_WHATSAPP}
                  </a>
                </div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.459-2.702-1.454-1.146-.994-1.628-2.069-1.814-2.392-.187-.324-.015-.503.15-.633.13-.103.248-.267.373-.399.124-.132.16-.225.244-.375.082-.15.041-.282-.021-.405-.062-.124-.555-1.334-.761-1.83-.2-.482-.406-.415-.557-.423-.14-.007-.3-.008-.461-.008-.161 0-.422.061-.644.302-.221.241-.845.824-.845 2.01 0 1.185.862 2.33 1.019 2.536.157.206 1.62 2.474 3.924 3.468.548.237.976.379 1.309.484.55.174 1.051.15 1.447.091.442-.066 1.361-.556 1.551-1.093.19-.537.19-1.002.133-1.093-.056-.091-.208-.144-.436-.259z"/></svg>
                </div>
              </li>
              <li className="flex items-center gap-4 justify-end">
                <span className="text-sm font-bold text-slate-500">مقرنا الرئيسي: الجزائر العاصمة 🇩🇿</span>
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 text-lg mb-8 relative inline-block">
              سياسة النخبة
              <div className="absolute -bottom-2 right-0 w-8 h-1 bg-orange-500 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <span className="text-3xl mb-2">⚡</span>
                <span className="text-sm font-black text-slate-800">توصيل سريع مضمون عبر Yaledine</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">خدمة 5 نجوم</span>
              </div>
              <p className="text-xs text-slate-400 font-black text-center mt-4">نحن نضمن جودة كل قطعة تخرج من مخازننا</p>
            </div>
          </div>

        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm font-bold italic tracking-wider">
            Elite Prestige DZ - Crafted for the Chosen Few
          </p>
          <p className="text-slate-400 text-xs font-black">
            © {new Date().getFullYear()} جميع الحقوق محفوظة لمتجر النخبة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
