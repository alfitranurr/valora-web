import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { getServiceBySlug, services } from "@/data/services";
import { estimateWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const whatsappUrl = estimateWhatsAppUrl({
    serviceName: service.name,
    totalUSD: service.priceUSD,
    totalIDR: service.priceIDR,
  });

  return (
    <div className="bg-ivory">
      <section className="pt-8 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-warm-grey hover:text-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke layanan
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <RevealOnScroll y={20}>
              <div className="rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full aspect-[4/3]"
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100} y={20}>
              <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-terracotta uppercase tracking-wide">
                  {service.categoryLabel}
                </span>
                {service.bestSeller && (
                  <Badge variant="bestseller">Best Seller</Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal leading-tight mb-4">
                {service.name}
              </h1>

              <p className="text-warm-grey text-base leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-warm-grey">
                  <Clock className="w-4 h-4 text-terracotta" />
                  {service.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-grey">
                  <Users className="w-4 h-4 text-terracotta" />
                  {service.capacity}
                </div>
              </div>

              <div className="bg-surface border border-border-warm rounded-lg p-5 mb-6">
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Estimasi Tarif
                </p>
                <p className="text-2xl font-semibold text-charcoal">
                  Rp {service.priceIDR.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-warm-grey">
                  ${service.priceUSD} · {service.unit}
                </p>
                <p className="mt-2 text-xs text-warm-grey italic">
                  Harga final dikonfirmasi oleh Admin Valora
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/kalkulator" variant="primary" size="md">
                  Pesan Sekarang
                </Button>
                <WhatsAppButton url={whatsappUrl} variant="secondary" size="md" />
              </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-ivory-dark border-t border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <RevealOnScroll y={16}>
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Highlight
                </h2>
                <ul className="space-y-3">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100} y={16}>
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Termasuk dalam Layanan
                </h2>
                <ul className="space-y-3">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
