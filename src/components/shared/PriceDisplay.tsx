import { formatPriceIDR } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceIDR: number;
  priceUSD?: number;
  unit?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  priceIDR,
  priceUSD,
  unit,
  className,
  size = "md",
}: PriceDisplayProps) {
  const textSize = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("font-semibold text-charcoal", textSize[size])}>
        {formatPriceIDR(priceIDR)}
      </span>
      {priceUSD !== undefined && (
        <span className="text-sm font-medium text-gold">
          ${priceUSD} {unit && `· ${unit}`}
        </span>
      )}
      {!priceUSD && unit && (
        <span className="text-sm text-warm-grey">{unit}</span>
      )}
    </div>
  );
}
