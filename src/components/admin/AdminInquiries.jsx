import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Building, Phone, MessageCircle, Clock, CheckCircle2, User, Package } from 'lucide-react';

export const AdminInquiries = () => {
  const { inquiries, updateInquiryStatus, language, settings } = useStore();
  const isHindi = language === 'hi';

  const handleWhatsAppLead = (inq) => {
    let msg = `नमस्ते ${inq.name} जी, मैं शिवम कुमार (SK Enterprises, चंदन होला) से बात कर रहा हूँ। आपकी थोक मसाले (${inq.spice} - ${inq.quantity}) की इन्क्वायरी के संबंध में संपर्क कर रहा हूँ। क्या हम आज डिलीवरी या रेट फाइनल करें?`;
    window.open(`https://wa.me/91${inq.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white">
            {isHindi ? "बी2बी / थोक ग्राहक लीड्स" : "B2B Wholesale Inquiries & Leads"}
          </h3>
          <p className="text-xs text-stone-400">
            {isHindi 
              ? "होटल, हलवाई व थोक व्यापारियों द्वारा भेजी गई कोटेशन मांगें।" 
              : "Bulk quotation requests from restaurants, catering firms and kirana merchants."}
          </p>
        </div>

        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          {inquiries.length} {isHindi ? "कुल लीड्स" : "Total Leads"}
        </span>
      </div>

      {/* Inquiries Cards */}
      {inquiries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inquiries.map(inq => (
            <div
              key={inq.id}
              className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/30 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-stone-400">
                  #{inq.id} • {inq.date}
                </span>

                <select
                  value={inq.status}
                  onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border bg-stone-950 focus:outline-none cursor-pointer ${
                    inq.status === 'New'
                      ? 'border-blue-500 text-blue-400'
                      : inq.status === 'Contacted'
                      ? 'border-amber-500 text-amber-400'
                      : 'border-emerald-500 text-emerald-400'
                  }`}
                >
                  <option value="New">Status: New Lead</option>
                  <option value="Contacted">Status: Contacted</option>
                  <option value="Converted">Status: Converted / Deal Closed</option>
                </select>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-400" />
                  {inq.name}
                </h4>
                <a
                  href={`tel:${inq.phone}`}
                  className="text-xs text-amber-400 hover:underline font-mono flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3 h-3" />
                  {inq.phone}
                </a>
              </div>

              {/* Requirement Box */}
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-850 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Required Spice:</span>
                  <span className="font-bold text-white text-right">{inq.spice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Bulk Quantity:</span>
                  <span className="font-bold text-emerald-400">{inq.quantity}</span>
                </div>
                {inq.notes && (
                  <p className="text-stone-400 italic pt-1 border-t border-stone-800 text-[11px]">
                    "{inq.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleWhatsAppLead(inq)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isHindi ? "WhatsApp पर कोटेशन भेजें" : "Send WhatsApp Quote"}</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-stone-900/50 rounded-2xl border border-stone-800">
          <Building className="w-12 h-12 text-stone-700 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-stone-300">
            {isHindi ? "कोई नई थोक इन्क्वायरी नहीं है" : "No wholesale inquiries yet"}
          </h3>
        </div>
      )}

    </div>
  );
};
