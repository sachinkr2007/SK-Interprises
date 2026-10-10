import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_ORDERS, INITIAL_INQUIRIES, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/initialData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // 1. Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sk_settings');
    return saved ? JSON.parse(saved) : {
      ...INITIAL_SETTINGS,
      ownerPhones: ["9315250405", "9304822631"],
      ownerSecretId: "SHIVAM_SK",
      masterAdminPin: "784512"
    };
  });

  // 2. Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sk_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // 3. Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sk_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 5. Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('sk_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // 6. Testimonials State
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('sk_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  // 7. UI, Language, Auth & Mobile State
  const [language, setLanguage] = useState(() => localStorage.getItem('sk_lang') || 'hi');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('sk_admin_auth') === 'true';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [currentInvoiceOrder, setCurrentInvoiceOrder] = useState(null);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [viewMode, setViewMode] = useState('shop'); // 'shop' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeMobileTab, setActiveMobileTab] = useState('home');

  // OTP Simulation State for Owner Verification
  const [otpNotice, setOtpNotice] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sk_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sk_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('sk_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('sk_lang', language);
  }, [language]);

  // Check URL param ?admin=true for direct owner secret gate
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('admin') === 'portal') {
      setIsAdminLoginOpen(true);
    }
  }, []);

  // Cart Operations
  const addToCart = (product, selectedWeightObj, quantity = 1) => {
    const cartItemId = `${product.id}-${selectedWeightObj.label}`;
    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            hindiName: product.hindiName,
            image: product.image,
            category: product.category,
            weightLabel: selectedWeightObj.label,
            price: selectedWeightObj.price,
            quantity: quantity,
            origin: product.origin
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = cartItemId => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Product Admin Operations
  const addProduct = newProd => {
    const productWithId = {
      ...newProd,
      id: `sp-${Date.now()}`
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateProduct = updatedProd => {
    setProducts(prev => prev.map(p => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const deleteProduct = prodId => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  // Bulk Price Adjuster (For Mandi Fluctuations)
  const bulkAdjustMandiPrices = (category, percentChange) => {
    const factor = 1 + percentChange / 100;
    setProducts(prev =>
      prev.map(p => {
        if (category !== 'all' && p.category !== category) return p;
        const newPricePerKg = Math.round(p.pricePerKg * factor);
        const newWholesalePerKg = Math.round((p.wholesalePricePerKg || p.pricePerKg * 0.85) * factor);
        const newBase100g = Math.round((p.basePrice100g || 40) * factor);

        const updatedWeights = p.weights ? p.weights.map(w => ({
          ...w,
          price: Math.round(w.price * factor)
        })) : [];

        return {
          ...p,
          pricePerKg: newPricePerKg,
          wholesalePricePerKg: newWholesalePerKg,
          basePrice100g: newBase100g,
          weights: updatedWeights
        };
      })
    );
  };

  const resetToFactoryData = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings({
      ...INITIAL_SETTINGS,
      ownerPhones: ["9315250405", "9304822631"],
      ownerSecretId: "SHIVAM_SK",
      masterAdminPin: "784512"
    });
    setOrders(INITIAL_ORDERS);
    setInquiries(INITIAL_INQUIRIES);
    setTestimonials(INITIAL_TESTIMONIALS);
  };

  // Order Operations
  const placeOrder = orderData => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'New'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setCurrentInvoiceOrder(newOrder);
    setIsInvoiceOpen(true);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const deleteOrder = orderId => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
  };

  // Inquiry Operations
  const submitInquiry = inquiryData => {
    const newInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (inqId, status) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === inqId ? { ...inq, status } : inq))
    );
  };

  // Testimonials Operations
  const addTestimonial = (review) => {
    const newRev = { ...review, id: Date.now() };
    setTestimonials(prev => [newRev, ...prev]);
  };

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // 2-Step Secure Owner Authentication
  const requestOwnerOtp = (phoneOrId) => {
    const cleaned = phoneOrId.trim().replace(/\s+/g, '');
    const validPhones = settings.ownerPhones || ["9315250405", "9304822631"];
    const validSecretId = settings.ownerSecretId || "SHIVAM_SK";

    const isMatch = validPhones.some(p => cleaned.includes(p) || p.includes(cleaned)) || cleaned.toUpperCase() === validSecretId.toUpperCase() || cleaned === "9315250405" || cleaned === "9304822631";

    if (isMatch) {
      // Generate 6 digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('sk_temp_otp', generatedOtp);
      sessionStorage.setItem('sk_otp_target', cleaned);

      // Show mock SMS/WhatsApp delivery notification toast
      setOtpNotice({
        phone: cleaned.length === 10 ? cleaned : "9315250405",
        otp: generatedOtp,
        time: new Date().toLocaleTimeString()
      });

      return { success: true, otp: generatedOtp };
    } else {
      return { success: false, message: "यह नंबर या आईडी अधिकृत मालिक (Shivam Kumar) के रूप में पंजीकृत नहीं है।" };
    }
  };

  const verifyOwnerOtp = (inputOtp) => {
    const savedOtp = sessionStorage.getItem('sk_temp_otp');
    const masterPin = settings.masterAdminPin || "784512";
    const legacyPin = settings.adminPin || "1234";

    if (inputOtp === savedOtp || inputOtp === masterPin || inputOtp === legacyPin) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('sk_admin_auth', 'true');
      sessionStorage.removeItem('sk_temp_otp');
      setOtpNotice(null);
      setIsAdminLoginOpen(false);
      setViewMode('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('sk_admin_auth');
    setViewMode('shop');
  };

  const updateSettings = newSet => {
    setSettings(newSet);
  };

  // WhatsApp Order Link Generator
  const generateWhatsAppOrderLink = (customerName, phone, address, notes, itemsList, total) => {
    const targetPhone = settings.whatsappNumber || "9315250405";
    let message = `🌶️ *NEW ORDER - SK ENTERPRISES*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Customer:* ${customerName}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Delivery Address:* ${address}\n`;
    if (notes) message += `📝 *Note:* ${notes}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 *ORDERED SPICES:*\n`;
    
    itemsList.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.weightLabel}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL BILL:* ₹${total}\n`;
    message += `🚚 *Store:* SK Enterprises (Shivam Kumar - 9315250405 / 9304822631)\n`;
    message += `📍 Chandan Hola, Masjid Wali Gali\n`;
    message += `\n*Please confirm order and send delivery estimate.* 🙏`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/91${targetPhone}?text=${encoded}`;
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkAdjustMandiPrices,
        resetToFactoryData,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        language,
        setLanguage,
        isAdminLoggedIn,
        requestOwnerOtp,
        verifyOwnerOtp,
        logoutAdmin,
        otpNotice,
        setOtpNotice,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isInvoiceOpen,
        setIsInvoiceOpen,
        currentInvoiceOrder,
        setCurrentInvoiceOrder,
        selectedProductModal,
        setSelectedProductModal,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeMobileTab,
        setActiveMobileTab,
        generateWhatsAppOrderLink
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
