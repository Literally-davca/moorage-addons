# Trivy CVE Vulnerability Scanner (`trivy-scanner`)

Optional external container add-on for scanning Docker images used by your Moorage stacks for known vulnerabilities (CVEs).

Keeping Trivy as an external sidecar container preserves Moorage's `< 100 MB` RAM core footprint and avoids bundling large vulnerability databases into Moorage.

## Zero-config

Add it and it runs: Trivy listens on `127.0.0.1:4954` of the host, keeps its vulnerability database in the `trivy-cache` volume and uses the hub's time zone (`TZ`, filled in by Moorage). The `add-ons` stack updates automatically, so the scanner and its `:latest` image stay current.

Options in `add-ons/.env`: `TRIVY_PORT` (default `4954`) and `TRIVY_BIND` (default `127.0.0.1`; `0.0.0.0` shares the server with other machines).

## Resource Footprint (RAM & CPU)

- **RAM:** `~40 MB` idle in server mode; spikes to **`+150–400 MB`** while downloading the vulnerability DB or scanning large images (e.g., Node/Python/JVM images).
- **CPU:** `~0%` idle; **bursts to 1–2 cores for 5–20 seconds** per image scan and during periodic DB updates.
- **Disk:** `~200–400 MB` for the cached Trivy vulnerability database (`trivy-cache`).
