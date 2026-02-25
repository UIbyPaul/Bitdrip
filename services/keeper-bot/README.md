# Bitdrip Keeper Bot

The keeper bot is an off-chain executor that monitors vault contracts and triggers `execute_drip()` when a user's drip interval has elapsed.

## Setup

```bash
npm install
cp .env.example .env
# Fill in your executor wallet credentials
```

## Run

```bash
npm run dev    # development (auto-restart)
npm start      # production
```

## How it works

1. Loads a list of active vault owner addresses (from indexer or config)
2. Every `POLL_INTERVAL_MS`, calls `can_execute_drip(user)` for each address
3. If ready, calls `execute_drip(user)` using the authorized executor wallet
4. The contract validates the executor and performs the BTC swap on-chain

## Production

- Deploy on a VPS or serverless cron (Railway, Render, AWS Lambda)
- Use Apibara or Starknet event indexing to auto-discover new vaults
- Monitor with a service like Grafana or Datadog
