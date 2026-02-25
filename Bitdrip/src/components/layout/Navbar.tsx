"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { cn } from "@/utils";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/plan", label: "DCA Plan", icon: "📅" },
  { href: "/deposit", label: "Deposit", icon: "💰" },
  { href: "/withdraw", label: "History", icon: "🔄" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col"
      style={{ background: "linear-gradient(180deg, #1e3a6e 0%, #162d58 100%)" }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6 border-b border-blue-200">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" }}
          >
            ▲
          </span>
          <span className="text-white text-lg font-bold tracking-wide">Bitdrip</span>
        </Link>
      </div>

      {/* Wallet address pill */}
      <div className="px-4 pt-5 pb-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-blue-100 truncate"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <span className="text-blue-300 text-base">👤</span>
          <ConnectWalletButton />
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 px-3 py-2 flex flex-col gap-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              pathname === link.href
                ? "text-white"
                : "text-blue-200 hover:text-white hover:bg-blue-50"
            )}
            style={
              pathname === link.href
                ? { background: "rgba(255,255,255,0.18)" }
                : {}
            }
          >
            <span className="text-base">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
