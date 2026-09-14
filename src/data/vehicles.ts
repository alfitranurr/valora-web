import type { Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  {
    id: "vito",
    name: "Mercedes-Benz Vito VIP",
    capacity: "4-6 Seats",
    seatRange: "4-6",
    priceUSD: 173,
    priceIDR: 2800000,
    unit: "per hari",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    description:
      "Armada privat terfavorit keluarga Indonesia. Kabin mewah dengan kursi captain seat kulit, WiFi onboard, dan AC individu.",
    highlights: [
      "Kabin VIP Captain Seat kulit mewah",
      "Free High-Speed WiFi & Charging Port",
      "Air mineral dingin gratis setiap hari",
    ],
  },
  {
    id: "sprinter",
    name: "Mercedes-Benz Sprinter VIP",
    capacity: "12-15 Seats",
    seatRange: "12-15",
    priceUSD: 232,
    priceIDR: 3762500,
    unit: "per hari",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    description:
      "Kendaraan lapang untuk rombongan keluarga besar atau grup sahabat. Plafon tinggi, jok empuk recliner, kulkas mini.",
    highlights: [
      "Kapasitas 12-15 kursi ergonomis empuk",
      "Bagasi ekstra luas muat 15-18 koper besar",
      "Dilengkapi microphone untuk Tour Guide",
    ],
  },
  {
    id: "midibus",
    name: "Midibus Isuzu / Otokar Sultan",
    capacity: "20-28 Seats",
    seatRange: "20-28",
    priceUSD: 302,
    priceIDR: 4900000,
    unit: "per hari",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80",
    description:
      "Pilihan ideal untuk rombongan korporasi, reuni, atau grup arisan menengah.",
    highlights: [
      "Kapasitas 20-28 kursi reclining",
      "AC central dingin",
      "Kompartemen bagasi bawah bus yang luas",
    ],
  },
  {
    id: "luxury-coach",
    name: "Luxury Coach Mercedes Travego/Tourismo",
    capacity: "30-45 Seats",
    seatRange: "30-45",
    priceUSD: 464,
    priceIDR: 7525000,
    unit: "per hari",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    description:
      "Bus besar kelas utama untuk perjalanan jarak jauh antarkota. Suspensi udara, toilet onboard, standar keselamatan Eropa.",
    highlights: [
      "Armada Mercedes-Benz Travego/Tourismo",
      "Toilet onboard & audio visual premium",
      "Standar keselamatan Eropa tertinggi",
    ],
  },
];

export const customTripDestinations = [
  "Istanbul",
  "Bursa & Uludag",
  "Kusadasi / Ephesus",
  "Pamukkale & Hierapolis",
  "Konya",
  "Cappadocia",
  "Ankara",
  "Antalya",
  "Trabzon & Rize",
];

export const customTripPopularRoute = [
  "Istanbul",
  "Bursa",
  "Kusadasi / Ephesus",
  "Pamukkale",
  "Konya",
  "Cappadocia",
  "Ankara",
  "Istanbul",
];
