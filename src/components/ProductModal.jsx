import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, MessageCircle, ShieldCheck, MapPin, Sparkles, Check, Flame } from 'lucide-react';

export const ProductModal = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart, language, generateWhatsAppOrderLink } = useStore();
  const isHindi = language === 'hi';

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const weights = product.weights || [{ label: '1 kg', price: product.pricePerKg || 300 }];
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedProductModal(null);
    }, 1000);
  };

  const handleWhatsAppOrder = () => {
    const singleItemList = [{
      name: product.name,
      weightLabel: selectedWeight.label,
      price: selectedWeight.price,
      quantity: quantity
    }];
    const link = generateWhatsAppOrderLink(
      "Quick Buyer",
      "Direct WhatsApp",
      "Chandan Hola / Delhi NCR",
      `Direct inquiry for ${product.name} (${selectedWeight.label})`,
      singleItemList,
      selectedWeight.price * quantity
    );
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center border border-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image */}
          <div className="relative h-64 md:h-full bg-stone-950 min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 md:from-transparent via-transparent to-black/30" />
            
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              <span className="bg-amber-500/90 text-stone-950 text-xs font-black px-2.5 py-1 rounded-lg">
                {product.categoryLabel || "Spice"}
              </span>
              {product.origin && (
                <span className="bg-stone-900/90 text-stone-200 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-stone-700">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {product.origin}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Details & Order Config */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 4.9}</span>
                <span className="text-stone-400">({product.reviewsCount || 100}+ reviews)</span>
                <span className="text-stone-600">•</span>
                <span className="text-emerald-400 font-semibold">{isHindi ? "ताज़ा स्टॉक" : "Fresh Batch"}</span>
              </div>

              <h2 className="text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-sm font-semibold text-amber-400">
                {product.hindiName}
              </p>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Quality highlight */}
              {product.purity && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{product.purity}</span>
                </div>
              )}
            </div>

            {/* Weight Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block">
                {isHindi ? "मात्रा व पैकेजिंग चुनें:" : "Choose Pack Size:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {weights.map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWeight(w)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedWeight.label === w.label
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm'
                        : 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{w.label}</div>
                    <div className="text-sm font-black text-amber-400">₹{w.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Total Price */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">{isHindi ? "संख्या:" : "Qty:"}</span>
                <div className="flex items-center bg-stone-800 rounded-lg border border-stone-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-black text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-stone-400 uppercase font-bold">{isHindi ? "कुल राशि" : "Total Bill"}</div>
                <div className="text-2xl font-black text-white">
                  ₹{selectedWeight.price * quantity}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/20'
                }`}
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? (isHindi ? "कार्ट में जोड़ दिया!" : "Added!") : (isHindi ? "कार्ट में डालें" : "Add to Cart")}</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isHindi ? "सीधा WhatsApp आर्डर" : "WhatsApp Order"}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
