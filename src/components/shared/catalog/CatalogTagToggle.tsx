"use client";

import { cn } from "@/lib/utils";

interface CatalogTagToggleProps {
  active: boolean;
  onClick: () => void;
  label?: string;
}

export function CatalogTagToggle({
  active,
  onClick,
  label = "★ Best Seller",
}: CatalogTagToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5 flex-shrink-0",
        active
          ? "bg-gold/15 text-gold border-gold/30"
          : "bg-surface text-charcoal border-border-warm hover:border-charcoal/30"
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
