# Prometheus & Grafana Metrics (`prometheus-grafana`)

Exposes host, stack, container, check and alert metrics at `GET /metrics` in Prometheus exposition format, paired with a prebuilt Grafana dashboard (`deploy/grafana/moorage-dashboard.json` in the Moorage repo).

## How to Enable

Set `MOORAGE_METRICS_TOKEN` (minimum 16 characters) in your Moorage hub environment and restart Moorage. Scrape `/metrics` with `Authorization: Bearer <token>`.

You can check the live status and endpoint URL in **Settings → Add-ons**.

## Resource Footprint (RAM & CPU)

- **RAM:** `+1–3 MB` on the hub for the cached metrics snapshot (scales lightly with total containers and checks).
- **CPU:** `< 1%` (the snapshot refreshes every 30 seconds **only while actively scraped**; stops automatically after 5 minutes without scrapes).
