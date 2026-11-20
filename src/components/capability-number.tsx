"use client";

import { useEffect, useRef } from "react";

const format = new Intl.NumberFormat("en");

export function CapabilityNumber({ value }: { value: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const formatted = format.format(value);

  useEffect(() => {
    const number = numberRef.current;
    if (!number || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const animate = (now: number) => {
        const progress = Math.min(1, (now - started) / 580);
        const eased = 1 - (1 - progress) ** 3;
        number.textContent = format.format(Math.round(value * (0.82 + 0.18 * eased)));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.5 });

    observer.observe(number);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      number.textContent = formatted;
    };
  }, [value, formatted]);

  return <><span aria-hidden="true" className="capability-number" ref={numberRef}>{formatted}</span><span className="sr-only">{formatted}</span></>;
}
