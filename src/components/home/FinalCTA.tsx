import Link from "next/link";
import { Calculator, MessageCircle, Route } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { KursDisplay } from "@/components/shared/KursDisplay";
import { SITE_CONFIG } from "@/data/config";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24 bg-ivory-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll y={24}>
          <div className="relative rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80"
              alt="Perjalanan keliling Turki dengan armada VIP — jalan raya antar kota dengan pemandangan alam"
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-charcoal/75" />

            <div className="relative px-6 py-16 md:px-16 md:py-24 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ivory leading-tight max-w-2xl mx-auto">
                Siap merencanakan perjalanan Turki Anda?
              </h2>
              <p className="mt-4 text-ivory/70 text-base md:text-lg max-w-xl mx-auto">
                Hitung estimasi biaya, rancang custom itinerary, atau langsung
                konsultasi dengan Admin Valora.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/kalkulator"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3.5 text-sm transition-all hover:bg-gold-light hover:shadow-lg"
                >
                  <Calculator className="w-4 h-4" />
                  Hitung Estimasi Biaya
                </Link>
                <Link
                  href="/custom-trip"
                  className="inline-flex items-center justify-center gap-2 bg-charcoal/40 backdrop-blur text-ivory font-medium rounded-lg px-6 py-3.5 text-sm border border-ivory/30 transition-all hover:bg-charcoal/60 hover:border-gold/50"
                >
                  <Route className="w-4 h-4" />
                  Rancang Custom Trip
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    "Halo Admin Valora Tour, saya ingin konsultasi perjalanan ke Turki."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-terracotta text-white font-medium rounded-lg px-6 py-3.5 text-sm transition-all hover:bg-terracotta-dark hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasi WhatsApp
                </a>
              </div>
              <p className="mt-6 text-xs text-ivory/50">
                <KursDisplay /> · Tanpa komitmen pembayaran awal
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
