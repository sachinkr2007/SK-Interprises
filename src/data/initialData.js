export const INITIAL_SETTINGS = {
  storeName: "SK Enterprises",
  directorName: "Shivam Kumar",
  title: "Wholesale Dealers - All Types of Dry Powder Masala & Khada Masala",
  phone1: "9315250405",
  phone2: "9304822631",
  whatsappNumber: "9315250405",
  address: "Chandan Hola, Masjid Wali Gali, New Delhi - 110074",
  landmark: "Near Jama Masjid, Chandan Hola",
  upiId: "9315250405@upi",
  minWholesaleOrderKg: 5,
  adminPin: "1234",
  currency: "₹",
  bannerAnnouncement: "🔥 Wholesale Special: Get extra 15% OFF on bulk orders above 25kg! Same-day delivery across Delhi NCR.",
};

export const INITIAL_PRODUCTS = [
  {
    id: "sp-01",
    name: "Shahi Jeera (Royal Cumin Seeds)",
    hindiName: "शाही जीरा (खड़ा मसाला)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    description: "Pure, unpolished, aromatic whole cumin seeds sourced from Gujarat/Rajasthan mandis. High essential oil content, zero stones or dust.",
    basePrice100g: 45, // ₹45 per 100g
    pricePerKg: 380, // ₹380 per kg
    wholesalePricePerKg: 330, // ₹330 for bulk 5kg+
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockKg: 450,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "100g", multiplier: 1, price: 45 },
      { label: "250g", multiplier: 2.5, price: 105 },
      { label: "500g", multiplier: 5, price: 200 },
      { label: "1 kg", multiplier: 10, price: 380 },
      { label: "5 kg (Wholesale)", multiplier: 50, price: 1650 },
      { label: "25 kg (Mandi Sack)", multiplier: 250, price: 8000 }
    ],
    origin: "Unjha Mandi, Gujarat",
    purity: "100% Machine Cleaned & Sorted"
  },
  {
    id: "sp-02",
    name: "Green Cardamom Bold 8mm (Chhoti Elaichi)",
    hindiName: "हरी छोटी इलायची (8mm बोल्ड)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    description: "Extra-large 8mm bold green cardamom pods from Idukki, Kerala. Intense fragrance, vibrant natural green color, fully loaded with seeds.",
    basePrice100g: 290,
    pricePerKg: 2700,
    wholesalePricePerKg: 2450,
    rating: 5.0,
    reviewsCount: 98,
    inStock: true,
    stockKg: 120,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "50g", multiplier: 0.5, price: 150 },
      { label: "100g", multiplier: 1, price: 290 },
      { label: "250g", multiplier: 2.5, price: 700 },
      { label: "500g", multiplier: 5, price: 1380 },
      { label: "1 kg", multiplier: 10, price: 2700 },
      { label: "5 kg (Bulk Pack)", multiplier: 50, price: 12250 }
    ],
    origin: "Idukki Hills, Kerala",
    purity: "A-Grade 8mm Bold Export Quality"
  },
  {
    id: "sp-03",
    name: "Pure Salem Turmeric Powder (Haldi)",
    hindiName: "शुद्ध सेलम हल्दी पाउडर (हाई करक्यूमिन)",
    category: "powder",
    categoryLabel: "Powder Masala (Ground)",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80",
    description: "Authentic Salem high-curcumin (3.5%+) pure turmeric powder. Cold-ground in traditional chakki without color additives or starch.",
    basePrice100g: 30,
    pricePerKg: 240,
    wholesalePricePerKg: 195,
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    stockKg: 850,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "250g", multiplier: 2.5, price: 65 },
      { label: "500g", multiplier: 5, price: 125 },
      { label: "1 kg", multiplier: 10, price: 240 },
      { label: "5 kg (Jar/Bag)", multiplier: 50, price: 1050 },
      { label: "25 kg (Wholesale Sack)", multiplier: 250, price: 4875 }
    ],
    origin: "Salem, Tamil Nadu / Nizamabad",
    purity: "Zero Artificial Dye, 100% Pure Haldi"
  },
  {
    id: "sp-04",
    name: "Fiery Kashmiri & Teja Red Chilli Powder",
    hindiName: "कश्मीरी व तीखी लाल मिर्च पाउडर",
    category: "powder",
    categoryLabel: "Powder Masala (Ground)",
    image: "https://images.unsplash.com/photo-1596040033282-5509e5309623?auto=format&fit=crop&w=600&q=80",
    description: "Perfect master blend of Guntur Teja chillies for spicy kick and Kashmiri chillies for rich natural deep red gravy color.",
    basePrice100g: 38,
    pricePerKg: 320,
    wholesalePricePerKg: 270,
    rating: 4.8,
    reviewsCount: 180,
    inStock: true,
    stockKg: 620,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "250g", multiplier: 2.5, price: 85 },
      { label: "500g", multiplier: 5, price: 165 },
      { label: "1 kg", multiplier: 10, price: 320 },
      { label: "5 kg (Catering Pack)", multiplier: 50, price: 1400 },
      { label: "25 kg (Commercial Bag)", multiplier: 250, price: 6750 }
    ],
    origin: "Guntur & Byadgi, Karnataka",
    purity: "Stemless, Unadulterated Natural Red"
  },
  {
    id: "sp-05",
    name: "Aromatic Coriander Powder (Dhania)",
    hindiName: "सुगंधित धनिया पाउडर (देशी बदामी)",
    category: "powder",
    categoryLabel: "Powder Masala (Ground)",
    image: "https://images.unsplash.com/photo-1588710929895-65d21a281ba4?auto=format&fit=crop&w=600&q=80",
    description: "Made from premium Badami green coriander seeds from Ramganj Mandi. Freshly crushed with high aroma essential oils.",
    basePrice100g: 28,
    pricePerKg: 220,
    wholesalePricePerKg: 180,
    rating: 4.7,
    reviewsCount: 130,
    inStock: true,
    stockKg: 500,
    isFeatured: false,
    isWholesaleBestSeller: false,
    weights: [
      { label: "250g", multiplier: 2.5, price: 60 },
      { label: "500g", multiplier: 5, price: 115 },
      { label: "1 kg", multiplier: 10, price: 220 },
      { label: "5 kg (Pack)", multiplier: 50, price: 950 },
      { label: "25 kg (Mandi Sack)", multiplier: 250, price: 4500 }
    ],
    origin: "Ramganj Mandi, Rajasthan",
    purity: "Pure Green Badami Dhania"
  },
  {
    id: "sp-06",
    name: "Black Cardamom Bold (Badi Kali Elaichi)",
    hindiName: "बड़ी काली इलायची (मोटी दानेदार)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    description: "Smoky, aromatic large black cardamom pods from Sikkim and Assam. Perfect for biryanis, meat curries, and rich dals.",
    basePrice100g: 160,
    pricePerKg: 1450,
    wholesalePricePerKg: 1300,
    rating: 4.9,
    reviewsCount: 76,
    inStock: true,
    stockKg: 160,
    isFeatured: true,
    isWholesaleBestSeller: false,
    weights: [
      { label: "100g", multiplier: 1, price: 160 },
      { label: "250g", multiplier: 2.5, price: 380 },
      { label: "500g", multiplier: 5, price: 740 },
      { label: "1 kg", multiplier: 10, price: 1450 },
      { label: "5 kg (Wholesale)", multiplier: 50, price: 6500 }
    ],
    origin: "Sikkim & Assam Hills",
    purity: "Intact Whole Pods with Dark Resin Seeds"
  },
  {
    id: "sp-07",
    name: "Lal Pari Premium Cloves (Khada Laung)",
    hindiName: "लाल परी लौंग (तेज सुगंध व तेल युक्त)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80",
    description: "Premium Lal Pari Cloves with intact round heads. Rich in natural clove oil (eugenol) with powerful warmth and sweetness.",
    basePrice100g: 130,
    pricePerKg: 1150,
    wholesalePricePerKg: 1020,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    stockKg: 210,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "100g", multiplier: 1, price: 130 },
      { label: "250g", multiplier: 2.5, price: 310 },
      { label: "500g", multiplier: 5, price: 600 },
      { label: "1 kg", multiplier: 10, price: 1150 },
      { label: "5 kg (Commercial)", multiplier: 50, price: 5100 }
    ],
    origin: "Madagascar / Zanzibar Direct Import",
    purity: "Head-intact Crown Cloves, No Headless Stems"
  },
  {
    id: "sp-08",
    name: "Star Anise Whole (Chakri Phool)",
    hindiName: "चकरी फूल (बादियान खटाई)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    description: "Whole 8-pointed star anise flowers with shiny seeds inside. Essential for authentic Biryani fragrance, Pulao, and master gravies.",
    basePrice100g: 95,
    pricePerKg: 850,
    wholesalePricePerKg: 740,
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    stockKg: 140,
    isFeatured: false,
    isWholesaleBestSeller: false,
    weights: [
      { label: "100g", multiplier: 1, price: 95 },
      { label: "250g", multiplier: 2.5, price: 225 },
      { label: "500g", multiplier: 5, price: 440 },
      { label: "1 kg", multiplier: 10, price: 850 },
      { label: "5 kg (Wholesale)", multiplier: 50, price: 3700 }
    ],
    origin: "Arunachal & Vietnam Mandi",
    purity: "Unbroken 8-Star Blossoms"
  },
  {
    id: "sp-09",
    name: "Cinnamon Rolls & Flat Bark (Dalchini)",
    hindiName: "शुद्ध दालचीनी छाल व रोल्स",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    description: "Sweet, aromatic natural cinnamon rolls. Sourced direct for tea, biryani, baking, and traditional ayurvedic remedies.",
    basePrice100g: 65,
    pricePerKg: 550,
    wholesalePricePerKg: 460,
    rating: 4.7,
    reviewsCount: 52,
    inStock: true,
    stockKg: 300,
    isFeatured: false,
    isWholesaleBestSeller: true,
    weights: [
      { label: "100g", multiplier: 1, price: 65 },
      { label: "250g", multiplier: 2.5, price: 150 },
      { label: "500g", multiplier: 5, price: 290 },
      { label: "1 kg", multiplier: 10, price: 550 },
      { label: "5 kg (Burlap Pack)", multiplier: 50, price: 2300 }
    ],
    origin: "Kerala & Ceylon",
    purity: "100% Natural Sweet Bark"
  },
  {
    id: "sp-10",
    name: "Malabar Bold Black Pepper (Kali Mirch)",
    hindiName: "काली मिर्च (मालाबार 550g/L बोल्ड)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-density Malabar whole black peppercorns. Sharp heat, crisp crunch, rich in piperine for medicinal and culinary depth.",
    basePrice100g: 85,
    pricePerKg: 780,
    wholesalePricePerKg: 680,
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    stockKg: 400,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "100g", multiplier: 1, price: 85 },
      { label: "250g", multiplier: 2.5, price: 205 },
      { label: "500g", multiplier: 5, price: 400 },
      { label: "1 kg", multiplier: 10, price: 780 },
      { label: "5 kg (Wholesale)", multiplier: 50, price: 3400 },
      { label: "25 kg (Mandi Sack)", multiplier: 250, price: 16500 }
    ],
    origin: "Wayanad, Kerala",
    purity: "Garbled Bold Clean Berries"
  },
  {
    id: "sp-11",
    name: "SK Special Royal Shahi Garam Masala (16 Spices)",
    hindiName: "SK स्पेशल शाही गरम मसाला (16 खड़े मसालों का मिश्रण)",
    category: "blends",
    categoryLabel: "Special Blends",
    image: "https://images.unsplash.com/photo-1596040033282-5509e5309623?auto=format&fit=crop&w=600&q=80",
    description: "Our signature wholesale master blend of 16 roasted whole spices including Mace (Javitri), Nutmeg, Green Cardamom, Clove, Star Anise and Shahi Jeera.",
    basePrice100g: 90,
    pricePerKg: 850,
    wholesalePricePerKg: 720,
    rating: 5.0,
    reviewsCount: 310,
    inStock: true,
    stockKg: 350,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "100g", multiplier: 1, price: 90 },
      { label: "250g", multiplier: 2.5, price: 220 },
      { label: "500g", multiplier: 5, price: 430 },
      { label: "1 kg", multiplier: 10, price: 850 },
      { label: "5 kg (Chef Pack)", multiplier: 50, price: 3600 }
    ],
    origin: "In-House Master Formulation by Shivam Kumar",
    purity: "Zero Preservatives, Stone Ground Aroma"
  },
  {
    id: "sp-12",
    name: "Nagauri Fragrant Kasuri Methi",
    hindiName: "नागौरी कसूरी मेथी (अत्यंत सुगंधित पत्ते)",
    category: "khada",
    categoryLabel: "Khada Masala (Whole)",
    image: "https://images.unsplash.com/photo-1588710929895-65d21a281ba4?auto=format&fit=crop&w=600&q=80",
    description: "Green shade-dried Kasuri Methi from Nagaur, Rajasthan. Intense aroma that elevates butter chicken, paneer gravies and parathas.",
    basePrice100g: 40,
    pricePerKg: 350,
    wholesalePricePerKg: 290,
    rating: 4.8,
    reviewsCount: 84,
    inStock: true,
    stockKg: 200,
    isFeatured: false,
    isWholesaleBestSeller: false,
    weights: [
      { label: "100g", multiplier: 1, price: 40 },
      { label: "250g", multiplier: 2.5, price: 95 },
      { label: "500g", multiplier: 5, price: 180 },
      { label: "1 kg", multiplier: 10, price: 350 },
      { label: "5 kg (Bulk)", multiplier: 50, price: 1450 }
    ],
    origin: "Nagaur, Rajasthan",
    purity: "Dust-Free Green Dry Leaves"
  },
  {
    id: "sp-13",
    name: "Wholesale Halwai & Restaurant Mega Spice Combo Sack (15kg)",
    hindiName: "हलवाई व रेस्टोरेंट थोक महा-मसाला बोरी (15kg पैक)",
    category: "bulk",
    categoryLabel: "Wholesale Mandi Bags",
    image: "public/images/wholesale_godown.jpg",
    description: "Complete commercial kit for catering & restaurants: 5kg Haldi Powder + 4kg Red Chilli Powder + 3kg Dhania Powder + 2kg Jeera + 1kg SK Shahi Garam Masala.",
    basePrice100g: 35,
    pricePerKg: 260,
    wholesalePricePerKg: 235,
    rating: 5.0,
    reviewsCount: 165,
    inStock: true,
    stockKg: 45,
    isFeatured: true,
    isWholesaleBestSeller: true,
    weights: [
      { label: "15 kg Mega Combo Sack", multiplier: 150, price: 3650 },
      { label: "30 kg Double Mandi Pack", multiplier: 300, price: 7100 }
    ],
    origin: "SK Enterprises Direct Godown Pack",
    purity: "Factory Fresh Wholesale Sealed Burlap Sack"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Mohammad Farhan",
    role: "Head Chef, Dilli Darbar Restaurant (Hauz Khas)",
    text: "We buy all our Khada Masala and Shahi Garam Masala from Shivam Bhai (SK Enterprises) for our Dum Biryani and Nihari. The aroma of their Cardamom and Cloves is unmatched in Delhi.",
    rating: 5,
    location: "South Delhi"
  },
  {
    id: 2,
    name: "Rajesh Agrawal",
    role: "Proprietor, Agrawal Sweets & Caterers",
    text: "SK Enterprises delivers bulk 25kg sacks of Haldi and Mirch directly to our kitchen in Chandan Hola. Pure unadulterated color and consistent taste every single month.",
    rating: 5,
    location: "Chandan Hola / Chhatarpur"
  },
  {
    id: 3,
    name: "Suresh Gupta",
    role: "Retail Kirana Merchant",
    text: "Direct mandi rates without middleman commission. Shivam Kumar gives quick WhatsApp support and instant delivery. Best spice wholesale dealer in our area.",
    rating: 5,
    location: "Mehrauli, New Delhi"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-9481",
    customerName: "Mohd Rizwan",
    phone: "9818223344",
    address: "Shop 12, Main Market, Chandan Hola, New Delhi",
    date: "2026-10-10 14:30",
    items: [
      { name: "Shahi Jeera (Royal Cumin Seeds)", weight: "5 kg (Wholesale)", price: 1650, quantity: 2 },
      { name: "Green Cardamom Bold 8mm", weight: "500g", price: 1380, quantity: 1 }
    ],
    totalAmount: 4680,
    paymentMethod: "WhatsApp / COD",
    status: "Dispatched",
    notes: "Please deliver before 6 PM for dinner prep"
  },
  {
    id: "ORD-9482",
    customerName: "Anand Sharma",
    phone: "9871154321",
    address: "B-44, Chhatarpur Enclave, New Delhi",
    date: "2026-10-10 16:15",
    items: [
      { name: "Pure Salem Turmeric Powder", weight: "1 kg", price: 240, quantity: 3 },
      { name: "Fiery Kashmiri & Teja Red Chilli", weight: "1 kg", price: 320, quantity: 2 },
      { name: "SK Special Royal Shahi Garam Masala", weight: "500g", price: 430, quantity: 1 }
    ],
    totalAmount: 1790,
    paymentMethod: "UPI Online",
    status: "Processing",
    notes: "Call when reaching landmark"
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: "INQ-101",
    name: "Vikram Singhal (Hotel Royal Palace)",
    phone: "9899123456",
    spice: "All Khada Masala + Powder Bulk Sacks",
    quantity: "150 kg / Month",
    notes: "Looking for monthly recurring wholesale contract with GST invoice.",
    date: "2026-10-10 11:20",
    status: "New"
  },
  {
    id: "INQ-102",
    name: "Gurpreet Singh (Punjab Caterers)",
    phone: "9811876543",
    spice: "Green Cardamom 8mm + Cloves + Cumin",
    quantity: "25 kg each",
    notes: "Wedding season bulk order requirement for next week.",
    date: "2026-10-09 17:45",
    status: "Contacted"
  }
];
