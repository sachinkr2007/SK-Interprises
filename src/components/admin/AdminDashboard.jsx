import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Building, 
  Settings, 
  LogOut, 
  Store, 
  TrendingUp, 
  AlertCircle, 
  Phone, 
  ShieldCheck,
  Flame,
  Zap
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    settings, 
    products, 
    orders, 
    inquiries, 
    logoutAdmin, 
    setViewMode, 
    language 
  } = useStore();

  const isHindi = language === 'hi';
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'inquiries' | 'settings'

  // Metric computations
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'New' || o.status === 'Processing').length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const lowStockCount = products.filter(p => (p.stockKg || 0) < 50).length;

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100">
      
      {/* Admin Top Header */}
      <header className="bg-stone-950 border-b border-amber-500/20 sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left Brand Badge */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-red-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-amber-900/40">
                SK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-white">
                    {settings.storeName}
                  </h1>
                  <span className="text-[10px] uppercase font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
                    Admin Portal
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Director: <strong className="text-white">{settings.directorName}</strong> • {settings.phone1}
                </p>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('shop')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs border border-amber-500/30 transition-all hover:scale-105"
              >
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">{isHindi ? "दुकान देखें" : "View Customer Store"}</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 font-bold text-xs border border-red-500/20 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{isHindi ? "लॉगआउट" : "Logout"}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Products */}
          <div className="glass-card p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">
                {isHindi ? "कुल मसाला उत्पाद" : "Total Spices"}
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {products.length}
              </div>
              <span className="text-[11px] text-stone-500">
                {lowStockCount > 0 ? `${lowStockCount} low stock` : 'All healthy stock'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Orders & Pending */}
          <div className="glass-card p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">
                {isHindi ? "ग्राहक आर्डर" : "Customer Orders"}
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {orders.length}
              </div>
              <span className="text-[11px] text-amber-400 font-semibold">
                {pendingOrders} {isHindi ? "लंबित आर्डर" : "pending delivery"}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Total Revenue */}
          <div className="glass-card p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">
                {isHindi ? "कुल बिक्री (राजस्व)" : "Total Revenue"}
              </span>
              <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                ₹{totalRevenue}
              </div>
              <span className="text-[11px] text-stone-500">
                From {orders.length} recorded orders
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Wholesale Inquiries */}
          <div className="glass-card p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">
                {isHindi ? "थोक B2B लीड्स" : "Wholesale Leads"}
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {inquiries.length}
              </div>
              <span className="text-[11px] text-purple-400 font-semibold">
                {newInquiries} {isHindi ? "नई कोटेशन मांग" : "new inquiries"}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Building className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3 overflow-x-auto">
          {[
            { id: 'products', label: isHindi ? 'मसाला सूची (Products)' : 'Spices Inventory', icon: Package, count: products.length },
            { id: 'orders', label: isHindi ? 'आर्डर प्रबंधन (Orders)' : 'Orders & Invoices', icon: ShoppingBag, count: orders.length },
            { id: 'inquiries', label: isHindi ? 'थोक लीड्स (Wholesale Leads)' : 'Wholesale Inquiries', icon: Building, count: inquiries.length },
            { id: 'settings', label: isHindi ? 'दुकान सेटिंग्स (Settings)' : 'Store Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                    : 'bg-stone-900/60 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'inquiries' && <AdminInquiries />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>

      </main>

    </div>
  );
};
