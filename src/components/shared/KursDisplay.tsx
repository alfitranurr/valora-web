"use client";

import { useKurs, formatKursLabel } from "@/hooks/useKurs";
import { cn } from "@/lib/utils";
import { Loader2, Wifi, RefreshCw } from "lucide-react";
import { useState } from "react";

interface KursDisplayProps {
  className?: string;
  showSource?: boolean;
}

export function KursDisplay({ className, showSource = false }: KursDisplayProps) {
  const { kurs, loading, refetch } = useKurs();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs text-warm-grey", className)}>
        <Loader2 className="w-3 h-3 animate-spin" />
        Memuat kurs...
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs text-warm-grey", className)}>
      {kurs.isLive && <Wifi className="w-3 h-3 text-terracotta" />}
      {formatKursLabel(kurs)}
      {showSource && kurs.isLive && (
        <span className="text-warm-grey/60">
          · {kurs.source}
        </span>
      )}
      <button
        onClick={handleRefresh}
        className="ml-1 inline-flex items-center justify-center hover:text-terracotta transition-colors"
        aria-label="Refresh kurs"
        title="Refresh kurs"
      >
        <RefreshCw className={cn("w-3 h-3", refreshing && "animate-spin")} />
      </button>
    </span>
  );
}
