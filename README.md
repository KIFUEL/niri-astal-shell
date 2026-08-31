# 🚀 niri-astal-shell

A fast, lightweight, and modern desktop shell built specifically for the **[Niri](https://github.com/YaLTeR/niri)** scrollable-tiling Wayland compositor using **Astal** (AGS v2), **GTK3**, and **TypeScript**.

[![GitHub Release](https://img.shields.io/badge/release-v1.0.0-blue.svg)](https://github.com/KIFUEL/niri-astal-shell/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- ⚡ **Ultra-Low Latency**: Native GTK3 Wayland layer shell integration (`gtk-layer-shell`).
- 📊 **Status Bar**:
  - 🧭 Interactive Niri Workspaces & focused window title.
  - 🕒 Clock with local date and interactive calendar.
  - 🎵 Compact MPRIS Media player (Spotify, browser, etc.).
  - 🔊 WirePlumber audio with scroll-to-adjust volume and mute toggle.
  - 🔋 Dynamic battery indicator with charging states and percentage.
  - 📶 Wi-Fi (SSID) & Ethernet network indicator.
  - 📌 Complete System Tray (*StatusNotifierItem / SNI*).
- 🎛️ **Quick Settings & Control Center**:
  - Quick toggles for **Wi-Fi**, **Bluetooth**, and **Do Not Disturb (DND)**.
  - Continuous speaker volume slider.
  - Full notification history with one-click *"Clear all"*.
  - Quick session power buttons.
- 🔔 **Notification Daemon**:
  - Real-time floating popup toasts with app icon, summary, body, and action buttons.
  - Auto-dismiss after 5 seconds or click to close.
- 🎚️ **OSD (On-Screen Display)**:
  - Animated floating overlay popup for volume adjustments with 1.5s auto-hide.
- 🔍 **App Launcher**:
  - Centered modal with fuzzy search powered by `AstalApps`.
  - Instant launch with <kbd>Enter</kbd> and dismiss with <kbd>Escape</kbd>.
- ⚡ **Power Menu**:
  - Beautiful visual modal for **Lock**, **Sleep**, **Logout**, **Reboot**, and **Shutdown**.
- 🎨 **Adaptive Theming**:
  - SCSS with modern dark palette inspired by Material You and Catppuccin Mocha.

---

## ⌨️ Default Keybindings in Niri

| Shortcut | Action |
| :--- | :--- |
| <kbd>Mod</kbd> + <kbd>Space</kbd> | Toggle App Launcher |
| <kbd>Mod</kbd> + <kbd>N</kbd> | Toggle Control Center & Notifications |
| <kbd>Super</kbd> + <kbd>X</kbd> | Toggle Power Menu |
| <kbd>Mod</kbd> + <kbd>T</kbd> | Launch Terminal (`alacritty`) |
| <kbd>Mod</kbd> + <kbd>Q</kbd> | Close Focused Window |
| <kbd>Volume Keys</kbd> | Adjust Volume + Trigger Animated OSD |

---

## 📦 Requirements & Dependencies

- **Arch / CachyOS**:
  ```bash
  run0 pacman -S --needed nodejs npm gjs dart-sass typescript gtk3 gtk-layer-shell libastal-meta
  paru -S aylurs-gtk-shell-git
  ```

---

## 🚀 How to Run

### In Development / Live Testing
```bash
cd ~/Projects/niri-astal-shell
ags run
```

### Dedicated Niri Session
A dedicated session file is provided for display managers (SDDM, GDM, Ly):
- **Session Entry:** `/usr/share/wayland-sessions/niri-astal.desktop`
- **Config:** `~/.config/niri/config-astal.kdl`
