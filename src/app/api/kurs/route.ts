import { NextResponse } from "next/server";

export const revalidate = 300;

const FALLBACK = {
  USD_IDR: 17630,
  USD_EUR: 0.92,
};

async function fetchFromOpenER(): Promise<{ rates: Record<string, number> } | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchFromFrankfurter(): Promise<{ rates: Record<string, number> } | null> {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=IDR,EUR", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchFromExchangeRateAPI(): Promise<{ rates: Record<string, number> } | null> {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function GET() {
  const sources = [
    { fn: fetchFromOpenER, name: "open.er-api.com" },
    { fn: fetchFromFrankfurter, name: "frankfurter.app" },
    { fn: fetchFromExchangeRateAPI, name: "exchangerate-api.com" },
  ];

  for (const source of sources) {
    const data = await source.fn();
    if (data?.rates?.IDR && data?.rates?.EUR) {
      return NextResponse.json({
        USD_IDR: Math.round(data.rates.IDR),
        USD_EUR: Math.round(data.rates.EUR * 100) / 100,
        source: source.name,
        lastUpdated: new Date().toISOString(),
        isLive: true,
      });
    }
  }

  return NextResponse.json({
    ...FALLBACK,
    source: "fallback",
    lastUpdated: new Date().toISOString(),
    isLive: false,
  });
}
