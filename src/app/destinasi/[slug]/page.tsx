import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, MapPin, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/shared/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  destinationToken,
  destinations,
  getDestinationById,
} from "@/data/destinations";
import { tourPackages } from "@/data/packages";
import { generalConsultationUrl } from "@/lib/whatsapp";
import { formatIDR, formatPriceUSD } from "@/lib/currency";
import { DestinationGalleryStrip } from "./DestinationGalleryStrip";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationById(slug);
  if (!destination) return {};

  return {
    title: destination.name,
    description: destination.description,
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [{ url: destination.gallery?.[0] ?? destination.image }],
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationById(slug);

  if (!destination) notFound();

  const related = tourPackages.filter(
    (p) => destinationToken(p.destination) === destinationToken(destination.name)
  );

  const heroImage = destination.gallery?.[0] ?? destination.image;

  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] max-h-[450px] w-full overflow-hidden">
        <ImageWithFallback
          src={heroImage}
          alt={`Destinasi wisata ${destination.name}, ${destination.region} — Turki`}
          className="absolute inset-0 w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <RevealOnScroll y={16}>
              <Link
                href="/destinasi"
                className="inline-flex items-center gap-1.5 text-sm text-ivory/70 hover:text-ivory transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke destinasi
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={80} y={16}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-gold/90 uppercase tracking-wide">
                  {destination.region}
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-ivory leading-tight drop-shadow">
                {destination.name}
              </h1>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <RevealOnScroll y={20} className="lg:col-span-2">
              <div>
                <p className="text-warm-grey text-base leading-relaxed mb-8">
                  {destination.description}
                </p>

                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Yang Layak Dilewatkan di {destination.name.split(" ")[0]}
                </h2>
                <ul className="space-y-3 mb-8">
                  {destination.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                {destination.gallery && destination.gallery.length > 1 && (
                  <div className="mb-2">
                    <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                        Galeri {destination.name}
                    </h2>
                    <DestinationGalleryStrip
                      destination={destination}
                    />
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {/* Sidebar */}
            <RevealOnScroll delay={120} y={20} className="lg:col-span-1">
              <div className="space-y-6">
                {related.length > 0 && (
                  <div className="bg-surface border border-border-warm rounded-lg p-6">
                    <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
                      Paket untuk {destination.name.split(" ")[0]}
                    </h3>
                    <ul className="space-y-3 mb-5">
                      {related.map((pkg) => (
                        <li key={pkg.id}>
                          <Link
                            href={`/tour-packages/${pkg.slug}`}
                            className="block p-3 rounded-lg border border-border-warm hover:border-terracotta/40 transition-all duration-200"
                          >
                            <p className="text-sm font-medium text-charcoal leading-snug">
                              {pkg.name}
                            </p>
                            <p className="text-xs text-warm-grey mt-1">
                              {formatIDR(pkg.priceIDR)} · {formatPriceUSD(pkg.priceUSD)} ·{" "}
                              {pkg.duration}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/tour-packages"
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Lihat Semua Paket
                    </Button>
                  </div>
                )}

                <div className="bg-surface border border-border-warm rounded-lg p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-terracotta" />
                    <p className="text-sm font-medium text-charcoal">
                      {destination.region}
                    </p>
                  </div>
                  <p className="text-sm text-warm-grey leading-relaxed mb-5">
                    Tertarik menjelajahi {destination.name}? Konsultasikan
                    itinerary private Anda dengan Admin Valora via WhatsApp.
                  </p>
                  <div className="flex flex-col gap-3">
                    <WhatsAppButton
                      url={generalConsultationUrl()}
                      label="Konsultasi WhatsApp"
                      variant="secondary"
                      size="md"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
