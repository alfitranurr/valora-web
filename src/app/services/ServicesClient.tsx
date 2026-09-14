"use client";

import { useState } from "react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { Service, ServiceCategory } from "@/types";

interface ServicesClientProps {
  categories: { id: "all" | ServiceCategory; label: string }[];
  allServices: Service[];
}

export default function ServicesClient({
  categories,
  allServices,
}: ServicesClientProps) {
  const [active, setActive] = useState<"all" | ServiceCategory>("all");

  const filtered =
    active === "all"
      ? allServices
      : allServices.filter((s) => s.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg border transition-all",
              active === cat.id
                ? "bg-charcoal text-ivory border-charcoal"
                : "bg-surface text-charcoal border-border-warm hover:border-charcoal/30"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service, idx) => (
          <RevealOnScroll key={service.id} delay={idx * 80}>
            <ServiceCard service={service} />
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}
