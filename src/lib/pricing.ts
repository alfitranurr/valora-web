import { SITE_CONFIG } from "@/data/config";

/**
 * Satu-satunya tempat konversi USD → IDR untuk harga katalog.
 * Data file menyimpan priceUSD saja; priceIDR selalu diturunkan di sini
 * agar tidak ada dua sumber kebenaran yang ternyata berbeda.
 */
export function catalogIDR(usd: number): number {
  return Math.round(usd * SITE_CONFIG.exchangeRate.USD_IDR);
}
