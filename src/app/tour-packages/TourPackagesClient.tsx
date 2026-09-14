"use client";

import { useCallback, useMemo, useState } from "react";
import { PackageCard } from "@/components/cards/PackageCard";
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
import type { TourPackage } from "@/types";

interface TourPackagesClientProps {
  packages: TourPackage[];
}

const sorters: CatalogSorter<TourPackage>[] = [
  {
    id: "populer",
    label: "Paling Populer",
    compare: (a, b) => {
      const rankOf = (s: TourPackage) => (s.bestSeller ? 1 : 0);
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
    id: "durasi-asc",
    label: "Durasi: Singkat → Lama",
    compare: (a, b) => a.durationDays - b.durationDays,
  },
  {
    id: "durasi-desc",
    label: "Durasi: Lama → Singkat",
    compare: (a, b) => b.durationDays - a.durationDays,
  },
  {
    id: "nama-asc",
    label: "Nama: A → Z",
    compare: (a, b) => a.name.localeCompare(b.name, "id"),
  },
];

export function TourPackagesClient({ packages }: TourPackagesClientProps) {
  const [destination, setDestination] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");

  const destinations = useMemo(() => {
    const set = new Set(packages.map((p) => p.destination));
    return ["all", ...Array.from(set)];
  }, [packages]);

  const durationOptions = useMemo(() => {
    const set = new Set(packages.map((p) => p.durationDays));
    return ["all", ...Array.from(set)].sort((a, b) => Number(a) - Number(b));
  }, [packages]);

  const scoped = useMemo(
    () =>
      packages.filter(
        (p) =>
          (destination === "all" || p.destination === destination) &&
          (duration === "all" || p.durationDays === Number(duration))
      ),
    [packages, destination, duration]
  );

  const searchFn = useCallback(
    (p: TourPackage, q: string) =>
      p.name.toLowerCase().includes(q) ||
      p.destination.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
    []
  );

  const filters = useCatalogFilters(scoped, { searchFn, sorters });

  const hasActiveFilters =
    destination !== "all" || duration !== "all" || filters.hasLocalFilters;

  const resetFilters = () => {
    setDestination("all");
    setDuration("all");
    filters.resetLocalFilters();
  };

  return (
    <>
      <RevealOnScroll y={16}>
        <div className="flex flex-wrap gap-2 mb-4">
          {destinations.map((d) => (
            <button
              key={d}
              onClick={() => setDestination(d)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 active:scale-[0.97]",
                destination === d
                  ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                  : "bg-surface text-charcoal border-border-warm hover:border-charcoal/30 hover:shadow-sm"
              )}
            >
              {d === "all" ? "Semua Destinasi" : d}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <CatalogSearch
            value={filters.query}
            onChange={filters.setQuery}
            placeholder="Cari paket… (mis. Istanbul, balon, Cappadocia)"
            ariaLabel="Cari paket tour"
          />
          <CatalogSelect
            value={duration}
            onChange={setDuration}
            options={durationOptions.map((d) => ({
              value: String(d),
              label: d === "all" ? "Semua Durasi" : `${d} Hari`,
            }))}
            ariaLabel="Filter durasi"
            icon="clock"
            widthClass="sm:w-40"
          />
          <CatalogSelect
            value={filters.sort}
            onChange={filters.setSort}
            options={filters.sorters.map((s) => ({ value: s.id, label: s.label }))}
            ariaLabel="Urutkan paket"
          />
          <CatalogTagToggle
            active={filters.bestSellerOnly}
            onClick={filters.toggleBestSeller}
          />
        </div>

        <CatalogCountBar
          shown={filters.result.length}
          total={packages.length}
          noun="paket"
          showReset={hasActiveFilters}
          onReset={resetFilters}
        />
      </RevealOnScroll>

      {filters.result.length === 0 ? (
        <CatalogEmptyState
          title="Tidak ada paket yang cocok"
          description="Coba ubah kata kunci atau filter, atau konsultasi via WhatsApp untuk custom trip."
          onReset={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filters.result.map((pkg, idx) => (
            <RevealOnScroll key={pkg.id} delay={Math.min(80 + idx * 60, 440)}>
              <PackageCard pkg={pkg} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </>
  );
}
