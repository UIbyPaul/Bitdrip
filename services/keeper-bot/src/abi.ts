// Minimal ABI needed by the keeper bot
export const BITDRIP_VAULT_ABI = [
  {
    type: "function",
    name: "can_execute_drip",
    inputs: [{ name: "user", type: "core::starknet::contract_address::ContractAddress" }],
    outputs: [{ type: "core::bool" }],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "execute_drip",
    inputs: [{ name: "user", type: "core::starknet::contract_address::ContractAddress" }],
    outputs: [],
    state_mutability: "external",
  },
] as const;
