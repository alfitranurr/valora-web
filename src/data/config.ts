export const SITE_CONFIG = {
  name: "Valora Tour and Travel",
  tagline: "Spesialis Wisata Turki untuk Wisatawan Indonesia",
  whatsappNumber: "6285158779239",
  whatsappDisplay: "085158779239",
  exchangeRate: {
    USD_IDR: 17630,
    USD_EUR: 0.92,
  },
  operations: "Sultanahmet, Istanbul, Turki",
  representative: "Jakarta, Indonesia",
  emergencySupport: "24/7",
  payments: {
    bankName: "BANK ABC", // TODO: isi data rekening bank asli
    accountNumber: "0000000000", // TODO: nomor rekening asli
    accountName: "Valora Tour and Travel", // TODO: nama pemilik rekening asli
    qrisImage: "/images/qris.jpg", // TODO: letakkan file gambar QRIS statis di public/images/qris.jpg
    depositPercent: 30, // DP 30% saat booking
    verificationNote:
      "Verifikasi bukti pembayaran dilakukan oleh Admin Valora maksimal 1×24 jam. Status pembayaran dapat dipantau di halaman booking.",
  },
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
