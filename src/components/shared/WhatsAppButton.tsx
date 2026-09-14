"use client";

import { Button } from "./Button";
import { generalConsultationUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  url?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WhatsAppButton({
  url,
  label = "Konsultasi WhatsApp",
  variant = "secondary",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  const href = url || generalConsultationUrl();

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      icon={MessageCircle}
      iconPosition="left"
      className={cn(className)}
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel={label}
    >
      {label}
    </Button>
  );
}
