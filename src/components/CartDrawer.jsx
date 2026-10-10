import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount,
    setIsCheckoutOpen,
    settings,
    language,
    generateWhatsAppOrderLink
  } = useStore();

  const isHindi = language === 'hi';

  if (!isCartOpen) return null;

  const handleQuickWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const link = generateWhatsAppOrderLink(
      "Direct Buyer",
      "WhatsApp User",
      "Chandan Hola / Delhi NCR",
      "Direct checkout from Cart",
      cart,
      cartTotal
    );
    window.open(link, '_blank');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-amber-500/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">
                  {isHindi ? "आपकी मसाला कार्ट" : "Your Spice Cart"}
                </h2>
                <p className="text-xs text-stone-400">
                  {cartItemCount} {isHindi ? "सामग्री चुनी गई" : "items in cart"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 flex gap-3 items-center group hover:border-amber-500/30 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-amber-400 font-semibold truncate">
                      {item.hindiName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-white">₹{item.price}</span>
                      <span className="text-[10px] text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">
                        {item.weightLabel}
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-stone-500 hover:text-red-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center bg-stone-900 rounded-lg border border-stone-700">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-white text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-white text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-stone-700 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-300">
                  {isHindi ? "आपकी कार्ट खाली है" : "Your cart is empty"}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto mb-6">
                  {isHindi 
                    ? "कृपया ऊपर से अपने मनपसंद शुद्ध खड़े व पिसे मसाले जोड़ें।" 
                    : "Add delicious aromatic whole or powder spices from the catalog."}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400"
                >
                  {isHindi ? "मसाले देखें" : "Explore Spices"}
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout CTAs */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-4">
              
              {/* Trust Badge */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 bg-stone-900/60 p-2 rounded-xl border border-stone-800">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isHindi ? "100% शुद्धता गारंटी" : "100% Purity Guarantee"}
                </span>
                <span>{settings.address.split(',')[0]}</span>
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{isHindi ? "कुल सामग्री:" : "Items Total:"}</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{isHindi ? "डिलीवरी (Delhi NCR):" : "Delivery:"}</span>
                  <span className="text-emerald-400 font-bold">{isHindi ? "मुफ़्त या रियायती" : "Fast / Standard"}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-stone-800">
                  <span>{isHindi ? "कुल देय राशि:" : "Total Payable:"}</span>
                  <span className="text-2xl font-black text-amber-400">₹{cartTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* 1. Direct WhatsApp Order */}
                <button
                  onClick={handleQuickWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-102"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{isHindi ? "WhatsApp पर सीधा आर्डर भेजें" : "Order on WhatsApp"}</span>
                </button>

                {/* 2. Full Checkout Details / UPI / Invoice */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all"
                >
                  <span>{isHindi ? "पता दर्ज करें व बिल बनाएं" : "Proceed to Checkout / Invoice"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors"
                >
                  {isHindi ? "कार्ट खाली करें" : "Clear Cart"}
                </button>
                <span>Shivam Kumar: {settings.phone1}</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
