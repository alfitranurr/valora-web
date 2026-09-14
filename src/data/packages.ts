import type { TourPackage } from "@/types";
import { catalogIDR } from "@/lib/pricing";

const rawPackages: Array<Omit<TourPackage, "priceIDR">> = [
  {
    id: "istanbul-classical",
    slug: "istanbul-classical-bosphorus-tour",
    name: "Istanbul Classical & Bosphorus Panoramic Tour",
    destination: "Istanbul",
    duration: "1 Hari (9-10 Jam)",
    durationDays: 1,
    capacity: "1–6 Orang (Private Vito)",
    priceUSD: 211,
    unit: "per paket (1 armada s/d 6 pax)",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80",
    description:
      "Paket tur satu hari terlengkap menjelajahi kejayaan peradaban Ottoman & Bizantium. Mengunjungi Hagia Sophia, Blue Mosque, Hippodrome, Topkapi Palace, belanja di Grand Bazaar, dan ditutup dengan pemandangan magis Selat Bosphorus.",
    highlights: [
      "Hagia Sophia & Blue Mosque dengan penjelasan sejarah mendalam",
      "Topkapi Palace (Istana Sultan Utsmaniyah)",
      "Grand Bazaar (Pasar tertua di dunia)",
    ],
    bestSeller: true,
  },
  {
    id: "bursa-historical",
    slug: "bursa-historical-silk-market-tour",
    name: "Bursa Historical & Silk Market Day Tour",
    destination: "Bursa",
    duration: "1 Hari (10-11 Jam)",
    durationDays: 1,
    capacity: "1–6 Orang (Private Vito)",
    priceUSD: 248,
    unit: "per paket (1 armada s/d 6 pax)",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
    description:
      "Menyeberangi Jembatan Osmangazi menuju ibu kota pertama kekhalifahan Utsmaniyah. Mengunjungi Masjid Agung Bursa (Ulu Cami), Green Tomb, pasar sutra bersejarah Koza Han, dan mencicipi Iskender Kebab legendaris khas Bursa.",
    highlights: [
      "Melintasi Jembatan Gantung Osmangazi di atas Teluk Izmit",
      "Ulu Cami Bursa dengan 20 kubah megah",
      "Koza Han (Pusat sutra Jalur Sutra Kuno)",
    ],
    bestSeller: true,
  },
  {
    id: "bursa-uludag",
    slug: "bursa-uludag-snow-teleferik-tour",
    name: "Bursa Uludag Snow & Teleferik Mountain Tour",
    destination: "Bursa & Uludag",
    duration: "1 Hari (11 Jam)",
    durationDays: 1,
    capacity: "1–6 Orang (Private Vito)",
    priceUSD: 281,
    unit: "per paket (1 armada s/d 6 pax)",
    image:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1000&q=80",
    description:
      "Petualangan salju terbaik di Turki! Naik kereta gantung (Teleferik) terpanjang di dunia menuju puncak Gunung Uludag. Nikmati pemandangan hutan pinus berselimut salju, bermain ski, snowmobile, atau ngopi hangat di atas awan.",
    highlights: [
      "Pengalaman naik Bursa Teleferik menembus kabut dan salju",
      "Aktivitas salju di Uludag Ski Resort",
      "Pohon Bersejarah berusia 600 tahun (Inkaya Historic Tree)",
    ],
    bestSeller: true,
  },
  {
    id: "cappadocia-magic",
    slug: "cappadocia-magic-underground-city-tour",
    name: "Cappadocia Magic & Underground City Tour",
    destination: "Cappadocia",
    duration: "2 Hari 1 Malam",
    durationDays: 2,
    capacity: "1–6 Orang (Private Vito)",
    priceUSD: 389,
    unit: "per paket (Private Vito 2 Hari)",
    image:
      "https://images.unsplash.com/photo-1774429307435-35651939a7a9?auto=format&fit=crop&w=1000&q=80",
    description:
      "Eksplorasi negeri dongeng Cappadocia. Menyaksikan formasi batu cerobong peri di Pasabag & Devrent Valley, museum terbuka Goreme, menuruni Kota Bawah Tanah Kaymakli/Derinkuyu kuno, dan spot foto sunrise balon udara terbaik.",
    highlights: [
      "Goreme Open Air Museum & Pasabag Fairy Chimneys",
      "Derinkuyu / Kaymakli Underground City (8 lantai bawah tanah)",
      "Pigeon Valley, Uchisar Castle Panorama & Love Valley",
    ],
    bestSeller: true,
  },
  {
    id: "pamukkale-tour",
    slug: "pamukkale-cotton-castle-hierapolis-tour",
    name: "Pamukkale Cotton Castle & Hierapolis Antique Pool",
    destination: "Pamukkale",
    duration: "1 Hari (9-10 Jam)",
    durationDays: 1,
    capacity: "1–6 Orang (Private Vito)",
    priceUSD: 302,
    unit: "per paket (Private Vito)",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
    description:
      "Menikmati keajaiban kolam travertine kapur putih bertingkat air belerang hangat alami di Pamukkale, dilanjutkan menelusuri reruntuhan kota Romawi Hierapolis, teater kuno megah, dan berenang di Kolam Antik Cleopatra.",
    highlights: [
      "Kolam air hangat travertine putih alami Pamukkale",
      "Kota kuno Hierapolis & Amfiteater Romawi",
      "Cleopatra Antique Pool dengan pilar marmer tenggelam",
    ],
  },
];

export const tourPackages: TourPackage[] = rawPackages.map((item) => ({
  ...item,
  priceIDR: catalogIDR(item.priceUSD),
}));

export function getPackageBySlug(slug: string): TourPackage | undefined {
  return tourPackages.find((p) => p.slug === slug);
}
