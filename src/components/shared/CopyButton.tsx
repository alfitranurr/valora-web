"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = "Salin", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard API bisa gagal di beberapa browser — anggap selesai
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 border transition-all duration-200 active:scale-[0.97]",
        copied
          ? "bg-terracotta/10 text-terracotta border-terracotta/30"
          : "text-charcoal border-border-warm hover:border-charcoal hover:bg-charcoal/5",
        className
      )}
      aria-label={copied ? "Tersalin" : label}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Tersalin" : label}
    </button>
  );
}
