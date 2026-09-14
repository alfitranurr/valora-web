import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Estimator } from "@/components/estimator/Estimator";
import { KursDisplay } from "@/components/shared/KursDisplay";

export const metadata = {
  title: "Pesan Trip — Valora Tour & Travel",
  description:
    "Pilih layanan, sesuaikan perjalanan, lihat estimasi biaya, dan kirim request ke Admin Valora untuk konfirmasi.",
};

export default function KalkulatorPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Pesan Trip"
              title="Pilih layanan, lihat estimasi, kirim request"
              description="Pilih layanan, sesuaikan detail, dan lihat estimasi instan dalam USD, EUR, dan IDR. Lalu kirim request ke Admin Valora untuk konfirmasi."
            />
            <RevealOnScroll delay={100} y={12}>
              <p className="mt-4 text-sm text-warm-grey">
                <KursDisplay /> · Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
              </p>
            </RevealOnScroll>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Estimator />
        </div>
      </section>
    </div>
  );
}
