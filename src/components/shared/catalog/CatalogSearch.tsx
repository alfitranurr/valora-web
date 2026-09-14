"use client";

import { Search, X } from "lucide-react";

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}

export function CatalogSearch({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: CatalogSearchProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 border border-border-warm rounded-lg text-sm bg-surface focus:outline-none focus:border-terracotta"
        aria-label={ariaLabel}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-warm-grey hover:text-charcoal"
          aria-label="Hapus pencarian"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
