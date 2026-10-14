# Hosting and recovery

## Verified on October 14, 2026

The portfolio domain resolves to GitHub Pages (185.199.108.153), not the Azure VM. GitHub Pages has an approved Let's Encrypt certificate for gregforward.duckdns.org expiring January 12, 2027. HTTPS enforcement was enabled during this upgrade. Do not disable certificate validation to diagnose errors.

The Azure workflow's most recent historical run failed. Its expired logs were unavailable. The saved Caddyfile is evidence of an intended design, not proof of the running server configuration. No VM, Docker, PostgreSQL, WireGuard, or Caddy service was modified in this upgrade.

## Website delivery

Run `node --check assets/app.js` and `node scripts/check.mjs --build`. The build copies only public website assets into `dist/`. GitHub Actions validates pull requests and deploys main through GitHub Pages. The Pages build type must be set to GitHub Actions (`workflow`). The workflow never connects to Azure, resets a server checkout, or restarts the shared reverse proxy.

Backups: `backup/pre-upgrade-2026-10-14` preserves the original source; `upgrade/secure-portfolio` contains the upgrade. To restore the previous website, build an explicit revert commit on a branch and review it before merging. Do not restore the old automatic Azure restart workflow without first inspecting the server.

## Backend and contact limitations

The current static host cannot execute Flask or store PostgreSQL data. The contact form intentionally opens an email draft; it does not report successful delivery. A mail application is required. Direct contact delivery remains incomplete until an authenticated server inspection establishes the API, schema, persistence, rate limiting, abuse protection, and delivery destination.

Monitoring uses a same-origin GET `/api/health`. It accepts JSON with `status` of `ok` or `degraded` and an ISO 8601 `checkedAt` timestamp within two minutes. The interface reports only what that endpoint says, never overall uptime, VM, database, or VPN health. Missing, invalid, stale, and failed responses display unavailable.

## Safe Azure continuation

1. Sign in to portal.azure.com, open Virtual machines, select the existing Ubuntu VM, and inspect Overview and Connect > SSH. Identify its public IP, configured username, and authorized key without copying secrets into chat or Git.
2. Inspect running containers, port bindings, volume mounts, Compose paths, disk capacity, service health, and Caddy's active configuration. Do not print environment variables, database credentials, or WireGuard peer keys.
3. Back up application configuration and database using the existing backup procedure. Confirm Caddy storage persists and distinguish host-network addresses from container-network addresses. `127.0.0.1` inside a container is not automatically the VM host.
4. Test backend validation, durable contact acceptance, and sanitized health responses locally before connecting the frontend. Restrict PostgreSQL and administrative interfaces to private networks. Never publish management interfaces as portfolio demonstrations.
5. Choose a single authoritative host for the portfolio hostname. Before any DuckDNS change, verify the Azure origin is ready, ports 80/443 route correctly, and the existing VPN domain is unaffected. Check for a periodic DuckDNS updater that could overwrite records. Preserve the old record for rollback.
6. If moving the hostname to Azure, coordinate DNS and Caddy's automatic certificate issuance. Verify exact hostname/SAN, certificate chain, expiration, HTTP redirect, and API behavior from outside the VM. Keep GitHub Pages available as a rollback destination until the migration is verified.
7. Validate Caddy configuration before a graceful reload. Do not restart the shared proxy or run `docker compose down` for a frontend update. Never delete volumes or recreate unrelated services.

References: https://caddyserver.com/docs/automatic-https and https://docs.github.com/en/pages

## Cost

No paid service, purchase, or new infrastructure was enabled. The existing Azure account and billing were not accessed or changed.
