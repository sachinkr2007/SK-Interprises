import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageCircle, MapPin, Share2, Check, Download, QrCode } from 'lucide-react';

export const VisitingCard3D = () => {
  const { settings, language } = useStore();
  const isHindi = language === 'hi';
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SK Enterprises - Spices Wholesale & Retail',
        text: `SK Enterprises (Shivam Kumar)\nWholesale Dealers in Dry Powder & Khada Masala\nCall: ${settings.phone1} / ${settings.phone2}\nAddress: Chandan Hola, Masjid Wali Gali`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`SK Enterprises - Shivam Kumar: ${settings.phone1} / ${settings.phone2} | Chandan Hola, Masjid Wali Gali`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          {isHindi ? "डिजिटल विजिटिंग कार्ड" : "Official Digital Business Card"}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
          {isHindi ? "हमारा अधिकृत व्यापार परिचय पत्र" : "Direct Contact & Wholesale Office"}
        </h2>
        <p className="text-stone-400 text-sm max-w-xl mx-auto mt-1">
          {isHindi 
            ? "शिवम कुमार - सभी प्रकार के खड़े एवं पिसे मसालों के थोक व फुटकर विक्रेता"
            : "Shivam Kumar - Director, SK Enterprises. Chandan Hola, Masjid Wali Gali."}
        </p>
      </div>

      {/* 3D Card Container */}
      <div className="flex flex-col items-center justify-center">
        <div 
          className="w-full max-w-xl perspective-1000 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Card Wrapper */}
          <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
               style={{
                 boxShadow: '0 25px 50px -12px rgba(234, 179, 8, 0.25), 0 0 30px rgba(220, 38, 38, 0.2)'
               }}>

            {/* Front of Card (Faithful to photo) */}
            {!isFlipped ? (
              <div className="relative w-full bg-[#fde047] text-stone-900 font-['Outfit',sans-serif] p-6 sm:p-8 flex flex-col justify-between border-4 border-amber-400/40 min-h-[300px] select-none">
                
                {/* Header Row: Director & Phone */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                      {settings.directorName}
                    </h3>
                    <span className="text-xs sm:text-sm font-semibold text-stone-700 tracking-wider">
                      Director
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 font-mono text-sm sm:text-base font-bold text-stone-900">
                    <div className="flex items-center gap-1.5 bg-white/70 px-2 py-0.5 rounded shadow-xs">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">W</span>
                      <a href={`tel:${settings.phone1}`} onClick={(e) => e.stopPropagation()} className="hover:text-emerald-700">
                        {settings.phone1}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/70 px-2 py-0.5 rounded shadow-xs">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">W</span>
                      <a href={`tel:${settings.phone2}`} onClick={(e) => e.stopPropagation()} className="hover:text-emerald-700">
                        {settings.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Center Bowl Spice Graphic & Main Titles */}
                <div className="my-4 text-center">
                  {/* Decorative Spices Icon */}
                  <div className="flex justify-center -mt-2 mb-1">
                    <span className="text-3xl filter drop-shadow-md">🌶️ 🧄 🌿 🌰</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-[#dc2626] tracking-tight drop-shadow-xs font-serif">
                    SK Enterprises
                  </h1>

                  {/* Wholesale Badge */}
                  <div className="inline-block mt-1.5 px-4 py-0.5 bg-[#059669] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-inner">
                    WHOLESALE DEALERS
                  </div>

                  <p className="mt-2 text-xs sm:text-base font-bold text-stone-900">
                    All Types of Dry Powder Masala & Khada Masala
                  </p>
                </div>

                {/* Red Footer Bar for Address */}
                <div className="-mx-6 sm:-mx-8 -mb-6 sm:-mb-8 bg-[#dc2626] text-white py-2.5 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-1.5 shadow-md">
                  <MapPin className="w-4 h-4 text-yellow-300 inline" />
                  <span>Chandan Hola, Masjid Wali Gali</span>
                </div>

                {/* Corner Flip Hint */}
                <div className="absolute top-2 right-2 opacity-40 hover:opacity-100 text-[10px] text-stone-700 flex items-center gap-0.5">
                  <span>Click to flip</span> ↻
                </div>
              </div>
            ) : (
              /* Back of Card with QR Code & Quick Actions */
              <div className="relative w-full bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white p-6 sm:p-8 flex flex-col justify-between border-4 border-amber-500/40 min-h-[300px]">
                <div className="text-center">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Quick Connect & Payments
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    SK Enterprises • Shivam Kumar
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-3">
                  <div className="p-3 bg-white rounded-xl shadow-lg flex flex-col items-center">
                    <QrCode className="w-24 h-24 text-stone-950" />
                    <span className="text-[10px] font-bold text-stone-700 mt-1 font-mono">UPI: {settings.upiId}</span>
                  </div>
                  <div className="text-left text-xs space-y-1.5 text-stone-300">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Direct Mandi Wholesaler
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Same-Day Delhi NCR Delivery
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      Special rates for Halwai & Hotels
                    </p>
                    <p className="text-amber-300/90 font-medium pt-1">
                      Chandan Hola, Masjid Wali Gali, Delhi
                    </p>
                  </div>
                </div>

                <div className="text-center text-stone-400 text-xs flex items-center justify-center gap-1">
                  <span>Click anywhere to flip back</span> ↻
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons underneath card */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={`https://wa.me/91${settings.phone1}?text=${encodeURIComponent("नमस्ते शिवम जी, मुझे SK Enterprises से मसालों के आर्डर व थोक रेट लिस्ट चाहिए।")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${settings.phone1}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {settings.phone1}</span>
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm border border-stone-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Copied Info!" : "Share Card"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
