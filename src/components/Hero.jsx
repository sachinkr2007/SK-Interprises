import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShoppingBag, Calculator, ShieldCheck, Truck, Award, ArrowRight, Flame } from 'lucide-react';

export const Hero = () => {
  const { settings, language, setSelectedCategory } = useStore();
  const isHindi = language === 'hi';

  const scrollToCatalog = (cat = 'all') => {
    setSelectedCategory(cat);
    const elem = document.getElementById('spices-catalog');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    const elem = document.getElementById('wholesale-calc');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 sm:pb-24">
      {/* Background Glows & Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-red-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Content + Visual Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold shadow-sm">
              <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>
                {isHindi 
                  ? "चंदन होला की प्रसिद्ध थोक मसाला दुकान" 
                  : "Chandan Hola's Trusted Wholesale Masala Hub"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {isHindi ? (
                <>
                  शुद्ध <span className="text-gradient-spice">खड़ा मसाला</span> एवं <br className="hidden sm:inline" />
                  ताज़ा <span className="text-gradient-gold">पिसा मसाला</span> थोक भाव में
                </>
              ) : (
                <>
                  Pure <span className="text-gradient-spice">Khada Masala</span> & <br className="hidden sm:inline" />
                  Fresh <span className="text-gradient-gold">Dry Powder Spices</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {isHindi ? (
                <>
                  <strong className="text-amber-400">SK Enterprises</strong> — शिवम कुमार द्वारा संचालित। होटल, हलवाई, किराना दुकानों और घरेलू रसोई के लिए १००% बिना मिलावट के असली सुगंधित मसाले।
                </>
              ) : (
                <>
                  Direct from Mandi to your kitchen. Premium unpolished whole spices and stone-ground spice powders for restaurants, caterers, and households.
                </>
              )}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => scrollToCatalog('all')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-amber-600/25 hover:brightness-110 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <span>{isHindi ? "मसाले देखें व आर्डर करें" : "Browse Spices & Order"}</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={scrollToCalculator}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-400 font-bold text-sm sm:text-base border border-amber-500/30 shadow-lg hover:border-amber-400 transition-all transform hover:-translate-y-0.5"
              >
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>{isHindi ? "थोक रेट कैलकुलेटर" : "Wholesale Calculator"}</span>
              </button>
            </div>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/80">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/50 border border-stone-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-tight">100% Pure</div>
                  <div className="text-[10px] text-stone-400">Zero Adulteration</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/50 border border-stone-800">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-tight">Mandi Rates</div>
                  <div className="text-[10px] text-stone-400">Direct Godown Price</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/50 border border-stone-800">
                <Truck className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-tight">Fast Delivery</div>
                  <div className="text-[10px] text-stone-400">Delhi NCR & Pan-India</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/50 border border-stone-800">
                <Sparkles className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-tight">Fresh Ground</div>
                  <div className="text-[10px] text-stone-400">Aroma Intact</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 group">
              <img
                src="public/images/hero_banner.jpg"
                alt="SK Enterprises Premium Spices"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-amber-500/20 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {isHindi ? "सीधे गोदाम से ताज़ा सप्लाई" : "Direct From Wholesale Godown"}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      Khada Masala & Chakki Powder Masala
                    </h3>
                  </div>
                  <button
                    onClick={() => scrollToCatalog('bulk')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shrink-0"
                  >
                    {isHindi ? "थोक बैग देखें" : "Wholesale Sacks"}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
