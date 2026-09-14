import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { getFeaturedServices } from "@/data/services";

export function FeaturedServices() {
  const featured = getFeaturedServices();

  return (
    <section className="py-20 md:py-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              eyebrow="Layanan Unggulan"
              title="Semua yang Anda butuhkan untuk Turki"
              description="Dari tour guide berlisensi hingga armada VIP dan fotografer profesional — semuanya private untuk grup Anda."
            />
            <Link
              href="/services"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border-warm text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 ease-out hover:border-terracotta/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Lihat semua layanan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, idx) => (
            <RevealOnScroll key={service.id} delay={idx * 120}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/services"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border-warm text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 ease-out hover:border-terracotta/30 hover:shadow-md active:scale-[0.97]"
          >
            Lihat semua layanan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
