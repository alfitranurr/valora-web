"use client";

import { useKurs, formatKursLabel } from "@/hooks/useKurs";
import { cn } from "@/lib/utils";
import { Loader2, Wifi, RefreshCw } from "lucide-react";
import { useState } from "react";

interface KursDisplayProps {
  className?: string;
  showSource?: boolean;
  dark?: boolean;
}

export function KursDisplay({ className, showSource = false, dark = false }: KursDisplayProps) {
  const { kurs, loading, refetch } = useKurs();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const textColor = dark ? "text-ivory/80" : "text-warm-grey";
  const mutedColor = dark ? "text-ivory/50" : "text-warm-grey/60";

  if (loading) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs", textColor, className)}>
        <Loader2 className="w-3 h-3 animate-spin" />
        Memuat kurs...
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", textColor, className)}>
      {kurs.isLive && <Wifi className="w-3 h-3 text-gold" />}
      {formatKursLabel(kurs)}
      {showSource && kurs.isLive && (
        <span className={mutedColor}>
          · {kurs.source}
        </span>
      )}
      <button
        onClick={handleRefresh}
        className="ml-1 inline-flex items-center justify-center hover:text-gold transition-colors"
        aria-label="Refresh kurs"
        title="Refresh kurs"
      >
        <RefreshCw className={cn("w-3 h-3", refreshing && "animate-spin")} />
      </button>
    </span>
  );
}
