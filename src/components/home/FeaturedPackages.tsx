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
              eyebrow="Tour Packages"
              title="Paket tur pilihan populer"
              description="Tur all-inclusive ke destinasi terbaik Turki dengan armada private Mercedes-Benz."
            />
            <Link
              href="/tour-packages"
              className="group hidden md:inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-xl bg-transparent border border-border-warm text-sm font-semibold text-charcoal transition-all duration-300 ease-out hover:border-terracotta/40 hover:bg-surface hover:shadow-sm active:scale-[0.97]"
            >
              Semua paket
              <span className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta">
                <ArrowRight className="w-4 h-4 text-charcoal transition-colors duration-300 group-hover:text-white" />
              </span>
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
            className="group w-full inline-flex items-center justify-between pl-5 pr-2 py-2 rounded-xl bg-transparent border border-border-warm text-sm font-semibold text-charcoal transition-all duration-300 ease-out hover:border-terracotta/40 hover:bg-surface hover:shadow-sm active:scale-[0.97]"
          >
            Semua paket
            <span className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta">
              <ArrowRight className="w-4 h-4 text-charcoal transition-colors duration-300 group-hover:text-white" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
