import { execAsync } from "ags/process"
import { createPoll } from "ags/time"

export default function FocusedTitle() {
  const title = createPoll("", 500, async () => {
    try {
      const out = await execAsync("niri msg -j focused-window")
      const win = JSON.parse(out)
      const t = win?.title || win?.app_id || ""
      return t.length > 40 ? `${t.slice(0, 37)}...` : t
    } catch {
      return ""
    }
  })

  return (
    <box
      class="pill focused-title"
      visible={title((t) => Boolean(t))}
    >
      <label label={title} />
    </box>
  )
}
