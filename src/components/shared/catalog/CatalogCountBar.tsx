"use client";

import { X } from "lucide-react";

interface CatalogCountBarProps {
  shown: number;
  total: number;
  noun: string;
  showReset: boolean;
  onReset: () => void;
}

export function CatalogCountBar({
  shown,
  total,
  noun,
  showReset,
  onReset,
}: CatalogCountBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
      <p className="text-xs text-warm-grey" role="status">
        Menampilkan{" "}
        <span className="font-semibold text-charcoal">{shown}</span> dari {total}{" "}
        {noun}
      </p>
      {showReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-terracotta hover:underline"
        >
          <X className="w-3.5 h-3.5" />
          Reset filter
        </button>
      )}
    </div>
  );
}
