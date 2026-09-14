export type ServiceCategory = "guide" | "airport" | "transport" | "photography";

export interface Service {
  id: string;
  slug: string;
  category: ServiceCategory;
  categoryLabel: string;
  name: string;
  shortDesc: string;
  description: string;
  duration: string;
  capacity: string;
  priceUSD: number;
  priceIDR: number;
  unit: string;
  image: string;
  highlights: string[];
  included: string[];
  bestSeller?: boolean;
  featured?: boolean;
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  destination: string;
  duration: string;
  durationDays: number;
  capacity: string;
  priceUSD: number;
  priceIDR: number;
  unit: string;
  image: string;
  description: string;
  highlights: string[];
  bestSeller?: boolean;
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  duration: string;
  capacity: string;
  priceUSD: number;
  priceIDR: number;
  unit: string;
  image: string;
  highlights: string[];
  savingsNote?: string;
  bestSeller?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceIDR: number;
}

export interface Vehicle {
  id: string;
  name: string;
  capacity: string;
  seatRange: string;
  priceUSD: number;
  priceIDR: number;
  unit: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  highlights: string[];
  image: string;
  featured?: boolean;
}

export interface EstimatorCategory {
  id: string;
  label: string;
  description: string;
}

export interface PriceCalculation {
  basePriceUSD: number;
  addonsUSD: number;
  totalUSD: number;
  totalEUR: number;
  totalIDR: number;
}

// ============================================================
// Booking & Pembayaran (manual verification, QRIS/Bank)
// ============================================================

export type BookingStatus =
  | "menunggu_pembayaran"
  | "menunggu_verifikasi"
  | "dp_terverifikasi"
  | "lunas"
  | "dikonfirmasi"
  | "dibatalkan";

export type PaymentType = "deposit" | "final";

export type PaymentMethod = "transfer" | "qris";

export interface BookingCustomer {
  name: string;
  wa: string;
  email?: string;
}

export interface Booking {
  id: string; // format VLR-YYMM-####
  createdAt: string;
  serviceName: string;
  serviceRef?: string; // mis. "tour-packages/istanbul-classical"
  travelDate: string; // ISO tanggal (YYYY-MM-DD)
  adults: number;
  children: number;
  totalIDR: number;
  depositIDR: number;
  customer: BookingCustomer;
  notes?: string;
  status: BookingStatus;
}

export interface BookingPayment {
  id: string;
  bookingId: string;
  type: PaymentType;
  method?: PaymentMethod;
  amountIDR: number;
  proofPath?: string;
  submittedAt?: string;
  verifiedAt?: string;
  adminNote?: string;
  createdAt: string;
}
