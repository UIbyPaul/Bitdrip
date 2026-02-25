"use client";

import { useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useVault } from "@/hooks/useVault";
import { ConnectPrompt } from "@/components/wallet/ConnectPrompt";
import { SUPPORTED_TOKENS } from "@/lib/contracts";
import { formatTokenAmount } from "@/utils";

export default function WithdrawPage() {
  const { isConnected } = useAccount();
  const { vault, hasVault, withdrawFunds } = useVault();
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isConnected)
    return <ConnectPrompt message="Connect your wallet to withdraw." />;

  const token =
    SUPPORTED_TOKENS.find(
      (t) =>
        t.address.toLowerCase() === vault?.depositToken?.toLowerCase()
    ) ?? SUPPORTED_TOKENS[0];

  const vaultBalance = vault?.totalDeposited
    ? formatTokenAmount(vault.totalDeposited, token.decimals, 2)
    : "0.00";

  async function handleWithdraw() {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsSubmitting(true);
    await withdrawFunds(amount, token.decimals);
    setAmount("");
    setIsSubmitting(false);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Withdrawal</h1>
      <p className="text-blue-500 mb-8">
        Enter your withdrawal details below:
      </p>

      {!hasVault ? (
        <div className="text-center py-12 text-blue-400">
          No active vault to withdraw from.
        </div>
      ) : (
        <div className="space-y-5 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <div className="text-sm text-blue-500 mb-1">Available in vault</div>
            <div className="text-2xl font-bold text-gray-800">
              {vaultBalance}{" "}
              <span className="text-blue-500">{token.symbol}</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Withdrawal Address
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 pr-20"
              />
              <button
                onClick={() => setAmount(vaultBalance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500 font-semibold hover:text-blue-700"
              >
                MAX
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs">
            ⚠️ Withdrawing will reduce your remaining drip balance. Your vault
            plan will stay active until funds run out.
          </div>

          <button
            onClick={handleWithdraw}
            disabled={isSubmitting || !amount || !hasVault}
            className="w-full py-3 rounded-xl text-white font-semibold transition-colors disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" }}
          >
            {isSubmitting ? "Withdrawing..." : "Confirm Withdrawal"}
          </button>
        </div>
      )}
    </div>
  );
}
