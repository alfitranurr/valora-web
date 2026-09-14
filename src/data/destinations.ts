import type { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "cappadocia",
    name: "Cappadocia",
    region: "Central Anatolia",
    description:
      "Negeri dongeng dengan formasi batu cerobong peri, kota bawah tanah kuno, dan balon udara saat sunrise yang ikonik. Pengalaman yang tak terlupakan.",
    highlights: [
      "Goreme Open Air Museum",
      "Fairy Chimneys & Pasabag Valley",
      "Underground City Derinkuyu/Kaymakli",
      "Hot Air Balloon Sunrise",
      "Love Valley & Uchisar Castle",
    ],
    image:
      "https://images.unsplash.com/photo-1774429307435-35651939a7a9?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "istanbul",
    name: "Istanbul",
    region: "Marmara",
    description:
      "Kota yang menjembatani dua benua. Hagia Sophia, Blue Mosque, Topkapi Palace, dan Grand Bazaar berdiri berdampingan dengan pemandangan Bosphorus yang memukau.",
    highlights: [
      "Hagia Sophia & Blue Mosque",
      "Topkapi Palace",
      "Grand Bazaar",
      "Bosphorus Cruise",
      "Sultanahmet Square",
    ],
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "bursa",
    name: "Bursa & Uludag",
    region: "Marmara",
    description:
      "Ibu kota pertama Kekhalifahan Utsmaniyah. Ulu Cami, Koza Han, dan Gunung Uludag dengan teleferik terpanjang di dunia.",
    highlights: [
      "Ulu Cami (20 kubah megah)",
      "Koza Han (Pasar Sutra)",
      "Uludag Ski Resort",
      "Teleferik Bursa",
      "Green Tomb (Yesil Turbe)",
    ],
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kusadasi",
    name: "Kusadasi / Ephesus",
    region: "Aegean",
    description:
      "Kota kuno Ephesus dengan Library of Celsus yang ikonik dan Rumah Virgin Mary, situs ziarah yang sakral.",
    highlights: [
      "Library of Celsus",
      "Rumah Virgin Mary",
      "Great Theatre of Ephesus",
      "Temple of Hadrian",
      "Terrace Houses",
    ],
    image:
      "https://images.unsplash.com/photo-1647955950696-ce764668e7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pamukkale",
    name: "Pamukkale & Hierapolis",
    region: "Aegean",
    description:
      "Kolam travertine kapur putih bertingkat dengan air belerang hangat alami, reruntuhan Romawi, dan Kolam Antik Cleopatra.",
    highlights: [
      "Travertine kapur putih Pamukkale",
      "Hierapolis Antique City",
      "Cleopatra Antique Pool",
      "Amfiteater Romawi",
      "Necropolis",
    ],
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "konya",
    name: "Konya",
    region: "Central Anatolia",
    description:
      "Kota spiritual Mevlana Rumi (Jalaluddin Rumi), dengan museum dan makam yang menjadi pusat ziarah sufisme.",
    highlights: [
      "Mevlana Museum (Makam Rumi)",
      "Alaeddin Mosque",
      "Sema Ceremony (Whirling Dervishes)",
      "Karatay Madrasa",
      "Ince Minareli Medrese",
    ],
    image:
      "https://images.unsplash.com/photo-1759930018775-bf3c3fe9bdc6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ankara",
    name: "Ankara",
    region: "Central Anatolia",
    description:
      "Ibu kota modern Turki dengan Anitkabir (Makam Ataturk) dan Museum Peradaban Anatolia.",
    highlights: [
      "Anitkabir (Makam Ataturk)",
      "Museum of Anatolian Civilizations",
      "Ankara Castle",
      "Atakule",
      "Kocatepe Mosque",
    ],
    image:
      "https://images.unsplash.com/photo-1605259386010-d7003729af98?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "antalya",
    name: "Antalya",
    region: "Mediterranean",
    description:
      "Pantai Mediterania yang menakjubkan, air terjun Duden, dan kota tua Kaleici yang bersejarah.",
    highlights: [
      "Duden Waterfalls",
      "Kaleici (Old Town)",
      "Konyaalti Beach",
      "Hadrian's Gate",
      "Antalya Museum",
    ],
    image:
      "https://images.unsplash.com/photo-1654162126812-4209e5934ed8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "trabzon",
    name: "Trabzon & Rize",
    region: "Black Sea",
    description:
      "Wilayah Laut Hitam dengan Biara Sumela yang dramatis, perkebunan teh Rize, dan pemandangan alam yang hijau.",
    highlights: [
      "Sumela Monastery",
      "Rize Tea Plantations",
      "Uzungol Lake",
      "Ataturk Pavilion",
      "Hagia Sophia of Trabzon",
    ],
    image:
      "https://images.unsplash.com/photo-1663230812927-dedf2bc78fe9?auto=format&fit=crop&w=1000&q=80",
  },
];

export function getFeaturedDestination(): Destination | undefined {
  return destinations.find((d) => d.featured);
}

export function getNonFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => !d.featured);
}
