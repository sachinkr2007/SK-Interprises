import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageCircle, MapPin, Clock, Shield, Heart, Store, Mail, ChevronRight, Lock } from 'lucide-react';

export const ContactFooter = () => {
  const { settings, language, setIsAdminLoginOpen, setSelectedCategory } = useStore();
  const isHindi = language === 'hi';

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-stone-950 border-t border-stone-800 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Contact Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 mb-16 bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {isHindi ? "सीधी बातचीत व आर्डर" : "Direct Wholesaler Support"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {isHindi ? "मसालों के थोक भाव के लिए अभी कॉल करें" : "Need Bulk Mandi Rates? Call Shivam Kumar"}
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              {settings.address} • All Types of Dry Powder & Khada Masala
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone1}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {settings.phone1}</span>
            </a>

            <a
              href={`https://wa.me/91${settings.whatsappNumber}?text=${encodeURIComponent("नमस्ते शिवम जी (SK Enterprises), मुझे थोक रेट लिस्ट चाहिए।")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-red-600 flex items-center justify-center font-black text-white text-xl">
                SK
              </div>
              <div>
                <h4 className="text-lg font-black text-white tracking-tight">
                  {settings.storeName}
                </h4>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Wholesale Dealers
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {isHindi
                ? "सभी प्रकार के खड़े व पिसे मसालों के थोक व फुटकर विक्रेता। उच्च गुणवत्ता व १००% शुद्धता का वादा।"
                : "Wholesale & retail supplier of pure Indian spices, whole condiments, and freshly milled aromatic powders in Chandan Hola."}
            </p>

            <div className="pt-1">
              <span className="text-xs font-bold text-stone-300 block">
                {isHindi ? "संचालक / Director:" : "Director:"} <strong className="text-white">{settings.directorName}</strong>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? "मुख्य श्रेणियां" : "Spice Categories"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setSelectedCategory('khada'); scrollToSection('spices-catalog'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>{isHindi ? "खड़ा मसाला (साबुत मसाले)" : "Khada Masala (Whole Spices)"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('powder'); scrollToSection('spices-catalog'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>{isHindi ? "पिसा मसाला (हल्दी, मिर्च, धनिया)" : "Powder Masala (Haldi, Mirch)"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('blends'); scrollToSection('spices-catalog'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>{isHindi ? "शाही गरम मसाला ब्लेंड" : "Shahi Garam Masala Blend"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('bulk'); scrollToSection('spices-catalog'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>{isHindi ? "थोक मंडी बोरियां (25kg बोरी)" : "Wholesale Mandi Sacks (25kg)"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('wholesale-calc')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold text-amber-400"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>{isHindi ? "थोक मूल्य कैलकुलेटर" : "Wholesale Bulk Calculator"}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? "संपर्क सूत्र" : "Store Contact"}
            </h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={`tel:${settings.phone1}`}
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">{settings.phone1} (Primary)</span>
              </a>

              <a 
                href={`tel:${settings.phone2}`}
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">{settings.phone2} (Secondary)</span>
              </a>

              <div className="flex items-start gap-2.5 text-stone-400">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-stone-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{isHindi ? "प्रतिदिन: 7:00 AM - 9:30 PM (खुला है)" : "Daily: 7:00 AM - 9:30 PM (7 Days Open)"}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Godown Location Map Card */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? "दुकान व गोदाम का पता" : "Godown Location"}
            </h4>
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Store className="w-4 h-4" />
                <span>SK Enterprises Godown</span>
              </div>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                Chandan Hola, Masjid Wali Gali, South Delhi, New Delhi - 110074.
              </p>
              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent("Chandan Hola, Masjid Wali Gali, New Delhi")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isHindi ? "Google Maps पर दिशा देखें" : "Open in Google Maps"}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Admin Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} <strong>{settings.storeName}</strong>. Managed by <strong>{settings.directorName}</strong>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminLoginOpen(true)}
              className="flex items-center gap-1.5 text-stone-500 hover:text-amber-400 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isHindi ? "मालिक एडमिन पोर्टल" : "Owner Admin Access"}</span>
            </button>
            <span>•</span>
            <span>Chandan Hola, Masjid Wali Gali</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
