import { SectionHeader } from "@/components/shared/SectionHeader";
import { CustomTripForm } from "@/components/custom-trip/CustomTripForm";
import { KursDisplay } from "@/components/shared/KursDisplay";

export const metadata = {
  title: "Custom Turkey Roadtrip — Valora Tour & Travel",
  description:
    "Rancang perjalanan keliling Turki sendiri dengan armada VIP Mercedes-Benz. Pilih armada, durasi, destinasi, dan kirim request ke Admin Valora.",
};

export default function CustomTripPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Custom Trip"
            title="Customized Private Full Turkey Roadtrip"
            description="Rancang rute keliling Turki sendiri sesuai impian dan tanggal liburan keluarga Anda. Armada VIP Mercedes-Benz eksklusif untuk grup Anda."
          />
          <p className="mt-4 text-sm text-warm-grey">
            <KursDisplay /> · Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CustomTripForm />
        </div>
      </section>
    </div>
  );
}
