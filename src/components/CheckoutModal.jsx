import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, QrCode, Truck, CreditCard, MessageCircle, MapPin, User, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    placeOrder,
    settings,
    language,
    generateWhatsAppOrderLink
  } = useStore();

  const isHindi = language === 'hi';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'COD' | 'WhatsApp'
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert(isHindi ? "कृपया नाम, फ़ोन नंबर और पूरा पता दर्ज करें।" : "Please fill in Name, Phone, and Address.");
      return;
    }

    setIsSubmitting(true);

    // Confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const orderData = {
      customerName: name,
      phone: phone,
      address: `${address}${landmark ? `, Near: ${landmark}` : ''}`,
      items: cart.map(i => ({
        name: i.name,
        hindiName: i.hindiName,
        weight: i.weightLabel,
        price: i.price,
        quantity: i.quantity
      })),
      totalAmount: cartTotal,
      paymentMethod: paymentMethod === 'UPI' ? 'UPI Scan' : paymentMethod === 'COD' ? 'Cash on Delivery' : 'WhatsApp Order',
      notes: notes
    };

    setTimeout(() => {
      const placed = placeOrder(orderData);
      setIsSubmitting(false);
      setIsCheckoutOpen(false);

      // Auto-open WhatsApp link for customer convenience
      const link = generateWhatsAppOrderLink(name, phone, `${address} (${landmark})`, notes, cart, cartTotal);
      window.open(link, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {isHindi ? "आर्डर व डिलीवरी विवरण" : "Delivery & Checkout Details"}
              </h2>
              <p className="text-xs text-stone-400">
                SK Enterprises • Chandan Hola, New Delhi
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
          
          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{isHindi ? "1. ग्राहक की जानकारी" : "1. Customer Information"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {isHindi ? "आपका पूरा नाम / दुकान का नाम *" : "Full Name / Shop Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar / Sharma Dhaba"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {isHindi ? "WhatsApp मोबाइल नंबर *" : "WhatsApp Mobile Number *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9812345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                {isHindi ? "पूरा डिलीवरी पता (गली, मकान सं, इलाका) *" : "Full Delivery Address (Street, House No, Area) *"}
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Shop No 4, Chandan Hola, Masjid Wali Gali / Chhatarpur, New Delhi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {isHindi ? "नज़दीकी लैंडमार्क" : "Nearest Landmark"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Jama Masjid / Main Bus Stand"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {isHindi ? "विशेष निर्देश (वैकल्पिक)" : "Special Instructions"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deliver before evening"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isHindi ? "2. भुगतान का तरीका चुनें" : "2. Select Payment Mode"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-amber-500/15 border-amber-500 text-white'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    UPI Scan & Pay
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="accent-amber-500"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-2 block">
                  GooglePay, PhonePe, Paytm QR
                </span>
              </label>

              <label 
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'COD'
                    ? 'bg-amber-500/15 border-amber-500 text-white'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    Cash on Delivery
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-amber-500"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-2 block">
                  {isHindi ? "डिलीवरी पर नकद भुगतान" : "Pay cash upon arrival"}
                </span>
              </label>

              <label 
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'WhatsApp'
                    ? 'bg-amber-500/15 border-amber-500 text-white'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    WhatsApp Order
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'WhatsApp'}
                    onChange={() => setPaymentMethod('WhatsApp')}
                    className="accent-amber-500"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-2 block">
                  {isHindi ? "शिवम जी से चैट पर तय करें" : "Confirm details on chat"}
                </span>
              </label>
            </div>

            {/* UPI QR Display if UPI chosen */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn">
                <div className="p-2.5 bg-white rounded-xl shadow-md shrink-0">
                  <QrCode className="w-20 h-20 text-stone-950" />
                </div>
                <div className="text-xs space-y-1">
                  <span className="text-amber-400 font-bold uppercase tracking-wider block">
                    {isHindi ? "Shivam Kumar का अधिकृत UPI QR" : "Official UPI Payment"}
                  </span>
                  <p className="text-stone-300 font-mono font-bold text-sm">
                    {settings.upiId}
                  </p>
                  <p className="text-stone-400 text-[11px]">
                    {isHindi 
                      ? "आप आर्डर सबमिट करके सीधे अपने UPI ऍप से भुगतान कर सकते हैं।" 
                      : "Scan using GPay / PhonePe / Paytm after placing order."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Total & Submit */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-400">
                {cart.length} {isHindi ? "मसाले सामग्री" : "items in order"}
              </div>
              <div className="text-2xl font-black text-amber-400">
                ₹{cartTotal}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-stone-950 font-black text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <CheckCircle className="w-5 h-5 text-stone-950" />
              <span>
                {isSubmitting 
                  ? (isHindi ? "आर्डर दर्ज हो रहा है..." : "Placing Order...") 
                  : (isHindi ? "आर्डर कन्फर्म करें व रसीद लें" : "Confirm Order & Get Invoice")}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
