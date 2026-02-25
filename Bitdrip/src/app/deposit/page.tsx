"use client";

import { useState } from "react";
import { useAccount } from "@starknet-react/core";
import { ConnectPrompt } from "@/components/wallet/ConnectPrompt";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { SUPPORTED_TOKENS } from "@/lib/contracts";
import { useVaultStore } from "@/store/vaultStore";

export default function DepositPage() {
  const { isConnected } = useAccount();
  const { addNotification } = useVaultStore();
  const [tokenIdx, setTokenIdx] = useState(0);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = SUPPORTED_TOKENS[tokenIdx];
  const { formatted: balance } = useTokenBalance(token.address, token.decimals);

  if (!isConnected) {
    return <ConnectPrompt message="Connect your wallet to deposit funds." />;
  }

  async function handleDeposit() {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsSubmitting(true);
    try {
      // TODO: call ERC20 approve → vault deposit
      addNotification({
        type: "success",
        title: "Deposit submitted",
        message: `${amount} ${token.symbol} deposited to vault.`,
      });
      setAmount("");
    } catch (err) {
      addNotification({
        type: "error",
        title: "Deposit failed",
        message: String(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Deposit Funds</h1>
      <p className="text-blue-500 mb-8">
        Top up your vault balance to keep your drips running.
      </p>

      <div className="space-y-5 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm">
        {/* Token selector */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Token</label>
          <select
            value={tokenIdx}
            onChange={(e) => setTokenIdx(Number(e.target.value))}
            className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500"
          >
            {SUPPORTED_TOKENS.map((t, i) => (
              <option key={t.symbol} value={i}>
                {t.symbol} — {t.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-blue-400 mt-1">
            Wallet balance: {balance} {token.symbol}
          </p>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Amount</label>
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
              onClick={() => setAmount(balance)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500 font-semibold hover:text-blue-700"
            >
              MAX
            </button>
          </div>
        </div>

        <button
          onClick={handleDeposit}
          disabled={isSubmitting || !amount}
          className="w-full py-3 rounded-xl text-white font-semibold transition-colors disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" }}
        >
          {isSubmitting ? "Depositing..." : `Deposit ${token.symbol}`}
        </button>
      </div>
    </div>
  );
}
