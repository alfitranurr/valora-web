import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "w-full",
        align === "center" && "mx-auto text-center max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-0.5 rounded-full bg-gold" />
          <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
            {eyebrow}
          </p>
        </div>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl font-semibold leading-tight",
          dark ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base md:text-lg leading-relaxed",
            dark ? "text-ivory/70" : "text-warm-grey"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
