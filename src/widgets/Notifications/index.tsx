import app from "ags/gtk3/app"
import { Astal, Gtk, Gdk } from "ags/gtk3"
import GLib from "gi://GLib"
import Notifd from "gi://AstalNotifd"
import { createState } from "ags"

export default function NotificationPopups(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const notifd = Notifd.get_default()

  const [popups, setPopups] = createState<Notifd.Notification[]>([])

  if (notifd) {
    notifd.connect("notified", (_, id) => {
      const n = notifd.get_notification(id)
      if (!n || notifd.dont_disturb) return

      // Add to popup stack
      setPopups([n, ...popups().filter((item) => item.id !== id)])

      // Auto dismiss from popup list after 5 seconds
      GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => {
        setPopups(popups().filter((item) => item.id !== id))
        return GLib.SOURCE_REMOVE
      })
    })

    notifd.connect("resolved", (_, id) => {
      setPopups(popups().filter((item) => item.id !== id))
    })
  }

  return (
    <window
      name="NotificationPopups"
      class="NotificationPopups"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      layer={Astal.Layer.OVERLAY}
      application={app}
      visible={popups((p) => p.length > 0)}
    >
      <box class="popups-container" vertical>
        {popups((list) =>
          list.map((n) => (
            <box
              class={`popup-card ${n.urgency === Notifd.Urgency.CRITICAL ? "critical" : ""}`}
              vertical
            >
              <box class="notif-header">
                <icon
                  class="app-icon"
                  icon={n.app_icon || "preferences-desktop-notification-symbolic"}
                />
                <label
                  class="app-name"
                  label={n.app_name || "Notification"}
                  halign={Gtk.Align.START}
                  hexpand
                />
                <button
                  class="close-btn"
                  onClicked={() => {
                    n.dismiss()
                    setPopups(popups().filter((item) => item.id !== n.id))
                  }}
                >
                  <icon icon="window-close-symbolic" />
                </button>
              </box>

              <label class="summary" label={n.summary} halign={Gtk.Align.START} />
              {n.body && (
                <label class="body" label={n.body} halign={Gtk.Align.START} wrap />
              )}

              {n.actions.length > 0 && (
                <box>
                  {n.actions.map((act) => (
                    <button
                      class="action-button"
                      onClicked={() => {
                        act.invoke()
                        n.dismiss()
                      }}
                    >
                      <label label={act.label} />
                    </button>
                  ))}
                </box>
              )}
            </box>
          ))
        ) as any}
      </box>
    </window>
  )
}
