import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TourPackagesClient } from "./TourPackagesClient";
import { tourPackages } from "@/data/packages";
import { BundleCard } from "@/components/cards/BundleCard";
import { bundles } from "@/data/bundles";

export const metadata = {
  title: "Paket Tour Turki — Valora Tour & Travel",
  description:
    "Paket tur all-inclusive ke Istanbul, Bursa, Cappadocia, dan Pamukkale dengan armada private Mercedes-Benz dan guide berlisensi.",
};

export default function TourPackagesPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Tour Packages"
              title="Paket Tur Pilihan ke Destinasi Terbaik Turki"
              description="Tur all-inclusive dengan armada private Mercedes-Benz Vito. Filter per destinasi, pencarian, sorting harga dan durasi dalam sekali klik."
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TourPackagesClient packages={tourPackages} />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-ivory-dark border-t border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Bundles"
              title="Hemat Lebih Banyak dengan Bundle"
              description="Kombinasi layanan dengan harga lebih terjangkau dibanding pesan satuan."
              className="mb-10"
            />
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.map((b, idx) => (
              <RevealOnScroll key={b.id} delay={idx * 100} y={20}>
                <BundleCard bundle={b} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
