"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVault } from "@/hooks/useVault";
import { DripFrequency, DripPlan } from "@/types";
import { SUPPORTED_TOKENS } from "@/lib/contracts";
import { FREQUENCY_LABELS, estimatedTotalCost } from "@/utils";

const FREQUENCIES = Object.entries(FREQUENCY_LABELS) as [
  DripFrequency,
  string
][];

export function SetupForm() {
  const router = useRouter();
  const { createVault } = useVault();

  const [amount, setAmount] = useState("10");
  const [frequency, setFrequency] = useState<DripFrequency>("weekly");
  const [totalDrips, setTotalDrips] = useState(12);
  const [tokenIdx, setTokenIdx] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = SUPPORTED_TOKENS[tokenIdx];
  const totalCost = estimatedTotalCost(amount, totalDrips);

  async function handleSubmit() {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsSubmitting(true);

    const plan: DripPlan = { amount, token, frequency, totalDrips };
    await createVault(plan);

    setIsSubmitting(false);
    router.push("/dashboard");
  }

  return (
    <div className="space-y-6 p-6 rounded-2xl bg-white border border-blue-200">
      {/* Token */}
      <div>
        <label className="text-sm text-blue-500 block mb-2">Deposit Token</label>
        <select
          value={tokenIdx}
          onChange={(e) => setTokenIdx(Number(e.target.value))}
          className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        >
          {SUPPORTED_TOKENS.map((t, i) => (
            <option key={t.symbol} value={i}>
              {t.symbol} — {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount per drip */}
      <div>
        <label className="text-sm text-blue-500 block mb-2">
          Amount per drip ({token.symbol})
        </label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Frequency */}
      <div>
        <label className="text-sm text-blue-500 block mb-2">Frequency</label>
        <div className="grid grid-cols-2 gap-2">
          {FREQUENCIES.map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFrequency(value)}
              className={`py-3 rounded-xl font-medium border transition-colors text-sm ${
                frequency === value
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white border-blue-200 text-blue-500 hover:border-blue-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Total drips */}
      <div>
        <label className="text-sm text-blue-500 block mb-2">
          Number of drips:{" "}
          <span className="text-white font-semibold">{totalDrips}</span>
        </label>
        <input
          type="range"
          min={4}
          max={52}
          step={1}
          value={totalDrips}
          onChange={(e) => setTotalDrips(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-blue-400 mt-1">
          <span>4</span>
          <span>52</span>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm space-y-2">
        <div className="font-semibold text-blue-600 mb-2">Plan Summary</div>
        {[
          { label: "Per drip", value: `${amount} ${token.symbol}` },
          { label: "Frequency", value: FREQUENCY_LABELS[frequency] },
          { label: "Total drips", value: totalDrips },
          {
            label: "Total cost",
            value: `${totalCost} ${token.symbol}`,
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <span className="text-blue-500">{label}</span>
            <span>{String(value)}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !amount}
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition-colors"
      >
        {isSubmitting ? "Creating Vault..." : "Create Vault →"}
      </button>
    </div>
  );
}
