// SPDX-License-Identifier: MIT
// Bitdrip Vault — Starknet-Native Automated BTC Accumulation

#[starknet::contract]
pub mod BitdripVault {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use super::super::interfaces::{IBitdripVault, VaultInfo};
    use super::super::errors::Errors;

    // ─── Storage ──────────────────────────────────────────────────────────────

    #[storage]
    struct Storage {
        vaults: Map<ContractAddress, VaultInfo>,
        owner: ContractAddress,
        executor: ContractAddress,      // authorized keeper bot
        protocol_fee_bps: u16,          // e.g. 30 = 0.30%
        fee_recipient: ContractAddress,
    }

    // ─── Events ───────────────────────────────────────────────────────────────

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        VaultCreated: VaultCreated,
        DripExecuted: DripExecuted,
        VaultPaused: VaultPaused,
        VaultResumed: VaultResumed,
        VaultClosed: VaultClosed,
        Withdrawn: Withdrawn,
    }

    #[derive(Drop, starknet::Event)]
    struct VaultCreated {
        #[key] user: ContractAddress,
        drip_amount: u256,
        frequency: u64,
        total_drips: u32,
    }

    #[derive(Drop, starknet::Event)]
    struct DripExecuted {
        #[key] user: ContractAddress,
        drip_number: u32,
        amount: u256,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct VaultPaused { #[key] user: ContractAddress }

    #[derive(Drop, starknet::Event)]
    struct VaultResumed { #[key] user: ContractAddress }

    #[derive(Drop, starknet::Event)]
    struct VaultClosed { #[key] user: ContractAddress }

    #[derive(Drop, starknet::Event)]
    struct Withdrawn { #[key] user: ContractAddress, amount: u256 }

    // ─── Constructor ─────────────────────────────────────────────────────────

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        executor: ContractAddress,
        fee_recipient: ContractAddress,
    ) {
        self.owner.write(owner);
        self.executor.write(executor);
        self.fee_recipient.write(fee_recipient);
        self.protocol_fee_bps.write(30_u16);
    }

    // ─── Implementation ───────────────────────────────────────────────────────

    #[abi(embed_v0)]
    impl BitdripVaultImpl of IBitdripVault<ContractState> {

        fn create_vault(
            ref self: ContractState,
            deposit_token: ContractAddress,
            drip_amount: u256,
            frequency: u64,
            total_drips: u32,
        ) {
            assert(drip_amount > 0, Errors::INVALID_AMOUNT);
            assert(frequency >= 3600, Errors::INVALID_FREQUENCY); // min 1hr

            let caller = get_caller_address();
            let now = get_block_timestamp();

            let vault = VaultInfo {
                owner: caller,
                deposit_token,
                drip_amount,
                frequency,
                total_drips,
                drips_executed: 0,
                last_drip_time: now,
                total_deposited: drip_amount * total_drips.into(),
                total_btc_purchased: 0,
                is_active: true,
                is_paused: false,
            };

            self.vaults.write(caller, vault);

            self.emit(VaultCreated {
                user: caller,
                drip_amount,
                frequency,
                total_drips,
            });
        }

        fn execute_drip(ref self: ContractState, user: ContractAddress) {
            let caller = get_caller_address();
            assert(caller == self.executor.read(), Errors::ONLY_EXECUTOR);

            let mut vault = self.vaults.read(user);
            assert(vault.is_active, Errors::VAULT_NOT_ACTIVE);
            assert(!vault.is_paused, Errors::VAULT_PAUSED);
            assert(vault.drips_executed < vault.total_drips, Errors::ALL_DRIPS_DONE);

            let now = get_block_timestamp();
            assert(now >= vault.last_drip_time + vault.frequency, Errors::TOO_EARLY);

            // TODO: integrate AVNU/Ekubo DEX for on-chain BTC swap
            // 1. Take fee: fee_amount = drip_amount * protocol_fee_bps / 10000
            // 2. Swap (drip_amount - fee) via DEX router to wBTC
            // 3. Update vault.total_btc_purchased with wBTC received

            vault.drips_executed += 1;
            vault.last_drip_time = now;

            self.emit(DripExecuted {
                user,
                drip_number: vault.drips_executed,
                amount: vault.drip_amount,
                timestamp: now,
            });

            self.vaults.write(user, vault);
        }

        fn pause_vault(ref self: ContractState) {
            let caller = get_caller_address();
            let mut vault = self.vaults.read(caller);
            assert(vault.owner == caller, Errors::NOT_OWNER);
            vault.is_paused = true;
            self.vaults.write(caller, vault);
            self.emit(VaultPaused { user: caller });
        }

        fn resume_vault(ref self: ContractState) {
            let caller = get_caller_address();
            let mut vault = self.vaults.read(caller);
            assert(vault.owner == caller, Errors::NOT_OWNER);
            vault.is_paused = false;
            self.vaults.write(caller, vault);
            self.emit(VaultResumed { user: caller });
        }

        fn withdraw(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            let mut vault = self.vaults.read(caller);
            assert(vault.owner == caller, Errors::NOT_OWNER);
            assert(amount <= vault.total_deposited, Errors::INSUFFICIENT_BALANCE);
            // TODO: ERC20 transfer back to caller
            vault.total_deposited -= amount;
            self.vaults.write(caller, vault);
            self.emit(Withdrawn { user: caller, amount });
        }

        fn close_vault(ref self: ContractState) {
            let caller = get_caller_address();
            let mut vault = self.vaults.read(caller);
            assert(vault.owner == caller, Errors::NOT_OWNER);
            vault.is_active = false;
            // TODO: return remaining balance to caller
            self.vaults.write(caller, vault);
            self.emit(VaultClosed { user: caller });
        }

        fn get_vault(self: @ContractState, user: ContractAddress) -> VaultInfo {
            self.vaults.read(user)
        }

        fn get_next_drip_time(self: @ContractState, user: ContractAddress) -> u64 {
            let vault = self.vaults.read(user);
            vault.last_drip_time + vault.frequency
        }

        fn get_total_btc_stacked(self: @ContractState, user: ContractAddress) -> u256 {
            self.vaults.read(user).total_btc_purchased
        }

        fn can_execute_drip(self: @ContractState, user: ContractAddress) -> bool {
            let vault = self.vaults.read(user);
            if !vault.is_active || vault.is_paused {
                return false;
            }
            if vault.drips_executed >= vault.total_drips {
                return false;
            }
            get_block_timestamp() >= vault.last_drip_time + vault.frequency
        }
    }
}
