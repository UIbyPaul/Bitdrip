import * as dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

export const RPC_URL = process.env.RPC_URL ?? "https://starknet-sepolia.public.blastapi.io";
export const VAULT_CONTRACT_ADDRESS = required("VAULT_CONTRACT_ADDRESS");
export const EXECUTOR_ADDRESS = required("EXECUTOR_ADDRESS");
export const EXECUTOR_PRIVATE_KEY = required("EXECUTOR_PRIVATE_KEY");
export const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS ?? "60000"); // 1 min default
