import { ShieldCheck, Award, Car, Receipt } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const trustPoints = [
  { icon: ShieldCheck, label: "100% Private Trip" },
  { icon: Award, label: "Guide Berlisensi Resmi Turki" },
  { icon: Car, label: "Armada VIP Mercedes-Benz" },
  { icon: Receipt, label: "Harga Transparan" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border-warm bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {trustPoints.map((point, idx) => (
            <RevealOnScroll
              key={point.label}
              delay={idx * 80}
              y={10}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-terracotta/10 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-terracotta" />
              </div>
              <span className="text-sm font-medium text-charcoal">
                {point.label}
              </span>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
