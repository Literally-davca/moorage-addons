# log-shipper

Ships the container logs of a host to a log store with [Vector](https://vector.dev):
VictoriaLogs, Grafana Loki or any OpenTelemetry (OTLP/HTTP) collector. Every line keeps
the stack, service and container name, so logs can be searched long after Moorage's own
log view (which reads Docker's logs on demand) has rotated them away.

## Setup

1. Add-ons → **log-shipper** → Install.
2. In `add-ons/.env` set:
   - `LOG_SINK` – `victorialogs` (default), `loki` or `otlp`
   - `LOG_ENDPOINT` – the store's base URL, e.g. `http://victorialogs:9428`,
     `http://loki:3100` or `http://otel-collector:4318`
3. Restart the add-ons stack.

Moorage's own helper containers are left out. Vector reads the Docker socket read-only.

## Resource footprint (RAM & CPU)

- RAM: about 30–60 MB, more while the store is unreachable (Vector buffers in memory, at
  most `mem_limit: 128m`).
- CPU: around 1 % per 100 log lines a second.
