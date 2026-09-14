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
