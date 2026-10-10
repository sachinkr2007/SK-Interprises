import React from 'react';
import { useStore } from '../context/StoreContext';
import { TESTIMONIALS } from '../data/initialData';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';

export const Testimonials = () => {
  const { language } = useStore();
  const isHindi = language === 'hi';

  return (
    <section className="py-16 sm:py-20 bg-stone-900/40 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {isHindi ? "संतुष्ट व्यापारी व ग्राहक" : "Customer & Merchant Reviews"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            {isHindi ? "हमारे थोक ग्राहकों का अनुभव" : "Trusted by Top Caterers & Restaurants"}
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            {isHindi 
              ? "जानिए दिल्ली-एनसीआर के प्रमुख शेफ और हलवाई SK Enterprises के बारे में क्या कहते हैं।"
              : "Read what chefs, catering businesses, and kirana owners say about our spice quality."}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-stone-800 flex flex-col justify-between relative group hover:border-amber-500/30 transition-all"
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-800/80 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-amber-400 font-medium">{t.role}</p>
                </div>

                <span className="text-[10px] text-stone-400 flex items-center gap-1 bg-stone-900 px-2 py-0.5 rounded-md border border-stone-800">
                  <MapPin className="w-2.5 h-2.5 text-amber-500" />
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
