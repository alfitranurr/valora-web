import { SITE_CONFIG } from "@/data/config";

export function usdToIdr(usd: number): number {
  return Math.round(usd * SITE_CONFIG.exchangeRate.USD_IDR);
}

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

export function formatPriceUSD(usd: number): string {
  return `$${usd}`;
}

export function formatPriceIDR(idr: number): string {
  return `Rp${idr.toLocaleString("id-ID")}`;
}
