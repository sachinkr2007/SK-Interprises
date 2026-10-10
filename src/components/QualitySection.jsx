import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Sparkles, Sun, Wind, Award, HeartHandshake } from 'lucide-react';

export const QualitySection = () => {
  const { language } = useStore();
  const isHindi = language === 'hi';

  const features = [
    {
      icon: Sun,
      title: isHindi ? "धूप में सुखाए गए प्राकृतिक मसाले" : "Sun-Dried & Cleaned",
      desc: isHindi 
        ? "सभी साबुत खड़े मसालों को प्राकृतिक धूप में सुखाकर धूल, मिट्टी और कंकड़ से मुक्त किया जाता है।"
        : "Natural sun-drying preserves rich essential oils, crisp crunch, and genuine pungency."
    },
    {
      icon: Wind,
      title: isHindi ? "कोल्ड-ग्राइंडिंग (चक्की पिसाई)" : "Cold-Milled Aroma Retention",
      desc: isHindi 
        ? "कम तापमान पर धीमी चक्की से पिसाई ताकि मसालों का प्राकृतिक तेल और असली खुशबू बरकरार रहे।"
        : "Ground at low temperatures so essential oils and therapeutic spices qualities don't vaporize."
    },
    {
      icon: ShieldCheck,
      title: isHindi ? "१००% शुद्ध — शून्य मिलावट" : "100% Pure - Zero Adulteration",
      desc: isHindi 
        ? "कोई कृत्रिम रंग (रंग-रोगन), स्टार्च या केमिकल नहीं। सिर्फ शुद्ध और स्वास्थ्यवर्धक मसाले।"
        : "No chemical food dyes, zero fillers or starch. Pure raw spices tested for utmost purity."
    },
    {
      icon: Award,
      title: isHindi ? "सीधे मंडी से थोक भाव" : "Direct Mandi Wholesale Rates",
      desc: isHindi 
        ? "बिचौलियों के बिना सीधे उत्पादक मंडियों से माल, जिससे हलवाई व ग्राहकों को मिलता है भारी फायदा।"
        : "Direct procurement from Unjha, Salem, Idukki and Guntur guaranteeing the best rates in Delhi."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-950/80 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {isHindi ? "गुणवत्ता व शुद्धता की गारंटी" : "Purity & Quality Assurance"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            {isHindi ? "SK Enterprises के मसाले क्यों हैं सबसे खास?" : "Why Chefs & Caterers Choose SK Enterprises"}
          </h2>
          <p className="text-stone-400 text-sm mt-2">
            {isHindi 
              ? "चंदन होला, मस्जिद वाली गली से दिल्ली-एनसीआर में भरोसेमंद थोक व फुटकर मसाला आपूर्ति।"
              : "Every batch is inspected for moisture, bold berry size, and pure aromatic intensity."}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
