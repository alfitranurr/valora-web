import type { Bundle } from "@/types";
import { catalogIDR } from "@/lib/pricing";

const rawBundles: Array<Omit<Bundle, "priceIDR">> = [
  {
    id: "all-in-one-istanbul",
    slug: "all-in-one-istanbul-explorer",
    name: "All-In-One Istanbul Explorer",
    shortDesc: "Guide + Photographer + VIP Vito Driver dalam satu paket hari penuh.",
    description:
      "Solusi paling praktis & mewah tanpa ribet! Paket gabungan 1 hari penuh: Tour Guide Resmi Bahasa Indonesia (10 Jam) + Mercedes-Benz Vito VIP dengan supir profesional + Sesi Dokumentasi Fotografer Profesional (3 Jam).",
    duration: "1 Hari (10 Jam)",
    capacity: "1–6 Penumpang",
    priceUSD: 389,
    unit: "per hari bundle",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Hemat hingga $59 dibandingkan memesan satuan terpisah",
      "Guide Resmi Bahasa Indonesia sepanjang hari",
      "Mercedes Vito VIP ber-AC dingin siap standby",
    ],
    savingsNote: "Hemat hingga $59 dibandingkan pesan satuan",
    bestSeller: true,
  },
  {
    id: "airport-half-day-combo",
    slug: "vip-airport-arrival-half-day-combo",
    name: "VIP Airport Arrival & Half-Day City Tour Combo",
    shortDesc: "Dijemput di bandara IST/SAW, langsung tur setengah hari sebelum check-in hotel.",
    description:
      "Tiba di Istanbul dengan kenyamanan paripurna. Dijemput oleh Airport Guide di Bandara IST/SAW, langsung diantar dengan armada Mercedes Vito VIP menuju area kota bersejarah untuk tur setengah hari (5 jam) sebelum check-in hotel.",
    duration: "Arrival + 5 Jam Tur",
    capacity: "1–6 Penumpang",
    priceUSD: 243,
    unit: "per paket combo",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Penyambutan VIP Airport Meet & Greet",
      "Langsung eksplorasi kota tanpa buang waktu transit",
      "Pengantaran bagasi aman di dalam kendaraan VIP Vito",
    ],
    bestSeller: true,
  },
  {
    id: "cappadocia-ultimate",
    slug: "cappadocia-sunset-balloon-sunrise-bundle",
    name: "Cappadocia Sunset & Balloon Sunrise Ultimate Bundle",
    shortDesc: "Armada Vito 2 hari + Guide + Sesi foto sunrise di bawah balon udara.",
    description:
      "Pengalaman magis tak terlupakan di Cappadocia. Meliputi armada Mercedes Vito standby 2 hari penuh, Guide Lokal berlisensi, dan Sesi Foto Sunrise pemburu balon udara di perbukitan Goreme & Love Valley.",
    duration: "2 Hari Penuh",
    capacity: "1–6 Penumpang",
    priceUSD: 583,
    unit: "per paket 2 hari",
    image:
      "https://images.unsplash.com/photo-1774429307435-35651939a7a9?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Sesi foto estetik sunrise di bawah ratusan balon udara",
      "Eksplorasi lembah batu & underground city bersama guide",
      "Kenyamanan armada Mercedes Vito siap antar kapan saja",
    ],
    bestSeller: true,
  },
];

export const bundles: Bundle[] = rawBundles.map((item) => ({
  ...item,
  priceIDR: catalogIDR(item.priceUSD),
}));

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
