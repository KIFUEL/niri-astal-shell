import app from "ags/gtk3/app"
import { Astal, Gtk, Gdk } from "ags/gtk3"
import { execAsync } from "ags/process"

export default function PowerMenu(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="PowerMenu"
      class="PowerMenu"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.NONE}
      layer={Astal.Layer.OVERLAY}
      visible={false}
      application={app}
      keymode={Astal.Keymode.EXCLUSIVE}
      onKeyPressEvent={(_, event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
          app.toggle_window("PowerMenu")
        }
      }}
    >
      <box class="powermenu-container" vertical>
        <label class="powermenu-title" label="Power Options" halign={Gtk.Align.CENTER} />
        <box halign={Gtk.Align.CENTER}>
          {/* Lock */}
          <button
            class="power-btn-card lock"
            onClicked={() => {
              app.toggle_window("PowerMenu")
              execAsync("swaylock || hyprlock").catch(() => {})
            }}
          >
            <box vertical halign={Gtk.Align.CENTER}>
              <icon class="power-icon" icon="system-lock-screen-symbolic" />
              <label class="power-label" label="Lock" />
            </box>
          </button>

          {/* Suspend */}
          <button
            class="power-btn-card"
            onClicked={() => {
              app.toggle_window("PowerMenu")
              execAsync("systemctl suspend").catch(() => {})
            }}
          >
            <box vertical halign={Gtk.Align.CENTER}>
              <icon class="power-icon" icon="weather-clear-night-symbolic" />
              <label class="power-label" label="Sleep" />
            </box>
          </button>

          {/* Logout */}
          <button
            class="power-btn-card logout"
            onClicked={() => {
              app.toggle_window("PowerMenu")
              execAsync("niri msg action quit").catch(() => {})
            }}
          >
            <box vertical halign={Gtk.Align.CENTER}>
              <icon class="power-icon" icon="system-log-out-symbolic" />
              <label class="power-label" label="Logout" />
            </box>
          </button>

          {/* Reboot */}
          <button
            class="power-btn-card reboot"
            onClicked={() => {
              app.toggle_window("PowerMenu")
              execAsync("systemctl reboot").catch(() => {})
            }}
          >
            <box vertical halign={Gtk.Align.CENTER}>
              <icon class="power-icon" icon="system-reboot-symbolic" />
              <label class="power-label" label="Reboot" />
            </box>
          </button>

          {/* Shutdown */}
          <button
            class="power-btn-card shutdown"
            onClicked={() => {
              app.toggle_window("PowerMenu")
              execAsync("systemctl poweroff").catch(() => {})
            }}
          >
            <box vertical halign={Gtk.Align.CENTER}>
              <icon class="power-icon" icon="system-shutdown-symbolic" />
              <label class="power-label" label="Shutdown" />
            </box>
          </button>
        </box>
      </box>
    </window>
  )
}
