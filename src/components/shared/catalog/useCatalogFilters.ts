"use client";

import { useMemo, useState } from "react";

export interface CatalogSorter<T> {
  id: string;
  label: string;
  compare?: (a: T, b: T) => number;
}

interface Options<T> {
  /** Predikat pencarian teks per item (query sudah di-lowercase). */
  searchFn: (item: T, query: string) => boolean;
  /** Daftar opsi sorting; item pertama menjadi default. */
  sorters: CatalogSorter<T>[];
  /** ID sorter awal; default = sorter pertama. */
  initialSort?: string;
}

/**
 * State filter katalog yang dipakai bersama di halaman Services, Tour Packages,
 * dan Destinasi: pencarian teks, toggle best-seller (bila item punya flag),
 * dan sorting. Filter khusus (kategori/destinasi/durasi/region) tetap di
 * halaman masing-masing.
 */
export function useCatalogFilters<T extends object>(
  items: T[],
  { searchFn, sorters, initialSort }: Options<T>
) {
  const fallbackSort = initialSort ?? sorters[0]?.id ?? "";
  const [query, setQuery] = useState("");
  const [bestSellerOnly, setBestSellerOnly] = useState(false);
  const [sort, setSort] = useState(fallbackSort);

  const result = useMemo(() => {
    let list = [...items];

    if (bestSellerOnly) {
      list = list.filter((item) => (item as { bestSeller?: boolean }).bestSeller);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => searchFn(item, q));
    }

    const sorter = sorters.find((s) => s.id === sort);
    if (sorter?.compare) {
      list.sort(sorter.compare);
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, query, bestSellerOnly, sort]);

  return {
    query,
    setQuery,
    bestSellerOnly,
    toggleBestSeller: () => setBestSellerOnly((v) => !v),
    sort,
    setSort,
    sorters,
    result,
    hasLocalFilters: query.trim() !== "" || bestSellerOnly || sort !== fallbackSort,
    resetLocalFilters: () => {
      setQuery("");
      setBestSellerOnly(false);
      setSort(fallbackSort);
    },
  };
}
