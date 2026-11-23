# Official Template Catalog (`official-templates`)

Connects the curated [`Literally-davca/moorage-templates`](https://github.com/Literally-davca/moorage-templates) repository as a remote template source in Moorage.

## How to Enable

Open **Settings → Add-ons** in Moorage and click **Enable** on **Official template catalog**.

Alternatively, add the index URL manually under **Settings → Templates**:

```
https://raw.githubusercontent.com/Literally-davca/moorage-templates/main/index.json
```

## Resource Footprint (RAM & CPU)

- **RAM:** `+1–2 MB` briefly during the daily HTTPS fetch and YAML/JSON parsing; `~0 MB` in steady state (cached templates live in SQLite on disk, `< 500 KB` for 10–50 templates).
- **CPU:** `~0%` (runs once every 24 hours or on manual refresh).
