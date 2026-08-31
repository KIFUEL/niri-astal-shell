import Mpris from "gi://AstalMpris"
import { createBinding as bind } from "ags"
import { Astal } from "ags/gtk3"

export default function Media() {
  const mpris = Mpris.get_default()

  return (
    <box visible={bind(mpris, "players").as((p) => p.length > 0)}>
      {bind(mpris, "players").as((players) => {
        const player = players[0]
        if (!player) return null

        const playbackStatus = bind(player, "playback_status")

        return (
          <eventbox
            class="pill media"
            onClick={(_, event) => {
              if (event.button === Astal.MouseButton.PRIMARY) {
                player.play_pause()
              }
            }}
          >
            <box>
              <icon
                class="media-icon"
                icon={playbackStatus.as((s) =>
                  s === Mpris.PlaybackStatus.PLAYING
                    ? "media-playback-start-symbolic"
                    : "media-playback-pause-symbolic"
                )}
              />
              <label
                label={bind(player, "title").as((t) => {
                  const art = player.artist ? `${player.artist} - ` : ""
                  const full = `${art}${t || ""}`
                  return full.length > 28 ? `${full.slice(0, 25)}...` : full
                })}
              />
            </box>
          </eventbox>
        )
      }) as any}
    </box>
  )
}
