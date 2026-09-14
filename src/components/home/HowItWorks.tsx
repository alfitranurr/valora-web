import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Pilih layanan",
    description: "Telusuri katalog layanan — tour guide, transport VIP, paket tur, atau bundle.",
    accent: "green",
  },
  {
    number: "02",
    title: "Sesuaikan perjalanan",
    description: "Atur durasi, jumlah peserta, tanggal, dan destinasi sesuai keinginan Anda.",
    accent: "yellow",
  },
  {
    number: "03",
    title: "Lihat estimasi biaya",
    description: "Lihat estimasi dalam USD, EUR, dan IDR secara transparan, lalu kirim request ke Admin Valora.",
    accent: "green",
  },
  {
    number: "04",
    title: "Konsultasi & konfirmasi via WhatsApp",
    description: "Kirim request ke Admin Valora untuk konfirmasi jadwal dan armada.",
    accent: "yellow",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Cara Kerja"
            title="Empat langkah menuju Turki"
            description="Proses yang sederhana dan transparan — dari eksplorasi hingga konfirmasi."
            className="mb-12"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <RevealOnScroll key={step.number} delay={idx * 120} y={20}>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={cn(
                      "font-serif text-3xl font-semibold",
                      step.accent === "green" ? "text-terracotta" : "text-gold"
                    )}
                  >
                    {step.number}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-border-warm" />
                  )}
                </div>
                <h3 className="font-medium text-charcoal mb-2 text-base">
                  {step.title}
                </h3>
                <p className="text-sm text-warm-grey leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
