import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { generalConsultationUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[500px] max-h-[700px] w-full overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1774429307435-35651939a7a9?auto=format&fit=crop&w=2000&q=80"
          alt="Balon udara saat sunrise di Cappadocia, Turki — pemandangan ikonik perjalanan Turki"
          className="absolute inset-0 w-full h-full"
          imgClassName="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div className="max-w-2xl">
              <p
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm md:text-base mb-4 uppercase tracking-wide animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-6 h-0.5 rounded-full bg-terracotta" />
                Private Tour Turki untuk Wisatawan Indonesia
              </p>
              <h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ivory leading-tight animate-fade-in"
                style={{ animationDelay: "0.25s" }}
              >
                Jelajahi Turki dengan Cara Anda.
              </h1>
              <p
                className="mt-5 text-ivory/80 text-base md:text-lg leading-relaxed max-w-xl animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                Private tour, guide berlisensi, armada VIP Mercedes-Benz, dan
                itinerary fleksibel untuk perjalanan Turki yang lebih nyaman.
              </p>
              <div
                className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in"
                style={{ animationDelay: "0.55s" }}
              >
                <Link
                  href="/kalkulator"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3.5 text-sm shadow-sm transition-all duration-300 ease-out hover:bg-gold-light hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Pesan Trip
                </Link>
                <a
                  href={generalConsultationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-terracotta text-white font-semibold rounded-lg px-6 py-3.5 text-sm shadow-sm transition-all duration-300 ease-out hover:bg-terracotta-dark hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasi via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
