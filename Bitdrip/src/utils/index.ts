import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DripFrequency, RawVaultInfo, VaultInfo } from "@/types";

// ─── Tailwind ─────────────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Token Amounts ────────────────────────────────────────────────────────────

/** Convert on-chain bigint to human-readable string */
export function formatTokenAmount(
  amount: bigint,
  decimals: number,
  displayDecimals = 6
): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, displayDecimals);
  return `${whole}.${fractionStr}`;
}

/** Parse human-readable string to on-chain bigint */
export function parseTokenAmount(amount: string, decimals: number): bigint {
  const [whole, fraction = ""] = amount.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
  return (
    BigInt(whole || "0") * BigInt(10 ** decimals) + BigInt(paddedFraction || "0")
  );
}

/** Format USD value */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// ─── Address ──────────────────────────────────────────────────────────────────

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// ─── Frequency ───────────────────────────────────────────────────────────────

export const FREQUENCY_SECONDS: Record<DripFrequency, number> = {
  daily: 86_400,
  weekly: 604_800,
  biweekly: 1_209_600,
  monthly: 2_592_000,
};

export const FREQUENCY_LABELS: Record<DripFrequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
};

export function secondsToFrequencyLabel(seconds: number): string {
  if (seconds <= 86_400) return "Daily";
  if (seconds <= 604_800) return "Weekly";
  if (seconds <= 1_209_600) return "Bi-weekly";
  return "Monthly";
}

// ─── Countdown ───────────────────────────────────────────────────────────────

export function formatCountdown(targetTimestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = targetTimestamp - now;
  if (diff <= 0) return "Ready";

  const days = Math.floor(diff / 86_400);
  const hours = Math.floor((diff % 86_400) / 3_600);
  const minutes = Math.floor((diff % 3_600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

// ─── Vault Transformers ───────────────────────────────────────────────────────

/** Convert raw starknet-react response to typed VaultInfo */
export function transformVault(raw: RawVaultInfo): VaultInfo {
  return {
    owner: raw.owner,
    depositToken: raw.deposit_token,
    dripAmount: raw.drip_amount.low,
    frequency: Number(raw.frequency),
    totalDrips: Number(raw.total_drips),
    dripsExecuted: Number(raw.drips_executed),
    lastDripTime: Number(raw.last_drip_time),
    totalDeposited: raw.total_deposited.low,
    totalBtcPurchased: raw.total_btc_purchased.low,
    isActive: raw.is_active,
    isPaused: raw.is_paused,
  };
}

/** Progress percentage 0-100 */
export function vaultProgress(vault: VaultInfo): number {
  if (vault.totalDrips === 0) return 0;
  return Math.min(100, Math.round((vault.dripsExecuted / vault.totalDrips) * 100));
}

/** Estimated total cost in deposit token */
export function estimatedTotalCost(
  dripAmount: string,
  totalDrips: number
): number {
  return parseFloat(dripAmount) * totalDrips;
}
