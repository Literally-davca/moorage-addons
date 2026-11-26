# Beszel Hub (`beszel-hub`)

Lightweight server monitoring hub ([henrygd/beszel](https://github.com/henrygd/beszel)) running as an optional Moorage sidecar in the `add-ons` stack.

## Configuration

- `BESZEL_PORT` (default `8090`, bound to `127.0.0.1`).
- Persistent data is stored in the `beszel-data` volume.
- Link your Beszel URL in Moorage under **Settings -> Connections -> Sister panels** to get direct **Open in Beszel** links on hosts and in `Ctrl+K`.
