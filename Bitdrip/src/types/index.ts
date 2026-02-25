// ─── Vault ───────────────────────────────────────────────────────────────────

export interface VaultInfo {
  owner: string;
  depositToken: string;
  dripAmount: bigint;
  frequency: number;       // seconds between drips
  totalDrips: number;
  dripsExecuted: number;
  lastDripTime: number;    // unix timestamp
  totalDeposited: bigint;
  totalBtcPurchased: bigint;
  isActive: boolean;
  isPaused: boolean;
}

export type DripFrequency = "daily" | "weekly" | "biweekly" | "monthly";

export interface DripPlan {
  amount: string;          // human-readable, e.g. "10"
  token: TokenInfo;
  frequency: DripFrequency;
  totalDrips: number;
}

// ─── Tokens ──────────────────────────────────────────────────────────────────

export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoUrl?: string;
}

// ─── Execution History ────────────────────────────────────────────────────────

export interface DripEvent {
  txHash: string;
  dripNumber: number;
  amount: bigint;
  btcReceived: bigint;
  timestamp: number;       // unix
  status: "success" | "pending" | "failed";
}

// ─── Wallet ──────────────────────────────────────────────────────────────────

export interface WalletState {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
}

// ─── UI ──────────────────────────────────────────────────────────────────────

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
}

// ─── Contract Raw ─────────────────────────────────────────────────────────────

// Raw shape returned from starknet-react before transformation
export interface RawVaultInfo {
  owner: string;
  deposit_token: string;
  drip_amount: { low: bigint; high: bigint };
  frequency: bigint;
  total_drips: bigint;
  drips_executed: bigint;
  last_drip_time: bigint;
  total_deposited: { low: bigint; high: bigint };
  total_btc_purchased: { low: bigint; high: bigint };
  is_active: boolean;
  is_paused: boolean;
}
