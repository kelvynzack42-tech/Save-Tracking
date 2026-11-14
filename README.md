# SaveTrack V28 — Offline-first savings and finance tracker

SaveTrack is an offline-first personal finance and savings tracker with optional account-based cloud sync. All financial amounts are entered by the user.

## Manual-entry design
- Add savings deposits and withdrawals by entering the amount yourself.
- Create savings goals and track progress, remaining balances, and deadlines.
- Record income and expenses manually.
- Manage budgets, bills, debts, accounts, and transfers using user-entered amounts.
- Generate reports and backups from the records you enter.

## V28 accounts and access
- Dedicated login and registration screen.
- Device-local account creation and login work offline. Passwords are derived with PBKDF2; each local account stores its own finance data.
- Optional online account connection supports cloud backup and cross-device access.
- Cross-device access requires a hosted server with persistent PostgreSQL and a configured encryption key. The local JSON fallback is intended for local testing only.

## Advanced V27 features
- Category spending caps with live progress and over-limit warnings.
- Debt payoff optimizer comparing avalanche and snowball strategies, with estimated interest and payoff timeline.
- Existing savings, cash-flow, reports, budgets, bills, assets, debt records, offline mode and optional cloud sync retained.

## Removed from this version
- No MTN MoMo, Telecel Cash, or AT Money wallet tracking.
- No SMS parsing or transaction import.
- No automatic transaction detection or external transaction-data providers.
- No Hubtel OTP integration.
- No Paystack Mobile Money checkout, webhook, or payment history.

SaveTrack does not connect to financial wallets, read phone messages, verify bank balances, or move money. It is a manual record-keeping tool.

## Run locally
1. Install Node.js 20 or later.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`.

Without `DATABASE_URL`, the server uses a local JSON fallback. Configure PostgreSQL and `DATA_ENCRYPTION_KEY` for cloud account sync. The Render Blueprint creates the key automatically. Set `APP_ORIGIN` to the deployed `https://...onrender.com` URL after the first deployment. See `.env.example`.

**Render database note:** the Free PostgreSQL plan is for testing only: it has a 1 GB limit, expires after 30 days, and has no backups. Upgrade to a paid database before storing important customer financial records.

## Tests
Run `npm test` to test authentication and cloud sync, including confirmation that transaction-provider endpoints are not available.
