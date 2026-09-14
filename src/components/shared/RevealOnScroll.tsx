"use client";

import { useRef, useState, useEffect, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  blur?: boolean;
  y?: number;
  once?: boolean;
  id?: string;
}

export function RevealOnScroll({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  blur = true,
  y = 16,
  once = true,
  id,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isVisible
          ? "opacity-100 blur-0 translate-y-0"
          : `opacity-0 ${blur ? "blur-md" : "blur-0"}`,
        className
      )}
      style={{
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
