import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, RefreshCw, Download, Shield, Phone, MapPin, KeyRound, AlertTriangle, Check } from 'lucide-react';

export const AdminSettings = () => {
  const { settings, updateSettings, resetToFactoryData, products, orders, inquiries, language } = useStore();
  const isHindi = language === 'hi';

  const [formData, setFormData] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const backupObj = {
      exportedAt: new Date().toISOString(),
      settings: formData,
      products,
      orders,
      inquiries
    };
    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SK_Enterprises_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Settings Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 bg-stone-900/90 border border-stone-800 rounded-3xl space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h3 className="text-xl font-black text-white">
              {isHindi ? "दुकान व संपर्क सेटिंग्स" : "Store & Contact Settings"}
            </h3>
            <p className="text-xs text-stone-400">
              SK Enterprises • Official Business Configuration
            </p>
          </div>

          {savedSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-xl flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {isHindi ? "सफलतापूर्वक सुरक्षित!" : "Settings Saved!"}
            </span>
          )}
        </div>

        {/* Business Identity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1">
              Store / Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1">
              Director / Owner Name *
            </label>
            <input
              type="text"
              required
              value={formData.directorName}
              onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Phone Numbers & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary Phone *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone1}
              onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Secondary Phone</span>
            </label>
            <input
              type="tel"
              value={formData.phone2}
              onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">W</span>
              <span>WhatsApp Number</span>
            </label>
            <input
              type="tel"
              required
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Full Address</span>
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1">
              Official UPI ID (for QR Code)
            </label>
            <input
              type="text"
              required
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Announcement Banner */}
        <div>
          <label className="text-xs font-bold text-stone-300 block mb-1">
            Top Bar Announcement Banner
          </label>
          <input
            type="text"
            value={formData.bannerAnnouncement}
            onChange={(e) => setFormData({ ...formData, bannerAnnouncement: e.target.value })}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Admin PIN */}
        <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-400" />
              Admin Access PIN
            </span>
            <p className="text-[11px] text-stone-400">
              PIN used to unlock this Owner Control Panel.
            </p>
          </div>

          <input
            type="text"
            maxLength={8}
            value={formData.adminPin}
            onChange={(e) => setFormData({ ...formData, adminPin: e.target.value })}
            className="w-32 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-center text-sm font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>{isHindi ? "परिवर्तन सुरक्षित करें" : "Save All Settings"}</span>
          </button>
        </div>
      </form>

      {/* Backup & Data Reset Section */}
      <div className="p-6 sm:p-8 bg-stone-900/60 border border-stone-800 rounded-3xl space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-stone-300">
          Data Export & Factory Reset
        </h4>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div>
            <h5 className="text-xs font-bold text-white">Export Full Store Backup</h5>
            <p className="text-[11px] text-stone-400">Download current products, orders and inquiries to a JSON file.</p>
          </div>

          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Backup JSON</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
          <div>
            <h5 className="text-xs font-bold text-red-400">Reset to Demo Sample Data</h5>
            <p className="text-[11px] text-stone-500">Restores all original spices, Shivam Kumar's phone numbers & sample orders.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to reset all data to default initial store data?")) {
                resetToFactoryData();
                setFormData(settings);
                alert("Store data reset successfully.");
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-bold border border-red-500/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Factory Data</span>
          </button>
        </div>
      </div>

    </div>
  );
};
