"use client";

import { useCallback, useMemo, useState } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import {
  useCatalogFilters,
  type CatalogSorter,
} from "@/components/shared/catalog/useCatalogFilters";
import { CatalogSearch } from "@/components/shared/catalog/CatalogSearch";
import { CatalogSelect } from "@/components/shared/catalog/CatalogSelect";
import { CatalogCountBar } from "@/components/shared/catalog/CatalogCountBar";
import { CatalogEmptyState } from "@/components/shared/catalog/CatalogEmptyState";
import type { Destination } from "@/types";

interface DestinationsClientProps {
  destinations: Destination[];
}

const sorters: CatalogSorter<Destination>[] = [
  {
    id: "rekomendasi",
    label: "Direkomendasikan",
    compare: (a, b) => {
      const rankOf = (d: Destination) => (d.featured ? 1 : 0);
      return rankOf(b) - rankOf(a);
    },
  },
  {
    id: "nama-asc",
    label: "Nama: A → Z",
    compare: (a, b) => a.name.localeCompare(b.name, "id"),
  },
  {
    id: "region-asc",
    label: "Region: A → Z",
    compare: (a, b) =>
      a.region.localeCompare(b.region, "id") || a.name.localeCompare(b.name, "id"),
  },
];

export function DestinationsClient({ destinations }: DestinationsClientProps) {
  const [region, setRegion] = useState<string>("all");

  const regions = useMemo(() => {
    const set = new Set(destinations.map((d) => d.region));
    return ["all", ...Array.from(set)];
  }, [destinations]);

  const searchFn = useCallback(
    (d: Destination, q: string) =>
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.highlights.join(" ").toLowerCase().includes(q),
    []
  );

  const filters = useCatalogFilters(destinations, { searchFn, sorters });

  // Opsi C: featured yang tampil sebagai kartu besar di atas halaman
  // disembunyikan dari grid saat tidak relevan (Semua region + tanpa pencarian).
  const showFeaturedInGrid =
    region !== "all" || filters.query.trim() !== "";

  const gridItems = useMemo(
    () =>
      filters.result.filter(
        (d) => showFeaturedInGrid || !d.featured
      ),
    [filters.result, showFeaturedInGrid]
  );

  const hasActiveFilters = region !== "all" || filters.hasLocalFilters;

  const resetFilters = () => {
    setRegion("all");
    filters.resetLocalFilters();
  };

  return (
    <>
      <RevealOnScroll y={16}>
        <div className="flex flex-wrap gap-2 mb-4">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 active:scale-[0.97]",
                region === r
                  ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                  : "bg-surface text-charcoal border-border-warm hover:border-charcoal/30 hover:shadow-sm"
              )}
            >
              {r === "all" ? "Semua Region" : r}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <CatalogSearch
            value={filters.query}
            onChange={filters.setQuery}
            placeholder="Cari destinasi… (mis. balon, Ephesus, Sumela)"
            ariaLabel="Cari destinasi"
          />
          <CatalogSelect
            value={filters.sort}
            onChange={filters.setSort}
            options={filters.sorters.map((s) => ({ value: s.id, label: s.label }))}
            ariaLabel="Urutkan destinasi"
          />
        </div>

        <CatalogCountBar
          shown={gridItems.length}
          total={destinations.length}
          noun="destinasi"
          showReset={hasActiveFilters}
          onReset={resetFilters}
        />
      </RevealOnScroll>

      {gridItems.length === 0 ? (
        <CatalogEmptyState
          title="Tidak ada destinasi yang cocok"
          description="Coba ubah kata kunci atau pilih region lain."
          resetLabel="Reset semua filter"
          onReset={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridItems.map((dest, idx) => (
            <RevealOnScroll key={dest.id} id={dest.id} delay={Math.min(80 + idx * 60, 440)}>
              <DestinationCard destination={dest} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </>
  );
}
