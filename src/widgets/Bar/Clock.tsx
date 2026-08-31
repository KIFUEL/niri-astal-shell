import { createPoll } from "ags/time"
import GLib from "gi://GLib"

export default function Clock() {
  const time = createPoll("", 1000, () => {
    return GLib.DateTime.new_now_local().format("%a %d %b  %H:%M") || ""
  })

  return (
    <box class="clock pill">
      <label label={time} />
    </box>
  )
}
