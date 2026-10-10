import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, Filter, SlidersHorizontal, Package, Flame, Zap } from 'lucide-react';

export const ProductCatalog = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, language } = useStore();
  const isHindi = language === 'hi';
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'

  const categories = [
    { id: 'all', label: isHindi ? 'सभी मसाले' : 'All Spices', icon: Sparkles },
    { id: 'khada', label: isHindi ? 'खड़ा मसाला (साबुत)' : 'Khada Masala (Whole)', icon: Flame },
    { id: 'powder', label: isHindi ? 'पिसा मसाला (पाउडर)' : 'Powder Masala (Ground)', icon: Zap },
    { id: 'blends', label: isHindi ? 'स्पेशल गरम मसाला व मिश्रण' : 'Special Blends', icon: Sparkles },
    { id: 'bulk', label: isHindi ? 'थोक मंडी बोरियां (सैक)' : 'Wholesale Mandi Bags', icon: Package }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesHindi = p.hindiName && p.hindiName.toLowerCase().includes(query);
        const matchesDesc = p.description && p.description.toLowerCase().includes(query);
        const matchesCategory = p.categoryLabel && p.categoryLabel.toLowerCase().includes(query);
        return matchesName || matchesHindi || matchesDesc || matchesCategory;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.basePrice100g || 0) - (b.basePrice100g || 0);
      if (sortBy === 'price-desc') return (b.basePrice100g || 0) - (a.basePrice100g || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="spices-catalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500">
              {isHindi ? "शुद्ध मसाला संग्रह" : "Authentic Spice Collection"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            {isHindi ? "ताज़ा व शुद्ध मसालों की सूची" : "Premium Spices Catalog & Rates"}
          </h2>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            {isHindi 
              ? "होटल, हलवाई व घरेलू उपयोग के लिए १०० ग्राम से लेकर २५ किलो की थोक बोरियां उपलब्ध हैं।"
              : "Available in custom retail weights and bulk commercial sacks direct from godown."}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-stone-400" />
          <span className="text-xs text-stone-400">{isHindi ? "क्रमबद्ध:" : "Sort:"}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="featured">{isHindi ? "विशेष सिफारिश (Featured)" : "Featured"}</option>
            <option value="price-asc">{isHindi ? "मूल्य: कम से अधिक" : "Price: Low to High"}</option>
            <option value="price-desc">{isHindi ? "मूल्य: अधिक से कम" : "Price: High to Low"}</option>
            <option value="rating">{isHindi ? "ग्राहक रेटिंग (Top Rated)" : "Top Rated"}</option>
          </select>
        </div>
      </div>

      {/* Category Tabs Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Info & Product Count */}
      <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
        <span>
          {isHindi ? `दिखाए गए उत्पाद: ${filteredProducts.length}` : `Showing ${filteredProducts.length} spice products`}
        </span>
        {searchQuery && (
          <span>
            {isHindi ? `खोज परिणाम: "${searchQuery}"` : `Results for "${searchQuery}"`}
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-12 text-center rounded-3xl border border-stone-800 max-w-lg mx-auto my-12">
          <Package className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">
            {isHindi ? "कोई मसाला नहीं मिला" : "No Spices Found"}
          </h3>
          <p className="text-xs text-stone-400 mt-1 mb-4">
            {isHindi 
              ? "कृपया अन्य नाम से खोजें या फ़िल्टर हटाएँ।"
              : "Try adjusting your search query or category filters."}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400"
          >
            {isHindi ? "सभी मसाले देखें" : "View All Spices"}
          </button>
        </div>
      )}

    </section>
  );
};
