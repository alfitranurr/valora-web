import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { KursDisplay } from "@/components/shared/KursDisplay";

const footerLinks = [
  { href: "/destinasi", label: "Destinasi" },
  { href: "/tour-packages", label: "Tour Packages" },
  { href: "/services", label: "Services" },
  { href: "/custom-trip", label: "Custom Trip" },
  { href: "/kalkulator", label: "Kalkulator" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pb-16 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-2xl font-semibold tracking-tight text-gold">
                VALORA
              </span>
              <span className="text-xs text-ivory/60 font-medium tracking-wide uppercase">
                Tour & Travel
              </span>
            </div>
            <p className="text-ivory/70 text-sm leading-relaxed max-w-md">
              {SITE_CONFIG.tagline}. Private tour dengan guide berlisensi,
              armada VIP Mercedes-Benz, dan itinerary fleksibel.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                label="Chat via WhatsApp"
                size="sm"
                variant="secondary"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wide">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wide">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-terracotta" />
                <span>{SITE_CONFIG.whatsappDisplay}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                <span>{SITE_CONFIG.operations}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                <span>Representatif: {SITE_CONFIG.representative}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-terracotta" />
                <span>Bantuan darurat: {SITE_CONFIG.emergencySupport}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ivory/50">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-xs text-ivory/50">
              <KursDisplay />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
