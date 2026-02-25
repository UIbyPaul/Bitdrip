"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { shortenAddress } from "@/utils";

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors text-blue-100 hover:bg-blue-50"
      >
        <span className="w-2 h-2 rounded-full bg-green-400" />
        {shortenAddress(address)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="px-3 py-1.5 rounded-xl text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-50"
    >
      Connect Wallet
    </button>
  );
}
