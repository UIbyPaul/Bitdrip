"use client";

import { VaultInfo } from "@/types";
import { vaultProgress } from "@/utils";

export function DripProgress({ vault }: { vault: VaultInfo | null }) {
  const pct = vault ? vaultProgress(vault) : 0;

  return (
    <div className="p-5 rounded-2xl bg-white border border-blue-200 space-y-3">
      <div className="text-sm text-blue-500">Plan Progress</div>
      <div className="text-3xl font-bold">{pct}%</div>
      <div className="w-full bg-blue-50 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-blue-400">
        {vault?.dripsExecuted ?? 0} of {vault?.totalDrips ?? 0} drips done
      </div>
    </div>
  );
}
