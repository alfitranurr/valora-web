import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { getBundleBySlug, bundles } from "@/data/bundles";
import { estimateWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export const metadata = {
  title: "Bundle Detail — Valora Tour & Travel",
};

export default async function BundleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);

  if (!bundle) notFound();

  const whatsappUrl = estimateWhatsAppUrl({
    serviceName: bundle.name,
    totalUSD: bundle.priceUSD,
    totalIDR: bundle.priceIDR,
  });

  return (
    <div className="bg-ivory">
      <section className="relative h-[40vh] min-h-[300px] max-h-[450px] w-full overflow-hidden">
        <ImageWithFallback
          src={bundle.image}
          alt={`${bundle.name}`}
          className="absolute inset-0 w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <RevealOnScroll y={16}>
              <Link
                href="/bundles"
                className="inline-flex items-center gap-1.5 text-sm text-ivory/70 hover:text-ivory transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Bundles
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={80} y={16}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gold/90 uppercase tracking-wide">
                  Bundle
                </span>
                {bundle.bestSeller && (
                  <Badge variant="bestseller">Best Seller</Badge>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-ivory leading-tight drop-shadow">
                {bundle.name}
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
                  {bundle.description}
                </p>

                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Highlight Bundle
                </h2>
                <ul className="space-y-3 mb-8">
                  {bundle.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                {bundle.savingsNote && (
                  <div className="bg-terracotta/5 border border-terracotta/20 rounded-lg p-5 mb-6">
                    <p className="text-sm font-semibold text-terracotta">
                      {bundle.savingsNote}
                    </p>
                  </div>
                )}

                <div className="bg-ivory-dark border border-border-warm rounded-lg p-5">
                  <h3 className="font-medium text-charcoal mb-2">
                    Catatan Penting
                  </h3>
                  <p className="text-sm text-warm-grey leading-relaxed">
                    Estimasi tarif yang ditampilkan adalah harga katalog. Harga
                    final dan itinerary dikonfirmasi oleh Admin Valora melalui
                    WhatsApp. Jadwal dan armada langsung dikonfirmasi setelah
                    konsultasi.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120} y={20} className="lg:col-span-1">
              <div className="bg-surface border border-border-warm rounded-lg p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-4 text-sm text-warm-grey">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-terracotta" />
                    {bundle.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-terracotta" />
                    {bundle.capacity}
                  </div>
                </div>

                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Estimasi Tarif
                </p>
                <p className="text-2xl font-semibold text-charcoal">
                  Rp {bundle.priceIDR.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-warm-grey mb-1">
                  ${bundle.priceUSD} · {bundle.unit}
                </p>
                <p className="text-xs text-warm-grey italic mb-5">
                  Harga final dikonfirmasi oleh Admin Valora
                </p>

                <div className="flex flex-col gap-3">
                  <Button href="/kalkulator" variant="primary" size="md" className="w-full">
                    Pesan Sekarang
                  </Button>
                  <WhatsAppButton
                    url={whatsappUrl}
                    variant="secondary"
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
