pub mod Errors {
    pub const NOT_OWNER: felt252 = 'Bitdrip: not owner';
    pub const VAULT_NOT_ACTIVE: felt252 = 'Bitdrip: vault not active';
    pub const VAULT_PAUSED: felt252 = 'Bitdrip: vault is paused';
    pub const ALL_DRIPS_DONE: felt252 = 'Bitdrip: all drips done';
    pub const TOO_EARLY: felt252 = 'Bitdrip: drip too early';
    pub const ONLY_EXECUTOR: felt252 = 'Bitdrip: only executor';
    pub const INVALID_AMOUNT: felt252 = 'Bitdrip: invalid amount';
    pub const INVALID_FREQUENCY: felt252 = 'Bitdrip: invalid frequency';
    pub const INSUFFICIENT_BALANCE: felt252 = 'Bitdrip: insufficient balance';
}
