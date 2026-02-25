"use client";

import { useState, useEffect } from "react";
import { formatCountdown } from "@/utils";

export function useCountdown(targetTimestamp: number | undefined) {
  const [label, setLabel] = useState<string>("—");

  useEffect(() => {
    if (!targetTimestamp) return;

    const tick = () => setLabel(formatCountdown(targetTimestamp));
    tick(); // run immediately

    const interval = setInterval(tick, 30_000); // refresh every 30s
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return label;
}
