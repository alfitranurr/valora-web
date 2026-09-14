"use client";

import { SlidersHorizontal, Clock, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CatalogSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
  icon?: "clock" | "sliders";
  widthClass?: string;
}

export function CatalogSelect({
  value,
  onChange,
  options,
  ariaLabel,
  icon = "sliders",
  widthClass = "sm:w-56",
}: CatalogSelectProps) {
  const Icon: LucideIcon = icon === "clock" ? Clock : SlidersHorizontal;

  return (
    <div className={`relative ${widthClass} flex-shrink-0`}>
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-8 py-2.5 border border-border-warm rounded-lg text-sm bg-surface appearance-none focus:outline-none focus:border-terracotta cursor-pointer"
        aria-label={ariaLabel}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
    </div>
  );
}
