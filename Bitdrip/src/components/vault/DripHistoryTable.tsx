"use client";

import { DripEvent } from "@/types";
import { formatTokenAmount, getTxUrl } from "@/utils";
import { getTxUrl as getTx } from "@/lib/contracts";
import { format } from "date-fns";

// Wire this up to on-chain events via starknet.js RPC or an indexer (e.g. Apibara)
const MOCK_HISTORY: DripEvent[] = [];

export function DripHistoryTable() {
  if (MOCK_HISTORY.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-2xl bg-white border border-blue-200 text-center gap-2">
        <div className="text-3xl">⏳</div>
        <div className="text-blue-500 text-sm">
          No drips executed yet. Your history will appear here once the vault
          starts running.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-blue-200">
      <table className="w-full text-sm">
        <thead className="border-b border-blue-200 bg-white">
          <tr className="text-blue-500">
            <th className="px-4 py-3 text-left">Drip #</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-right">Spent</th>
            <th className="px-4 py-3 text-right">BTC Received</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-left">Tx</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_HISTORY.map((drip) => (
            <tr
              key={drip.txHash}
              className="border-b border-blue-100 hover:bg-white transition-colors"
            >
              <td className="px-4 py-3 font-mono">#{drip.dripNumber}</td>
              <td className="px-4 py-3 text-blue-500">
                {format(drip.timestamp * 1000, "MMM d, yyyy HH:mm")}
              </td>
              <td className="px-4 py-3 text-right">
                {formatTokenAmount(drip.amount, 6, 2)} USDC
              </td>
              <td className="px-4 py-3 text-right text-blue-600 font-mono">
                ₿ {formatTokenAmount(drip.btcReceived, 8, 8)}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    drip.status === "success"
                      ? "bg-green-500/20 text-green-400"
                      : drip.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {drip.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <a
                  href={getTx(drip.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-mono text-xs"
                >
                  {drip.txHash.slice(0, 8)}...
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
