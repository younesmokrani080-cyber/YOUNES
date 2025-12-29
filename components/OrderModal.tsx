
import React, { useState, useMemo, useEffect } from 'react';
import { Product, OrderFormData } from '../types';
import { ALGERIA_WILAYAS, STORE_WHATSAPP, getShippingRate, YALEDINE_OFFICE_FEE, STORE_NAME } from '../constants';

interface OrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    wilaya: "الجزائر",
    baladiya: '',
    address: '',
    deliveryMethod: 'home'
  });

  const shippingCost = useMemo(() => {
    if (formData.deliveryMethod === 'yaledine') {
      return YALEDINE_OFFICE_FEE;
    }
    return getShippingRate(formData.wilaya);
  }, [formData.wilaya, formData.deliveryMethod]);

  const totalPrice = product.price + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deliveryMethodText = formData.deliveryMethod === 'yaledine' ? '📦 مكتب Yaledine (استلام)' : '🏠 توصيل للمنزل';
    const msg = `
🌟 *طلب جديد من ${STORE_NAME}* 🌟
----------------------------
🛍️ *المنتج:* ${product.name}
💰 *السعر:* ${product.price} دج
🚚 *طريقة الشحن:* ${deliveryMethodText}
💵 *تكلفة التوصيل:* ${shippingCost} دج
🔥 *الإجمالي المطلوب:* ${totalPrice} دج
----------------------------
👤 *الاسم:* ${formData.fullName}
📞 *الهاتف:* ${formData.phone}
📍 *الولاية:* ${formData.wilaya}
🏙️ *البلدية:* ${formData.baladiya}
🏠 *العنوان:* ${formData.address}
----------------------------
✅ *أرغب في تأكيد هذا الطلب.*
    `.trim();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-300 min-h-[400px] flex items-center justify-center" dir="rtl">
        
        {isSuccess ? (
          <div className="text-center p-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900">تم تسجيل طلبك بنجاح!</h2>
            <p className="text-slate-500 text-lg font-bold">شكراً لثقتك بـ {STORE_NAME}. جاري تحويلك الآن لتأكيد الطلب عبر واتساب...</p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-visible w-full">
            
            <div className="lg:w-1/3 bg-slate-50 p-6 md:p-10 border-l border-slate-100 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-black mb-6 text-slate-800">ملخص الطلب</h3>
                <div className="aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-white p-3 mb-4 shadow-sm">
                  <img src={product.image} className="w-full h-full object-contain" alt={product.name} />
                </div>
                <p className="font-black text-slate-900 text-lg leading-snug">{product.name}</p>
              </div>
              
              <div className="mt-auto space-y-4 text-sm md:text-base bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">سعر المنتج:</span>
                  <span className="font-black text-slate-900">{product.price} دج</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">التوصيل:</span>
                  <span className="font-black text-blue-600">{shippingCost} دج</span>
                </div>
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between items-center text-xl">
                  <span className="font-black text-slate-900">المجموع:</span>
                  <span className="font-black text-orange-600">{totalPrice} دج</span>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 p-6 md:p-12 relative">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">معلومات الشحن</h2>
                  <p className="text-slate-500 font-bold mt-1">يرجى ملء البيانات بدقة لضمان وصول الطلب</p>
                </div>
                <button onClick={onClose} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">الاسم الكامل</label>
                    <input required type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-800" placeholder="مثال: أحمد بن علي" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">رقم الهاتف</label>
                    <input required type="tel" className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-800 text-left" dir="ltr" placeholder="0XXXXXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">طريقة التوصيل</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, deliveryMethod: 'home'})}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${formData.deliveryMethod === 'home' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                    >
                      <span className="text-2xl">🏠</span>
                      <span className="font-black text-sm">توصيل للمنزل</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, deliveryMethod: 'yaledine'})}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${formData.deliveryMethod === 'yaledine' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                    >
                      <span className="text-2xl">📦</span>
                      <span className="font-black text-sm">مكتب Yaledine</span>
                      <span className="text-[10px] text-blue-600 font-bold bg-white px-2 py-0.5 rounded-full shadow-sm">{YALEDINE_OFFICE_FEE} دج فقط</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">الولاية</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold appearance-none text-slate-800" value={formData.wilaya} onChange={e => setFormData({...formData, wilaya: e.target.value})}>
                        {ALGERIA_WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">البلدية</label>
                    <input required type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-800" placeholder="البلدية" value={formData.baladiya} onChange={e => setFormData({...formData, baladiya: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">{formData.deliveryMethod === 'yaledine' ? 'اسم مكتب Yaledine' : 'العنوان الكامل'}</label>
                  <input required type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-800" placeholder={formData.deliveryMethod === 'yaledine' ? "مثال: مكتب Yaledine وسط المدينة" : "رقم الشارع، اسم الحي..."} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className={`w-full gold-gradient text-slate-900 font-black py-6 rounded-[1.5rem] text-xl shadow-2xl shadow-orange-500/20 mt-8 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>تأكيد الطلب (دفع عند الاستلام)</span>
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.459-2.702-1.454-1.146-.994-1.628-2.069-1.814-2.392-.187-.324-.015-.503.15-.633.13-.103.248-.267.373-.399.124-.132.16-.225.244-.375.082-.15.041-.282-.021-.405-.062-.124-.555-1.334-.761-1.83-.2-.482-.406-.415-.557-.423-.14-.007-.3-.008-.461-.008-.161 0-.422.061-.644.302-.221.241-.845.824-.845 2.01 0 1.185.862 2.33 1.019 2.536.157.206 1.62 2.474 3.924 3.468.548.237.976.379 1.309.484.55.174 1.051.15 1.447.091.442-.066 1.361-.556 1.551-1.093.19-.537.19-1.002.133-1.093-.056-.091-.208-.144-.436-.259z"/></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
