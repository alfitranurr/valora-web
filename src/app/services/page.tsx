import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { services } from "@/data/services";
import type { ServiceCategory } from "@/types";
import ServicesClient from "./ServicesClient";

const categories: { id: "all" | ServiceCategory; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "guide", label: "Tour Guide" },
  { id: "airport", label: "Airport Assistance" },
  { id: "transport", label: "Private Transport" },
  { id: "photography", label: "Dokumentasi" },
];

export const metadata = {
  title: "Layanan — Valora Tour & Travel",
  description:
    "Tour guide berlisensi, airport assistance, armada VIP Mercedes-Benz, fotografer profesional, dan driver pribadi untuk perjalanan Turki Anda.",
};

export default function ServicesPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Layanan"
              title="Katalog Layanan Valora"
              description="Setiap layanan bersifat private — hanya untuk Anda dan grup Anda. Pilih kategori untuk menelusuri."
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={120} y={20}>
            <ServicesClient categories={categories} allServices={services} />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
