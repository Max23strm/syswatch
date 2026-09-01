# SysWatch (monitorRecursos)

A lightweight, cross-platform desktop application that monitors your system's
**CPU, RAM, disk, and network usage in real time**, with live charts and a
clean dark UI.

---

## What is this?

SysWatch is a personal portfolio project that combines a **Go backend** (which
talks directly to the operating system) with a **React + TypeScript frontend**
through [Wails v3](https://v3.wails.io/). The result is a single native binary
per platform that boots in under a second and stays well under ~50 MB of RAM —
a fraction of what an Electron equivalent would consume.

It's meant as a fast, at-a-glance view of "what is my machine doing right now?"
without the noise of a full-blown task manager.

---

## Features

- **CPU usage** — live percentage sampled from the OS.
- **RAM usage** — used / total / available memory.
- **Disk usage** — overall percentage of the root partition.
- **Network throughput** — upload/download speed (bytes per second) per interface,
  computed as deltas between samples so you can watch traffic happen in real
  time.
- Dark themed dashboard with responsive layout.
- Polls metrics at a configurable interval and re-renders the dashboard.

---

## Tech stack

| Layer    | Tools                                                                                  |
| -------- | -------------------------------------------------------------------------------------- |
| Backend  | Go 1.25+, [Wails v3](https://v3.wails.io/), [gopsutil/v4](https://github.com/shirou/gopsutil) |
| Frontend | React 19, TypeScript, Vite, TanStack Router, TanStack Charts, Lucide icons              |
| Build    | [Task](https://taskfile.dev/) (Taskfile.yml) for cross-platform tasks                   |
| Embed    | Frontend is bundled and `//go:embed`'d into the final binary                           |

---

## Prerequisites

Install these once before you start:

1. **Go 1.25 or newer** — https://go.dev/dl/
2. **Node.js 20+ and npm** — https://nodejs.org/
3. **Wails v3 CLI** — https://v3.wails.io/getting-started/installation

   ```bash
   go install github.com/wailsapp/wails/v3/cmd/wails3@latest
   ```
4. **Task** (optional but recommended for build commands) — https://taskfile.dev/installation/

On Windows you also need WebView2 (preinstalled on Windows 11, otherwise grab
the Evergreen runtime from Microsoft). On Linux you'll need the usual
`webkit2gtk-4.1`, `gtk-3`, and `libgtk-3-dev` packages — see the
[Wails Linux docs](https://v3.wails.io/getting-started/installation#linux).

---

## Running in development mode

The `wails3 dev` task starts the Go backend, launches the native window, and
runs Vite with hot-reloading for the frontend.

From the project root:

```bash
# using wails3 directly
wails3 dev -config ./build/config.yml

# or using Task (equivalent)
task dev
```

Changes to `*.go`, `*.tsx`, `*.ts`, and CSS files are picked up automatically
without restarting the window. Stop with `Ctrl+C`.

---

## Building a production binary

To produce a single, self-contained executable for your current OS:

```bash
# using wails3 directly
wails3 build -config ./build/config.yml

# or using Task
task build
```

The result is written to `bin/` (e.g. `bin/monitorrecursos.exe` on Windows).
The frontend assets are embedded into the binary via `//go:embed`, so the
output is fully standalone — no separate files to ship.

### Cross-compiling

The repo includes platform-specific Taskfiles under `build/<platform>/`. To
target a different OS, override `GOOS`:

```bash
GOOS=darwin GOARCH=arm64 task build
GOOS=linux  GOARCH=amd64 task build
```

For targets that need a C toolchain (iOS/Android or some Linux distros),
build inside the provided Docker image:

```bash
task setup:docker          # one-time, ~800 MB image
docker run --rm -v $PWD:/app wails-cross task build
```

### Packaging installers

`task package` runs the per-OS package task to produce an installer (`.dmg`,
`.msi`, `.deb`, `.AppImage`, etc.) in the matching `build/<platform>/` folder.

---

## Project structure

```
monitorRecursos/
├── main.go                # Wails app entry point and window setup
├── monitorService.go      # Go service exposed to the frontend (CPU/RAM/Disk/Net)
├── build/                 # Cross-platform build assets, icons, Taskfiles
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── shell/        # Window chrome / navigation
│   │   │   ├── shared/       # Cpu.tsx, Ram.tsx, Disk.tsx, Network.tsx widgets
│   │   │   └── views/        # OverviewDashboard, SettingsView
│   │   ├── routes/        # TanStack Router routes
│   │   ├── styles/        # CSS (dark theme, metrics, shell)
│   │   └── main.tsx
│   └── package.json
├── go.mod / go.sum
├── Taskfile.yml           # Top-level tasks (dev, build, package, server…)
└── mockup.png             # Screenshot used in this README
```

The service contract between Go and TypeScript lives in
`frontend/bindings/changeme` — it is regenerated automatically by Wails from
the exported methods on `MonitorService`.

---

## How the data flows

1. A `setInterval` in `OverviewDashboard.tsx` calls the Go bindings
   (`GetCpuPerc`, `GetRamUsage`, `GetDiskUsage`, `GetNetworkSpeed`) every
   `intervalTimer` ms.
2. `MonitorService` wraps [`gopsutil`](https://github.com/shirou/gopsutil) for
   cross-platform OS access. Network speed is computed as a delta vs. the
   previous sample, with guards against counter resets and unknown interfaces.
3. Each call returns JSON that React stores in state and feeds into the
   chart/gauge components.

A future iteration (see the roadmap below) will move to a Wails event push
model so the frontend doesn't have to poll.

---

## Roadmap

From the project requirements (see [`requerimientos.md`](./requerimientos.md)):

- [x] Live CPU, RAM, disk, network metrics
- [x] Dark theme dashboard with charts
- [ ] Process listing and "end task" actions
- [ ] Threshold-based native OS alerts
- [ ] SQLite-backed 24h history + trends view + CSV export
- [ ] Configurable refresh interval
- [ ] GPU usage (v2)

---

## Useful scripts (inside `frontend/`)

```bash
npm run dev          # Vite dev server only (no Go window)
npm run build        # Production frontend bundle into dist/
npm run build:dev    # Unminified dev bundle
npm run preview      # Preview the production bundle
```

---

## License

No license is currently set. Add one (e.g. MIT) before publishing releases.

---

## Acknowledgements

Built on top of:

- [Wails v3](https://v3.wails.io/) — Go + webview desktop framework.
- [gopsutil](https://github.com/shirou/gopsutil) — cross-platform system telemetry.
- [TanStack Router](https://tanstack.com/router) and [TanStack Charts](https://tanstack.com/charts).
- [Lucide](https://lucide.dev/) icons.
