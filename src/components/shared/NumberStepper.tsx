"use client";

import { Minus, Plus } from "lucide-react";

interface NumberStepperProps {
  /** Label teks di atas stepper. */
  label: string;
  /** id input untuk htmlFor + fill kontrol otomatis. */
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  /** Nilai saat input kosong/non-angka; default = min. */
  fallback?: number;
  /** Teks setelah input, mis. "hari" atau "juta 3-14 hari". */
  trailing?: string;
  ariaMinus?: string;
  ariaPlus?: string;
}

export function NumberStepper({
  label,
  id,
  value,
  min,
  max,
  onChange,
  fallback,
  trailing,
  ariaMinus,
  ariaPlus,
}: NumberStepperProps) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  const handleInput = (raw: string) => {
    const parsed = parseInt(raw, 10);
    const next = Number.isNaN(parsed) ? (fallback ?? min) : clamp(parsed);
    onChange(next);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          className="w-10 h-10 rounded-lg border border-border-warm flex items-center justify-center hover:border-charcoal hover:bg-charcoal/5 transition-all duration-200 active:scale-[0.90]"
          aria-label={ariaMinus ?? `Kurangi ${label.toLowerCase()}`}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => handleInput(e.target.value)}
          className="w-16 text-center font-medium border border-border-warm rounded-lg py-2 focus:outline-none focus:border-terracotta"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          className="w-10 h-10 rounded-lg border border-border-warm flex items-center justify-center hover:border-charcoal hover:bg-charcoal/5 transition-all duration-200 active:scale-[0.90]"
          aria-label={ariaPlus ?? `Tambah ${label.toLowerCase()}`}
        >
          <Plus className="w-4 h-4" />
        </button>
        {trailing && <span className="text-sm text-warm-grey">{trailing}</span>}
      </div>
    </div>
  );
}
