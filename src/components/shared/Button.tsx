import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

const variantStyles = {
  primary: "bg-charcoal text-ivory hover:bg-charcoal-light",
  secondary: "bg-terracotta text-white hover:bg-terracotta-dark",
  outline: "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  ghost: "text-charcoal hover:bg-charcoal/5",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className,
  type = "button",
  disabled,
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const baseClass = cn(
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
