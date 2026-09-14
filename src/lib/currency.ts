import { SITE_CONFIG } from "@/data/config";
import { catalogIDR } from "./pricing";

/** Single source untuk kalkulasi IDR katalog — delegates ke lib/pricing. */
export const usdToIdr = catalogIDR;

export function usdToEur(usd: number): number {
  return Math.round(usd * SITE_CONFIG.exchangeRate.USD_EUR * 100) / 100;
}

export function formatUSD(usd: number): string {
  return `$${usd.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatIDR(idr: number): string {
  return `Rp ${idr.toLocaleString("id-ID")}`;
}

export function formatEUR(eur: number): string {
  return `€${eur.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Alias yang sebelumnya format tanpa grup/tanpa spasi — kini satu implementasi.
export const formatPriceUSD = formatUSD;
export const formatPriceIDR = formatIDR;
