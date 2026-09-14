import { SectionHeader } from "@/components/shared/SectionHeader";
import { Estimator } from "@/components/estimator/Estimator";
import { KursDisplay } from "@/components/shared/KursDisplay";

export const metadata = {
  title: "Kalkulator Estimasi Biaya — Valora Tour & Travel",
  description:
    "Hitung estimasi biaya perjalanan ke Turki secara transparan dalam USD, EUR, dan IDR. Pilih layanan, durasi, dan add-on untuk melihat estimasi instan.",
};

export default function KalkulatorPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kalkulator"
            title="Estimasi biaya perjalanan ke Turki"
            description="Pilih layanan, sesuaikan detail, dan lihat estimasi instan dalam USD, EUR, dan IDR. Tanpa komitmen pembayaran awal."
          />
          <p className="mt-4 text-sm text-warm-grey">
            <KursDisplay /> · Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
          </p>
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
