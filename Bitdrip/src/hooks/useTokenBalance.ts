"use client";

import { useAccount, useReadContract } from "@starknet-react/core";
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
    address: tokenAddress,
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
