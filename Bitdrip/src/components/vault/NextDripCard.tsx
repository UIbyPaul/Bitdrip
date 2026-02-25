"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  nextDripTime: number | undefined;
  canDrip: boolean | undefined;
}

export function NextDripCard({ nextDripTime, canDrip }: Props) {
  const countdown = useCountdown(nextDripTime);

  return (
    <div className="p-5 rounded-2xl bg-white border border-blue-200 space-y-2">
      <div className="text-sm text-blue-500">Next Drip</div>
      <div className="text-3xl font-bold">
        {canDrip ? (
          <span className="text-green-400">Ready ✓</span>
        ) : (
          <span>{countdown}</span>
        )}
      </div>
      <div className="text-xs text-blue-400">
        {canDrip ? "Ready to execute on-chain" : "Until next BTC purchase"}
      </div>
    </div>
  );
}
