"use client";

import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { useVault } from "@/hooks/useVault";
import { ConnectPrompt } from "@/components/wallet/ConnectPrompt";
import { VaultOverview } from "@/components/vault/VaultOverview";
import { NextDripCard } from "@/components/vault/NextDripCard";
import { DripProgress } from "@/components/vault/DripProgress";
import { VaultActions } from "@/components/vault/VaultActions";
import { DripHistoryTable } from "@/components/vault/DripHistoryTable";

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const { vault, hasVault, vaultLoading, nextDripTime, canDrip } = useVault();

  if (!isConnected) {
    return <ConnectPrompt message="Connect your wallet to view your vault." />;
  }

  if (vaultLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-blue-400 animate-pulse">Loading vault...</div>
      </div>
    );
  }

  if (!hasVault) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="text-6xl">🪙</div>
        <h2 className="text-2xl font-bold text-gray-800">No vault yet</h2>
        <p className="text-blue-500">
          Set up your first drip plan to start stacking BTC.
        </p>
        <Link
          href="/setup"
          className="px-6 py-3 rounded-xl text-white font-semibold transition-colors shadow-md"
          style={{ background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" }}
        >
          Create Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Your Vault</h1>
        {vault?.isPaused && (
          <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 text-sm">
            Paused
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VaultOverview vault={vault} />
        <NextDripCard nextDripTime={nextDripTime} canDrip={canDrip} />
        <DripProgress vault={vault} />
      </div>

      {/* Actions */}
      <VaultActions vault={vault} />

      {/* History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Execution History</h2>
        <DripHistoryTable />
      </div>
    </div>
  );
}
