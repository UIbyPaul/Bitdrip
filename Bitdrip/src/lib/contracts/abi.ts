// Auto-generated — keep in sync with contracts/bitdrip_vault/src/bitdrip_vault.cairo

export const BITDRIP_VAULT_ABI = [
  // ─── Constructor ───────────────────────────────────────────────────────────
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      { name: "owner", type: "core::starknet::contract_address::ContractAddress" },
      { name: "executor", type: "core::starknet::contract_address::ContractAddress" },
      { name: "fee_recipient", type: "core::starknet::contract_address::ContractAddress" },
    ],
  },

  // ─── External Functions ────────────────────────────────────────────────────
  {
    type: "function",
    name: "create_vault",
    inputs: [
      { name: "deposit_token", type: "core::starknet::contract_address::ContractAddress" },
      { name: "drip_amount", type: "core::integer::u256" },
      { name: "frequency", type: "core::integer::u64" },
      { name: "total_drips", type: "core::integer::u32" },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "pause_vault",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "resume_vault",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "amount", type: "core::integer::u256" }],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "close_vault",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "execute_drip",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
    outputs: [],
    state_mutability: "external",
  },

  // ─── View Functions ────────────────────────────────────────────────────────
  {
    type: "function",
    name: "get_vault",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
    outputs: [{ type: "bitdrip_vault::VaultInfo" }],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_next_drip_time",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
    outputs: [{ type: "core::integer::u64" }],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_total_btc_stacked",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
    outputs: [{ type: "core::integer::u256" }],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "can_execute_drip",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
    outputs: [{ type: "core::bool" }],
    state_mutability: "view",
  },

  // ─── Events ────────────────────────────────────────────────────────────────
  {
    type: "event",
    name: "VaultCreated",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
      { name: "drip_amount", type: "core::integer::u256" },
      { name: "frequency", type: "core::integer::u64" },
      { name: "total_drips", type: "core::integer::u32" },
    ],
  },
  {
    type: "event",
    name: "DripExecuted",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
      { name: "drip_number", type: "core::integer::u32" },
      { name: "amount", type: "core::integer::u256" },
      { name: "timestamp", type: "core::integer::u64" },
    ],
  },
  {
    type: "event",
    name: "VaultPaused",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
  },
  {
    type: "event",
    name: "VaultResumed",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
  },
  {
    type: "event",
    name: "VaultClosed",
    inputs: [
      { name: "user", type: "core::starknet::contract_address::ContractAddress" },
    ],
  },
] as const;

export type BitdripVaultAbi = typeof BITDRIP_VAULT_ABI;
