// ═══════════════════════════════════════════════════
// GeekShop — Application Constants
// ═══════════════════════════════════════════════════

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Order status options
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_COLORS = {
  pending: 'gold',
  confirmed: 'cyan',
  shipped: 'cyan',
  delivered: 'green',
  cancelled: 'pink',
};

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Product categories
export const CATEGORIES = [
  { id: 1, name: 'OS & Recovery', slug: 'os-recovery', icon: '💾' },
  { id: 2, name: 'Networking', slug: 'networking', icon: '🌐' },
  { id: 3, name: 'Cables & Accessories', slug: 'cables-accessories', icon: '🔌' },
  { id: 4, name: 'Development Boards', slug: 'development-boards', icon: '🔧' },
  { id: 5, name: 'Displays & Modules', slug: 'displays-modules', icon: '📟' },
  { id: 6, name: 'GPS & Navigation', slug: 'gps-navigation', icon: '📡' },
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name A→Z' },
  { value: 'name_desc', label: 'Name Z→A' },
  { value: 'price_asc', label: 'Price Low→High' },
  { value: 'price_desc', label: 'Price High→Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

// Price range
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 2000000,
  STEP: 10000,
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// User roles
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Chatbot
export const CHAT_SUGGESTIONS = [
  'Recommend a board under 1M VND',
  'Compare network cards',
  "What's the best GPS module?",
  'Help me choose a bootable USB',
  'Arduino vs ESP32 for beginners',
];

// Brands extracted from products
export const BRANDS = [
  'TECH STORE ON',
  'Xtssui',
  'VIMIN',
  'BrosTrend',
  'UGREEN',
  'Arduino',
  'LinksTek',
  'ULANSeN',
  'Hosyond',
  'Lonely Binary',
  'HiLetgo',
  'Walfront',
  'Stemedu',
];

// Breakpoints matching CSS
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
};
