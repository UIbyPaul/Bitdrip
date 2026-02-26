"use client";

import { useAccount } from "@starknet-react/core";
import { useReadContract } from "@starknet-react/core";
import { formatTokenAmount } from "@/utils";

const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      { name: "account", type: "core::starknet::contract_address::ContractAddress" },
    ],
    outputs: [{ type: "core::integer::u256" }],
    state_mutability: "view",
  },
] as const;

export function useTokenBalance(tokenAddress: string, decimals: number) {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useReadContract({
    abi: ERC20_ABI,
    // Cast tokenAddress to satisfy the template literal type
    address: tokenAddress as `0x${string}`,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    enabled: !!address && !!tokenAddress,
    watch: true,
  });

  const raw = data as { low: bigint; high: bigint } | undefined;
  const balance = raw ? raw.low : 0n;
  const formatted = formatTokenAmount(balance, decimals, 2);

  return { balance, formatted, isLoading, refetch };
}
