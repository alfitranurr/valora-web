import { SectionHeader } from "@/components/shared/SectionHeader";
import { BundleCard } from "@/components/cards/BundleCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { bundles } from "@/data/bundles";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export const metadata = {
  title: "Bundle Paket Hemat — Valora Tour & Travel",
  description:
    "Kombinasi layanan tour guide, transport VIP, fotografer, dan airport assistance dengan harga hemat.",
};

export default function BundlesPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Bundle Hemat"
              title="Paket kombinasi layanan"
              description="Solusi paling praktis dan mewah. Dapatkan guide, armada VIP, dan fotografer dalam satu paket — lebih hemat dibanding pesan satuan."
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {bundles.map((b, idx) => (
              <RevealOnScroll key={b.id} delay={idx * 100}>
                <BundleCard bundle={b} />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll y={20}>
            <div className="bg-ivory-dark border border-border-warm rounded-lg p-6 md:p-8 text-center">
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
                Butuh kombinasi yang berbeda?
              </h2>
              <p className="text-sm text-warm-grey mb-5 max-w-md mx-auto">
                Konsultasi dengan Admin Valora untuk merancang bundle kustom
                sesuai kebutuhan grup Anda.
              </p>
              <WhatsAppButton
                label="Konsultasi Bundle Kustom"
                variant="secondary"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
