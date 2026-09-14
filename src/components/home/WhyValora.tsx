import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ShieldCheck, Award, Car, Receipt, Route, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "100% Private Trip",
    description:
      "Setiap armada dan pemandu wisata hanya didedikasikan untuk Anda dan keluarga. Bebas menentukan jam mulai, ritme santai, dan spot belanja tanpa terburu-buru.",
    accent: "green",
  },
  {
    icon: Award,
    title: "Guide Resmi Kementerian Turki (TUREB)",
    description:
      "Semua pemandu kami memiliki lisensi resmi (Kokartlı Rehber) yang fasih berbahasa Indonesia atau Inggris, paham sejarah, dan memiliki akses prioritas bebas antrean museum.",
    accent: "yellow",
  },
  {
    icon: Car,
    title: "Armada VIP Mercedes-Benz Prima",
    description:
      "Armada Mercedes Vito dan Sprinter kami terawat dengan standar kenyamanan tinggi: kabin ber-AC dingin, jok captain seat empuk, free WiFi onboard, dan supir pariwisata profesional.",
    accent: "green",
  },
  {
    icon: Receipt,
    title: "Transparansi Biaya & Kurs Terbuka",
    description:
      "Harga tercantum jelas dalam USD dan otomatis terkonversi ke Rupiah (IDR) berdasarkan kurs acuan terkini. Tidak ada biaya tersembunyi, komisi paksa, atau toko wajib.",
    accent: "yellow",
  },
  {
    icon: Route,
    title: "Fleksibilitas Rute Maksimal",
    description:
      "Ingin berlama-lama foto di Cappadocia saat sunrise atau ingin kulineran Kebab di Bursa? Rute dapat disesuaikan langsung di lapangan bersama guide Anda.",
    accent: "green",
  },
  {
    icon: Headphones,
    title: "Dukungan Tim Lokal di Istanbul & Jakarta",
    description:
      "Kami memiliki kantor operasional di Sultanahmet Istanbul serta representatif di Jakarta untuk memudahkan koordinasi, pembayaran, dan bantuan darurat 24/7.",
    accent: "yellow",
  },
];

export function WhyValora() {
  return (
    <section className="py-20 md:py-24 bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Mengapa Valora"
            title="Mengapa wisatawan memilih Valora Tour?"
            description="Komitmen kami menghadirkan pengalaman liburan di Turki yang aman, nyaman, berkelas, dan bebas rasa khawatir."
            align="center"
            dark
            className="mb-12"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {differentiators.map((item, idx) => (
            <RevealOnScroll key={item.title} delay={idx * 100} y={20}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center ring-1",
                      item.accent === "green"
                        ? "bg-terracotta/15 ring-terracotta/20"
                        : "bg-gold/15 ring-gold/20"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5",
                        item.accent === "green" ? "text-terracotta" : "text-gold"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-ivory mb-2 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ivory/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
