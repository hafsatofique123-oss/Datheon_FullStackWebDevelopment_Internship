/**
 * Lumen & Co. – Premium E-Commerce Storefront
 * Realistic Catalog, Dynamic Cart, Multi-Angle Gallery, and Checkout Simulation
 */
(() => {
  'use strict';

  // ==========================================================================
  // Configuration & Constants
  // ==========================================================================
  const CART_KEY = 'lumen.cart.v2';
  const WISHLIST_KEY = 'lumen.wishlist.v2';
  const TAX_RATE = 0.08;
  const SHIPPING_FLAT = 5.99;
  const FREE_SHIPPING_OVER = 75.0;

  const CATEGORIES = ['All', 'Electronics', 'Jewelry', 'Clothing', 'Lifestyle'];

  // Curated Promo Codes
  const PROMO_CODES = {
    WELCOME15: { type: 'percent', value: 0.15, label: '15% Off (WELCOME15)' },
    SAVE20: { type: 'fixed', value: 20.0, min: 100.0, label: '$20 Off (SAVE20)' },
    FREESHIP: { type: 'shipping', value: 0, label: 'Free Express Shipping (FREESHIP)' }
  };

  // ==========================================================================
  // Realistic Curated Product Catalog
  // High-Resolution Commercial Photography & Authenticated Product Specs
  // ==========================================================================
  const PRODUCTS = [
    {
      id: 101,
      title: 'Aura Pro Wireless Noise-Cancelling Headphones',
      category: 'Electronics',
      price: 299.0,
      originalPrice: 349.0,
      rating: { rate: 4.9, count: 842 },
      badge: 'Best Seller',
      stock: 7,
      colors: [
        { name: 'Midnight Black', hex: '#1e2022' },
        { name: 'Platinum Silver', hex: '#d9dce1' },
        { name: 'Nordic Navy', hex: '#2c3e50' }
      ],
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      description: 'Engineered with custom 40mm beryllium drivers and dual-mic hybrid active noise cancellation. Delivers up to 38 hours of high-fidelity playback with rapid 15-minute USB-C fast charging for 6 hours of power.',
      specs: [
        'Custom 40mm Beryllium Dynamic Drivers',
        'Hybrid ANC with Transparency Awareness Mode',
        '38-Hour Battery Life · USB-C Rapid Fast Charge',
        'Bluetooth 5.3 with Multi-Point Device Pairing'
      ]
    },
    {
      id: 102,
      title: 'Apex Horizon Titanium Smart Fitness Watch',
      category: 'Electronics',
      price: 189.0,
      originalPrice: 229.0,
      rating: { rate: 4.8, count: 620 },
      badge: 'Staff Pick',
      stock: 12,
      colors: [
        { name: 'Titanium Silver', hex: '#c5c7cb' },
        { name: 'Space Gray', hex: '#4b4d52' },
        { name: 'Starlight Gold', hex: '#d8cbb8' }
      ],
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      description: 'Ultra-lightweight grade 5 titanium case surrounding an always-on 1.4-inch AMOLED sapphire display. Real-time optical heart rate, ECG, blood oxygen (SpO2), sleep metrics, and 10-day battery life.',
      specs: [
        'Grade 5 Titanium & Sapphire Crystal Lens',
        'Always-on 1.4" AMOLED 454x454 Display',
        '50-Meter Water Resistance (5 ATM)',
        '10-Day Battery Life on Single Charge'
      ]
    },
    {
      id: 103,
      title: 'Lumix Retro 35mm Mirrorless Camera Body',
      category: 'Electronics',
      price: 849.0,
      originalPrice: 999.0,
      rating: { rate: 4.9, count: 310 },
      badge: 'Save $150',
      stock: 3,
      colors: [
        { name: 'Vintage Silver', hex: '#b0b5bc' },
        { name: 'Stealth Black', hex: '#222326' }
      ],
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      description: 'Classic tactile mechanical dials meet cutting-edge digital imaging. Features a 32.5MP full-frame CMOS sensor, in-body 5-axis image stabilization, and uncropped 4K 60fps cinema recording.',
      specs: [
        '32.5MP Full-Frame High-Resolution Sensor',
        '5-Axis In-Body Image Stabilization (IBIS)',
        'Cinema 4K/60p 10-Bit Internal Recording',
        'Tactile Aluminum Exposure & ISO Dials'
      ]
    },
    {
      id: 104,
      title: 'Nordic Acoustic 360° Studio Bluetooth Speaker',
      category: 'Electronics',
      price: 149.0,
      originalPrice: 179.0,
      rating: { rate: 4.7, count: 475 },
      badge: 'Popular',
      stock: 15,
      colors: [
        { name: 'Charcoal Wool', hex: '#333740' },
        { name: 'Oatmeal Tweed', hex: '#d4ceb8' },
        { name: 'Forest Moss', hex: '#3b4e43' }
      ],
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
      description: 'Immersive omnidirectional sound wrapped in tailored acoustic Kvadrat wool fabric. Dual neodymium tweeters and bottom-firing subwoofer create rich, distortion-free low end in any room.',
      specs: [
        'True 360° Omnidirectional Room Acoustics',
        '24-Hour Continuous Battery Life',
        'IPX7 Waterproof & Outdoor Ready',
        'Stereo Pairing with Additional Units'
      ]
    },
    {
      id: 105,
      title: 'Keyflow Minimalist Wireless Mechanical Keyboard',
      category: 'Electronics',
      price: 119.0,
      originalPrice: 139.0,
      rating: { rate: 4.8, count: 520 },
      badge: 'Trending',
      stock: 9,
      colors: [
        { name: 'Space Gray', hex: '#484b54' },
        { name: 'Chalk White', hex: '#eceff1' }
      ],
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      description: 'Low-profile pre-lubed mechanical switches housed in a CNC anodized aluminum top frame. Supports Mac and Windows key layouts with 3-device seamless Bluetooth switching.',
      specs: [
        'Hot-Swappable Low-Profile Switches',
        'Precision CNC Anodized Aluminum Enclosure',
        'Tri-Mode: 2.4GHz Wireless, Bluetooth 5.1 & USB-C',
        'Up to 180 Hours Battery Life (Backlight Off)'
      ]
    },
    {
      id: 106,
      title: 'PodSound Elite True Wireless Earbuds with ANC',
      category: 'Electronics',
      price: 129.0,
      originalPrice: 159.0,
      rating: { rate: 4.6, count: 680 },
      badge: 'Great Value',
      stock: 18,
      colors: [
        { name: 'Matte Obsidian', hex: '#1c1d21' },
        { name: 'Pearl White', hex: '#f7f7f9' },
        { name: 'Sage Green', hex: '#6b7a6e' }
      ],
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      description: 'Spatial audio with personalized ear canal scanning and adaptive transparency mode. Comes in an ergonomic matte pocket case with wireless Qi charging.',
      specs: [
        'Active Noise Cancellation up to 35dB',
        '32 Hours Total Playtime with Qi Case',
        'Custom 11mm Graphene Coated Drivers',
        'IPX5 Sweat & Rain Resistance'
      ]
    },
    {
      id: 201,
      title: '14K Solid Gold Beveled Edge Signet Ring',
      category: 'Jewelry',
      price: 195.0,
      originalPrice: 240.0,
      rating: { rate: 4.9, count: 340 },
      badge: 'Fine Jewelry',
      stock: 5,
      colors: [
        { name: '14K Yellow Gold', hex: '#d4af37' },
        { name: '14K White Gold', hex: '#e3e4e6' },
        { name: '14K Rose Gold', hex: '#b76e79' }
      ],
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted from 100% recycled 14k solid gold with a brushed matte face and mirror-polished beveled edges. Designed to be worn every day and cherished for generations.',
      specs: [
        '100% Certified Recycled 14K Solid Gold',
        'Comfort-Fit Interior Band Contour',
        'Hypoallergenic & Shower Proof',
        'Includes Velvet Gift Box & Certificate'
      ]
    },
    {
      id: 202,
      title: 'Étoile Sterling Silver Layered Pendant Necklace',
      category: 'Jewelry',
      price: 85.0,
      originalPrice: 110.0,
      rating: { rate: 4.7, count: 410 },
      badge: 'Popular',
      stock: 14,
      colors: [
        { name: '925 Sterling Silver', hex: '#d6dadf' },
        { name: 'Gold Vermeil', hex: '#d4af37' }
      ],
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted in 925 sterling silver plated in protective rhodium for enduring brilliance. Features an ethically cut lab gemstone on an adjustable 18-20 inch delicate cable chain.',
      specs: [
        'Solid 925 Sterling Silver Construction',
        'Anti-Tarnish Rhodium Dipped Finish',
        'Adjustable 18" to 20" Cable Chain with Lobster Clasp',
        'Conflict-Free Ethically Sourced Stone'
      ]
    },
    {
      id: 203,
      title: 'Heritage Classic Chronograph Horween Leather Watch',
      category: 'Jewelry',
      price: 265.0,
      originalPrice: 320.0,
      rating: { rate: 4.9, count: 285 },
      badge: 'Limited Edition',
      stock: 4,
      colors: [
        { name: 'Cognac Leather', hex: '#8b5a2b' },
        { name: 'Espresso Brown', hex: '#3e2723' },
        { name: 'Matte Black', hex: '#212121' }
      ],
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
      description: 'Precision Japanese Miyota chronograph caliber sealed in a 40mm surgical-grade 316L stainless steel case. Paired with a supple vegetable-tanned American Horween leather strap.',
      specs: [
        'Miyota Precision Chronograph Movement',
        '316L Surgical Stainless Steel Case',
        'Scratch-Resistant Sapphire Crystal Lens',
        'Vegetable-Tanned Horween Calf Leather Strap'
      ]
    },
    {
      id: 204,
      title: 'Lumière Pavé Diamond Huggie Earrings',
      category: 'Jewelry',
      price: 110.0,
      originalPrice: 145.0,
      rating: { rate: 4.8, count: 390 },
      badge: 'Staff Pick',
      stock: 8,
      colors: [
        { name: '18K Gold Vermeil', hex: '#e5c158' },
        { name: 'Sterling Silver', hex: '#d9dce1' },
        { name: 'Rose Gold Vermeil', hex: '#c5838c' }
      ],
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      description: 'Dainty everyday hoop earrings micro-set with brilliant lab-grown crystals. Cast in thick 18k gold vermeil over sterling silver with a secure snap-bar click closure.',
      specs: [
        '18K Gold Vermeil (2.5 Microns Thick)',
        'Brilliant Lab-Grown Pavé Crystals',
        '11mm Outer Diameter · Everyday Comfort Fit',
        'Nickel-Free & Hypoallergenic Post'
      ]
    },
    {
      id: 205,
      title: 'Palermo Handcrafted Acetate Polarized Sunglasses',
      category: 'Jewelry',
      price: 95.0,
      originalPrice: 125.0,
      rating: { rate: 4.7, count: 530 },
      badge: 'Trending',
      stock: 11,
      colors: [
        { name: 'Havana Tortoise', hex: '#5c4033' },
        { name: 'Midnight Jet', hex: '#111215' },
        { name: 'Champagne Crystal', hex: '#e8dcbe' }
      ],
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      description: 'Sculpted by hand from Mazzucchelli Italian cellulose acetate. Fitted with scratch-resistant polarized Category 3 UV400 lenses and reinforced with 5-barrel German OBE hinges.',
      specs: [
        'Handcrafted Italian Cellulose Acetate',
        '100% UV400 Polarized Glare-Reduction Lenses',
        'Reinforced German 5-Barrel Steel Hinges',
        'Includes Hard Leather Case & Microfiber Cloth'
      ]
    },
    {
      id: 206,
      title: 'Solstice Brushed Titanium Minimalist Cuff',
      category: 'Jewelry',
      price: 78.0,
      originalPrice: 98.0,
      rating: { rate: 4.6, count: 215 },
      badge: 'New',
      stock: 16,
      colors: [
        { name: 'Raw Matte Titanium', hex: '#8a8d94' },
        { name: 'PVD Obsidian Black', hex: '#232428' }
      ],
      image: 'https://images.unsplash.com/photo-1611591475152-473523dd665f?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1611591475152-473523dd665f?auto=format&fit=crop&w=800&q=80',
      description: 'Precision milled from featherweight aerospace-grade pure titanium. Finished with a subtle directional satin brush that resists fingerprints and everyday wear.',
      specs: [
        'Grade 2 Pure Aerospace Titanium',
        'Gentle Malleable Adjustment to Fit All Wrists',
        '100% Corrosion & Tarnish Proof',
        'Featherweight: Only 14 Grams'
      ]
    },
    {
      id: 301,
      title: 'Heavyweight 280 GSM Washed Cotton Boxy Tee',
      category: 'Clothing',
      price: 38.0,
      originalPrice: 48.0,
      rating: { rate: 4.8, count: 910 },
      badge: 'Essential',
      stock: 25,
      colors: [
        { name: 'Vintage White', hex: '#f0ede6' },
        { name: 'Washed Charcoal', hex: '#373a40' },
        { name: 'Army Olive', hex: '#4b5320' }
      ],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      description: 'Knitted from premium 100% GOTS-certified organic cotton at a substantial 280 GSM weight. Enzyme garment-washed for a broken-in vintage feel with a structured drop-shoulder drape.',
      specs: [
        '280 GSM Heavyweight Combed Cotton',
        'Relaxed Boxy Drop-Shoulder Silhouette',
        'Pre-Shrunk & Garment Washed for Zero Shrinkage',
        'Durable 1" Bound Ribbed Collar'
      ]
    },
    {
      id: 302,
      title: 'Atelier Tailored Virgin Wool-Cashmere Overcoat',
      category: 'Clothing',
      price: 320.0,
      originalPrice: 420.0,
      rating: { rate: 4.9, count: 320 },
      badge: 'Save $100',
      stock: 6,
      colors: [
        { name: 'Camel Tan', hex: '#b58b5b' },
        { name: 'Charcoal Melange', hex: '#42454e' },
        { name: 'Midnight Navy', hex: '#1c2833' }
      ],
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      description: 'Tailored from double-faced Italian virgin wool blended with 20% fine Mongolian cashmere. Fully lined in silky breathable cupro with genuine horn buttons and interior passport pocket.',
      specs: [
        '80% Virgin Wool, 20% Mongolian Cashmere',
        'Genuine Buffalo Horn Buttons',
        'Breathable Japanese Bemberg Cupro Lining',
        'Deep Welt Flap Pockets & Interior Storm Flap'
      ]
    },
    {
      id: 303,
      title: 'Courtside Nappa Full-Grain Leather Low Sneakers',
      category: 'Clothing',
      price: 145.0,
      originalPrice: 185.0,
      rating: { rate: 4.8, count: 740 },
      badge: 'Top Rated',
      stock: 10,
      colors: [
        { name: 'Optic White', hex: '#ffffff' },
        { name: 'White / Gum Sole', hex: '#c89e6c' },
        { name: 'White / Forest Heel', hex: '#2d5a3f' }
      ],
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      description: 'Bench-crafted in Porto, Portugal using butter-soft Italian full-grain calfskin leather. Built on Italian Margom vulcanized rubber soles with memory foam arch support.',
      specs: [
        'Full-Grain Italian Calfskin Nappa Leather',
        'Authentic Margom Italian Stitched Outsoles',
        'Removable Antimicrobial Memory Foam Insole',
        'Waxed 100% Egyptian Cotton Laces'
      ]
    },
    {
      id: 304,
      title: 'Element Storm-Proof 3-Layer Utility Parka',
      category: 'Clothing',
      price: 175.0,
      originalPrice: 220.0,
      rating: { rate: 4.7, count: 480 },
      badge: 'Weatherproof',
      stock: 8,
      colors: [
        { name: 'Slate Gray', hex: '#525964' },
        { name: 'Deep Forest', hex: '#263b2f' },
        { name: 'Raven Black', hex: '#191b1f' }
      ],
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      description: 'Engineered with a 3-layer breathable micro-porous membrane boasting a 20,000mm waterproof rating. Features fully taped seams, magnetic storm closure, and fleece-lined pockets.',
      specs: [
        '20,000mm Waterproof & 15,000g Breathability',
        'Fully Taped Seams with YKK AquaGuard Zippers',
        'Magnetic Quick-Snap Storm Closure',
        'Adjustable Ergonomic Storm Hood with Brim'
      ]
    },
    {
      id: 305,
      title: 'Coastline 450 GSM French Terry Pullover Hoodie',
      category: 'Clothing',
      price: 68.0,
      originalPrice: 85.0,
      rating: { rate: 4.8, count: 820 },
      badge: 'Popular',
      stock: 22,
      colors: [
        { name: 'Heather Gray', hex: '#a8adb4' },
        { name: 'Washed Onyx', hex: '#2b2d33' },
        { name: 'Sage Leaf', hex: '#7a8c7b' }
      ],
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      description: 'Knitted on vintage loopwheel machines using 450 GSM organic cotton loopback French terry. Double-lined crossover hood, flatlock reinforced seams, and ribbed side-gussets for unrestricted movement.',
      specs: [
        '450 GSM Vintage Loopback French Terry',
        'Pre-Washed for Zero Shrinkage and Supreme Softness',
        'Ribbed Side-Gussets for Comfort & Shape Retention',
        'Custom Gunmetal Aglets & Drawstring Eyelets'
      ]
    },
    {
      id: 306,
      title: 'Nomad Full-Grain Leather Weekender Duffle',
      category: 'Clothing',
      price: 210.0,
      originalPrice: 260.0,
      rating: { rate: 4.9, count: 395 },
      badge: 'Staff Pick',
      stock: 7,
      colors: [
        { name: 'Vintage Cognac', hex: '#874f26' },
        { name: 'Espresso Brown', hex: '#3d2616' },
        { name: 'Jet Black', hex: '#1c1d1f' }
      ],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      description: 'Crafted from 2.2mm thick vegetable-tanned leather that develops a rich, personal patina. Includes an external ventilated shoe compartment, padded 16" laptop sleeve, and solid brass hardware.',
      specs: [
        'Full-Grain Vegetable-Tanned Cowhide Leather',
        'TSA Carry-On Compliant 45L Capacity',
        'Isolated Ventilated Sneaker / Laundry Pocket',
        'Solid Cast Antiqued Brass Zippers & Clasp'
      ]
    },
    {
      id: 307,
      title: 'Riviera 100% Normandy Linen Camp Collar Shirt',
      category: 'Clothing',
      price: 52.0,
      originalPrice: 65.0,
      rating: { rate: 4.7, count: 430 },
      badge: 'Trending',
      stock: 17,
      colors: [
        { name: 'Natural Sand', hex: '#dfd7c5' },
        { name: 'Sky Azure', hex: '#9ec1d9' },
        { name: 'Olive Grove', hex: '#5b6951' }
      ],
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      description: 'Woven from long-staple French Normandy flax for maximum airflow and cooling in high heat. Finished with a relaxed Cuban camp collar and genuine Australian mother-of-pearl buttons.',
      specs: [
        '100% Pure Normandy Flax Linen',
        'Naturally Hypoallergenic & Thermoregulating',
        'Authentic Australian Mother-of-Pearl Buttons',
        'Relaxed Fit with Straight Hem and Side Splits'
      ]
    },
    {
      id: 401,
      title: 'Artisan Matte Ceramic Coffee Pour-Over Dripper',
      category: 'Lifestyle',
      price: 46.0,
      originalPrice: 58.0,
      rating: { rate: 4.9, count: 520 },
      badge: 'Best Seller',
      stock: 14,
      colors: [
        { name: 'Matte Charcoal', hex: '#31343b' },
        { name: 'Speckled Oat', hex: '#e3ddd2' }
      ],
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-thrown stoneware ceramic with precision interior spiral ridges designed to optimize water flow and unlock subtle floral coffee tasting notes. Includes double-walled glass carafe.',
      specs: [
        'Handmade Ceramic Stoneware with Matte Glaze',
        'Precision Spiral Channels for Optimum Brew Extraction',
        'Includes 600ml Borosilicate Glass Heat-Proof Server',
        'Compatible with Standard #02 Paper & Metal Filters'
      ]
    },
    {
      id: 402,
      title: 'Amber & Hinoki Smoked Wood Hand-Poured Candle',
      category: 'Lifestyle',
      price: 34.0,
      originalPrice: 42.0,
      rating: { rate: 4.8, count: 680 },
      badge: 'Staff Pick',
      stock: 20,
      colors: [
        { name: 'Amber Glass', hex: '#945423' },
        { name: 'Smoked Obsidian', hex: '#292b30' }
      ],
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-poured using 100% Midwestern soy wax scented with therapeutic essential oils. Notes of Japanese hinoki wood, warm golden amber resin, smoked cedar, and Bourbon vanilla.',
      specs: [
        '100% Natural Domestic Soy Wax Blend',
        '65+ Hours of Clean, Smoke-Free Burn Time',
        'FSC-Certified Crackling Natural Wood Wick',
        'Heavy Reusable Apothecary Amber Tumbler'
      ]
    },
    {
      id: 403,
      title: 'Lumos Precision Dimmable Brass Desk Lamp',
      category: 'Lifestyle',
      price: 78.0,
      originalPrice: 98.0,
      rating: { rate: 4.7, count: 310 },
      badge: 'Popular',
      stock: 9,
      colors: [
        { name: 'Brushed Brass', hex: '#c5a059' },
        { name: 'Matte Onyx', hex: '#26282b' }
      ],
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      description: 'Machined from solid brass with 360-degree rotational arm articulation. Features high CRI 97+ flicker-free warm LEDs with stepless touch capacitive dimming from 10% to 100%.',
      specs: [
        'Solid Machined Brass Base & Knurled Dials',
        'High CRI 97+ Museum Quality Natural Light',
        'Stepless Capacitive Touch Dimming Memory',
        'Integrated Qi Wireless Charging Pad on Base'
      ]
    },
    {
      id: 404,
      title: 'Vessel Thermo 750ml Vacuum Insulated Flask',
      category: 'Lifestyle',
      price: 32.0,
      originalPrice: 40.0,
      rating: { rate: 4.8, count: 890 },
      badge: 'Great Value',
      stock: 30,
      colors: [
        { name: 'Forest Green', hex: '#2a4436' },
        { name: 'Desert Sand', hex: '#d9ccb6' },
        { name: 'Matte Charcoal', hex: '#37393d' }
      ],
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      description: 'Triple-walled vacuum insulation with copper lining keeps beverages ice-cold for 24 hours or piping hot for 12 hours. Pure pro-grade 18/8 stainless steel prevents flavor transfer.',
      specs: [
        'Pro-Grade 18/8 Stainless Steel Interior',
        '24 Hours Cold · 12 Hours Piping Hot Insulation',
        '100% Leak-Proof Cap with Silicone Easy-Carry Loop',
        'Powder-Coated Sweat-Free Grip Surface'
      ]
    },
    {
      id: 405,
      title: 'Nordic Woven 100% Merino Wool Throw Blanket',
      category: 'Lifestyle',
      price: 89.0,
      originalPrice: 115.0,
      rating: { rate: 4.9, count: 420 },
      badge: 'Cozy',
      stock: 11,
      colors: [
        { name: 'Oatmeal Tweed', hex: '#d8d2c4' },
        { name: 'Slate Melange', hex: '#636b75' },
        { name: 'Forest Moss', hex: '#445348' }
      ],
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      description: 'Woven in Scandinavia from extra-fine 19.5 micron pure Australian merino wool. Exceptionally warm yet breathable, naturally odor-resistant, and finished with twisted hand-tied fringes.',
      specs: [
        '100% Extra-Fine 19.5 Micron Merino Wool',
        'Large 55" x 79" (140cm x 200cm) Throw Dimension',
        'Naturally Flame-Resistant & Stain-Repellent',
        'Hand-Twisted Edge Fringes'
      ]
    }
  ];

  // ==========================================================================
  // Application State
  // ==========================================================================
  let products = [...PRODUCTS];
  let cart = []; // [{ id, title, price, image, category, color, qty }]
  let wishlist = []; // [id]
  let activeCategory = 'All';
  let activePriceFilter = 'all';
  let searchQuery = '';
  let activeSort = 'featured';
  let activePromo = null; // { code, type, value, label }

  // Quick View selected state
  let qvSelectedColor = null;

  // ==========================================================================
  // Helper Utilities
  // ==========================================================================
  const $ = id => document.getElementById(id);
  const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const round2 = n => Math.round(n * 100) / 100;

  // Graceful fallback SVG generator if offline or image loading error
  function getFallbackSVG(title, category) {
    const bgGradient = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#g)"/>
      <circle cx="200" cy="180" r="80" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="6 6"/>
      <text x="200" y="190" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="28" font-weight="700">${esc(category)}</text>
      <text x="200" y="320" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="16" font-weight="600">${esc(title.substring(0, 24))}...</text>
      <text x="200" y="345" text-anchor="middle" fill="#64748b" font-family="system-ui, sans-serif" font-size="12">LUMEN &amp; CO. STUDIO</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // ==========================================================================
  // LocalStorage Persistence
  // ==========================================================================
  function saveState() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      /* storage quota exceeded or disabled */
    }
  }

  function loadState() {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      cart = Array.isArray(savedCart) ? savedCart : [];
      const savedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      wishlist = Array.isArray(savedWishlist) ? savedWishlist : [];
    } catch (e) {
      cart = [];
      wishlist = [];
    }
  }

  // ==========================================================================
  // Cart Financials & Operations
  // ==========================================================================
  function calculateFinancials() {
    const count = cart.reduce((n, item) => n + item.qty, 0);
    const subtotal = round2(cart.reduce((sum, item) => sum + item.price * item.qty, 0));

    // Calculate discount
    let discount = 0;
    if (activePromo) {
      if (activePromo.type === 'percent') {
        discount = round2(subtotal * activePromo.value);
      } else if (activePromo.type === 'fixed') {
        if (!activePromo.min || subtotal >= activePromo.min) {
          discount = Math.min(subtotal, activePromo.value);
        }
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = round2(discountedSubtotal * TAX_RATE);

    // Free shipping threshold or promo
    let shipping = 0;
    if (count > 0) {
      if (activePromo && activePromo.type === 'shipping') {
        shipping = 0;
      } else if (subtotal >= FREE_SHIPPING_OVER) {
        shipping = 0;
      } else {
        shipping = SHIPPING_FLAT;
      }
    }

    const total = round2(discountedSubtotal + tax + shipping);
    return { count, subtotal, discount, discountedSubtotal, tax, shipping, total };
  }

  function addToCart(id, qty = 1, chosenColor = null) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const color = chosenColor || (p.colors && p.colors[0] ? p.colors[0].name : 'Default');
    const existing = cart.find(x => x.id === id && x.color === color);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        category: p.category,
        color: color,
        qty: qty
      });
    }

    saveState();
    renderCart();
    bumpCartBadge();
    toast(`Added "${p.title.split(' ')[0]}" to cart`, 'View Cart', () => openCart());
  }

  function updateQuantity(id, color, delta) {
    const item = cart.find(x => x.id === id && x.color === color);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(x => !(x.id === id && x.color === color));
    }
    saveState();
    renderCart();
  }

  function removeFromCart(id, color) {
    cart = cart.filter(x => !(x.id === id && x.color === color));
    saveState();
    renderCart();
    toast('Item removed from cart');
  }

  function clearCart() {
    cart = [];
    activePromo = null;
    saveState();
    renderCart();
    toast('Cart cleared');
  }

  // ==========================================================================
  // Wishlist Operations
  // ==========================================================================
  function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    const p = products.find(x => x.id === id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      toast('Removed from wishlist');
    } else {
      wishlist.push(id);
      toast(`Saved "${p ? p.title.split(' ')[0] : 'Item'}" to wishlist`, 'View Saved', () => openWishlist());
    }
    saveState();
    updateWishlistBadge();
    renderGrid();
  }

  function updateWishlistBadge() {
    const badge = $('wishlistCount');
    if (badge) {
      badge.textContent = wishlist.length;
      badge.hidden = wishlist.length === 0;
    }
  }

  // ==========================================================================
  // Filter, Sort & Search Engine
  // ==========================================================================
  function getFilteredProducts() {
    const q = searchQuery.trim().toLowerCase();

    let list = products.filter(p => {
      // Category Filter
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;

      // Price Range Filter
      if (activePriceFilter === 'under50' && p.price >= 50) return false;
      if (activePriceFilter === '50-150' && (p.price < 50 || p.price > 150)) return false;
      if (activePriceFilter === 'over150' && p.price <= 150) return false;

      // Search Query
      if (q) {
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSpecs = p.specs && p.specs.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCat && !matchesDesc && !matchesSpecs) return false;
      }

      return true;
    });

    // Sort order
    if (activeSort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (activeSort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (activeSort === 'rating') list = [...list].sort((a, b) => b.rating.rate - a.rating.rate || b.rating.count - a.rating.count);
    if (activeSort === 'discount') {
      list = [...list].sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
    }

    return list;
  }

  // ==========================================================================
  // Rendering: Catalog & Cards
  // ==========================================================================
  function renderCategoryTabs() {
    const container = $('cats');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
      const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
      return `<button data-cat="${cat}" aria-pressed="${cat === activeCategory}">
        <span>${cat}</span>
        <span class="cat-count">${count}</span>
      </button>`;
    }).join('');

    // Sync top nav links
    document.querySelectorAll('[data-cat-nav]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.catNav === activeCategory);
    });
  }

  function renderActiveFilterChips() {
    const bar = $('activeFilterBar');
    const tagsContainer = $('filterTags');
    if (!bar || !tagsContainer) return;

    const chips = [];
    if (activeCategory !== 'All') {
      chips.push({ label: `Category: ${activeCategory}`, type: 'cat' });
    }
    if (activePriceFilter !== 'all') {
      const labelMap = { under50: 'Under $50', '50-150': '$50 – $150', over150: '$150+' };
      chips.push({ label: `Price: ${labelMap[activePriceFilter]}`, type: 'price' });
    }
    if (searchQuery.trim()) {
      chips.push({ label: `Search: "${searchQuery}"`, type: 'search' });
    }

    if (chips.length > 0) {
      bar.hidden = false;
      tagsContainer.innerHTML = chips.map(c => `
        <span class="filter-chip">
          <span>${esc(c.label)}</span>
          <button data-remove-filter="${c.type}" aria-label="Remove filter">✕</button>
        </span>
      `).join('');
    } else {
      bar.hidden = true;
      tagsContainer.innerHTML = '';
    }
  }

  function renderGrid() {
    const grid = $('grid');
    const resultCount = $('resultCount');
    if (!grid) return;

    const list = getFilteredProducts();

    if (resultCount) {
      if (searchQuery.trim()) {
        resultCount.textContent = `Found ${list.length} product${list.length === 1 ? '' : 's'} matching "${searchQuery}"`;
      } else {
        resultCount.textContent = `Showing ${list.length} curated product${list.length === 1 ? '' : 's'}`;
      }
    }

    renderActiveFilterChips();

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No products match your criteria</h3>
          <p>Try resetting filters, selecting another category, or adjusting your search terms.</p>
          <button class="btn btn-hero" id="resetEmptyBtn" style="margin-top:16px;">View All 24 Products</button>
        </div>
      `;
      const btn = $('resetEmptyBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          activeCategory = 'All';
          activePriceFilter = 'all';
          searchQuery = '';
          if ($('search')) $('search').value = '';
          if ($('searchClear')) $('searchClear').hidden = true;
          renderCategoryTabs();
          renderGrid();
        });
      }
      return;
    }

    grid.innerHTML = list.map((p, i) => {
      const isFav = wishlist.includes(p.id);
      const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
      const saveText = p.originalPrice ? `Save $${(p.originalPrice - p.price).toFixed(0)}` : '';
      const fallbackUrl = getFallbackSVG(p.title, p.category);

      const swatchesHTML = p.colors ? p.colors.map(c => `
        <span class="swatch-dot" style="background:${c.hex}" title="${esc(c.name)}"></span>
      `).join('') : '';

      return `
        <article class="card" style="--i:${Math.min(i, 12)}">
          <!-- Card Media Area -->
          <div class="card-media-wrap" data-view="${p.id}" tabindex="0" role="button" aria-label="View details for ${esc(p.title)}">
            ${p.badge ? `<span class="card-tag ${p.badge === 'Best Seller' ? 'tag-best-seller' : (p.badge.includes('Save') ? 'tag-save' : 'tag-staff')}">${p.badge}</span>` : ''}
            
            <button class="card-wishlist ${isFav ? 'active' : ''}" data-wishlist="${p.id}" aria-label="${isFav ? 'Remove from wishlist' : 'Save to wishlist'}">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>

            <img class="card-img-primary" src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'">
            ${p.secondaryImage ? `<img class="card-img-secondary" src="${esc(p.secondaryImage)}" alt="${esc(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'">` : ''}

            <span class="card-quick-view">Quick View 👁️</span>
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <div class="card-meta-row">
              <span class="card-cat">${p.category}</span>
              <span class="card-stock-hint ${p.stock <= 5 ? 'stock-low' : 'stock-ok'}">
                ${p.stock <= 5 ? `Only ${p.stock} left!` : 'In Stock'}
              </span>
            </div>

            <h3 class="card-title" title="${esc(p.title)}">${esc(p.title)}</h3>

            <!-- Rating Stars -->
            <div class="rating-row">
              <div class="star-rating" aria-label="${p.rating.rate} out of 5 stars">
                <i style="width:${(p.rating.rate / 5) * 100}%"></i>
              </div>
              <span class="rating-count">(${p.rating.count})</span>
            </div>

            <!-- Color Swatches -->
            ${swatchesHTML ? `<div class="card-swatches">${swatchesHTML}</div>` : ''}

            <!-- Card Foot -->
            <div class="card-foot">
              <div class="price-wrap">
                <strong class="price-main">${money(p.price)}</strong>
                ${p.originalPrice ? `
                  <div class="price-orig-wrap">
                    <span class="price-orig">${money(p.originalPrice)}</span>
                    <span class="price-save-tag">-${discountPercent}%</span>
                  </div>
                ` : ''}
              </div>

              <button class="btn-add-cart" data-add="${p.id}" aria-label="Add ${esc(p.title)} to cart">
                Add to cart
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ==========================================================================
  // Rendering: Hero Flagship Showcase
  // ==========================================================================
  function renderHero() {
    const heroVisual = $('heroVisual');
    if (!heroVisual) return;

    const flagship = products[0]; // Aura Pro Headphones
    const pill1 = products[1]; // Smart Watch
    const pill2 = products[6]; // Gold Ring

    heroVisual.innerHTML = `
      <!-- Flagship Showcase Card -->
      <div class="hero-card">
        <div class="hero-card-img-wrap" data-view="${flagship.id}" tabindex="0" role="button">
          <span class="hero-card-tag">Featured Drop</span>
          <img src="${esc(flagship.image)}" alt="${esc(flagship.title)}" loading="eager" onerror="this.onerror=null;this.src='${getFallbackSVG(flagship.title, flagship.category)}'">
        </div>
        <div class="hero-card-body">
          <span class="hero-card-cat">${flagship.category}</span>
          <h3 class="hero-card-title">${esc(flagship.title)}</h3>
          <div class="rating-row">
            <span class="stars-gold">★★★★★</span>
            <strong>${flagship.rating.rate}</strong>
            <span class="rating-count">(${flagship.rating.count} reviews)</span>
          </div>
          <div class="hero-card-foot">
            <div class="hero-card-price">
              <span class="current">${money(flagship.price)}</span>
              <span class="orig">${money(flagship.originalPrice)}</span>
            </div>
            <button class="hero-card-btn" data-add="${flagship.id}">Add to Cart</button>
          </div>
        </div>
      </div>

      <!-- Floating Micro Badges -->
      <div class="hero-floating-pill hero-pill-1" data-view="${pill1.id}" tabindex="0" role="button">
        <img class="hero-pill-thumb" src="${esc(pill1.image)}" alt="">
        <div>
          <strong>${pill1.title.split(' ')[0]} ${pill1.title.split(' ')[1]}</strong>
          <div style="color:var(--muted);font-size:0.75rem">${money(pill1.price)} · ★ ${pill1.rating.rate}</div>
        </div>
      </div>

      <div class="hero-floating-pill hero-pill-2" data-view="${pill2.id}" tabindex="0" role="button">
        <img class="hero-pill-thumb" src="${esc(pill2.image)}" alt="">
        <div>
          <strong>${pill2.title.split(' ')[1]} ${pill2.title.split(' ')[2]}</strong>
          <div style="color:var(--muted);font-size:0.75rem">${money(pill2.price)} · Fine Jewelry</div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // Rendering: Slide-Out Cart Drawer
  // ==========================================================================
  function renderCart() {
    const t = calculateFinancials();

    // Badges
    const badge = $('cartCount');
    if (badge) badge.textContent = t.count;

    const drawerCount = $('drawerCount');
    if (drawerCount) drawerCount.textContent = t.count ? `(${t.count})` : '';

    const list = $('cartList');
    const drawerFoot = $('drawerFoot');
    const shipBox = $('shipBox');

    if (!cart.length) {
      if (list) {
        list.innerHTML = `
          <li class="cart-empty-state">
            <div class="cart-empty-icon">🛍️</div>
            <strong>Your bag is empty</strong>
            <p>Discover everyday essentials and luxury additions in our curated collection.</p>
            <button class="btn btn-hero" id="emptyCartShopBtn" style="margin-top:16px;">Explore Collection</button>
          </li>
        `;
        const btn = $('emptyCartShopBtn');
        if (btn) btn.addEventListener('click', () => closeCart());
      }
      if (drawerFoot) drawerFoot.hidden = true;
      if (shipBox) shipBox.innerHTML = '';
      return;
    }

    if (drawerFoot) drawerFoot.hidden = false;

    // Free Shipping Progress Meter
    if (shipBox) {
      const left = FREE_SHIPPING_OVER - t.subtotal;
      const progressPercent = Math.min(100, (t.subtotal / FREE_SHIPPING_OVER) * 100);

      shipBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;font-weight:600;">
          <span>${left > 0 ? `Add <strong>${money(left)}</strong> more for <strong>Free Express Shipping</strong>` : '<strong style="color:var(--ok)">🎉 You unlocked Free Express Shipping!</strong>'}</span>
          <span>${Math.round(progressPercent)}%</span>
        </div>
        <div class="ship-bar-wrap">
          <div class="ship-bar-fill" style="width:${progressPercent}%"></div>
        </div>
      `;
    }

    // Cart Items
    if (list) {
      list.innerHTML = cart.map(item => `
        <li class="cart-item">
          <div class="cart-thumb">
            <img src="${esc(item.image)}" alt="${esc(item.title)}" onerror="this.onerror=null;this.src='${getFallbackSVG(item.title, item.category)}'">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${esc(item.title)}</h4>
            <div class="cart-item-variant">Color: ${esc(item.color)}</div>
            <div class="cart-item-price">${money(item.price)} each</div>
            <div class="cart-stepper">
              <button data-dec="${item.id}" data-color="${esc(item.color)}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button data-inc="${item.id}" data-color="${esc(item.color)}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-item-side">
            <strong class="cart-item-subtotal">${money(item.price * item.qty)}</strong>
            <button class="cart-item-remove" data-remove="${item.id}" data-color="${esc(item.color)}">Remove</button>
          </div>
        </li>
      `).join('');
    }

    // Financial Totals
    if ($('subtotal')) $('subtotal').textContent = money(t.subtotal);
    if ($('tax')) $('tax').textContent = money(t.tax);
    if ($('shipping')) $('shipping').textContent = t.shipping === 0 ? 'Free' : money(t.shipping);
    if ($('total')) $('total').textContent = money(t.total);

    // Discount line
    const discountRow = $('discountRow');
    if (discountRow) {
      if (t.discount > 0 && activePromo) {
        discountRow.hidden = false;
        $('discountTag').textContent = activePromo.label;
        $('discount').textContent = `-${money(t.discount)}`;
      } else {
        discountRow.hidden = true;
      }
    }

    // Estimated Delivery Date (3 business days ahead)
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const dateFormatted = estDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if ($('estDateText')) $('estDateText').textContent = dateFormatted;
  }

  // ==========================================================================
  // Drawer Toggling
  // ==========================================================================
  function openCart() {
    const drawer = $('drawer');
    const overlay = $('overlay');
    if (!drawer || !overlay) return;
    drawer.inert = false;
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    $('closeCart').focus();
  }

  function closeCart() {
    const drawer = $('drawer');
    const overlay = $('overlay');
    if (!drawer || !overlay) return;
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    drawer.inert = true;
    document.body.style.overflow = '';
  }

  function bumpCartBadge() {
    const b = $('cartCount');
    if (!b) return;
    b.classList.remove('bump');
    void b.offsetWidth;
    b.classList.add('bump');
  }

  // ==========================================================================
  // Quick View Modal Gallery & Dialog
  // ==========================================================================
  function openQuickView(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    qvSelectedColor = p.colors && p.colors[0] ? p.colors[0].name : 'Default';

    const dlg = $('viewDialog');
    if (!dlg) return;

    const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    const isFav = wishlist.includes(p.id);

    const thumbnails = [p.image];
    if (p.secondaryImage && p.secondaryImage !== p.image) thumbnails.push(p.secondaryImage);

    dlg.innerHTML = `
      <button class="dlg-close" data-close aria-label="Close dialog">✕</button>
      <div class="view-layout">
        <!-- Gallery Side -->
        <div class="view-gallery">
          <div class="view-main-img-wrap">
            <img id="qvMainImg" src="${esc(p.image)}" alt="${esc(p.title)}" onerror="this.onerror=null;this.src='${getFallbackSVG(p.title, p.category)}'">
          </div>
          ${thumbnails.length > 1 ? `
            <div class="view-thumbs">
              ${thumbnails.map((src, idx) => `
                <button class="view-thumb-btn ${idx === 0 ? 'active' : ''}" data-thumb-src="${esc(src)}">
                  <img src="${esc(src)}" alt="">
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Details Side -->
        <div class="view-details">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="card-cat">${p.category}</span>
            <span class="card-stock-hint ${p.stock <= 5 ? 'stock-low' : 'stock-ok'}">
              ● ${p.stock <= 5 ? `Only ${p.stock} left in stock` : 'In Stock · Ready to dispatch'}
            </span>
          </div>

          <h2>${esc(p.title)}</h2>

          <div class="rating-row">
            <div class="star-rating">
              <i style="width:${(p.rating.rate / 5) * 100}%"></i>
            </div>
            <strong>${p.rating.rate}</strong>
            <span class="rating-count">(${p.rating.count} verified reviews)</span>
          </div>

          <div class="view-price-row">
            <strong class="price">${money(p.price)}</strong>
            ${p.originalPrice ? `<span class="orig">${money(p.originalPrice)}</span>` : ''}
            ${discountPercent > 0 ? `<span class="price-save-tag">Save ${discountPercent}%</span>` : ''}
          </div>

          <p class="view-desc">${esc(p.description)}</p>

          <!-- Specifications Bullet List -->
          ${p.specs ? `
            <ul class="view-specs">
              ${p.specs.map(spec => `<li>${esc(spec)}</li>`).join('')}
            </ul>
          ` : ''}

          <!-- Color Swatch Selection -->
          ${p.colors ? `
            <div>
              <div class="variant-picker-title">Color: <strong id="qvColorLabel">${esc(qvSelectedColor)}</strong></div>
              <div class="color-options">
                ${p.colors.map((c, i) => `
                  <button class="color-opt-btn ${i === 0 ? 'active' : ''}" data-qv-color="${esc(c.name)}">
                    <span class="color-opt-swatch" style="background:${c.hex}"></span>
                    <span>${esc(c.name)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- CTAs -->
          <div class="view-cta-row">
            <button class="btn btn-add" id="qvAddToCartBtn" data-add="${p.id}">
              Add to Cart · ${money(p.price)}
            </button>
            <button class="nav-icon-btn ${isFav ? 'active' : ''}" id="qvWishlistBtn" data-wishlist="${p.id}" aria-label="Save to Wishlist" style="width:48px;height:48px;">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>

          <div class="view-guarantees">
            <div>⚡ Free 2-Day Shipping</div>
            <div>🔄 30-Day Free Trial</div>
            <div>🛡️ 2-Year Warranty</div>
          </div>
        </div>
      </div>
    `;

    dlg.showModal();

    // Thumbnails click
    dlg.querySelectorAll('[data-thumb-src]').forEach(thumb => {
      thumb.addEventListener('click', e => {
        dlg.querySelectorAll('.view-thumb-btn').forEach(b => b.classList.remove('active'));
        thumb.classList.add('active');
        $('qvMainImg').src = thumb.dataset.thumbSrc;
      });
    });

    // Color options click
    dlg.querySelectorAll('[data-qv-color]').forEach(opt => {
      opt.addEventListener('click', () => {
        dlg.querySelectorAll('.color-opt-btn').forEach(b => b.classList.remove('active'));
        opt.classList.add('active');
        qvSelectedColor = opt.dataset.qvColor;
        $('qvColorLabel').textContent = qvSelectedColor;
      });
    });

    // Add to cart inside quick view
    $('qvAddToCartBtn').addEventListener('click', () => {
      addToCart(p.id, 1, qvSelectedColor);
      dlg.close();
    });
  }

  // ==========================================================================
  // Realistic Multi-Step Checkout Modal
  // ==========================================================================
  function openCheckout() {
    if (!cart.length) return;
    const t = calculateFinancials();
    const dlg = $('checkoutDialog');
    if (!dlg) return;

    dlg.innerHTML = `
      <div class="co-wrap">
        <button class="dlg-close" data-close aria-label="Close checkout">✕</button>
        <h2>Express Checkout</h2>
        <div class="co-steps-bar">
          <div class="co-step-pill active"><span class="co-step-num">1</span> Shipping Details</div>
          <span class="sep">•</span>
          <div class="co-step-pill active"><span class="co-step-num">2</span> Payment & Review</div>
        </div>

        <div class="co-grid">
          <!-- Form Section -->
          <form class="co-form" id="checkoutForm">
            <h3>Contact Information</h3>
            <label class="co-label">
              Email Address
              <input class="co-input" name="email" type="email" required placeholder="alex@example.com" autocomplete="email">
            </label>

            <h3 style="margin-top:12px;">Shipping Address</h3>
            <div class="co-row-2">
              <label class="co-label">
                First Name
                <input class="co-input" name="firstName" required placeholder="Alex" autocomplete="given-name">
              </label>
              <label class="co-label">
                Last Name
                <input class="co-input" name="lastName" required placeholder="Morgan" autocomplete="family-name">
              </label>
            </div>

            <label class="co-label">
              Street Address
              <input class="co-input" name="address" required placeholder="124 Mercer St, Apt 4B" autocomplete="street-address">
            </label>

            <div class="co-row-3">
              <label class="co-label">
                City
                <input class="co-input" name="city" required placeholder="New York" autocomplete="address-level2">
              </label>
              <label class="co-label">
                State
                <input class="co-input" name="state" required placeholder="NY" autocomplete="address-level1">
              </label>
              <label class="co-label">
                Postal Code
                <input class="co-input" name="zip" required placeholder="10012" autocomplete="postal-code">
              </label>
            </div>

            <h3 style="margin-top:14px;">Payment Method</h3>
            <div class="payment-methods-tabs">
              <button type="button" class="pay-tab active" data-pay-method="card">Credit Card</button>
              <button type="button" class="pay-tab" data-pay-method="apple">Apple Pay</button>
              <button type="button" class="pay-tab" data-pay-method="paypal">PayPal</button>
            </div>

            <div id="cardFields">
              <label class="co-label">
                Card Number
                <div class="card-number-wrap">
                  <input class="co-input" id="coCardNum" required placeholder="4532 •••• •••• 8890" maxlength="19">
                  <span class="card-brand-icon" id="cardBrandTag">VISA</span>
                </div>
              </label>

              <div class="co-row-2" style="margin-top:10px;">
                <label class="co-label">
                  Expiration Date
                  <input class="co-input" required placeholder="MM / YY" maxlength="7">
                </label>
                <label class="co-label">
                  Security Code (CVV)
                  <input class="co-input" required placeholder="123" maxlength="4">
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-checkout" id="submitOrderBtn" style="margin-top:18px;">
              Pay ${money(t.total)} & Place Order
            </button>
            <p style="text-align:center;font-size:0.75rem;color:var(--muted);margin-top:8px;">
              🔒 256-Bit Bank Grade SSL Encryption · Demo Checkout
            </p>
          </form>

          <!-- Order Summary Sidebar -->
          <div class="co-summary">
            <h3>Order Summary (${t.count} items)</h3>
            <ul class="co-item-mini-list">
              ${cart.map(item => `
                <li class="co-item-mini">
                  <div class="co-mini-thumb">
                    <img src="${esc(item.image)}" alt="">
                  </div>
                  <div class="co-mini-title">
                    <div>${esc(item.title)}</div>
                    <div class="co-mini-qty">Qty: ${item.qty} · ${esc(item.color)}</div>
                  </div>
                  <strong>${money(item.price * item.qty)}</strong>
                </li>
              `).join('')}
            </ul>

            <ul class="co-breakdown">
              <li><span>Subtotal</span><span>${money(t.subtotal)}</span></li>
              ${t.discount > 0 ? `<li style="color:var(--ok)"><span>Promo Discount</span><span>-${money(t.discount)}</span></li>` : ''}
              <li><span>Estimated Tax (8%)</span><span>${money(t.tax)}</span></li>
              <li><span>Express Shipping</span><span>${t.shipping === 0 ? 'Free' : money(t.shipping)}</span></li>
              <li class="total-row"><span>Total</span><span>${money(t.total)}</span></li>
            </ul>
          </div>
        </div>
      </div>
    `;

    closeCart();
    dlg.showModal();

    // Auto-spacing for card number input
    const cardInput = $('coCardNum');
    if (cardInput) {
      cardInput.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '');
        val = val.substring(0, 16);
        const parts = val.match(/[\s\S]{1,4}/g) || [];
        e.target.value = parts.join(' ');

        // Brand detection
        const brand = $('cardBrandTag');
        if (brand) {
          if (val.startsWith('4')) brand.textContent = 'VISA';
          else if (val.startsWith('5')) brand.textContent = 'MC';
          else if (val.startsWith('3')) brand.textContent = 'AMEX';
          else brand.textContent = 'CARD';
        }
      });
    }

    // Payment tab toggling
    dlg.querySelectorAll('.pay-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        dlg.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cardFields = $('cardFields');
        if (cardFields) {
          cardFields.style.opacity = tab.dataset.payMethod === 'card' ? '1' : '0.4';
          cardFields.style.pointerEvents = tab.dataset.payMethod === 'card' ? 'auto' : 'none';
        }
      });
    });

    // Form submission & simulated confirmation
    $('checkoutForm').addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = $('submitOrderBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing Secure Payment... ⏳';
      }

      setTimeout(() => {
        const formData = new FormData(e.target);
        const firstName = formData.get('firstName') || 'Valued Customer';
        const email = formData.get('email') || 'your email';
        const orderId = 'LMN-2026-' + Math.floor(100000 + Math.random() * 900000);
        const trackingNo = 'TRK-' + Math.floor(10000000 + Math.random() * 90000000) + 'US';
        const paidTotal = t.total;

        cart = [];
        activePromo = null;
        saveState();
        renderCart();

        dlg.innerHTML = `
          <div class="co-done">
            <div class="co-done-check">
              <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
            </div>
            <h2>Order Confirmed!</h2>
            <p>Thank you, <strong>${esc(firstName)}</strong>. We have received your order and sent a receipt and shipment confirmation to <strong>${esc(email)}</strong>.</p>
            <div class="co-order-badge">Order ID: ${orderId}</div>
            <p style="font-size:0.88rem;color:var(--muted);margin-bottom:20px;">
              Tracking Number: <strong>${trackingNo}</strong> · Carrier: DHL Express (2-Day Guaranteed)
            </p>
            <div class="co-done-actions">
              <button class="btn btn-hero" data-close>Continue Shopping</button>
              <button class="btn btn-hero-secondary" onclick="window.print()">Print Order Receipt</button>
            </div>
          </div>
        `;
      }, 700);
    });
  }

  // ==========================================================================
  // Wishlist Modal
  // ==========================================================================
  function openWishlist() {
    const dlg = $('wishlistDialog');
    if (!dlg) return;

    const savedProducts = products.filter(p => wishlist.includes(p.id));

    dlg.innerHTML = `
      <div class="wishlist-wrap">
        <button class="dlg-close" data-close aria-label="Close wishlist">✕</button>
        <h2>Your Saved Wishlist (${savedProducts.length})</h2>

        ${!savedProducts.length ? `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">♡</div>
            <strong>Your wishlist is empty</strong>
            <p>Tap the heart on any product to save items you love for later.</p>
            <button class="btn btn-hero" data-close style="margin-top:14px;">Browse Collection</button>
          </div>
        ` : `
          <ul class="wishlist-list">
            ${savedProducts.map(p => `
              <li class="wishlist-item">
                <div class="wishlist-thumb">
                  <img src="${esc(p.image)}" alt="${esc(p.title)}" onerror="this.onerror=null;this.src='${getFallbackSVG(p.title, p.category)}'">
                </div>
                <div>
                  <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:4px;">${esc(p.title)}</h4>
                  <div style="color:var(--muted);font-size:0.82rem;">${p.category} · ${money(p.price)}</div>
                </div>
                <button class="btn btn-nl" data-add="${p.id}">Move to Cart</button>
                <button class="icon-btn" data-remove-wishlist="${p.id}" aria-label="Remove from wishlist">✕</button>
              </li>
            `).join('')}
          </ul>
        `}
      </div>
    `;

    dlg.showModal();

    dlg.querySelectorAll('[data-remove-wishlist]').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleWishlist(Number(btn.dataset.removeWishlist));
        openWishlist();
      });
    });
  }

  // ==========================================================================
  // Information Dialog (Policies / FAQ / Concierge)
  // ==========================================================================
  function openInfoModal(title, content) {
    const dlg = $('infoDialog');
    if (!dlg) return;
    dlg.innerHTML = `
      <div class="info-wrap">
        <button class="dlg-close" data-close aria-label="Close dialog">✕</button>
        <h2>${esc(title)}</h2>
        <div>${content}</div>
        <button class="btn btn-hero" data-close style="margin-top:20px;">Got It</button>
      </div>
    `;
    dlg.showModal();
  }

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================
  function toast(message, actionLabel = null, actionCallback = null) {
    const zone = $('toasts');
    if (!zone) return;

    const node = document.createElement('div');
    node.className = 'toast';
    node.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${esc(message)}</span>
      ${actionLabel ? `<span class="toast-action" tabindex="0">${esc(actionLabel)}</span>` : ''}
    `;

    if (actionLabel && actionCallback) {
      node.querySelector('.toast-action').addEventListener('click', () => {
        actionCallback();
        node.remove();
      });
    }

    zone.appendChild(node);
    setTimeout(() => {
      if (node.parentElement) node.remove();
    }, 2800);
  }

  // ==========================================================================
  // Event Listeners & Interactive Handlers
  // ==========================================================================
  function setupEvents() {
    // Category Filtering
    $('cats').addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      renderCategoryTabs();
      renderGrid();
    });

    // Top Navigation Category Links
    document.querySelectorAll('[data-cat-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.catNav;
        renderCategoryTabs();
        renderGrid();
        const shopElem = $('shop');
        if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Footer Jump Links
    document.querySelectorAll('[data-cat-jump]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        activeCategory = link.dataset.catJump;
        renderCategoryTabs();
        renderGrid();
        const shopElem = $('shop');
        if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Price Filter
    $('priceFilter').addEventListener('change', e => {
      activePriceFilter = e.target.value;
      renderGrid();
    });

    // Sort Dropdown
    $('sort').addEventListener('change', e => {
      activeSort = e.target.value;
      renderGrid();
    });

    // Live Search
    const searchInput = $('search');
    const searchClear = $('searchClear');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        if (searchClear) searchClear.hidden = !searchQuery.trim();
        renderGrid();
      });
    }
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.hidden = true;
        renderGrid();
        searchInput.focus();
      });
    }

    // Reset Filters Chips
    const activeFilterBar = $('activeFilterBar');
    if (activeFilterBar) {
      activeFilterBar.addEventListener('click', e => {
        const btn = e.target.closest('[data-remove-filter]');
        if (btn) {
          const type = btn.dataset.removeFilter;
          if (type === 'cat') activeCategory = 'All';
          if (type === 'price') activePriceFilter = 'all';
          if (type === 'search') {
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            if (searchClear) searchClear.hidden = true;
          }
          renderCategoryTabs();
          renderGrid();
          return;
        }

        if (e.target.id === 'clearAllFilters') {
          activeCategory = 'All';
          activePriceFilter = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          if (searchClear) searchClear.hidden = true;
          renderCategoryTabs();
          renderGrid();
        }
      });
    }

    // Grid Delegation (Add to Cart, View Details, Wishlist)
    $('grid').addEventListener('click', e => {
      // Add to Cart
      const addBtn = e.target.closest('[data-add]');
      if (addBtn) {
        e.stopPropagation();
        const id = Number(addBtn.dataset.add);
        addToCart(id, 1);
        addBtn.classList.add('added');
        addBtn.textContent = 'Added ✓';
        setTimeout(() => {
          addBtn.classList.remove('added');
          addBtn.textContent = 'Add to cart';
        }, 1100);
        return;
      }

      // Wishlist Heart
      const wishBtn = e.target.closest('[data-wishlist]');
      if (wishBtn) {
        e.stopPropagation();
        toggleWishlist(Number(wishBtn.dataset.wishlist));
        return;
      }

      // Quick View Modal
      const viewBtn = e.target.closest('[data-view]');
      if (viewBtn) {
        openQuickView(Number(viewBtn.dataset.view));
      }
    });

    // Hero Visual Delegation
    const heroVisual = $('heroVisual');
    if (heroVisual) {
      heroVisual.addEventListener('click', e => {
        const addBtn = e.target.closest('[data-add]');
        if (addBtn) {
          addToCart(Number(addBtn.dataset.add), 1);
          return;
        }
        const viewElem = e.target.closest('[data-view]');
        if (viewElem) {
          openQuickView(Number(viewElem.dataset.view));
        }
      });
    }

    // Hero Featured CTA button
    const heroFeaturedBtn = $('heroFeaturedBtn');
    if (heroFeaturedBtn) {
      heroFeaturedBtn.addEventListener('click', () => openQuickView(products[0].id));
    }

    // Cart Steppers & Removals
    $('cartList').addEventListener('click', e => {
      const incBtn = e.target.closest('[data-inc]');
      if (incBtn) {
        updateQuantity(Number(incBtn.dataset.inc), incBtn.dataset.color, 1);
        return;
      }
      const decBtn = e.target.closest('[data-dec]');
      if (decBtn) {
        updateQuantity(Number(decBtn.dataset.dec), decBtn.dataset.color, -1);
        return;
      }
      const remBtn = e.target.closest('[data-remove]');
      if (remBtn) {
        removeFromCart(Number(remBtn.dataset.remove), remBtn.dataset.color);
      }
    });

    // Cart Drawer Open/Close
    $('openCart').addEventListener('click', openCart);
    $('closeCart').addEventListener('click', closeCart);
    $('overlay').addEventListener('click', closeCart);
    $('clearCart').addEventListener('click', clearCart);
    $('checkoutBtn').addEventListener('click', openCheckout);

    // Wishlist Open
    $('wishlistBtn').addEventListener('click', openWishlist);

    // Promo Code Application
    const promoForm = $('promoForm');
    if (promoForm) {
      promoForm.addEventListener('submit', e => {
        e.preventDefault();
        const code = $('promoInput').value.trim().toUpperCase();
        const status = $('promoStatus');
        if (!code) return;

        if (PROMO_CODES[code]) {
          activePromo = { code, ...PROMO_CODES[code] };
          status.hidden = false;
          status.className = 'promo-status ok';
          status.textContent = `Promo "${code}" applied: ${activePromo.label}`;
          renderCart();
          toast(`Promo code "${code}" applied!`);
        } else {
          status.hidden = false;
          status.className = 'promo-status err';
          status.textContent = `Invalid promo code. Try WELCOME15 or SAVE20.`;
        }
      });
    }

    // Newsletter Submission
    const nlForm = $('newsletterForm');
    if (nlForm) {
      nlForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = $('nlEmail').value;
        $('nlEmail').value = '';
        toast(`Thank you! 15% promo code sent to ${email}`);
      });
    }

    // Dialog Backdrop & Close Buttons
    [$('viewDialog'), $('checkoutDialog'), $('wishlistDialog'), $('infoDialog')].forEach(dlg => {
      if (!dlg) return;
      dlg.addEventListener('click', e => {
        if (e.target === dlg || e.target.closest('[data-close]')) {
          dlg.close();
        }
      });
    });

    // Escape Key to close Cart
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && $('drawer').classList.contains('open')) {
        closeCart();
      }
    });

    // Information & Policy Links
    const infoMap = {
      topHelpLink: {
        title: 'Customer Concierge & FAQ',
        content: '<p>Our dedicated customer concierge is available 24/7 to assist with sizing advice, gift curation, order status inquiries, and corporate orders.</p><p>Contact: <strong>concierge@lumenandco.com</strong> or call <strong>+1 (800) 586-3626</strong>.</p>'
      },
      trackOrderLink: {
        title: 'Track Your Package',
        content: '<p>All Lumen & Co. orders are dispatched via DHL Express with signature confirmation.</p><p>Enter your 9-digit Order ID (e.g., LMN-2026-XXXXXX) or carrier tracking number in our carrier tracking portal to view real-time GPS telemetry.</p>'
      },
      shippingPolicyLink: {
        title: 'Shipping & Delivery Policy',
        content: '<p><strong>Free Express Shipping:</strong> Included on all orders over $75 within the US and globally to 48 countries.</p><p>Orders placed before 2:00 PM EST ship the same business day. Typical transit duration is 2-3 business days.</p>'
      },
      returnsPolicyLink: {
        title: '30-Day Risk-Free Returns',
        content: '<p>We want you to love everything you purchase from Lumen & Co. If you are not completely satisfied, return items within 30 days of delivery in original condition for a 100% full refund.</p><p>Every order package includes a prepaid return shipping label.</p>'
      },
      warrantyPolicyLink: {
        title: '2-Year Comprehensive Warranty',
        content: '<p>All electronics, watches, and hardware items are protected by our full 2-Year Replacement Warranty against manufacturing defects, battery degradation, and mechanical failure.</p><p>No registration required; your order ID serves as your proof of coverage.</p>'
      },
      contactSupportLink: {
        title: 'Contact Customer Support',
        content: '<p>Our studio team is based in New York, Copenhagen, and Tokyo. Reach out anytime at <strong>support@lumenandco.com</strong> or chat with our live concierge during studio hours (9am - 8pm EST).</p>'
      }
    };

    Object.keys(infoMap).forEach(elemId => {
      const el = $(elemId);
      if (el) {
        el.addEventListener('click', e => {
          e.preventDefault();
          openInfoModal(infoMap[elemId].title, infoMap[elemId].content);
        });
      }
    });
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================
  function init() {
    loadState();
    renderCategoryTabs();
    updateWishlistBadge();
    renderHero();
    renderGrid();
    renderCart();
    setupEvents();
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
