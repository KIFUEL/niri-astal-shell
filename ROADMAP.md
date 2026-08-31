# Investigación: Arquitectura de Desktop Shells en Wayland & Plan de Actividades

Este documento detalla qué componentes conforman un *Desktop Shell* moderno en Wayland, cómo interactúa con el compositor (**Niri**) y el sistema operativo, y define el plan de trabajo modular para desarrollar **`niri-astal-shell`**.

---

## 1. Estado del Proyecto

- **Repositorio:** [https://github.com/KIFUEL/niri-astal-shell](https://github.com/KIFUEL/niri-astal-shell)
- **Sesión del sistema:** `niri-astal-session` (`/usr/share/wayland-sessions/niri-astal.desktop`)
- **Progreso general:** **100% COMPLETADO (v1.0.0)** 🚀

---

## 2. Checklist de Actividades Completadas

- [x] **Fase 1: Estructura Modular y Sistema de Diseño**
  - [x] Variables SCSS (`_variables.scss`) con paleta moderna, sombras y tipografía.
  - [x] Configuración modular en `app.ts` y TSX reactivo.
  - [x] Tipos e integración con GObject Introspection (`@girs`) y `ags` CLI.

- [x] **Fase 2: Barra de Estado Principal (Core Bar)**
  - [x] Widget de Reloj con fecha y hora (`Clock.tsx`).
  - [x] Widget de Batería con estados de carga e iconos dinámicos (`Battery.tsx`).
  - [x] Widget de Red con soporte para Wi-Fi (SSID) y Ethernet (`Network.tsx`).
  - [x] Widget de Audio WirePlumber con ajuste de volumen por scroll y clic para mutear (`Audio.tsx`).
  - [x] Bandeja del sistema completa para apps de fondo (`SysTray.tsx`).
  - [x] Reproductor multimedia compacto MPRIS (`Media.tsx`).
  - [x] Botones de acceso rápido para Apps, Control Center y Power Menu.

- [x] **Fase 3: Integración Específica con Niri IPC**
  - [x] Indicador interactivo de workspaces para Niri (`Workspaces.tsx`).
  - [x] Título y app de la ventana activa (`FocusedTitle.tsx`).
  - [x] Perfil de configuración dedicado `~/.config/niri/config-astal.kdl`.
  - [x] Entrada de sesión de escritorio en `/usr/share/wayland-sessions/niri-astal.desktop`.

- [x] **Fase 4: Popups OSD (On-Screen Display)**
  - [x] Ventana OSD flotante animada para volumen de audio (`OSD/index.tsx`).
  - [x] Temporizador automático de desaparición suave (1.5 segundos).

- [x] **Fase 5: Centro de Control y Notificaciones**
  - [x] Panel lateral retráctil (`ControlCenter/index.tsx`).
  - [x] Toggles rápidos de Wi-Fi, Bluetooth y modo No Molestar (DND).
  - [x] Slider continuo de volumen de audio.
  - [x] Centro de notificaciones con historial y botón "Clear all".
  - [x] Botón de activación en la barra y atajo de teclado en Niri (<kbd>Mod</kbd> + <kbd>N</kbd>).

- [x] **Fase 6: App Launcher & Power Menu**
  - [x] Ventana modal centrada para el lanzador de aplicaciones con búsqueda fuzzy rápida (`AstalApps`).
  - [x] Ejecución directa con <kbd>Enter</kbd> y cierre con <kbd>Escape</kbd>.
  - [x] Modal visual de confirmación para Bloqueo, Suspensión, Salida, Reinicio y Apagado.
  - [x] Atajos integrados en Niri: <kbd>Mod</kbd> + <kbd>Espacio</kbd> (Launcher) y <kbd>Super</kbd> + <kbd>X</kbd> (Power Menu).

- [x] **Fase 7: Theming Dinámico, Notificaciones Toasts y Pulido Final**
  - [x] Popups flotantes de notificaciones en tiempo real con autocierre de 5s (`NotificationPopups.tsx`).
  - [x] Sistema de paletas de color (`theme.ts`).
  - [x] Documentación completa en `README.md` y etiquetado de release v1.0.0.
