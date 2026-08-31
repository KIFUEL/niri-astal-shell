import app from "ags/gtk3/app"
import { Astal, Gtk, Gdk } from "ags/gtk3"
import GLib from "gi://GLib"
import Network from "gi://AstalNetwork"
import Bluetooth from "gi://AstalBluetooth"
import Wp from "gi://AstalWp"
import Notifd from "gi://AstalNotifd"
import { createBinding as bind } from "ags"
import { execAsync } from "ags/process"

export default function ControlCenter(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  const net = Network.get_default()
  const bt = Bluetooth.get_default()
  const wp = Wp.get_default()
  const speaker = wp?.audio?.default_speaker
  const notifd = Notifd.get_default()

  const userName = GLib.get_user_name()

  return (
    <window
      name="ControlCenter"
      class="ControlCenter"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      layer={Astal.Layer.TOP}
      visible={false}
      application={app}
      keymode={Astal.Keymode.ON_DEMAND}
    >
      <box class="control-center-panel" vertical>
        {/* Header */}
        <box class="header">
          <box vertical halign={Gtk.Align.START} hexpand>
            <label class="user-name" label={userName} halign={Gtk.Align.START} />
            <label class="uptime" label="Astal Shell on Niri" halign={Gtk.Align.START} />
          </box>
          <box halign={Gtk.Align.END}>
            <button
              class="action-btn"
              onClicked={() => execAsync("swaylock || hyprlock").catch(() => {})}
            >
              <icon icon="system-lock-screen-symbolic" />
            </button>
            <button
              class="action-btn power"
              onClicked={() => execAsync("niri msg action quit").catch(() => {})}
            >
              <icon icon="system-shutdown-symbolic" />
            </button>
          </box>
        </box>

        {/* Quick Toggles Grid */}
        <box class="toggles-grid" homogeneous>
          {/* Wi-Fi Toggle */}
          {net?.wifi && (
            <button
              class={bind(net.wifi, "enabled").as(
                (en) => `toggle-btn ${en ? "active" : ""}`
              )}
              onClicked={() => {
                if (net.wifi) net.wifi.enabled = !net.wifi.enabled
              }}
            >
              <box halign={Gtk.Align.CENTER}>
                <icon class="toggle-icon" icon="network-wireless-symbolic" />
                <label class="toggle-label" label="Wi-Fi" />
              </box>
            </button>
          )}

          {/* Bluetooth Toggle */}
          {bt && (
            <button
              class={bind(bt, "is_powered").as(
                (pow) => `toggle-btn ${pow ? "active" : ""}`
              )}
              onClicked={() => {
                bt.toggle()
              }}
            >
              <box halign={Gtk.Align.CENTER}>
                <icon class="toggle-icon" icon="bluetooth-active-symbolic" />
                <label class="toggle-label" label="Bluetooth" />
              </box>
            </button>
          )}

          {/* DND Toggle */}
          {notifd && (
            <button
              class={bind(notifd, "dont_disturb").as(
                (dnd) => `toggle-btn ${dnd ? "active" : ""}`
              )}
              onClicked={() => {
                notifd.dont_disturb = !notifd.dont_disturb
              }}
            >
              <box halign={Gtk.Align.CENTER}>
                <icon class="toggle-icon" icon="notifications-disabled-symbolic" />
                <label class="toggle-label" label="DND" />
              </box>
            </button>
          )}
        </box>

        {/* Sliders Section */}
        {speaker && (
          <box class="sliders-section" vertical>
            <box class="slider-row">
              <icon
                class="slider-icon"
                icon={bind(speaker, "volume_icon")}
              />
              <slider
                hexpand
                value={bind(speaker, "volume")}
                onDragged={({ value }) => {
                  speaker.volume = value
                }}
              />
            </box>
          </box>
        )}

        {/* Notifications History */}
        {notifd && (
          <box class="notifications-section" vertical hexpand>
            <box>
              <label class="section-title" label="Notifications" halign={Gtk.Align.START} hexpand />
              <button
                class="clear-btn"
                onClicked={() => {
                  notifd.notifications.forEach((n) => n.dismiss())
                }}
              >
                <label label="Clear all" />
              </button>
            </box>

            <scrollable class="notif-list" vexpand>
              <box vertical>
                {bind(notifd, "notifications").as((notifs) => {
                  if (notifs.length === 0) {
                    return (
                      <label
                        class="empty-label"
                        label="No new notifications"
                        halign={Gtk.Align.CENTER}
                      />
                    )
                  }

                  return notifs.map((n) => (
                    <box class="notif-card" vertical>
                      <box>
                        <icon icon={n.app_icon || "preferences-desktop-notification-symbolic"} />
                        <label
                          class="notif-summary"
                          label={n.summary}
                          halign={Gtk.Align.START}
                          hexpand
                          style="margin-left: 6px;"
                        />
                        <button
                          class="notif-close"
                          onClicked={() => n.dismiss()}
                        >
                          <icon icon="window-close-symbolic" />
                        </button>
                      </box>
                      {n.body && (
                        <label
                          class="notif-body"
                          label={n.body}
                          halign={Gtk.Align.START}
                          wrap
                        />
                      )}
                    </box>
                  ))
                }) as any}
              </box>
            </scrollable>
          </box>
        )}
      </box>
    </window>
  )
}
