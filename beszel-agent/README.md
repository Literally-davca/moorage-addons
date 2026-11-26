# Beszel Agent (`beszel-agent`)

Lightweight host and Docker metrics agent ([henrygd/beszel](https://github.com/henrygd/beszel)) for any Moorage host (hub or remote agents).

## Configuration

- `BESZEL_KEY`: public SSH key copied from Beszel Hub.
- `BESZEL_LISTEN` (default `45876`).
- Supports `DOCKER_HOST` via `docker-socket-proxy` when you prefer not to mount `/var/run/docker.sock:ro`.
