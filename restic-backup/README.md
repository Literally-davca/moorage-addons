# Restic Volume Backups (`restic-backup`)

Encrypted, deduplicated backups of your stacks folder with [Restic](https://restic.net). Works right after **Add**: no paths or `.env` to fill in.

## What Moorage fills in

When you add the add-on, Moorage writes the host-specific values the add-on uses into `add-ons/.env` (it never overwrites a value you already set):

| Variable | Default |
|---|---|
| `MOORAGE_STACKS_DIR` | the stacks folder of that host, mounted read-only at `/backup/stacks` |
| `MOORAGE_BACKUPS_DIR` | `<Moorage data>/backups` on the host (next to Moorage's own data, easy to copy elsewhere) when `/data` is a bind mount; empty = the `restic-repo` named volume |
| `TZ` | the hub's time zone |
| `RESTIC_PASSWORD` | a random password, generated once |

> **Keep a copy of `RESTIC_PASSWORD`** (Stack → `add-ons` → `.env`). Without it the backups can't be restored.

The `add-ons` stack updates automatically (`:latest`), so the Restic image stays current.

## Options (`add-ons/.env`)

| Variable | Default | Meaning |
|---|---|---|
| `RESTIC_BACKUP_INTERVAL` | `86400` | seconds between backups |
| `RESTIC_KEEP_DAILY` / `RESTIC_KEEP_WEEKLY` / `RESTIC_KEEP_MONTHLY` | `7` / `4` / `6` | retention after each run |
| `RESTIC_BACKUP_HOST` | `moorage` | host name stored in the snapshots |
| `MOORAGE_BACKUPS_DIR` | see above | set to a named volume name or another host path |
| `RESTIC_REPOSITORY` | `/backup/repo` | any Restic repository URL |

### Remote repositories (optional)

S3, Backblaze B2, SFTP and others work by changing `RESTIC_REPOSITORY` and adding the provider's variables to the service (for example `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` for `s3:s3.example.com/moorage-backups`). Moorage doesn't create remote repositories for you; the container runs `restic init` on first start.

## Restore

```sh
docker exec -it add-ons-restic-1 restic snapshots
docker exec -it add-ons-restic-1 restic restore latest --target /tmp/restore
```

## Resource Footprint (RAM & CPU)

- **RAM:** **`~1 MB`** between runs (a sleeping shell); **`+30–120 MB`** while a backup or `forget --prune` runs (`GOGC=20`, capped at `mem_limit: 256m`).
- **CPU:** `~0%` between runs; **moderate CPU burst** during compression and AES-256 encryption (proportional to changed data size).
