import Wp from "gi://AstalWp"
import { createBinding as bind } from "ags"
import { Astal } from "ags/gtk3"

export default function AudioIndicator() {
  const wp = Wp.get_default()
  const speaker = wp?.audio?.default_speaker

  if (!speaker) {
    return <box visible={false} />
  }

  const volume = bind(speaker, "volume").as((v: number) => `${Math.round(v * 100)}%`)
  const isMute = bind(speaker, "mute")
  const icon = bind(speaker, "volume_icon")

  return (
    <eventbox
      class={isMute.as((m: boolean) => `pill indicator audio ${m ? "muted" : ""}`)}
      onClick={(_, event) => {
        if (event.button === Astal.MouseButton.PRIMARY) {
          speaker.set_mute(!speaker.mute)
        }
      }}
      onScroll={(_, event) => {
        if (event.delta_y < 0) {
          speaker.volume = Math.min(speaker.volume + 0.05, 1.5)
        } else if (event.delta_y > 0) {
          speaker.volume = Math.max(speaker.volume - 0.05, 0)
        }
      }}
      tooltipText={volume}
    >
      <box>
        <icon icon={icon} />
        <label label={volume} />
      </box>
    </eventbox>
  )
}
