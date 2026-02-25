"use client";

import { VaultInfo } from "@/types";
import { formatTokenAmount } from "@/utils";

export function VaultOverview({ vault }: { vault: VaultInfo | null }) {
  const btc = vault?.totalBtcPurchased
    ? formatTokenAmount(vault.totalBtcPurchased, 8, 8)
    : "0.00000000";

  return (
    <div className="p-5 rounded-2xl bg-white border border-blue-200 space-y-2">
      <div className="text-sm text-blue-500">Total BTC Stacked</div>
      <div className="text-3xl font-bold text-blue-600 font-mono">
        ₿ {btc}
      </div>
      <div className="text-xs text-blue-400">
        {vault?.dripsExecuted ?? 0} of {vault?.totalDrips ?? 0} drips completed
      </div>
    </div>
  );
}
