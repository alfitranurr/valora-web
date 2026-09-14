"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes,
  reveal = true,
}: ImageWithFallbackProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackSrc =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f5f7f5'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='14' fill='%2315734d' text-anchor='middle' dy='.3em'%3EValora Tour%3C/text%3E%3C/svg%3E";

  return (
    <div className={cn("relative overflow-hidden bg-ivory-dark", className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-ivory-dark" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          reveal && loaded && !error && "image-reveal",
          imgClassName
        )}
      />
    </div>
  );
}
