import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, Phone, MapPin, Printer, MessageCircle, Trash2, CheckCircle, Clock, Truck, Check, Send, AlertCircle } from 'lucide-react';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder, setCurrentInvoiceOrder, setIsInvoiceOpen, language, settings } = useStore();
  const isHindi = language === 'hi';

  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(ord => {
    if (filterStatus === 'all') return true;
    return ord.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> New Order</span>;
      case 'Processing':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Packing / Milled</span>;
      case 'Dispatched':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Truck className="w-3 h-3" /> Out for Delivery</span>;
      case 'Delivered':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Delivered</span>;
      case 'Cancelled':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-stone-800 text-stone-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  const handleOpenInvoice = (ord) => {
    setCurrentInvoiceOrder(ord);
    setIsInvoiceOpen(true);
  };

  const handleSendDispatchUpdate = (ord) => {
    let msg = `🚚 *आर्डर अपडेट - SK ENTERPRISES (शिवम कुमार)*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `नमस्ते *${ord.customerName}* जी,\n`;
    msg += `आपका मसाला आर्डर *#${ord.id}* (कुल बिल: ₹${ord.totalAmount}) हमारी चंदन होला दुकान से *डिस्पैच (Out for Delivery)* कर दिया गया है।\n\n`;
    msg += `📍 *डिलीवरी पता:* ${ord.address}\n`;
    msg += `📞 *सप्लायर संपर्क:* Shivam Kumar (${settings.phone1} / ${settings.phone2})\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `शुद्ध मसालों के लिए SK Enterprises को चुनने हेतु धन्यवाद! 🙏`;

    window.open(`https://wa.me/91${ord.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {['all', 'New', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {st === 'all' ? (isHindi ? 'सभी आर्डर' : 'All Orders') : st}
            </button>
          ))}
        </div>

        <span className="text-xs text-stone-400 font-semibold">
          {isHindi ? `दिखाए गए आर्डर: ${filteredOrders.length}` : `Orders Count: ${filteredOrders.length}`}
        </span>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map(ord => (
            <div
              key={ord.id}
              className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 hover:border-amber-500/30 transition-all space-y-4 shadow-lg"
            >
              {/* Row 1: ID, Date, Status dropdown */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-amber-400 text-sm bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                    #{ord.id}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    📅 {ord.date}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(ord.status)}

                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                    className="bg-stone-950 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="New">Mark: New</option>
                    <option value="Processing">Mark: Processing</option>
                    <option value="Dispatched">Mark: Dispatched</option>
                    <option value="Delivered">Mark: Delivered</option>
                    <option value="Cancelled">Mark: Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Customer & Delivery Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Customer:</span>
                  <h4 className="font-black text-white text-sm mt-0.5">{ord.customerName}</h4>
                  <a
                    href={`tel:${ord.phone}`}
                    className="text-amber-400 hover:underline font-mono flex items-center gap-1 mt-0.5 font-bold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {ord.phone}
                  </a>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Delivery Address:</span>
                  <p className="text-stone-300 mt-0.5 flex items-start gap-1 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>{ord.address}</span>
                  </p>
                  {ord.notes && (
                    <p className="text-stone-400 italic mt-1 text-[11px] bg-stone-950/60 p-1.5 rounded border border-stone-850">
                      Note: "{ord.notes}"
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Payment & Total:</span>
                  <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                    ₹{ord.totalAmount}
                  </div>
                  <span className="text-[11px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 inline-block mt-0.5">
                    {ord.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Row 3: Items Ordered */}
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-850">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Ordered Spice Items ({ord.items.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {ord.items.map((it, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-stone-900 text-stone-200 px-3 py-1.5 rounded-xl border border-stone-800 flex items-center gap-2"
                    >
                      <strong className="text-amber-400 font-black">{it.quantity}x</strong>
                      <span className="font-semibold">{it.name}</span>
                      <span className="text-stone-400 font-mono text-[11px]">({it.weight})</span>
                      <span className="text-emerald-400 font-mono font-bold">₹{it.price * it.quantity}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 4: Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleOpenInvoice(ord)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Print Invoice</span>
                  </button>

                  <button
                    onClick={() => handleSendDispatchUpdate(ord)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Dispatch SMS/WhatsApp</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`आर्डर #${ord.id} का रिकॉर्ड हटाएं?`)) {
                      deleteOrder(ord.id);
                    }
                  }}
                  className="text-stone-500 hover:text-red-400 text-xs p-1.5 transition-colors"
                  title="Delete Order Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-stone-800">
          <Package className="w-12 h-12 text-stone-700 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-stone-300">
            {isHindi ? "इस फ़िल्टर में कोई आर्डर नहीं है" : "No orders found in this filter"}
          </h3>
        </div>
      )}

    </div>
  );
};
