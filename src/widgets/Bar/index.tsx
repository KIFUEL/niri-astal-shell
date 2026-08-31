import app from "ags/gtk3/app"
import { Astal, Gtk, Gdk } from "ags/gtk3"
import Workspaces from "./Workspaces"
import FocusedTitle from "./FocusedTitle"
import Clock from "./Clock"
import Media from "./Media"
import SysTray from "./SysTray"
import AudioIndicator from "./Audio"
import BatteryIndicator from "./Battery"
import NetworkIndicator from "./Network"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox class="bar-container">
        {/* Left: App Launcher, Workspaces & Window Title */}
        <box $type="start" halign={Gtk.Align.START}>
          <button
            class="pill indicator"
            onClicked={() => app.toggle_window("AppLauncher")}
            tooltipText="Applications"
          >
            <icon icon="view-app-grid-symbolic" />
          </button>
          <Workspaces />
          <FocusedTitle />
        </box>

        {/* Center: Clock & Media */}
        <box $type="center" halign={Gtk.Align.CENTER}>
          <Clock />
          <Media />
        </box>

        {/* Right: System Tray, Indicators & Control Center toggle */}
        <box $type="end" halign={Gtk.Align.END}>
          <SysTray />
          <NetworkIndicator />
          <AudioIndicator />
          <BatteryIndicator />
          <button
            class="pill indicator"
            onClicked={() => app.toggle_window("ControlCenter")}
            tooltipText="Control Center"
          >
            <icon icon="open-menu-symbolic" />
          </button>
          <button
            class="pill indicator power-btn"
            onClicked={() => app.toggle_window("PowerMenu")}
            tooltipText="Power Menu"
          >
            <icon icon="system-shutdown-symbolic" />
          </button>
        </box>
      </centerbox>
    </window>
  )
}
