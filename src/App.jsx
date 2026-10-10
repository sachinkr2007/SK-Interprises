import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisitingCard3D } from './components/VisitingCard3D';
import { WholesaleCalculator } from './components/WholesaleCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { QualitySection } from './components/QualitySection';
import { Testimonials } from './components/Testimonials';
import { ContactFooter } from './components/ContactFooter';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Phone, MessageCircle } from 'lucide-react';

const MainApp = () => {
  const { viewMode, isAdminLoggedIn, settings } = useStore();

  if (viewMode === 'admin' && isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black pb-16 md:pb-0">
      
      {/* Customer Store Front */}
      <div>
        <Header />
        <main>
          <Hero />
          <VisitingCard3D />
          <WholesaleCalculator />
          <ProductCatalog />
          <QualitySection />
          <Testimonials />
        </main>
      </div>

      <ContactFooter />

      {/* Mobile-First Fixed Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductModal />
      <CheckoutModal />
      <InvoiceModal />
      <AdminLoginModal />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
