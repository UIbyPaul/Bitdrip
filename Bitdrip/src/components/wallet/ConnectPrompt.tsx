"use client";

import Link from "next/link";

export function ConnectPrompt({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="text-5xl">🔐</div>
      <h2 className="text-2xl font-bold text-gray-800">Wallet not connected</h2>
      <p className="text-blue-500">{message}</p>
      <Link
        href="/connect"
        className="px-6 py-3 rounded-xl text-white font-semibold transition-colors shadow-md"
        style={{ background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" }}
      >
        Connect Wallet
      </Link>
    </div>
  );
}
