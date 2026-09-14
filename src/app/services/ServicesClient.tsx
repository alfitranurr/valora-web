"use client";

import { useCallback, useMemo, useState } from "react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import {
  useCatalogFilters,
  type CatalogSorter,
} from "@/components/shared/catalog/useCatalogFilters";
import { CatalogSearch } from "@/components/shared/catalog/CatalogSearch";
import { CatalogSelect } from "@/components/shared/catalog/CatalogSelect";
import { CatalogTagToggle } from "@/components/shared/catalog/CatalogTagToggle";
import { CatalogCountBar } from "@/components/shared/catalog/CatalogCountBar";
import { CatalogEmptyState } from "@/components/shared/catalog/CatalogEmptyState";
import type { Service, ServiceCategory } from "@/types";

interface ServicesClientProps {
  categories: { id: "all" | ServiceCategory; label: string }[];
  allServices: Service[];
}

const sorters: CatalogSorter<Service>[] = [
  {
    id: "populer",
    label: "Paling Populer",
    compare: (a, b) => {
      const rankOf = (s: Service) => (s.featured ? 2 : 0) + (s.bestSeller ? 1 : 0);
      return rankOf(b) - rankOf(a);
    },
  },
  {
    id: "harga-asc",
    label: "Harga: Rendah → Tinggi",
    compare: (a, b) => a.priceUSD - b.priceUSD,
  },
  {
    id: "harga-desc",
    label: "Harga: Tinggi → Rendah",
    compare: (a, b) => b.priceUSD - a.priceUSD,
  },
  {
    id: "nama-asc",
    label: "Nama: A → Z",
    compare: (a, b) => a.name.localeCompare(b.name, "id"),
  },
];

export default function ServicesClient({
  categories,
  allServices,
}: ServicesClientProps) {
  const [category, setCategory] = useState<"all" | ServiceCategory>("all");

  const categoryFiltered = useMemo(
    () =>
      category === "all"
        ? allServices
        : allServices.filter((s) => s.category === category),
    [allServices, category]
  );

  const searchFn = useCallback(
    (s: Service, q: string) =>
      s.name.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q),
    []
  );

  const filters = useCatalogFilters(categoryFiltered, {
    searchFn,
    sorters,
  });

  const hasActiveFilters = category !== "all" || filters.hasLocalFilters;

  const resetFilters = () => {
    setCategory("all");
    filters.resetLocalFilters();
  };

  return (
    <>
      <RevealOnScroll y={16}>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 active:scale-[0.97]",
                category === cat.id
                  ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                  : "bg-surface text-charcoal border-border-warm hover:border-charcoal/30 hover:shadow-sm"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <CatalogSearch
            value={filters.query}
            onChange={filters.setQuery}
            placeholder="Cari layanan… (mis. guide, airport, Vito)"
            ariaLabel="Cari layanan"
          />
          <CatalogSelect
            value={filters.sort}
            onChange={filters.setSort}
            options={filters.sorters.map((s) => ({ value: s.id, label: s.label }))}
            ariaLabel="Urutkan layanan"
          />
          <CatalogTagToggle
            active={filters.bestSellerOnly}
            onClick={filters.toggleBestSeller}
          />
        </div>

        <CatalogCountBar
          shown={filters.result.length}
          total={allServices.length}
          noun="layanan"
          showReset={hasActiveFilters}
          onReset={resetFilters}
        />
      </RevealOnScroll>

      {filters.result.length === 0 ? (
        <CatalogEmptyState
          title="Tidak ada layanan yang cocok"
          description="Coba ubah kata kunci atau terapkan ulang filter."
          resetLabel="Reset semua filter"
          onReset={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filters.result.map((service, idx) => (
            <RevealOnScroll key={service.id} delay={Math.min(80 + idx * 60, 440)}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </>
  );
}
