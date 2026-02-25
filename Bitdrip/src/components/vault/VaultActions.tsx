"use client";

import { useState } from "react";
import { useVault } from "@/hooks/useVault";
import { VaultInfo } from "@/types";

export function VaultActions({ vault }: { vault: VaultInfo | null }) {
  const { pauseVault, resumeVault, closeVault } = useVault();
  const [confirming, setConfirming] = useState(false);

  const isPaused = vault?.isPaused ?? false;

  return (
    <div className="p-5 rounded-2xl bg-white border border-blue-200 space-y-4">
      <div className="text-sm font-semibold text-gray-700">Vault Controls</div>
      <div className="flex flex-wrap gap-3">
        {isPaused ? (
          <button
            onClick={resumeVault}
            className="px-5 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium border border-green-500/20 transition-colors text-sm"
          >
            ▶ Resume Vault
          </button>
        ) : (
          <button
            onClick={pauseVault}
            className="px-5 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium border border-yellow-500/20 transition-colors text-sm"
          >
            ⏸ Pause Vault
          </button>
        )}

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="px-5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium border border-red-500/20 transition-colors text-sm"
          >
            ✕ Close Vault
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-500">Are you sure?</span>
            <button
              onClick={() => {
                closeVault();
                setConfirming(false);
              }}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
            >
              Yes, close
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="px-4 py-2 rounded-xl bg-blue-50 text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
