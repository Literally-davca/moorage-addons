# Proxy & Dashboard Label Detection (`proxy-labels`)

Automatically detects web UI URLs for your containers from reverse-proxy and dashboard labels, without requiring a separate `moorage.url` label on every service.

## Supported Labels

- **Homepage:** `homepage.href`
- **Traefik:** `traefik.http.routers.<name>.rule` (`Host(...)` and `PathPrefix(...)`, respects `tls` / `tls.certresolver`)
- **Caddy (`caddy-docker-proxy`):** `caddy` and `caddy_N`

> Native `moorage.url` labels always work in the Moorage core, even when this add-on is disabled.

## How to Enable

Open **Settings → Add-ons** in Moorage and click **Enable** on **Proxy & dashboard label detection**.

## Resource Footprint (RAM & CPU)

- **RAM:** `~0 MB` (typically `< 100 KB` in memory for extracted URL strings across dozens of containers; no background goroutines or caches).
- **CPU:** `~0%` (simple label parsing runs only when `ListStacks` or `GetStack` inspects container summaries).
