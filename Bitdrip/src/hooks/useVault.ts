"use client";

import {
  useAccount,
  useContract,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import { BITDRIP_VAULT_ABI, getVaultAddress } from "@/lib/contracts";
import { useVaultStore } from "@/store/vaultStore";
import { DripPlan } from "@/types";
import { FREQUENCY_SECONDS, parseTokenAmount, transformVault } from "@/utils";

export function useVault() {
  const { address } = useAccount();
  const { addNotification } = useVaultStore();
  const vaultAddress = getVaultAddress();

  const { sendAsync } = useSendTransaction({ calls: [] });

  const { contract } = useContract({
    abi: BITDRIP_VAULT_ABI,
    address: vaultAddress,
  });

  // ─── Reads ─────────────────────────────────────────────────────────────────

  const {
    data: rawVault,
    isLoading: vaultLoading,
    refetch: refetchVault,
  } = useReadContract({
    abi: BITDRIP_VAULT_ABI,
    address: vaultAddress,
    functionName: "get_vault",
    args: address ? [address] : undefined,
    enabled: !!address,
    watch: true,
  });

  const { data: nextDripTime } = useReadContract({
    abi: BITDRIP_VAULT_ABI,
    address: vaultAddress,
    functionName: "get_next_drip_time",
    args: address ? [address] : undefined,
    enabled: !!address,
    watch: true,
  });

  const { data: canDrip } = useReadContract({
    abi: BITDRIP_VAULT_ABI,
    address: vaultAddress,
    functionName: "can_execute_drip",
    args: address ? [address] : undefined,
    enabled: !!address,
    watch: true,
  });

  const vault = rawVault ? transformVault(rawVault as never) : null;
  const hasVault = vault !== null && vault.isActive;

  // ─── Writes ────────────────────────────────────────────────────────────────

  async function createVault(plan: DripPlan) {
    if (!contract) return;
    try {
      const dripAmountRaw = parseTokenAmount(plan.amount, plan.token.decimals);
      const frequencySeconds = FREQUENCY_SECONDS[plan.frequency];

      const call = contract.populate("create_vault", [
        plan.token.address,
        dripAmountRaw,
        frequencySeconds,
        plan.totalDrips,
      ]);

      await sendAsync([call]);
      addNotification({
        type: "success",
        title: "Vault created!",
        message: "Your drip plan is live on Starknet.",
      });
      refetchVault();
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to create vault",
        message: String(err),
      });
    }
  }

  async function pauseVault() {
    if (!contract) return;
    try {
      const call = contract.populate("pause_vault", []);
      await sendAsync([call]);
      addNotification({ type: "info", title: "Vault paused" });
      refetchVault();
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to pause vault",
        message: String(err),
      });
    }
  }

  async function resumeVault() {
    if (!contract) return;
    try {
      const call = contract.populate("resume_vault", []);
      await sendAsync([call]);
      addNotification({ type: "success", title: "Vault resumed" });
      refetchVault();
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to resume vault",
        message: String(err),
      });
    }
  }

  async function withdrawFunds(amount: string, decimals: number) {
    if (!contract) return;
    try {
      const amountRaw = parseTokenAmount(amount, decimals);
      const call = contract.populate("withdraw", [amountRaw]);
      await sendAsync([call]);
      addNotification({
        type: "success",
        title: "Withdrawal submitted",
        message: `${amount} tokens sent to your wallet.`,
      });
      refetchVault();
    } catch (err) {
      addNotification({
        type: "error",
        title: "Withdrawal failed",
        message: String(err),
      });
    }
  }

  async function closeVault() {
    if (!contract) return;
    try {
      const call = contract.populate("close_vault", []);
      await sendAsync([call]);
      addNotification({ type: "info", title: "Vault closed" });
      refetchVault();
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to close vault",
        message: String(err),
      });
    }
  }

  return {
    vault,
    hasVault,
    vaultLoading,
    nextDripTime: nextDripTime as number | undefined,
    canDrip: canDrip as boolean | undefined,
    createVault,
    pauseVault,
    resumeVault,
    withdrawFunds,
    closeVault,
    refetchVault,
  };
}
