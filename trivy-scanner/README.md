# Trivy CVE Vulnerability Scanner (`trivy-scanner`)

Optional external container add-on for scanning Docker images used by your Moorage stacks for known vulnerabilities (CVEs).

Keeping Trivy as an external sidecar container preserves Moorage's `< 100 MB` RAM core footprint and avoids bundling large vulnerability databases into Moorage.

## Example Compose Sidecar

```yaml
services:
  trivy:
    image: aquasec/trivy:latest
    command: ["server", "--listen", "0.0.0.0:4954"]
    restart: unless-stopped
    volumes:
      - trivy-cache:/root/.cache/
    ports:
      - "127.0.0.1:4954:4954"

volumes:
  trivy-cache:
```

## Resource Footprint (RAM & CPU)

- **RAM:** `~40 MB` idle in server mode; spikes to **`+150–400 MB`** while downloading the vulnerability DB or scanning large images (e.g., Node/Python/JVM images).
- **CPU:** `~0%` idle; **bursts to 1–2 cores for 5–20 seconds** per image scan and during periodic DB updates.
- **Disk:** `~200–400 MB` for the cached Trivy vulnerability database (`trivy-cache`).
