import { WHATSAPP_BASE_URL } from "@/data/config";
import { formatUSD, formatIDR } from "./currency";

export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function generalConsultationUrl(): string {
  const message = `Halo Admin Valora Tour, saya ingin konsultasi perjalanan ke Turki. Mohon informasi lebih lanjut mengenai paket tur dan private trip.`;
  return buildWhatsAppUrl(message);
}

export interface EstimateData {
  serviceName: string;
  date?: string;
  pax?: number;
  duration?: string;
  pickupLocation?: string;
  totalUSD: number;
  totalIDR: number;
  addons?: string[];
}

export function estimateWhatsAppUrl(data: EstimateData): string {
  const lines: string[] = [
    "Halo Admin Valora Tour,",
    "",
    "Saya ingin konsultasi perjalanan ke Turki.",
    "",
    `Layanan: ${data.serviceName}`,
  ];

  if (data.date) lines.push(`Tanggal: ${data.date}`);
  if (data.pax) lines.push(`Jumlah peserta: ${data.pax} pax`);
  if (data.duration) lines.push(`Durasi: ${data.duration}`);
  if (data.pickupLocation) lines.push(`Lokasi penjemputan: ${data.pickupLocation}`);

  lines.push("");
  lines.push(`Estimasi: ${formatUSD(data.totalUSD)} / ${formatIDR(data.totalIDR)}`);

  if (data.addons && data.addons.length > 0) {
    lines.push("");
    lines.push("Layanan tambahan:");
    data.addons.forEach((a) => lines.push(`- ${a}`));
  }

  lines.push("");
  lines.push("Mohon informasi lebih lanjut mengenai availability dan itinerary.");
  lines.push("Terima kasih.");

  return buildWhatsAppUrl(lines.join("\n"));
}

export interface CustomTripData {
  name: string;
  whatsapp: string;
  email?: string;
  vehicle: string;
  duration: number;
  date: string;
  adults: number;
  children: number;
  destinations: string[];
  specialRequest?: string;
  estimateUSD: number;
  estimateIDR: number;
}

export function customTripWhatsAppUrl(data: CustomTripData): string {
  const lines: string[] = [
    "Halo Admin Valora Tour,",
    "",
    "Saya ingin mengajukan Custom Turkey Roadtrip.",
    "",
    "Data Kontak:",
    `Nama: ${data.name}`,
    `WhatsApp: ${data.whatsapp}`,
  ];

  if (data.email) lines.push(`Email: ${data.email}`);

  lines.push("");
  lines.push("Detail Perjalanan:");
  lines.push(`Armada: ${data.vehicle}`);
  lines.push(`Durasi: ${data.duration} hari`);
  lines.push(`Tanggal keberangkatan: ${data.date}`);
  lines.push(`Dewasa: ${data.adults} orang`);
  lines.push(`Anak: ${data.children} orang`);

  lines.push("");
  lines.push("Destinasi:");
  data.destinations.forEach((d) => lines.push(`- ${d}`));

  if (data.specialRequest) {
    lines.push("");
    lines.push(`Permintaan khusus: ${data.specialRequest}`);
  }

  lines.push("");
  lines.push(`Estimasi dasar: ${formatUSD(data.estimateUSD)} / ${formatIDR(data.estimateIDR)}`);
  lines.push("");
  lines.push("Mohon informasi penawaran khusus dan konfirmasi itinerary.");
  lines.push("Terima kasih.");

  return buildWhatsAppUrl(lines.join("\n"));
}
