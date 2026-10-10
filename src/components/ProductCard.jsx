import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Star, MessageCircle, Check, Zap, Sparkles, Plus } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProductModal, language, settings, generateWhatsAppOrderLink } = useStore();
  const isHindi = language === 'hi';

  const defaultWeight = product.weights && product.weights.length > 0
    ? product.weights[0]
    : { label: '1 kg', price: product.pricePerKg || 300 };

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleWhatsAppBuy = (e) => {
    e.stopPropagation();
    const singleItemList = [{
      name: product.name,
      weightLabel: selectedWeight.label,
      price: selectedWeight.price,
      quantity: 1
    }];
    const link = generateWhatsAppOrderLink(
      "Quick Buyer",
      "Direct WhatsApp",
      "Chandan Hola / Delhi NCR",
      `Direct purchase for ${product.name}`,
      singleItemList,
      selectedWeight.price
    );
    window.open(link, '_blank');
  };

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/40 relative border border-stone-800/90 hover:border-amber-500/40 bg-stone-900/70">
      
      {/* Top Image & Badges */}
      <div 
        className="relative h-40 sm:h-52 w-full overflow-hidden cursor-pointer bg-stone-950"
        onClick={() => setSelectedProductModal(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/30" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isWholesaleBestSeller && (
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-amber-600 text-white px-2 py-0.5 rounded-md shadow-md flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 fill-white" />
              <span>{isHindi ? "थोक टॉप" : "Top Seller"}</span>
            </span>
          )}
          {product.category === 'khada' && (
            <span className="text-[9px] font-bold bg-amber-500/95 text-stone-950 px-1.5 py-0.5 rounded">
              {isHindi ? "खड़ा मसाला" : "Whole"}
            </span>
          )}
          {product.category === 'powder' && (
            <span className="text-[9px] font-bold bg-orange-500/95 text-stone-950 px-1.5 py-0.5 rounded">
              {isHindi ? "पिसा मसाला" : "Ground"}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductModal(product);
          }}
          className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 backdrop-blur-md transition-all shadow-md"
          title="Quick View"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-stone-950/85 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold text-amber-400 border border-amber-500/20">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating || 4.9}</span>
          <span className="text-stone-400 text-[9px]">({product.reviewsCount || 85})</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div>
          {/* Hindi & English Names */}
          <div 
            className="cursor-pointer"
            onClick={() => setSelectedProductModal(product)}
          >
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold text-amber-300/90 line-clamp-1 mt-0.5">
              {product.hindiName}
            </p>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Weight Selector Chips */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 font-semibold">
            <span>{isHindi ? "वज़न:" : "Weight:"}</span>
            {product.origin && (
              <span className="text-stone-400 text-[9px] sm:text-[10px] truncate max-w-[100px]">
                {product.origin}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {product.weights && product.weights.map((w, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedWeight(w)}
                className={`text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-bold transition-all ${
                  selectedWeight.label === w.label
                    ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                    : 'bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-stone-800/80 space-y-2 sm:space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-base sm:text-2xl font-black text-white">
                ₹{selectedWeight.price}
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-400 ml-1">/ {selectedWeight.label}</span>
            </div>
            
            {product.wholesalePricePerKg && (
              <div className="text-right">
                <span className="text-[9px] sm:text-[10px] block text-emerald-400 font-bold">
                  {isHindi ? "थोक दर:" : "Bulk:"}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-stone-300">
                  ₹{product.wholesalePricePerKg}/kg
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 rounded-xl font-bold text-[11px] sm:text-xs transition-all ${
                addedAnim
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
              }`}
            >
              {addedAnim ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
              <span>{addedAnim ? "Added!" : (isHindi ? "कार्ट में" : "Add to Cart")}</span>
            </button>

            <button
              onClick={handleWhatsAppBuy}
              className="flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-[11px] sm:text-xs transition-all"
              title="Direct Order via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
