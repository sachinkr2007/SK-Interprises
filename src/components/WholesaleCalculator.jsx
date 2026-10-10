import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Calculator, Package, CheckCircle2, MessageCircle, ArrowRight, Building, Sparkles, Phone } from 'lucide-react';

export const WholesaleCalculator = () => {
  const { products, settings, language, submitInquiry } = useStore();
  const isHindi = language === 'hi';

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [bulkKg, setBulkKg] = useState(25);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant / Hotel');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Pricing calculations
  const retailPerKg = selectedProduct?.pricePerKg || 400;
  const wholesalePerKg = selectedProduct?.wholesalePricePerKg || Math.round(retailPerKg * 0.85);

  // Extra tier discounts
  let tierDiscountPercent = 0;
  if (bulkKg >= 100) tierDiscountPercent = 8;
  else if (bulkKg >= 50) tierDiscountPercent = 5;
  else if (bulkKg >= 25) tierDiscountPercent = 3;

  const effectiveWholesaleRate = Math.round(wholesalePerKg * (1 - tierDiscountPercent / 100));
  const totalWholesaleCost = effectiveWholesaleRate * bulkKg;
  const totalRetailCost = retailPerKg * bulkKg;
  const totalSavings = totalRetailCost - totalWholesaleCost;
  const savingsPercent = Math.round((totalSavings / totalRetailCost) * 100);

  const handleSendWhatsAppQuote = () => {
    let msg = `🌶️ *WHOLESALE QUOTATION INQUIRY - SK ENTERPRISES*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🏢 *Business:* ${buyerName || "Wholesale Buyer"} (${businessType})\n`;
    if (buyerPhone) msg += `📞 *Phone:* ${buyerPhone}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *Spice Required:* ${selectedProduct?.name} (${selectedProduct?.hindiName})\n`;
    msg += `⚖️ *Quantity:* ${bulkKg} kg (Bulk)\n`;
    msg += `💰 *Calculated Wholesale Rate:* ₹${effectiveWholesaleRate}/kg\n`;
    msg += `💵 *Estimated Total:* ₹${totalWholesaleCost}\n`;
    msg += `🎉 *Estimated Savings:* ₹${totalSavings} (${savingsPercent}% OFF)\n`;
    if (notes) msg += `📝 *Requirements:* ${notes}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📍 *To:* Shivam Kumar (Director, SK Enterprises)\n`;
    msg += `*Please confirm current mandi rate & delivery date.*`;

    // Also record in store inquiries
    submitInquiry({
      name: buyerName || "WhatsApp Wholesale Lead",
      phone: buyerPhone || "WhatsApp",
      spice: `${selectedProduct?.name} (${bulkKg} kg)`,
      quantity: `${bulkKg} kg`,
      notes: `${businessType} - ${notes || 'Requested via Wholesale Calculator'}`
    });

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/91${settings.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleOnlineInquiry = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert(isHindi ? "कृपया नाम और मोबाइल नंबर दर्ज करें।" : "Please enter your name and phone number.");
      return;
    }

    submitInquiry({
      name: buyerName,
      phone: buyerPhone,
      spice: `${selectedProduct?.name} (${bulkKg} kg)`,
      quantity: `${bulkKg} kg`,
      notes: `${businessType} - ${notes || 'Calculator inquiry'}`
    });

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="wholesale-calc" className="py-16 bg-gradient-to-b from-stone-950 via-stone-900/90 to-stone-950 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isHindi ? "बी2बी / थोक मूल्य कैलकुलेटर" : "B2B Bulk Pricing Calculator"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {isHindi ? "होटल, हलवाई व किराना के लिए थोक दरें" : "Calculate Bulk Savings for Your Business"}
          </h2>
          <p className="text-stone-400 text-sm mt-2">
            {isHindi
              ? "जितनी अधिक मात्रा, उतना अधिक डिस्काउंट। सीधे गोदाम से मंडी भाव में माल की आपूर्ति।"
              : "Direct mandi quotes for commercial buyers. Calculate exact wholesale savings below."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Calculator Input Config */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6">
            
            {/* Spice Picker */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                {isHindi ? "1. मसाला चुनें" : "1. Select Spice"}
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 font-bold text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.hindiName}) - Base: ₹{p.pricePerKg || 300}/kg
                  </option>
                ))}
              </select>
            </div>

            {/* Bulk Quantity Slider & Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                  {isHindi ? "2. थोक मात्रा (किलोग्राम)" : "2. Bulk Quantity (Kilograms)"}
                </label>
                <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
                  {bulkKg} kg
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={bulkKg}
                onChange={(e) => setBulkKg(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[5, 10, 25, 50, 100, 250].map(kg => (
                  <button
                    key={kg}
                    onClick={() => setBulkKg(kg)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                      bulkKg === kg
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-750 border border-stone-700'
                    }`}
                  >
                    {kg} kg {kg >= 25 ? '📦' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Buyer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-stone-400 block mb-1">
                  {isHindi ? "आपका नाम / फर्म का नाम" : "Your / Firm Name"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Halwai / Royal Hotel"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-400 block mb-1">
                  {isHindi ? "मोबाइल नंबर (WhatsApp)" : "WhatsApp Phone Number"}
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9812345678"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Business Type selector */}
            <div>
              <label className="text-[11px] font-bold text-stone-400 block mb-1">
                {isHindi ? "व्यापार प्रकार" : "Business Type"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Restaurant / Hotel', 'Halwai / Caterer', 'Retail Kirana', 'Household Bulk'].map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBusinessType(b)}
                    className={`text-[11px] p-2 rounded-lg font-semibold border text-center transition-all ${
                      businessType === b
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <input
                type="text"
                placeholder={isHindi ? "कोई विशेष मांग या डिलीवरी पता (वैकल्पिक)..." : "Any special requirement or delivery location (optional)..."}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>

          {/* Right: Live Quote Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/30 shadow-2xl relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

            <div className="relative space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {isHindi ? "अनुमानित थोक कोटेशन" : "Live Wholesale Quotation"}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    {selectedProduct?.name}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/30">
                  <img src={selectedProduct?.image} alt="Selected spice" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-stone-400">
                  <span>{isHindi ? "सामान्य खुदरा दर:" : "Regular Retail Rate:"}</span>
                  <span className="line-through text-stone-500">₹{retailPerKg}/kg</span>
                </div>

                <div className="flex justify-between text-stone-200 font-semibold">
                  <span>{isHindi ? "SK Enterprises थोक दर:" : "SK Wholesale Rate:"}</span>
                  <span className="text-emerald-400 font-bold text-base">₹{effectiveWholesaleRate}/kg</span>
                </div>

                <div className="flex justify-between text-stone-400">
                  <span>{isHindi ? "मात्रा (Quantity):" : "Total Quantity:"}</span>
                  <span className="font-bold text-white">{bulkKg} kg</span>
                </div>

                {tierDiscountPercent > 0 && (
                  <div className="flex justify-between text-amber-400 text-xs bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                    <span>{bulkKg}kg+ Tier Discount:</span>
                    <span className="font-bold">Extra {tierDiscountPercent}% OFF</span>
                  </div>
                )}

                <div className="pt-3 border-t border-stone-800 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-stone-400">{isHindi ? "कुल अनुमानित थोक बिल" : "Estimated Total Bill"}</div>
                    <div className="text-3xl font-black text-white">₹{totalWholesaleCost}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 uppercase font-black tracking-wider block">
                      {isHindi ? "आपकी कुल बचत" : "You Save"}
                    </span>
                    <span className="text-lg font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      ₹{totalSavings} ({savingsPercent}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSendWhatsAppQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/30 transition-all hover:scale-102"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{isHindi ? "WhatsApp पर कोटेशन व डिस्काउंट लें" : "Get Quotation on WhatsApp"}</span>
                </button>

                <button
                  onClick={handleOnlineInquiry}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Building className="w-4 h-4 text-amber-400" />
                  <span>{isHindi ? "ऑनलाइन इन्क्वायरी दर्ज करें" : "Submit Online Inquiry"}</span>
                </button>
              </div>

              {isSubmitted && (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500 rounded-xl text-xs text-emerald-300 text-center animate-fadeIn">
                  ✓ {isHindi ? "आपकी मांग दर्ज हो गई है! शिवम कुमार जल्द संपर्क करेंगे।" : "Inquiry submitted! Shivam Kumar will contact you shortly."}
                </div>
              )}

              {/* Godown Address Note */}
              <p className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1">
                <span>📍 Chandan Hola, Masjid Wali Gali • Call: {settings.phone1}</span>
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
