# node-exporter

Host metrics (CPU, memory, disks, file systems, network) in Prometheus format, next to
the [`prometheus-grafana`](../prometheus-grafana/README.md) add-on. Moorage itself keeps
reporting disk and memory on the host card and in the **Host resources** check; this
add-on is for full time series in Grafana.

## Setup

1. Add-ons → **node-exporter** → Install. It listens on `127.0.0.1:9100`.
2. In Prometheus add a scrape job:

   ```yaml
   - job_name: node
     static_configs:
       - targets: ["host.docker.internal:9100"] # or the host's address
   ```
3. Import the Grafana dashboard **Node Exporter Full** (ID 1860).

To scrape it from another machine set `NODE_EXPORTER_BIND=0.0.0.0` in `add-ons/.env`.
Docker publishes past the host firewall, so do that only on a trusted network.

## Resource footprint (RAM & CPU)

- RAM: about 10–20 MB.
- CPU: below 1 % at a 15 s scrape interval.

It reads the host's file systems read-only (`/:/host:ro`) and shares the host's process
namespace (`pid: host`) to report per-process figures.
