import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "bestseller" | "default" | "gold";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const styles = {
    bestseller: "bg-gold/15 text-gold border-gold/30",
    default: "bg-charcoal/5 text-charcoal border-charcoal/10",
    gold: "bg-gold/10 text-gold border-gold/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
