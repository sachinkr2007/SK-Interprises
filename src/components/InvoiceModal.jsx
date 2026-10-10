import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Printer, CheckCircle, MessageCircle, Download, Share2, MapPin, Phone } from 'lucide-react';

export const InvoiceModal = () => {
  const { isInvoiceOpen, setIsInvoiceOpen, currentInvoiceOrder, settings, language } = useStore();
  const isHindi = language === 'hi';

  if (!isInvoiceOpen || !currentInvoiceOrder) return null;

  const order = currentInvoiceOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    let msg = `🌶️ *ORDER INVOICE - SK ENTERPRISES*\n`;
    msg += `🧾 *Invoice #:* ${order.id}\n`;
    msg += `📅 *Date:* ${order.date}\n`;
    msg += `👤 *Customer:* ${order.customerName}\n`;
    msg += `📞 *Phone:* ${order.phone}\n`;
    msg += `📍 *Address:* ${order.address}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    order.items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL AMOUNT:* ₹${order.totalAmount}\n`;
    msg += `💳 *Payment Mode:* ${order.paymentMethod}\n`;
    msg += `📍 *Supplier:* SK Enterprises - Shivam Kumar (${settings.phone1})\n`;
    msg += `Chandan Hola, Masjid Wali Gali`;

    window.open(`https://wa.me/91${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls (No-print) */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-bold">
              {isHindi ? "आर्डर सफलतापूर्वक दर्ज हुआ!" : "Order Successfully Confirmed!"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{isHindi ? "प्रिंट रसीद" : "Print Bill"}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={() => setIsInvoiceOpen(false)}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-6 sm:p-8 bg-white text-stone-900 font-sans">
          
          {/* Invoice Header */}
          <div className="border-b-2 border-stone-800 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight font-serif">
                  {settings.storeName}
                </h1>
                <div className="inline-block px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-black tracking-wider uppercase rounded">
                  WHOLESALE DEALERS
                </div>
                <p className="text-xs font-bold text-stone-800 mt-1">
                  All Types of Dry Powder Masala & Khada Masala
                </p>
                <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-red-600 inline" />
                  {settings.address}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-stone-500">COMMERCIAL ESTIMATE / BILL</div>
                <div className="text-lg font-black text-stone-900 font-mono mt-0.5">
                  #{order.id}
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  <strong>Date:</strong> {order.date}
                </div>
                <div className="text-xs text-stone-800 font-semibold mt-1">
                  <strong>Director:</strong> {settings.directorName}
                </div>
                <div className="text-xs text-stone-800 font-mono">
                  📞 {settings.phone1} / {settings.phone2}
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Billing Info */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-stone-100 rounded-xl mb-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Customer Details:</span>
              <p className="font-extrabold text-stone-900 text-sm">{order.customerName}</p>
              <p className="text-stone-700 font-mono">📱 {order.phone}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Delivery Destination:</span>
              <p className="text-stone-800 font-medium">{order.address}</p>
              <p className="text-stone-600 text-[11px] mt-0.5">Payment Mode: <strong>{order.paymentMethod}</strong></p>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-xs text-left mb-4">
            <thead>
              <tr className="border-b border-stone-400 text-stone-600 uppercase text-[10px]">
                <th className="py-2 font-bold">#</th>
                <th className="py-2 font-bold">Spice Item Description</th>
                <th className="py-2 font-bold">Pack Weight</th>
                <th className="py-2 font-bold text-right">Rate</th>
                <th className="py-2 font-bold text-center">Qty</th>
                <th className="py-2 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {order.items.map((item, idx) => (
                <tr key={idx} className="text-stone-800">
                  <td className="py-2.5 font-mono text-stone-500">{idx + 1}</td>
                  <td className="py-2.5">
                    <span className="font-bold text-stone-900">{item.name}</span>
                    {item.hindiName && (
                      <span className="block text-[11px] text-stone-500">{item.hindiName}</span>
                    )}
                  </td>
                  <td className="py-2.5 font-semibold text-stone-700">{item.weight}</td>
                  <td className="py-2.5 text-right font-mono">₹{item.price}</td>
                  <td className="py-2.5 text-center font-bold">{item.quantity}</td>
                  <td className="py-2.5 text-right font-black text-stone-900 font-mono">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Invoice Totals */}
          <div className="border-t-2 border-stone-800 pt-3 flex justify-between items-start">
            <div className="text-[11px] text-stone-500 max-w-xs">
              <p className="font-bold text-stone-700">Terms & Declaration:</p>
              <p>• Goods once sold are 100% genuine and sourced direct from certified spice mandis.</p>
              <p>• For any bulk replacement or wholesale inquiries, contact Shivam Kumar directly.</p>
            </div>

            <div className="text-right space-y-1">
              <div className="text-xs text-stone-600 flex justify-between gap-6">
                <span>Subtotal:</span>
                <span className="font-mono font-bold">₹{order.totalAmount}</span>
              </div>
              <div className="text-xs text-stone-600 flex justify-between gap-6">
                <span>Delivery:</span>
                <span className="font-semibold text-emerald-700">FREE / INCLUDED</span>
              </div>
              <div className="text-base font-black text-stone-950 flex justify-between gap-6 pt-1 border-t border-stone-300">
                <span>Net Total:</span>
                <span className="text-xl font-mono text-red-600">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Signature / Footer */}
          <div className="mt-8 pt-4 border-t border-dashed border-stone-300 flex justify-between items-end text-[11px] text-stone-600">
            <div>
              <p className="font-bold">SK Enterprises</p>
              <p>Chandan Hola, Masjid Wali Gali</p>
            </div>
            <div className="text-center">
              <div className="w-28 border-b border-stone-800 mb-1"></div>
              <p className="font-bold text-stone-900">Authorised Signatory</p>
              <p className="text-[10px] text-stone-500">(Shivam Kumar)</p>
            </div>
          </div>

        </div>

        {/* Bottom Actions for Screen */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end gap-3 no-print">
          <button
            onClick={() => setIsInvoiceOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
          >
            {isHindi ? "खरीदारी जारी रखें" : "Continue Shopping"}
          </button>
        </div>

      </div>
    </div>
  );
};
