import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "guide-full-day",
    slug: "tour-guide-full-day",
    category: "guide",
    categoryLabel: "Tour Guide",
    name: "Tour Guide Berlisensi Resmi Turki (Full Day)",
    shortDesc:
      "Pemandu wisata resmi bersertifikat Kementerian Pariwisata Turki, fasih bahasa Indonesia atau Inggris.",
    description:
      "Pemandu wisata resmi bersertifikat Kementerian Pariwisata Turki (Kültür ve Turizm Bakanlığı). Fasih berbahasa Indonesia atau Inggris, ramah, memahami sejarah mendalam, dan fleksibel mengikuti ritme perjalanan Anda.",
    duration: "10 Jam",
    capacity: "1–15 Orang",
    priceUSD: 151,
    priceIDR: 2450000,
    unit: "per hari (10 jam)",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Pemandu berlisensi resmi (Kokartlı Rehber)",
      "Fasih Bahasa Indonesia atau English pilihan Anda",
      "Fleksibel mengatur rute dan rekomendasi kuliner lokal",
    ],
    included: [
      "Layanan tour guide berlisensi selama 10 jam",
      "Penjelasan sejarah dan budaya di setiap lokasi",
      "Rekomendasi kuliner dan spot foto terbaik",
    ],
    bestSeller: true,
    featured: true,
  },
  {
    id: "guide-half-day",
    slug: "tour-guide-half-day",
    category: "guide",
    categoryLabel: "Tour Guide",
    name: "Tour Guide Berlisensi Turki (Half Day)",
    shortDesc:
      "Pemandu wisata bersertifikat untuk tur singkat setengah hari di Istanbul. Cocok untuk transit atau eksplorasi santai.",
    description:
      "Pemandu wisata bersertifikat untuk tur singkat setengah hari di Istanbul. Sangat cocok bagi transit panjang atau penjelajahan santai di area Sultanahmet atau Galata Taksim.",
    duration: "5 Jam",
    capacity: "1–15 Orang",
    priceUSD: 92,
    priceIDR: 1487500,
    unit: "per trip (5 jam)",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Waktu efisien 5 jam menjelajahi spot utama",
      "Guide berbahasa Indonesia/Inggris",
      "Sangat pas untuk transit Istanbul Airport",
    ],
    included: [
      "Layanan tour guide berlisensi selama 5 jam",
      "Penjelasan singkat dan padat di setiap lokasi",
      "Bantuan navigasi area Sultanahmet atau Galata",
    ],
    bestSeller: true,
  },
  {
    id: "airport-ist",
    slug: "airport-assistance-ist",
    category: "airport",
    categoryLabel: "Airport Assistance",
    name: "Istanbul New Airport (IST) VIP Meet & Airport Guide",
    shortDesc:
      "Layanan pendampingan langsung di pintu keluar bandara Istanbul (IST) dengan penyambutan personal.",
    description:
      "Layanan pendampingan langsung di pintu keluar bandara Istanbul (IST). Guide kami akan menyambut dengan papan nama nama Anda, membantu bagasi, pembelian SIM Card, dan mengawal hingga masuk ke armada transfer.",
    duration: "Saat Kedatangan",
    capacity: "Rombongan Keluarga / Group",
    priceUSD: 76,
    priceIDR: 1225000,
    unit: "per penjemputan",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Penyambutan personal dengan sign board nama Anda",
      "Bantuan klaim bagasi & aktivasi paket data Turki",
      "Koordinasi cepat ke supir pribadi Anda di VIP lane",
    ],
    included: [
      "Penjemputan di gate kedatangan IST",
      "Bantuan klaim bagasi",
      "Pendampingan hingga armada transfer",
    ],
    bestSeller: true,
    featured: true,
  },
  {
    id: "airport-saw",
    slug: "airport-assistance-saw",
    category: "airport",
    categoryLabel: "Airport Assistance",
    name: "Sabiha Gökçen Airport (SAW) Guide & Transfer Assistance",
    shortDesc:
      "Layanan penyambutan di bandara sisi Asia Istanbul (Sabiha Gökçen SAW).",
    description:
      "Layanan penyambutan di bandara sisi Asia Istanbul (Sabiha Gökçen SAW). Tim siap mengarahkan perjalanan Anda menuju hotel di kawasan Eropa atau sekitarnya dengan lancar dan bebas repot.",
    duration: "Saat Kedatangan",
    capacity: "Rombongan / Keluarga",
    priceUSD: 76,
    priceIDR: 1225000,
    unit: "per penjemputan",
    image:
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Standby sebelum penerbangan Anda mendarat di SAW",
      "Pendampingan bahasa dan valuta asing",
      "Aman dan nyaman tanpa takut tersesat",
    ],
    included: [
      "Penjemputan di gate kedatangan SAW",
      "Pendampingan menuju armada",
      "Bantuan komunikasi bahasa",
    ],
  },
  {
    id: "airport-cappadocia",
    slug: "airport-assistance-cappadocia",
    category: "airport",
    categoryLabel: "Airport Assistance",
    name: "Cappadocia Airport (Kayseri / Nevşehir) Guide & Transfer",
    shortDesc:
      "Penyambutan hangat di Bandara Kayseri (ASR) atau Nevşehir Kapadokya (NAV).",
    description:
      "Penyambutan hangat di Bandara Kayseri (ASR) atau Nevşehir Kapadokya (NAV). Guide lokal Valora siap mengawal perjalanan Anda menuju hotel gua (cave hotel) di Goreme, Uchisar, atau Urgup.",
    duration: "Saat Kedatangan",
    capacity: "Sesuai Ukuran Rombongan",
    priceUSD: 70,
    priceIDR: 1137500,
    unit: "per transfer",
    image:
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Penyambutan di bandara Kayseri atau Nevsehir",
      "Info cuaca penerbangan balon udara terkini",
      "Pengantaran ke Cave Hotel di Goreme/Uchisar",
    ],
    included: [
      "Penjemputan di bandara Kayseri atau Nevsehir",
      "Transfer ke hotel di area Cappadocia",
      "Informasi cuaca balon udara",
    ],
    bestSeller: true,
  },
  {
    id: "photographer",
    slug: "vacation-photographer",
    category: "photography",
    categoryLabel: "Dokumentasi",
    name: "Professional Vacation Photographer Turki",
    shortDesc:
      "Abadikan momen liburan impian di Turki dengan fotografer profesional. Sesi foto 3 jam di lokasi estetik.",
    description:
      "Abadikan momen liburan impian Anda di Turki dengan fotografer profesional. Sesi foto 3 jam di lokasi estetik seperti Rooftop Sultanahmet, Balat Warna-warni, atau Hot Air Balloon Sunrise di Cappadocia. Hasil foto high-res & warna sudah diedit.",
    duration: "3 Jam Sesi",
    capacity: "Solo, Couple, atau Keluarga",
    priceUSD: 130,
    priceIDR: 2100000,
    unit: "per sesi (3 jam)",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Minimal 100+ raw high-res photos + 25 professionally edited photos",
      "Arahan pose estetik & spot foto tersembunyi non-turis",
      "Pengiriman via Google Drive maksimal 48 jam",
    ],
    included: [
      "Sesi foto 3 jam dengan fotografer profesional",
      "Minimal 100+ raw photos dan 25 edited photos",
      "Pengiriman via Google Drive dalam 48 jam",
    ],
    bestSeller: true,
    featured: true,
  },
  {
    id: "vito-vip",
    slug: "mercedes-vito-vip",
    category: "transport",
    categoryLabel: "Private Transport",
    name: "Mercedes-Benz Vito VIP Luxury Class (4-6 Seats)",
    shortDesc:
      "Armada privat terfavorit keluarga Indonesia. Kabin mewah dengan kursi captain seat kulit, WiFi, dan AC individu.",
    description:
      "Armada privat terfavorit keluarga Indonesia. Kabin mewah dengan kursi captain seat kulit yang dapat direbahkan, meja lipat rapat, smart TV/WiFi, pengatur AC individu, dan bagasi muat hingga 5 koper besar.",
    duration: "10 Jam / Hari",
    capacity: "4–6 Penumpang",
    priceUSD: 167,
    priceIDR: 2712500,
    unit: "per hari (10 jam)",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Kabin VIP Captain Seat kulit mewah",
      "Free High-Speed WiFi & Charging Port di setiap kursi",
      "Air mineral dingin gratis setiap hari",
    ],
    included: [
      "Kendaraan Mercedes-Benz Vito VIP ber-AC",
      "Supir berpengalaman berbahasa Inggris",
      "BBM dan tol untuk area kota",
    ],
    bestSeller: true,
    featured: true,
  },
  {
    id: "sprinter-vip",
    slug: "mercedes-sprinter-vip",
    category: "transport",
    categoryLabel: "Private Transport",
    name: "Mercedes-Benz Sprinter VIP Extra Long (12-15 Seats)",
    shortDesc:
      "Kendaraan lapang untuk rombongan keluarga besar atau grup sahabat. Plafon tinggi, jok empuk recliner.",
    description:
      "Kendaraan lapang untuk rombongan keluarga besar atau grup sahabat. Plafon tinggi memungkinkan penumpang berdiri tegak dengan nyaman, jok empuk recliner, kulkas mini, audio mic guide, dan bagasi super luas.",
    duration: "10 Jam / Hari",
    capacity: "12–15 Penumpang",
    priceUSD: 232,
    priceIDR: 3762500,
    unit: "per hari (10 jam)",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Kapasitas 12-15 kursi ergonomis empuk",
      "Bagasi ekstra luas muat 15-18 koper besar",
      "Dilengkapi microphone untuk Tour Guide",
    ],
    included: [
      "Kendaraan Mercedes-Benz Sprinter VIP ber-AC",
      "Supir berpengalaman berbahasa Inggris",
      "BBM dan tol untuk area kota",
    ],
    bestSeller: true,
  },
  {
    id: "driver",
    slug: "professional-driver",
    category: "transport",
    categoryLabel: "Private Transport",
    name: "Professional Chauffeur / Driver Pribadi Turki",
    shortDesc:
      "Pengemudi profesional berpengalaman, ramah, dan hapal rute jalan serta kondisi lalu lintas di Turki.",
    description:
      "Pengemudi profesional berpengalaman, ramah, dan hapal rute jalan serta kondisi lalu lintas di Turki. Memiliki lisensi mengemudi pariwisata resmi (SRC) dan siap melayani rute perjalanan Anda dengan aman.",
    duration: "10 Jam",
    capacity: "Mengemudikan Armada Pilihan Anda",
    priceUSD: 86,
    priceIDR: 1400000,
    unit: "per hari (10 jam)",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Driver resmi bersertifikasi pariwisata Turki",
      "Bahasa Inggris komunikatif dan sopan",
      "Berpengalaman di jalan raya pegunungan & tol antarkota",
    ],
    included: [
      "Layanan supir profesional selama 10 jam",
      "Lisensi pariwisata resmi (SRC)",
      "Pengetahuan rute dan lalu lintas lokal",
    ],
  },
  {
    id: "midibus",
    slug: "midibus-pariwisata",
    category: "transport",
    categoryLabel: "Private Transport",
    name: "Midibus Pariwisata Isuzu / Otokar Sultan (20-28 Seats)",
    shortDesc:
      "Pilihan ideal untuk rombongan korporasi, reuni, atau grup arisan menengah.",
    description:
      "Pilihan ideal untuk rombongan korporasi, reuni, atau grup arisan menengah. Mengombinasikan kelincahan manuver di jalanan bersejarah Istanbul dengan kenyamanan bus antar kota.",
    duration: "10 Jam / Hari",
    capacity: "20–28 Penumpang",
    priceUSD: 302,
    priceIDR: 4900000,
    unit: "per hari (10 jam)",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Kapasitas 20 hingga 28 kursi reclining",
      "AC central dingin & sistem sirkulasi udara bersih",
      "Kompartemen bagasi bawah bus yang luas",
    ],
    included: [
      "Kendaraan Midibus ber-AC",
      "Supir berpengalaman",
      "BBM untuk area kota",
    ],
  },
  {
    id: "luxury-coach",
    slug: "luxury-coach-bus",
    category: "transport",
    categoryLabel: "Private Transport",
    name: "Bus Besar Luxury Coach Mercedes Travego / Tourismo (30-45 Seats)",
    shortDesc:
      "Bus besar kelas utama untuk perjalanan jarak jauh antarkota. Suspensi udara, kursi kelas satu, toilet onboard.",
    description:
      "Bus besar kelas utama untuk perjalanan jarak jauh antarkota (Istanbul, Ankara, Cappadocia, Pamukkale, Konya, Bursa). Suspensi udara super stabil, kursi kelas satu, toilet, dan standar keselamatan Eropa tertinggi.",
    duration: "10 Jam / Hari",
    capacity: "30–45 Penumpang",
    priceUSD: 464,
    priceIDR: 7525000,
    unit: "per hari (10 jam)",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Armada Mercedes-Benz Travego/Tourismo kondisi prima",
      "Standar kenyamanan perjalanan lintas provinsi Turki",
      "Dilengkapi fasilitas toilet onboard & audio visual premium",
    ],
    included: [
      "Kendaraan Luxury Coach Mercedes-Benz",
      "Supir berpengalaman jarak jauh",
      "BBM dan tol untuk area kota",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === "all") return services;
  return services.filter((s) => s.category === category);
}
