// User Types
export type UserRole = 'customer' | 'admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  stageName?: string;
  country?: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Beat Types
export type BeatStatus = 'draft' | 'active' | 'archived';
export type LicenseType = 'basic_lease' | 'premium_lease' | 'unlimited_lease' | 'exclusive';

export interface Beat {
  id: string;
  title: string;
  slug: string;
  producerId: string;
  description: string;
  bpm: number;
  musicalKey: string;
  duration: number; // in seconds
  genre: string;
  moodTags: string[];
  instrumentTags: string[];
  artworkUrl: string;
  audioPreviewUrl: string;
  status: BeatStatus;
  isTrending: boolean;
  isFeatured: boolean;
  playCount: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// License Types
export interface License {
  id: string;
  beatId: string;
  licenseType: LicenseType;
  price: number;
  salePrice?: number;
  isAvailable: boolean;
  distributionLimit?: number;
  includeStems: boolean;
  includeMidi: boolean;
  audioFormats: string[]; // ['mp3', 'wav']
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  id: string;
  beatId: string;
  licenseId: string;
  beat: Beat;
  license: License;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// Order Types
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  beatId: string;
  licenseId: string;
  beatTitle: string;
  licenseType: LicenseType;
  price: number;
  downloadCount: number;
  maxDownloads: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentProvider: string;
  paymentId: string;
  country: string;
  createdAt: Date;
  completedAt?: Date;
}

// Download Types
export interface Download {
  id: string;
  orderItemId: string;
  userId: string;
  fileType: string;
  downloadToken: string;
  expiresAt: Date;
  downloadedAt?: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface BeatFilterParams {
  genre?: string;
  bpmMin?: number;
  bpmMax?: number;
  key?: string;
  mood?: string;
  priceMin?: number;
  priceMax?: number;
  licenseType?: LicenseType;
  isFree?: boolean;
  search?: string;
}
