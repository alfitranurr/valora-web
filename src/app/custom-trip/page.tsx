import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CustomTripForm } from "./CustomTripForm";
import { KursDisplay } from "@/components/shared/KursDisplay";

export const metadata = {
  title: "Custom Turkey Roadtrip",
  description:
    "Rancang perjalanan keliling Turki sendiri dengan armada VIP Mercedes-Benz. Pilih armada, durasi, destinasi, dan kirim request ke Admin Valora.",
};

export default function CustomTripPage() {
  return (
    <div className="bg-ivory">
      <PageHeader
        eyebrow="Custom Trip"
        title="Private Roadtrip Keliling Turki"
        description="Rancang rute keliling Turki sendiri sesuai impian dan tanggal liburan keluarga Anda. Armada VIP Mercedes-Benz eksklusif untuk grup Anda."
        below={
          <p className="mt-4 text-sm text-warm-grey">
            <KursDisplay /> · Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
          </p>
        }
      />

      <section className="py-12 md:py-16 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={240} y={20}>
            <CustomTripForm />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
