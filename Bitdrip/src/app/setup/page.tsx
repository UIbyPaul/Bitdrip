"use client";

import { useAccount } from "@starknet-react/core";
import { SetupForm } from "@/components/vault/SetupForm";
import { ConnectPrompt } from "@/components/wallet/ConnectPrompt";

export default function SetupPage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectPrompt message="Connect your wallet to create a vault." />;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Create Drip Plan</h1>
      <p className="text-blue-500 mb-8">
        Choose how much and how often you want to buy BTC. The smart contract
        executes it automatically.
      </p>
      <SetupForm />
    </div>
  );
}
