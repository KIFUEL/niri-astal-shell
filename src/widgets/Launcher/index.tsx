import app from "ags/gtk3/app"
import { Astal, Gtk, Gdk } from "ags/gtk3"
import Apps from "gi://AstalApps"
import { createState } from "ags"

export default function AppLauncher(gdkmonitor: Gdk.Monitor) {
  const apps = new Apps.Apps()
  const [query, setQuery] = createState("")
  const [list, setList] = createState(apps.get_list().slice(0, 10))

  function updateQuery(text: string) {
    setQuery(text)
    if (!text.trim()) {
      setList(apps.get_list().slice(0, 10))
    } else {
      setList(apps.fuzzy_query(text).slice(0, 8))
    }
  }

  function launchApp(selectedApp: Apps.Application) {
    selectedApp.launch()
    app.toggle_window("AppLauncher")
  }

  return (
    <window
      name="AppLauncher"
      class="AppLauncher"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.NONE}
      layer={Astal.Layer.OVERLAY}
      visible={false}
      application={app}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyPressEvent={(_, event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
          app.toggle_window("AppLauncher")
        }
      }}
    >
      <box class="launcher-container" vertical>
        <entry
          class="search-entry"
          placeholderText="Search applications..."
          text={query}
          onChanged={(self) => updateQuery(self.text)}
          onActivate={() => {
            const current = list()
            if (current.length > 0) {
              launchApp(current[0])
            }
          }}
        />

        <scrollable class="app-list" vexpand>
          <box vertical>
            {list((items) =>
              items.map((item) => (
                <button
                  class="app-item"
                  onClicked={() => launchApp(item)}
                >
                  <box>
                    <icon class="app-icon" icon={item.icon_name || "application-x-executable-symbolic"} />
                    <box vertical halign={Gtk.Align.START} hexpand>
                      <label class="app-name" label={item.name} halign={Gtk.Align.START} />
                      {item.description && (
                        <label
                          class="app-desc"
                          label={item.description.slice(0, 45)}
                          halign={Gtk.Align.START}
                        />
                      )}
                    </box>
                  </box>
                </button>
              ))
            ) as any}
          </box>
        </scrollable>
      </box>
    </window>
  )
}
