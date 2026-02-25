"use client";

import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { useVault } from "@/hooks/useVault";
import { ConnectPrompt } from "@/components/wallet/ConnectPrompt";
import {
  formatTokenAmount,
  secondsToFrequencyLabel,
  vaultProgress,
  estimatedTotalCost,
} from "@/utils";
import { SUPPORTED_TOKENS } from "@/lib/contracts";

export default function PlanPage() {
  const { isConnected } = useAccount();
  const { vault, hasVault, vaultLoading } = useVault();

  if (!isConnected)
    return <ConnectPrompt message="Connect your wallet to view your plan." />;

  if (vaultLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-blue-500 animate-pulse">
        Loading plan...
      </div>
    );

  if (!hasVault || !vault)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="text-6xl">📋</div>
        <h2 className="text-2xl font-bold">No active plan</h2>
        <p className="text-blue-500">Create a vault to set up your drip plan.</p>
        <Link
          href="/setup"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Create Plan
        </Link>
      </div>
    );

  const token =
    SUPPORTED_TOKENS.find(
      (t) => t.address.toLowerCase() === vault.depositToken.toLowerCase()
    ) ?? SUPPORTED_TOKENS[0];

  const dripAmountFormatted = formatTokenAmount(vault.dripAmount, token.decimals, 2);
  const totalCost = estimatedTotalCost(dripAmountFormatted, vault.totalDrips);
  const progress = vaultProgress(vault);
  const remaining = vault.totalDrips - vault.dripsExecuted;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Drip Plan</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${
            vault.isPaused
              ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
              : "bg-green-500/10 border-green-500/20 text-green-400"
          }`}
        >
          {vault.isPaused ? "Paused" : "Active"}
        </span>
      </div>

      {/* Plan details */}
      <div className="p-6 rounded-2xl bg-white border border-blue-200 space-y-4">
        {[
          { label: "Token", value: token.symbol },
          { label: "Drip Amount", value: `${dripAmountFormatted} ${token.symbol}` },
          { label: "Frequency", value: secondsToFrequencyLabel(vault.frequency) },
          { label: "Total Drips", value: vault.totalDrips },
          { label: "Drips Done", value: vault.dripsExecuted },
          { label: "Remaining", value: remaining },
          { label: "Total Cost", value: `${totalCost} ${token.symbol}` },
          {
            label: "BTC Purchased",
            value: `₿ ${formatTokenAmount(vault.totalBtcPurchased, 8, 8)}`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-center border-b border-blue-100 pb-3 last:border-0 last:pb-0"
          >
            <span className="text-blue-500 text-sm">{label}</span>
            <span className="font-medium">{String(value)}</span>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="p-5 rounded-2xl bg-white border border-blue-200 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-blue-500">Progress</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-blue-50 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/deposit"
          className="flex-1 text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Top Up
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 text-center py-3 rounded-xl bg-white hover:bg-blue-50 border border-blue-200 text-white font-semibold transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
