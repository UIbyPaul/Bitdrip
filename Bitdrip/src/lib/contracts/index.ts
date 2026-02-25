import { TokenInfo } from "@/types";

// ─── Contract Addresses ───────────────────────────────────────────────────────

export const CONTRACT_ADDRESSES = {
  sepolia: {
    vault: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS ?? "0x0",
    wbtc: process.env.NEXT_PUBLIC_WBTC_TOKEN_ADDRESS ?? "0x0",
    usdc: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    usdt: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  },
  mainnet: {
    vault: "0x0", // update after mainnet deployment
    wbtc: "0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
    usdc: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    usdt: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  },
} as const;

export type Network = keyof typeof CONTRACT_ADDRESSES;

export function getNetwork(): Network {
  return process.env.NEXT_PUBLIC_STARKNET_NETWORK === "mainnet"
    ? "mainnet"
    : "sepolia";
}

export function getVaultAddress(): string {
  return CONTRACT_ADDRESSES[getNetwork()].vault;
}

// ─── Supported Deposit Tokens ─────────────────────────────────────────────────

export const SUPPORTED_TOKENS: TokenInfo[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    address: CONTRACT_ADDRESSES.sepolia.usdc,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    address: CONTRACT_ADDRESSES.sepolia.usdt,
  },
];

// ─── Explorer ─────────────────────────────────────────────────────────────────

export function getTxUrl(txHash: string): string {
  const base =
    process.env.NEXT_PUBLIC_EXPLORER_URL ?? "https://sepolia.voyager.online";
  return `${base}/tx/${txHash}`;
}

export function getAddressUrl(address: string): string {
  const base =
    process.env.NEXT_PUBLIC_EXPLORER_URL ?? "https://sepolia.voyager.online";
  return `${base}/contract/${address}`;
}

// Re-export ABI
export { BITDRIP_VAULT_ABI } from "./abi";
