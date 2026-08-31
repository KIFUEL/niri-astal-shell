import app from "ags/gtk3/app"
import { Astal, Gtk, Gdk } from "ags/gtk3"
import GLib from "gi://GLib"
import Wp from "gi://AstalWp"
import { createState } from "ags"

export default function OSD(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM } = Astal.WindowAnchor

  const [visible, setVisible] = createState(false)
  const [icon, setIcon] = createState("audio-volume-high-symbolic")
  const [value, setValue] = createState(0.5)
  const [label, setLabel] = createState("50%")

  let hideTimeout: number | null = null

  function triggerOSD(newIcon: string, newValue: number, newLabel: string) {
    setIcon(newIcon)
    setValue(newValue)
    setLabel(newLabel)
    setVisible(true)

    if (hideTimeout) {
      GLib.source_remove(hideTimeout)
      hideTimeout = null
    }

    hideTimeout = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1500, () => {
      setVisible(false)
      hideTimeout = null
      return GLib.SOURCE_REMOVE
    })
  }

  // Connect to WirePlumber audio speaker events
  const wp = Wp.get_default()
  const speaker = wp?.audio?.default_speaker

  if (speaker) {
    let initialVolume = speaker.volume
    let initialMute = speaker.mute

    speaker.connect("notify::volume", () => {
      const v = speaker.volume
      if (v !== initialVolume) {
        initialVolume = v
        const pct = Math.round(v * 100)
        triggerOSD(speaker.volume_icon || "audio-volume-high-symbolic", Math.min(v, 1.0), `${pct}%`)
      }
    })

    speaker.connect("notify::mute", () => {
      const m = speaker.mute
      if (m !== initialMute) {
        initialMute = m
        const v = speaker.volume
        triggerOSD(
          m ? "audio-volume-muted-symbolic" : speaker.volume_icon || "audio-volume-high-symbolic",
          m ? 0 : Math.min(v, 1.0),
          m ? "Muted" : `${Math.round(v * 100)}%`
        )
      }
    })
  }

  return (
    <window
      class="OSD"
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM}
      layer={Astal.Layer.OVERLAY}
      visible={visible}
      application={app}
    >
      <box class="osd-container" vertical>
        <box halign={Gtk.Align.CENTER}>
          <icon class="osd-icon" icon={icon} />
        </box>
        <label class="osd-label" label={label} halign={Gtk.Align.CENTER} />
        <levelbar
          valign={Gtk.Align.CENTER}
          value={value}
          minValue={0}
          maxValue={1}
        />
      </box>
    </window>
  )
}
