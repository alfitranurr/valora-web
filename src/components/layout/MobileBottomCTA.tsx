"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, MessageCircle } from "lucide-react";
import { generalConsultationUrl } from "@/lib/whatsapp";

export function MobileBottomCTA() {
  const pathname = usePathname();

  if (pathname === "/kalkulator" || pathname === "/custom-trip") {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-sm border-t border-border-warm px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-3">
        <Link
          href="/kalkulator"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-charcoal font-semibold text-sm rounded-lg px-4 py-3 transition-colors hover:bg-gold-light"
        >
          <Calculator className="w-4 h-4" />
          Hitung Biaya
        </Link>
        <a
          href={generalConsultationUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Konsultasi via WhatsApp"
          className="inline-flex items-center justify-center gap-2 bg-terracotta text-white font-medium text-sm rounded-lg px-4 py-3 transition-colors hover:bg-terracotta-dark"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
