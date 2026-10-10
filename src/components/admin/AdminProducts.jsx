import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Image, 
  Sparkles, 
  Package, 
  Flame, 
  Zap, 
  SlidersHorizontal, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Percent
} from 'lucide-react';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, bulkAdjustMandiPrices, language } = useStore();
  const isHindi = language === 'hi';

  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditProd, setCurrentEditProd] = useState(null);
  const [showBulkPriceModal, setShowBulkPriceModal] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('all');
  const [bulkPercent, setBulkPercent] = useState(5);
  const [bulkDirection, setBulkDirection] = useState('increase');

  const initialForm = {
    name: '',
    hindiName: '',
    category: 'khada',
    categoryLabel: 'Khada Masala (Whole)',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description: '',
    basePrice100g: 45,
    pricePerKg: 380,
    wholesalePricePerKg: 330,
    inStock: true,
    stockKg: 150,
    isFeatured: false,
    isWholesaleBestSeller: false,
    origin: 'Direct Mandi Sourced',
    purity: '100% Machine Sorted'
  };

  const [formData, setFormData] = useState(initialForm);

  const sampleImages = [
    { label: "Cumin / Jeera", url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80" },
    { label: "Green Cardamom", url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80" },
    { label: "Turmeric Haldi", url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80" },
    { label: "Red Chilli Mirch", url: "https://images.unsplash.com/photo-1596040033282-5509e5309623?auto=format&fit=crop&w=600&q=80" },
    { label: "Coriander Dhania", url: "https://images.unsplash.com/photo-1588710929895-65d21a281ba4?auto=format&fit=crop&w=600&q=80" },
    { label: "Cloves / Laung", url: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80" },
    { label: "Star Anise", url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80" },
    { label: "Wholesale Mandi Sack", url: "public/images/wholesale_godown.jpg" }
  ];

  const handleOpenAdd = () => {
    setCurrentEditProd(null);
    setFormData(initialForm);
    setIsEditing(true);
  };

  const handleOpenEdit = (prod) => {
    setCurrentEditProd(prod);
    setFormData({
      ...prod,
      basePrice100g: prod.basePrice100g || Math.round((prod.pricePerKg || 400) / 9),
      pricePerKg: prod.pricePerKg || 350,
      wholesalePricePerKg: prod.wholesalePricePerKg || Math.round((prod.pricePerKg || 350) * 0.85),
      stockKg: prod.stockKg !== undefined ? prod.stockKg : 100,
    });
    setIsEditing(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const base100 = Number(formData.basePrice100g);
    const pKg = Number(formData.pricePerKg);
    const wKg = Number(formData.wholesalePricePerKg);

    const weights = [
      { label: "100g", multiplier: 1, price: base100 },
      { label: "250g", multiplier: 2.5, price: Math.round(base100 * 2.3) },
      { label: "500g", multiplier: 5, price: Math.round(base100 * 4.4) },
      { label: "1 kg", multiplier: 10, price: pKg },
      { label: "5 kg (Wholesale)", multiplier: 50, price: Math.round(wKg * 5) },
      { label: "25 kg (Mandi Sack)", multiplier: 250, price: Math.round(wKg * 24) }
    ];

    const categoryLabelMap = {
      khada: 'Khada Masala (Whole)',
      powder: 'Powder Masala (Ground)',
      blends: 'Special Blends',
      bulk: 'Wholesale Mandi Bags'
    };

    const finalData = {
      ...formData,
      categoryLabel: categoryLabelMap[formData.category] || 'Spice',
      basePrice100g: base100,
      pricePerKg: pKg,
      wholesalePricePerKg: wKg,
      stockKg: Number(formData.stockKg),
      weights: weights
    };

    if (currentEditProd) {
      updateProduct({ ...finalData, id: currentEditProd.id });
    } else {
      addProduct(finalData);
    }

    setIsEditing(false);
  };

  const handleExecuteBulkPriceChange = () => {
    const finalPercent = bulkDirection === 'increase' ? Number(bulkPercent) : -Number(bulkPercent);
    bulkAdjustMandiPrices(bulkCategory, finalPercent);
    setShowBulkPriceModal(false);
    alert(`मंडी भाव अनुसार कीमतें ${finalPercent > 0 ? '+' : ''}${finalPercent}% सफलतापूर्वक अपडेट कर दी गईं!`);
  };

  const filtered = products.filter(p => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.hindiName && p.hindiName.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Search, Bulk Mandi Rate Adjuster, Add Spice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isHindi ? "मसाला सूची में खोजें (नाम या हिन्दी)..." : "Search spices inventory..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          
          {/* Mandi Rate Batch Modifier */}
          <button
            onClick={() => setShowBulkPriceModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs border border-amber-500/30 transition-colors"
            title="Update all spice prices based on mandi fluctuations"
          >
            <Percent className="w-3.5 h-3.5" />
            <span>{isHindi ? "मंडी भाव बैच अपडेट" : "Mandi Rate Adjuster"}</span>
          </button>

          {/* Add Spice Button */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-stone-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>{isHindi ? "नया मसाला जोड़ें" : "Add New Spice"}</span>
          </button>

        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Spice Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">100g Rate</th>
                <th className="p-4">Retail (1kg)</th>
                <th className="p-4">Wholesale Rate</th>
                <th className="p-4">Stock (kg)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filtered.map(p => {
                const isLowStock = (p.stockKg || 0) < 50;
                return (
                  <tr key={p.id} className="hover:bg-stone-850/50 transition-colors">
                    
                    {/* Product Details */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                          {p.name}
                          {p.isWholesaleBestSeller && (
                            <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded">
                              Wholesale Top
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-amber-400 font-semibold">{p.hindiName}</p>
                        <p className="text-[10px] text-stone-500">{p.origin}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-stone-950 text-stone-300 border border-stone-800">
                        {p.categoryLabel || p.category}
                      </span>
                    </td>

                    {/* 100g Price */}
                    <td className="p-4 font-mono font-bold text-stone-200">
                      ₹{p.basePrice100g || 40}
                    </td>

                    {/* Retail 1kg */}
                    <td className="p-4 font-mono font-black text-white text-sm">
                      ₹{p.pricePerKg || 380}
                    </td>

                    {/* Wholesale */}
                    <td className="p-4 font-mono font-black text-emerald-400 text-sm">
                      ₹{p.wholesalePricePerKg || 330}
                    </td>

                    {/* Stock */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-bold ${isLowStock ? 'text-red-400' : 'text-stone-300'}`}>
                          {p.stockKg || 100} kg
                        </span>
                        {isLowStock && (
                          <span className="text-[9px] bg-red-950 text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded font-bold">
                            Low
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-all"
                          title="Edit Spice Rates"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`मसाला "${p.name}" को कैटलॉग से हटाएं?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 transition-colors"
                          title="Delete Spice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandi Batch Price Adjuster Modal */}
      {showBulkPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-md bg-stone-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-400" />
                <span>{isHindi ? "मंडी भाव अनुसार कीमतें बदलें" : "Batch Mandi Rate Adjuster"}</span>
              </h3>
              <button onClick={() => setShowBulkPriceModal(false)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400">
              {isHindi 
                ? "जब मंडी में भाव बढ़ते या घटते हैं, तो आप एक साथ सभी मसालों या किसी खास श्रेणी की कीमतें प्रतिशत (%) में बदल सकते हैं।" 
                : "Batch update product prices by percentage during mandi price fluctuations."}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-300 font-bold block mb-1">लागू श्रेणी (Category):</label>
                <select
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 font-semibold"
                >
                  <option value="all">All Spices (सभी मसाले)</option>
                  <option value="khada">Khada Masala Only (खड़ा मसाला)</option>
                  <option value="powder">Powder Masala Only (पिसा मसाला)</option>
                  <option value="blends">Special Blends (गरम मसाला)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 font-bold block mb-1">दिशा (Action):</label>
                  <select
                    value={bulkDirection}
                    onChange={(e) => setBulkDirection(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 font-semibold"
                  >
                    <option value="increase">Increase (+ मूल्य बढ़ाएं)</option>
                    <option value="decrease">Decrease (- मूल्य घटाएं)</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-300 font-bold block mb-1">प्रतिशत (% Change):</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={bulkPercent}
                    onChange={(e) => setBulkPercent(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => setShowBulkPriceModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteBulkPriceChange}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black"
              >
                Apply Price Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Spice Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <h3 className="text-xl font-black text-white">
                {currentEditProd ? (isHindi ? "मसाला व भाव संपादित करें" : "Edit Spice & Pricing") : (isHindi ? "नया मसाला जोड़ें" : "Add New Spice to Inventory")}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* English & Hindi Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Spice Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Malabar Black Pepper"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    मसाले का नाम (हिन्दी) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. मालाबार काली मिर्च (बोल्ड दाने)"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Category & Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="khada">Khada Masala (Whole Spices)</option>
                    <option value="powder">Powder Masala (Ground Spices)</option>
                    <option value="blends">Special Blends & Garam Masala</option>
                    <option value="bulk">Wholesale Mandi Bags & Sacks</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="Image URL or choose preset below"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Image Presets Selector */}
              <div>
                <span className="text-[10px] text-stone-400 block mb-1.5">⚡ Fast Image Preset Pickers:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: s.url })}
                      className="text-[10px] px-2 py-1 bg-stone-850 hover:bg-stone-800 text-stone-300 rounded border border-stone-700"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Price Fields: 100g, 1kg retail, 1kg wholesale */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-stone-950 rounded-xl border border-stone-800">
                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Base 100g Rate (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice100g}
                    onChange={(e) => setFormData({ ...formData, basePrice100g: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-100 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Retail Rate / 1 kg (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerKg}
                    onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-100 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-emerald-400 block mb-1">
                    Wholesale Rate / 1 kg (5kg+) (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.wholesalePricePerKg}
                    onChange={(e) => setFormData({ ...formData, wholesalePricePerKg: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-emerald-400 font-mono font-black"
                  />
                </div>
              </div>

              {/* Description & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Origin Mandi
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unjha Mandi, Gujarat / Salem"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Available Stock in Godown (Kg)
                  </label>
                  <input
                    type="number"
                    value={formData.stockKg}
                    onChange={(e) => setFormData({ ...formData, stockKg: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1">
                  Spice Aroma Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Pure aroma, unpolished spices, machine cleaned..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-300">
                  <input
                    type="checkbox"
                    checked={formData.isWholesaleBestSeller}
                    onChange={(e) => setFormData({ ...formData, isWholesaleBestSeller: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>Mark as Wholesale Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-300">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>Available in Stock</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black shadow-lg shadow-amber-500/20"
                >
                  {currentEditProd ? "Save Price & Stock" : "Create Spice"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
