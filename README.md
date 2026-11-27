# Moorage Add-ons

Optional integrations and companion add-ons for [Moorage](https://github.com/Literally-davca/moorage).

Moorage keeps its core binary small (< 100 MB PSS RAM) and universal. Features aimed at specific setups, reverse proxies, scanners or backup tools live here as optional add-ons—each documenting its **estimated RAM and CPU footprint**.

## Available Add-ons

| Add-on | Kind | Est. RAM | Est. CPU | Summary |
|---|---|---|---|---|
| [`proxy-labels`](./proxy-labels/README.md) | Built-in toggle | `+0 MB` | `~0%` | Detect service URLs from Traefik, Caddy & Homepage labels |
| [`official-templates`](./official-templates/README.md) | Built-in toggle | `+1–2 MB` | `~0%` | Connect `Literally-davca/moorage-templates` remote catalog |
| [`prometheus-grafana`](./prometheus-grafana/README.md) | Built-in / Config | `+1–3 MB` | `< 1%` | Prometheus `/metrics` endpoint & Grafana dashboard |
| [`trivy-scanner`](./trivy-scanner/README.md) | External container | `+150–400 MB` (scan) | Burst on scan | CVE vulnerability scanning for stack images |
| [`restic-backup`](./restic-backup/README.md) | External container | `+30–120 MB` (job) | Burst on backup | Per-stack volume backups with Restic |
| [`log-shipper`](./log-shipper/README.md) | External container | `+30–60 MB` | `~1%` | Ship container logs to VictoriaLogs, Loki or OTLP with Vector |
| [`node-exporter`](./node-exporter/README.md) | External container | `+10–20 MB` | `< 1%` | Host metrics for Prometheus next to prometheus-grafana |

## Contributing an Add-on

Each add-on lives in its own top-level folder (`^[a-z0-9][a-z0-9_-]{0,62}$`) with:

- `addon.json` – metadata (`id`, `name`, `version`, `kind`, `category`, `description`, `resources: { ram, cpu }`)
- `README.md` – setup instructions and a **Resource footprint (RAM & CPU)** section

Validate locally and regenerate `index.json`:

```sh
node scripts/build-index.mjs
```

## License

MIT
