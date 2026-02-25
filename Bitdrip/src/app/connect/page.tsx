"use client";

import { useConnect, useAccount } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WALLET_ICONS: Record<string, string> = {
  argentX: "🔷",
  braavos: "🟠",
};

export default function ConnectPage() {
  const { connectors, connect, isPending } = useConnect();
  const { isConnected } = useAccount();
  const router = useRouter();

  // Redirect if already connected
  useEffect(() => {
    if (isConnected) router.push("/dashboard");
  }, [isConnected, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">₿</div>
          <h1 className="text-2xl font-bold mb-2">Connect your wallet</h1>
          <p className="text-blue-500 text-sm">
            Choose a Starknet wallet to get started with Bitdrip.
          </p>
        </div>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-300 transition-all disabled:opacity-50"
            >
              <span className="text-2xl">
                {WALLET_ICONS[connector.id] ?? "👛"}
              </span>
              <div className="text-left">
                <div className="font-semibold">{connector.name}</div>
                <div className="text-xs text-blue-500">
                  {connector.available() ? "Available" : "Not installed"}
                </div>
              </div>
              <span className="ml-auto text-blue-500">→</span>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-blue-400 mt-6">
          Don&apos;t have a wallet?{" "}
          <a
            href="https://www.argent.xyz/argent-x/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Get Argent X
          </a>
        </p>
      </div>
    </div>
  );
}
