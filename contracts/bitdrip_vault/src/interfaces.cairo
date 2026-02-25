use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store, Clone)]
pub struct VaultInfo {
    pub owner: ContractAddress,
    pub deposit_token: ContractAddress,
    pub drip_amount: u256,
    pub frequency: u64,
    pub total_drips: u32,
    pub drips_executed: u32,
    pub last_drip_time: u64,
    pub total_deposited: u256,
    pub total_btc_purchased: u256,
    pub is_active: bool,
    pub is_paused: bool,
}

#[starknet::interface]
pub trait IBitdripVault<TContractState> {
    // ─── Write ────────────────────────────────────────────────────────────────
    fn create_vault(
        ref self: TContractState,
        deposit_token: ContractAddress,
        drip_amount: u256,
        frequency: u64,
        total_drips: u32,
    );
    fn execute_drip(ref self: TContractState, user: ContractAddress);
    fn pause_vault(ref self: TContractState);
    fn resume_vault(ref self: TContractState);
    fn withdraw(ref self: TContractState, amount: u256);
    fn close_vault(ref self: TContractState);

    // ─── Read ─────────────────────────────────────────────────────────────────
    fn get_vault(self: @TContractState, user: ContractAddress) -> VaultInfo;
    fn get_next_drip_time(self: @TContractState, user: ContractAddress) -> u64;
    fn get_total_btc_stacked(self: @TContractState, user: ContractAddress) -> u256;
    fn can_execute_drip(self: @TContractState, user: ContractAddress) -> bool;
}
