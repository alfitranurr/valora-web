"use client";

import { Search } from "lucide-react";

interface CatalogEmptyStateProps {
  title?: string;
  description: string;
  resetLabel?: string;
  onReset: () => void;
}

export function CatalogEmptyState({
  title = "Tidak ada yang cocok",
  description,
  resetLabel = "Reset semua filter",
  onReset,
}: CatalogEmptyStateProps) {
  return (
    <div className="py-16 text-center bg-ivory-dark border border-border-warm rounded-lg">
      <Search className="w-8 h-8 text-warm-grey mx-auto mb-3" />
      <p className="text-sm font-medium text-charcoal mb-1">{title}</p>
      <p className="text-sm text-warm-grey mb-4">{description}</p>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium text-terracotta hover:underline"
      >
        {resetLabel}
      </button>
    </div>
  );
}
