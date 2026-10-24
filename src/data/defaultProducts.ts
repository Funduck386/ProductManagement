import type { Product } from '../types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Sony Noise-Canceling Headphones',
    category: 'Audio',
    price: 399,
    inventory: 12,
    quantity: 0,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description:
      'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI and DSEE Extreme. Up to 30-hour battery life with quick charging for all-day listening comfort.',
    specification:
      'Acoustic Design: Closed Back | Frequency Response: 4Hz-40,000Hz | Drivers: 40mm Dome | Battery Life: Up to 30 Hours | Connectivity: Bluetooth 5.2 & 3.5mm Aux | Weight: 254g',
    isFeatured: true,
  },
  {
    id: 'prod-2',
    name: 'Bose SoundLink Flex Speaker',
    category: 'Audio',
    price: 149,
    inventory: 14,
    quantity: 0,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    description:
      'Clear, deep sound and powerful bass wherever life takes you. Engineered with PositionIQ technology that automatically optimizes sound orientation.',
    specification:
      'Waterproof: IP67 dustproof and waterproof | Battery Life: Up to 12 hours | Port: USB-C charging | Wireless Range: 30 feet | Material: Steel grille & silicone exterior',
    isFeatured: false,
  },
  {
    id: 'prod-3',
    name: 'JBL Tune 520BT Wireless Headphones',
    category: 'Audio',
    price: 59,
    inventory: 20,
    quantity: 0,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1592314322681-6e166c47b80b?auto=format&fit=crop&w=600&q=80',
    description:
      'Pure bass sound in an on-ear wireless design with up to 57 hours of playtime and fast charging that gives 3 hours from a 5-minute charge.',
    specification:
      'Driver: 32mm dynamic | Battery: Up to 57 hours | Connectivity: Bluetooth 5.3 | Charging: USB-C | Weight: 157g',
    isFeatured: false,
  },
  {
    id: 'prod-4',
    name: 'Sennheiser Momentum 4 Wireless',
    category: 'Audio',
    price: 349,
    inventory: 7,
    quantity: 0,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977496f56?auto=format&fit=crop&w=600&q=80',
    description:
      'Audiophile-grade wireless headphones with adaptive noise cancellation, transparent hearing, and up to 60 hours of playback.',
    specification:
      'Driver: 42mm dynamic | ANC: Adaptive | Battery: Up to 60 hours | Connectivity: Bluetooth 5.2 | Weight: 293g',
    isFeatured: false,
  },
  {
    id: 'prod-5',
    name: 'Anker Soundcore Life Q30',
    category: 'Audio',
    price: 79,
    inventory: 15,
    quantity: 0,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1618365701880-80905e1e8b2e?auto=format&fit=crop&w=600&q=80',
    description:
      'Hybrid active noise canceling over-ear headphones with 40-hour playtime, Hi-Res audio, and a comfortable pressure-free fit.',
    specification:
      'Driver: 40mm composite | ANC: Hybrid | Battery: Up to 40 hours | Connectivity: Bluetooth 5.0 | Weight: 252g',
    isFeatured: false,
  },
  {
    id: 'prod-6',
    name: 'Apple Watch Series 9 GPS',
    category: 'Wearables',
    price: 429,
    inventory: 4,
    quantity: 0,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description:
      'Smarter, brighter, mightier. The most powerful chip in Apple Watch ever. A magical new way to use your watch without touching the screen with Double Tap gesture and on-device Siri.',
    specification:
      'Display: Always-On Retina OLED (2000 nits) | Chip: S9 SiP with 64-bit dual-core | Water Resistance: 50m | Sensors: Blood Oxygen, ECG, Temperature, Crash Detection | Battery: Up to 18 hours',
    isFeatured: true,
  },
  {
    id: 'prod-7',
    name: 'Samsung Galaxy Watch 6',
    category: 'Wearables',
    price: 299,
    inventory: 9,
    quantity: 0,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3be5e4e6a2d6?auto=format&fit=crop&w=600&q=80',
    description:
      'A sleek smartwatch with advanced sleep coaching, body composition analysis, and heart rate monitoring in a refined aluminum case.',
    specification:
      'Display: Super AMOLED | Processor: Exynos W930 | Water Resistance: 5ATM | Sensors: Heart rate, ECG, BIA | Battery: Up to 30 hours',
    isFeatured: false,
  },
  {
    id: 'prod-8',
    name: 'Fitbit Charge 6',
    category: 'Wearables',
    price: 159,
    inventory: 11,
    quantity: 0,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    description:
      'A connected fitness tracker with built-in GPS, heart rate zones, Google apps, and up to 7 days of battery life.',
    specification:
      'Display: Color AMOLED touch | GPS: Built-in | Water Resistance: 50m | Sensors: Heart rate, SpO2, EDA | Battery: Up to 7 days',
    isFeatured: false,
  },
  {
    id: 'prod-9',
    name: 'Garmin Venu 3',
    category: 'Wearables',
    price: 449,
    inventory: 6,
    quantity: 0,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1526482161877-52b5a1dd5dc9?auto=format&fit=crop&w=600&q=80',
    description:
      'A premium GPS smartwatch with advanced health tracking, wheelchair mode, and up to 14 days of battery in smartwatch mode.',
    specification:
      'Display: AMOLED | GPS: Multi-band | Water Resistance: 5ATM | Sensors: Heart rate, ECG, Pulse Ox | Battery: Up to 14 days',
    isFeatured: false,
  },
  {
    id: 'prod-10',
    name: 'Apple Watch SE (2nd Gen)',
    category: 'Wearables',
    price: 249,
    inventory: 8,
    quantity: 0,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3be5e4e6a2d6?auto=format&fit=crop&w=600&q=80',
    description:
      'An affordable smartwatch with crash detection, fall detection, and essential fitness tracking in a recycled aluminum case.',
    specification:
      'Display: Retina LTPO OLED | Chip: S8 SiP | Water Resistance: 50m | Sensors: Heart rate, Blood Oxygen | Battery: Up to 18 hours',
    isFeatured: false,
  },
  {
    id: 'prod-11',
    name: 'Logitech MX Master 3S Mouse',
    category: 'Gaming',
    price: 99,
    inventory: 8,
    quantity: 0,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    description:
      'An icon remastered. Feel every moment of your workflow with quiet clicks and an 8,000 DPI track-on-glass optical sensor for ultimate precision and performance.',
    specification:
      'Sensor: 8,000 DPI Darkfield High Precision | Buttons: 7 customizable buttons | Scroll: MagSpeed Electromagnetic scrolling | Battery: 500 mAh rechargeable | Connectivity: Bluetooth & Logi Bolt',
    isFeatured: true,
  },
  {
    id: 'prod-12',
    name: 'Keychron K2 Mechanical Keyboard',
    category: 'Gaming',
    price: 120,
    inventory: 3,
    quantity: 0,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description:
      'Compact 75% layout wireless mechanical keyboard engineered for Mac and Windows. Features hot-swappable switches, RGB backlighting, and dual wireless/wired connectivity.',
    specification:
      'Layout: 75% 84 Keys | Switches: Gateron G Pro Brown / Red | Keycaps: Double-shot PBT | Battery: 4000mAh rechargeable | Connectivity: Bluetooth 5.1 & USB-C',
    isFeatured: false,
  },
  {
    id: 'prod-13',
    name: 'Razer DeathAdder V3 Mouse',
    category: 'Gaming',
    price: 69,
    inventory: 10,
    quantity: 0,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1552820999-f1e04e6478c6?auto=format&fit=crop&w=600&q=80',
    description:
      'An ultra-lightweight ergonomic gaming mouse with Razer Focus Pro 30K optical sensor and optical mouse switches for crisp, consistent clicks.',
    specification:
      'Sensor: Razer Focus Pro 30K | DPI: 30,000 | Buttons: 8 programmable | Weight: 59g | Connectivity: Razer HyperSpeed Wireless',
    isFeatured: false,
  },
  {
    id: 'prod-14',
    name: 'Corsair K70 RGB Mechanical Keyboard',
    category: 'Gaming',
    price: 169,
    inventory: 5,
    quantity: 0,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1596456493175-5b6e959e814d?auto=format&fit=crop&w=600&q=80',
    description:
      'A full-size performance gaming keyboard with CHERRY MX switches, dynamic per-key RGB backlighting, and an aluminum frame.',
    specification:
      'Layout: Full-size 104 Keys | Switches: CHERRY MX Red / Blue | Keycaps: Double-shot PBT | Polling: 8000 Hz | Connectivity: Wired USB',
    isFeatured: false,
  },
  {
    id: 'prod-15',
    name: 'SteelSeries Arctis 7 Wireless Headset',
    category: 'Gaming',
    price: 149,
    inventory: 7,
    quantity: 0,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1606856042535-6e1a7e0c4b43?auto=format&fit=crop&w=600&q=80',
    description:
      'A wireless gaming headset with lossless 2.4 GHz audio, ClearCast microphone, and a ski-goggle suspension headband for all-day comfort.',
    specification:
      'Driver: 40mm neodymium | Mic: ClearCast bidirectional | Battery: Up to 24 hours | Connectivity: 2.4 GHz wireless & 3.5mm | Weight: 342g',
    isFeatured: false,
  },
  {
    id: 'prod-16',
    name: 'Fujifilm X-T30 Mirrorless Camera',
    category: 'Electronics',
    price: 899,
    inventory: 5,
    quantity: 0,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    description:
      'Combines classic vintage styling with cutting-edge 26.1MP X-Trans CMOS 4 sensor and high-speed image processing engine to deliver stunning photography and DCI 4K video.',
    specification:
      'Sensor: 26.1MP APS-C X-Trans CMOS 4 | Video: DCI 4K at 30p / Full HD at 240p | Autofocus: 425 Phase Detection Points | Screen: 3.0" Tilting Touchscreen LCD | Weight: 378g',
    isFeatured: true,
  },
  {
    id: 'prod-17',
    name: 'Apple iPhone 15 Pro',
    category: 'Electronics',
    price: 999,
    inventory: 3,
    quantity: 0,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    description:
      'A titanium smartphone with the A17 Pro chip, an advanced pro camera system with 48MP Main, and a customizable Action button.',
    specification:
      'Display: 6.1" Super Retina XDR | Chip: A17 Pro | Camera: 48MP Main + 12MP Ultra Wide + 12MP Telephoto | Connectivity: USB-C | Weight: 187g',
    isFeatured: false,
  },
  {
    id: 'prod-18',
    name: 'Sony Alpha a7 III Mirrorless Camera',
    category: 'Electronics',
    price: 1998,
    inventory: 2,
    quantity: 0,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1606989943337-969c7592e2a0?auto=format&fit=crop&w=600&q=80',
    description:
      'A full-frame mirrorless camera with 24.2MP back-illuminated sensor, 693-point autofocus, and 4K HDR video for hybrid creators.',
    specification:
      'Sensor: 24.2MP Full-frame BSI | Autofocus: 693 phase-detection points | Video: 4K HDR | ISO: 100-51200 | Weight: 650g',
    isFeatured: false,
  },
  {
    id: 'prod-19',
    name: 'MacBook Air M2',
    category: 'Electronics',
    price: 1099,
    inventory: 4,
    quantity: 0,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    description:
      'An ultrathin laptop powered by the M2 chip with a 13.6-inch Liquid Retina display, MagSafe charging, and up to 18 hours of battery life.',
    specification:
      'Chip: Apple M2 | Display: 13.6" Liquid Retina | Memory: 8GB unified | Storage: 256GB SSD | Battery: Up to 18 hours | Weight: 1.24 kg',
    isFeatured: false,
  },
  {
    id: 'prod-20',
    name: 'Samsung 4K UHD Monitor',
    category: 'Electronics',
    price: 349,
    inventory: 6,
    quantity: 0,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    description:
      'A 27-inch 4K UHD monitor with HDR10, wide viewing angles, and Eye Saver mode for crisp productivity and entertainment.',
    specification:
      'Screen: 27-inch IPS | Resolution: 3840 x 2160 | HDR: HDR10 | Ports: HDMI 2.0, DisplayPort | Refresh: 60 Hz',
    isFeatured: false,
  },
];

export const CATEGORIES: string[] = ['All', 'Audio', 'Wearables', 'Gaming', 'Electronics'];

export const PRESET_IMAGES = [
  {
    name: 'Headphones',
    icon: 'Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    defaultCategory: 'Audio',
  },
  {
    name: 'Smartwatch',
    icon: 'Watch',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    defaultCategory: 'Wearables',
  },
  {
    name: 'Camera',
    icon: 'Camera',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    defaultCategory: 'Electronics',
  },
  {
    name: 'Gaming Mouse',
    icon: 'Mouse',
    url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    defaultCategory: 'Gaming',
  },
  {
    name: 'Keyboard',
    icon: 'Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    defaultCategory: 'Gaming',
  },
  {
    name: 'Speaker',
    icon: 'Volume2',
    url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    defaultCategory: 'Audio',
  },
];
