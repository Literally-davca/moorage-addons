# Restic Volume Backups (`restic-backup`)

Optional external container add-on for encrypted, deduplicated backups of Docker volumes belonging to your stacks (e.g., to S3, Backblaze B2, or an SFTP storage box).

## Example One-Shot Backup Job

```yaml
services:
  restic:
    image: restic/restic:latest
    environment:
      RESTIC_REPOSITORY: s3:s3.example.com/moorage-backups
      RESTIC_PASSWORD: ${RESTIC_PASSWORD}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
    volumes:
      - /opt/stacks:/backup/stacks:ro
      - /var/lib/docker/volumes:/backup/volumes:ro
```

Run backups via cron/systemd timer (`restic backup /backup/stacks /backup/volumes`).

## Resource Footprint (RAM & CPU)

- **RAM:** **`+0 MB`** between scheduled runs (one-shot container); **`+30–120 MB`** while a backup or `forget --prune` job is running (can be capped further with `GOGC=20`).
- **CPU:** `~0%` between runs; **moderate CPU burst** during zstd compression and AES-256 encryption (proportional to changed data size).
