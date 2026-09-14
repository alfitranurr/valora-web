"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Clock } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { TourPackage } from "@/types";

interface TourPackagesClientProps {
  packages: TourPackage[];
}

type SortOption = "populer" | "harga-asc" | "harga-desc" | "durasi-asc" | "durasi-desc" | "nama-asc";

const sortOptions: { id: SortOption; label: string }[] = [
  { id: "populer", label: "Paling Populer" },
  { id: "harga-asc", label: "Harga: Rendah → Tinggi" },
  { id: "harga-desc", label: "Harga: Tinggi → Rendah" },
  { id: "durasi-asc", label: "Durasi: Singkat → Lama" },
  { id: "durasi-desc", label: "Durasi: Lama → Singkat" },
  { id: "nama-asc", label: "Nama: A → Z" },
];

export function TourPackagesClient({
  packages,
}: TourPackagesClientProps) {
  const [destination, setDestination] = useState<string>("all");
  const [duration, setDuration] = useState<number | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("populer");
  const [bestSellerOnly, setBestSellerOnly] = useState(false);

  const destinations = useMemo(() => {
    const set = new Set(packages.map((p) => p.destination));
    return ["all", ...Array.from(set)];
  }, [packages]);

  const durationOptions = useMemo(() => {
    const set = new Set(packages.map((p) => p.durationDays));
    return ["all", ...Array.from(set)].sort();
  }, [packages]);

  const result = useMemo(() => {
    let list = [...packages];

    if (destination !== "all") {
      list = list.filter((p) => p.destination === destination);
    }
    if (duration !== "all") {
      list = list.filter((p) => p.durationDays === duration);
    }
    if (bestSellerOnly) {
      list = list.filter((p) => p.bestSeller);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "harga-asc":
        list.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case "harga-desc":
        list.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case "durasi-asc":
        list.sort((a, b) => a.durationDays - b.durationDays);
        break;
      case "durasi-desc":
        list.sort((a, b) => b.durationDays - a.durationDays);
        break;
      case "nama-asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "id"));
        break;
      case "populer":
      default:
        list.sort((a, b) => {
          const rankOf = (s: TourPackage) => (s.bestSeller ? 1 : 0);
          return rankOf(b) - rankOf(a);
        });
        break;
    }

    return list;
  }, [packages, destination, duration, query, sort, bestSellerOnly]);

  const hasActiveFilters =
    destination !== "all" || duration !== "all" || query.trim() !== "" || bestSellerOnly;

  const resetFilters = () => {
    setDestination("all");
    setDuration("all");
    setQuery("");
    setBestSellerOnly(false);
    setSort("populer");
  };

  const destinationLabel = (d: string) =>
    d === "all" ? "Semua Destinasi" : d;

  return (
    <>
      {/* Filter kategori destinasi */}
      <RevealOnScroll y={16}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
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
              {destinationLabel(d)}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          {/* Pencarian */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari paket… (mis. Istanbul, balon, Cappadocia)"
              className="w-full pl-10 pr-9 py-2.5 border border-border-warm rounded-lg text-sm bg-surface focus:outline-none focus:border-terracotta"
              aria-label="Cari paket tour"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-warm-grey hover:text-charcoal"
                aria-label="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Durasi */}
          <div className="relative sm:w-40 flex-shrink-0">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
            <select
              value={String(duration)}
              onChange={(e) =>
                setDuration(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="w-full pl-10 pr-8 py-2.5 border border-border-warm rounded-lg text-sm bg-surface appearance-none focus:outline-none focus:border-terracotta cursor-pointer"
              aria-label="Filter durasi"
            >
              <option value="all">Semua Durasi</option>
              {durationOptions.map((d) => (
                <option key={String(d)} value={String(d)}>
                  {d} Hari
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
          </div>

          {/* Urutkan */}
          <div className="relative sm:w-56 flex-shrink-0">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full pl-10 pr-8 py-2.5 border border-border-warm rounded-lg text-sm bg-surface appearance-none focus:outline-none focus:border-terracotta cursor-pointer"
              aria-label="Urutkan paket"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
          </div>

          {/* Toggle best seller */}
          <button
            type="button"
            onClick={() => setBestSellerOnly((v) => !v)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5 flex-shrink-0",
              bestSellerOnly
                ? "bg-gold/15 text-gold border-gold/30"
                : "bg-surface text-charcoal border-border-warm hover:border-charcoal/30"
            )}
            aria-pressed={bestSellerOnly}
          >
            ★ Best Seller
          </button>
        </div>

        {/* Info jumlah + reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
          <p className="text-xs text-warm-grey" role="status">
            Menampilkan <span className="font-semibold text-charcoal">{result.length}</span>{" "}
            dari {packages.length} paket
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-terracotta hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              Reset filter
            </button>
          )}
        </div>
      </RevealOnScroll>

      {/* Grid hasil */}
      {result.length === 0 ? (
        <div className="py-16 text-center bg-ivory-dark border border-border-warm rounded-lg">
          <Search className="w-8 h-8 text-warm-grey mx-auto mb-3" />
          <p className="text-sm font-medium text-charcoal mb-1">
            Tidak ada paket yang cocok
          </p>
          <p className="text-sm text-warm-grey mb-4">
            Coba ubah kata kunci atau filter, atau konsultasi via WhatsApp untuk
            custom trip.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-terracotta hover:underline"
          >
            Reset semua filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map((pkg, idx) => (
            <RevealOnScroll key={pkg.id} delay={Math.min(80 + idx * 60, 440)}>
              <PackageCard pkg={pkg} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </>
  );
}
