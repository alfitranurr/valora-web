"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SITE_CONFIG } from "@/data/config";

export interface KursData {
  USD_IDR: number;
  USD_EUR: number;
  isLive: boolean;
  source: string;
  lastUpdated: string;
}

const CACHE_KEY = "valora_kurs_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function readCache(): KursData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: KursData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // ignore
  }
}

const fallbackKurs: KursData = {
  USD_IDR: SITE_CONFIG.exchangeRate.USD_IDR,
  USD_EUR: SITE_CONFIG.exchangeRate.USD_EUR,
  isLive: false,
  source: "fallback",
  lastUpdated: new Date().toISOString(),
};

export function useKurs() {
  const [kurs, setKurs] = useState<KursData>(fallbackKurs);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const fetchKurs = useCallback(async (bypassCache = false) => {
    if (!bypassCache) {
      const cached = readCache();
      if (cached) {
        setKurs(cached);
        setLoading(false);
        return;
      }
    }

    if (bypassCache && typeof window !== "undefined") {
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch {
        // ignore
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/kurs", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const data: KursData = await res.json();
      setKurs(data);
      writeCache(data);
    } catch {
      setKurs(fallbackKurs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void fetchKurs();
  }, [fetchKurs]);

  const refetch = useCallback(() => fetchKurs(true), [fetchKurs]);

  return { kurs, loading, refetch };
}

export function formatKursLabel(kurs: KursData): string {
  const rateStr = kurs.USD_IDR.toLocaleString("id-ID");
  if (kurs.isLive) {
    return `Kurs real-time — 1 USD = Rp ${rateStr}`;
  }
  return `Kurs acuan — 1 USD = Rp ${rateStr}`;
}
