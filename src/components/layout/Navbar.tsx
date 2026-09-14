"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/destinasi", label: "Destinasi" },
  { href: "/tour-packages", label: "Tour Packages" },
  { href: "/services", label: "Services" },
  { href: "/custom-trip", label: "Custom Trip" },
  { href: "/kalkulator", label: "Pesan" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-ivory/95 backdrop-blur-sm border-b border-border-warm"
          : "bg-ivory border-b border-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded"
            aria-label="Valora Tour and Travel - Beranda"
          >
            <span className="font-serif text-xl font-semibold text-charcoal tracking-tight">
              VALORA
            </span>
            <span className="text-xs text-gold font-semibold tracking-wide uppercase hidden sm:inline">
              Tour & Travel
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded",
                  pathname === link.href
                    ? "text-terracotta"
                    : "text-charcoal/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <WhatsAppButton label="Konsultasi WhatsApp" size="sm" variant="secondary" />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-charcoal rounded-lg transition-all duration-200 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta hover:bg-charcoal/5"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border-warm animate-fade-in">
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-terracotta bg-terracotta/5"
                      : "text-charcoal hover:bg-charcoal/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 px-3">
                <WhatsAppButton
                  label="Konsultasi WhatsApp"
                  size="md"
                  variant="secondary"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
