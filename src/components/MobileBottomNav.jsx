import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Sparkles, Calculator, ShoppingBag, Phone, MessageCircle, X } from 'lucide-react';

export const MobileBottomNav = () => {
  const { 
    cartItemCount, 
    cartTotal, 
    setIsCartOpen, 
    language, 
    settings,
    activeMobileTab,
    setActiveMobileTab,
    setSelectedCategory
  } = useStore();

  const isHindi = language === 'hi';
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const handleNavClick = (tabId, sectionId) => {
    setActiveMobileTab(tabId);
    if (tabId === 'cart') {
      setIsCartOpen(true);
      return;
    }
    if (tabId === 'call') {
      setIsContactSheetOpen(true);
      return;
    }

    if (sectionId) {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-amber-500/20 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] pb-safe">
        <div className="grid grid-cols-5 items-center justify-around">
          
          {/* Tab 1: Home */}
          <button
            onClick={() => handleNavClick('home', null)}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeMobileTab === 'home' ? 'text-amber-400 font-extrabold' : 'text-stone-400'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">{isHindi ? "होम" : "Home"}</span>
          </button>

          {/* Tab 2: Spices Catalog */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              handleNavClick('catalog', 'spices-catalog');
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeMobileTab === 'catalog' ? 'text-amber-400 font-extrabold' : 'text-stone-400'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">{isHindi ? "मसाले" : "Spices"}</span>
          </button>

          {/* Tab 3: Wholesale Calc */}
          <button
            onClick={() => handleNavClick('wholesale', 'wholesale-calc')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeMobileTab === 'wholesale' ? 'text-amber-400 font-extrabold' : 'text-stone-400'
            }`}
          >
            <Calculator className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">{isHindi ? "थोक रेट" : "Wholesale"}</span>
          </button>

          {/* Tab 4: Cart with Floating Highlight */}
          <button
            onClick={() => handleNavClick('cart', null)}
            className="flex flex-col items-center justify-center py-1 relative text-stone-300"
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/40">
                <ShoppingBag className="w-4 h-4 text-stone-950 stroke-[2.5]" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-stone-950">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-bold text-amber-400">
              {cartTotal > 0 ? `₹${cartTotal}` : (isHindi ? "कार्ट" : "Cart")}
            </span>
          </button>

          {/* Tab 5: Call / WhatsApp */}
          <button
            onClick={() => handleNavClick('call', null)}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isContactSheetOpen ? 'text-emerald-400 font-extrabold' : 'text-stone-400'
            }`}
          >
            <Phone className="w-5 h-5 mb-0.5 text-emerald-400" />
            <span className="text-[10px]">{isHindi ? "संपर्क" : "Contact"}</span>
          </button>

        </div>
      </div>

      {/* Mobile Contact Quick Sheet */}
      {isContactSheetOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end animate-fadeIn">
          <div 
            className="w-full bg-stone-900 border-t-2 border-amber-500/30 rounded-t-3xl p-6 space-y-4 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400">SK Enterprises • Chandan Hola</span>
                <h3 className="text-lg font-black text-white">
                  {isHindi ? "शिवम कुमार से सीधे बात करें" : "Direct Contact Shivam Kumar"}
                </h3>
              </div>
              <button 
                onClick={() => setIsContactSheetOpen(false)}
                className="p-1.5 rounded-full bg-stone-800 text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <a
                href={`tel:${settings.phone1}`}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Primary: {settings.phone1}</span>
              </a>

              <a
                href={`tel:${settings.phone2}`}
                className="w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-100 font-bold text-sm border border-stone-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Secondary: {settings.phone2}</span>
              </a>

              <a
                href={`https://wa.me/91${settings.whatsappNumber}?text=${encodeURIComponent("नमस्ते शिवम जी (SK Enterprises), मुझे मसालों के थोक रेट और आर्डर की जानकारी चाहिए।")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-stone-400 text-center pt-2">
              📍 {settings.address}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
