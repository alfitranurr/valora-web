export const SITE_CONFIG = {
  name: "Valora Tour and Travel",
  tagline: "Spesialis Wisata Turki untuk Wisatawan Indonesia",
  whatsappNumber: "905528881234",
  whatsappDisplay: "+90 552 888 1234",
  exchangeRate: {
    USD_IDR: 17630,
    USD_EUR: 0.92,
  },
  operations: "Sultanahmet, Istanbul, Turki",
  representative: "Jakarta, Indonesia",
  emergencySupport: "24/7",
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
