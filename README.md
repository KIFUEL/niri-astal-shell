# niri-astal-shell

A fast, lightweight, and modern desktop shell built for the [Niri](https://github.com/YaLTeR/niri) scrollable-tiling Wayland compositor using **Astal** (AGS v2), **GTK3**, and **TypeScript**.

## Features (In Development)

- ⚡ **High Performance & Low Latency**: Native GTK3 Wayland layer shell integration.
- 📊 **Status Bar**: Live Niri workspaces/windows tracking, media controls (MPRIS), volume/brightness sliders, battery, network, and clock.
- 🔔 **Notification Center**: Native notifications with Astal Notifd.
- 🎛️ **Quick Settings & Control Center**: Fast toggles and system controls.
- 🚀 **App Launcher**: Instant search and launch.

## Requirements

- **Niri** compositor
- **Astal / AGS v2** (`libastal-meta`, `aylurs-gtk-shell-git`)
- **GJS**, **NodeJS**, **TypeScript**, **Dart-Sass**

## Development

```bash
# Run in development mode
ags run

# Generate types
ags types

# Build / bundle
ags bundle
```
