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
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
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
            className="inline-flex items-center gap-1 text-sm font-medium text-terracotta"
          >
            Lihat semua layanan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
