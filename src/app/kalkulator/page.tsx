import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Estimator } from "./Estimator";
import { KursDisplay } from "@/components/shared/KursDisplay";

export const metadata = {
  title: "Pesan Trip",
  description:
    "Pilih layanan, sesuaikan perjalanan, lihat estimasi biaya, dan kirim request ke Admin Valora untuk konfirmasi.",
};

export default function KalkulatorPage() {
  return (
    <div className="bg-ivory">
      <PageHeader
        eyebrow="Booking"
        title="Pilih Layanan, Lihat Estimasi, Kirim Request"
        description="Pilih layanan, sesuaikan detail, dan lihat estimasi instan dalam USD, EUR, dan IDR. Lalu kirim request ke Admin Valora untuk konfirmasi."
        below={
          <p className="mt-4 text-sm text-warm-grey">
            <KursDisplay /> · Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
          </p>
        }
      />

      <section className="py-12 md:py-16 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={240} y={20}>
            <Estimator />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
