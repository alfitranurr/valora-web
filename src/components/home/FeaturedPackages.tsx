import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PackageCard } from "@/components/cards/PackageCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { tourPackages } from "@/data/packages";

export function FeaturedPackages() {
  const packages = tourPackages.slice(0, 3);

  return (
    <section className="py-20 md:py-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              eyebrow="Paket Tour"
              title="Paket tur pilihan populer"
              description="Tur all-inclusive ke destinasi terbaik Turki dengan armada private Mercedes-Benz."
            />
            <Link
              href="/tour-packages"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border-warm text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 ease-out hover:border-terracotta/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Semua paket
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <RevealOnScroll key={pkg.id} delay={idx * 120}>
              <PackageCard pkg={pkg} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/tour-packages"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border-warm text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 ease-out hover:border-terracotta/30 hover:shadow-md active:scale-[0.97]"
          >
            Semua paket
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
