/**
 * Bitdrip Keeper Bot
 *
 * Polls the vault contract for drips that are ready to execute,
 * then calls execute_drip() on behalf of users.
 *
 * Run: npx ts-node src/index.ts
 */

import { RpcProvider, Account, Contract, CallData } from "starknet";
import { VAULT_CONTRACT_ADDRESS, EXECUTOR_PRIVATE_KEY, EXECUTOR_ADDRESS, RPC_URL, POLL_INTERVAL_MS } from "./config";
import { BITDRIP_VAULT_ABI } from "./abi";
import { logger } from "./logger";

// ─── Setup ───────────────────────────────────────────────────────────────────

const provider = new RpcProvider({ nodeUrl: RPC_URL });

const executor = new Account(provider, EXECUTOR_ADDRESS, EXECUTOR_PRIVATE_KEY);

const vault = new Contract(BITDRIP_VAULT_ABI, VAULT_CONTRACT_ADDRESS, executor);

// ─── Core Loop ────────────────────────────────────────────────────────────────

async function pollAndExecute(users: string[]) {
  logger.info(`Checking ${users.length} vaults...`);

  for (const user of users) {
    try {
      const canDrip = await vault.can_execute_drip(user);

      if (!canDrip) {
        logger.debug(`${user.slice(0, 8)}... not ready`);
        continue;
      }

      logger.info(`Executing drip for ${user.slice(0, 8)}...`);

      const tx = await vault.execute_drip(user);
      await provider.waitForTransaction(tx.transaction_hash);

      logger.info(`✅ Drip executed — tx: ${tx.transaction_hash}`);
    } catch (err) {
      logger.error(`Failed for ${user}: ${String(err)}`);
    }
  }
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

async function main() {
  logger.info("🤖 Bitdrip Keeper Bot started");

  // TODO: load active user addresses from an indexer or hardcoded list
  // In production, use Apibara or event indexing to discover vault owners
  const activeUsers: string[] = [];

  // Poll on interval
  setInterval(async () => {
    await pollAndExecute(activeUsers);
  }, POLL_INTERVAL_MS);

  // Also run immediately
  await pollAndExecute(activeUsers);
}

main().catch((err) => {
  logger.error("Fatal:", err);
  process.exit(1);
});
