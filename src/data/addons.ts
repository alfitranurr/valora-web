import type { Addon } from "@/types";
import { catalogIDR } from "@/lib/pricing";

const rawAddons: Array<Omit<Addon, "priceIDR">> = [
  {
    id: "sim-card",
    name: "Turkcell Tourist SIM Card 20GB Data",
    description: "Koneksi internet 4G/5G cepat di seluruh wilayah Turki, langsung aktif saat tiba.",
    priceUSD: 30,
  },
  {
    id: "bosphorus-cruise",
    name: "Private Sunset Bosphorus Yacht Cruise (2 Jam)",
    description: "Kapal pesiar privat menyusuri Selat Bosphorus dengan teh Turki & buah segar.",
    priceUSD: 173,
  },
  {
    id: "museum-pass",
    name: "Museum Pass Turkiye Fast-Track Access",
    description: "Akses bebas antre ke Topkapi Palace, Hagia Sophia, Galata, & situs bersejarah.",
    priceUSD: 76,
  },
  {
    id: "uludag-cable-car",
    name: "Tiket Teleferik Bursa Uludag Cable Car (PP)",
    description: "Kereta gantung terpanjang menikmati pemandangan salju Gunung Uludag.",
    priceUSD: 27,
  },
  {
    id: "hot-air-balloon",
    name: "Cappadocia Hot Air Balloon Deluxe Flight",
    description: "Terbang balon udara 60 menit saat sunrise di Goreme Cappadocia berlisensi SHGM.",
    priceUSD: 205,
  },
];

export const addons: Addon[] = rawAddons.map((item) => ({
  ...item,
  priceIDR: catalogIDR(item.priceUSD),
}));

export function getAddonById(id: string): Addon | undefined {
  return addons.find((a) => a.id === id);
}
