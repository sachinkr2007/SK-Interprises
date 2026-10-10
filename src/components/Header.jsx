import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Phone, Shield, Sparkles, MessageCircle, Lock, Store, Globe, Search, MapPin } from 'lucide-react';

export const Header = () => {
  const {
    settings,
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    language,
    setLanguage,
    isAdminLoggedIn,
    setIsAdminLoginOpen,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery
  } = useStore();

  const isHindi = language === 'hi';

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 text-stone-100 text-xs sm:text-sm font-medium py-1.5 px-3 sm:px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-black/30 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
              {isHindi ? "थोक मंडी भाव" : "Mandi Wholesale"}
            </span>
            <span className="truncate text-[11px] sm:text-xs font-semibold">{settings.bannerAnnouncement}</span>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <a
              href={`tel:${settings.phone1}`}
              className="flex items-center gap-1 hover:text-amber-200 transition-colors font-mono font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{settings.phone1}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-panel border-b border-amber-500/20 bg-stone-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Brand Logo & Details */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setViewMode('shop')}
                className="flex items-center gap-2.5 sm:gap-3 group text-left"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">SK</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-base sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                      {settings.storeName}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
                      WHOLESALE
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-stone-400 truncate max-w-[170px] sm:max-w-sm flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 inline shrink-0" />
                    Chandan Hola, Masjid Wali Gali
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={isHindi ? "मसाला खोजें (जैसे: जीरा, इलायची, हल्दी, लौंग)..." : "Search spices (e.g. Cumin, Cardamom, Turmeric)..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 bg-stone-900/90 border border-stone-700/60 rounded-xl text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs bg-stone-800 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'hi' ? 'EN' : 'हिन्दी'}</span>
              </button>

              {/* Direct WhatsApp Call (Desktop) */}
              <a
                href={`https://wa.me/91${settings.whatsappNumber}?text=${encodeURIComponent("नमस्ते शिवम जी (SK Enterprises), मुझे थोक मसालों के रेट की जानकारी चाहिए।")}`}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Admin Portal Toggle (Discreet) */}
              {isAdminLoggedIn ? (
                <button
                  onClick={() => setViewMode(viewMode === 'admin' ? 'shop' : 'admin')}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    viewMode === 'admin'
                      ? 'bg-amber-500 text-stone-950 font-black'
                      : 'bg-stone-900 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {viewMode === 'admin' ? <Store className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{viewMode === 'admin' ? "Store Front" : "Admin Panel"}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-500 hover:text-amber-400 border border-stone-800 transition-colors"
                  title="Owner Secure Gate (Shivam Kumar)"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 font-bold hover:brightness-110 shadow-lg shadow-amber-600/20 transition-all transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950 stroke-[2.5]" />
                <span className="text-xs font-black hidden sm:inline">₹{cartTotal}</span>
                {cartItemCount > 0 && (
                  <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border border-stone-950">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-2.5 pt-0.5">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isHindi ? "मसाला खोजें (जीरा, इलायची, हल्दी)..." : "Search spices (Cumin, Cardamom)..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
};
