# SaveTrack V27 — Advanced Finance Edition

## New in V27
- Category spending guardrails: set monthly limits per spending category and see live usage, near-limit indicators, and overspending warnings.
- Debt payoff optimizer: compare avalanche (highest APR first) and snowball (smallest balance first) strategies.
- Debt planner accepts annual interest rates, minimum monthly payments, and an extra monthly repayment amount; estimates payoff duration, interest, total repayment, and debt-free month.
- Updated service-worker cache name so existing installations fetch the new app shell.

## Preserved
- Manual-only money entry; no wallet tracking, SMS parsing, transaction imports, provider APIs, or automatic transaction detection.
- Savings goals, deposits, withdrawals, budgets, reports, assets, accounts, bills, reminders, local lock, backups, offline use, and optional account-based cloud sync.

## Important
Debt payoff figures are estimates based on user-entered balances, APRs, and payment assumptions. They are not lender quotes or financial advice. SaveTrack does not move money or verify external account balances.

## V28 — Offline and online accounts
- Added a dedicated sign-in and registration screen before the finance workspace.
- Added device-local accounts using PBKDF2 password derivation, allowing registration and sign-in without internet.
- Added account-specific local storage so each offline profile has its own finance records.
- Added automatic optional cloud-account creation during registration when the server is reachable; existing offline users can sign in to cloud sync separately.
- Added an explicit sign-out control and retained optional cloud restore/sync controls.
- Online cross-device access requires a deployed server with persistent PostgreSQL configured. Local JSON fallback is for local testing, not durable hosted account storage.
- Existing manual-entry-only policy remains unchanged: no MoMo tracking, SMS parsing, transaction imports, or automatic wallet connections.


## V29 visual refresh
- Updated the SaveTrack interface to a blue, white and light-yellow palette.
- Replaced the app icon with a blue wallet mark and light-yellow savings coin.
- Updated browser/PWA theme metadata and service-worker cache version.
