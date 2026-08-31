import { execAsync } from "ags/process"
import { createPoll } from "ags/time"

export default function Workspaces() {
  const activeWs = createPoll(1, 500, async () => {
    try {
      const out = await execAsync("niri msg -j workspaces")
      const list = JSON.parse(out)
      const focused = list.find((w: any) => w.is_focused)
      return focused ? focused.idx : 1
    } catch {
      return 1
    }
  })

  const wsNumbers = [1, 2, 3, 4, 5, 6, 7]

  return (
    <box class="pill workspaces">
      {wsNumbers.map((num) => (
        <button
          class={activeWs((curr) => `ws-btn ${curr === num ? "active" : ""}`)}
          onClicked={() => {
            execAsync(`niri msg action focus-workspace ${num}`).catch(() => {})
          }}
        >
          <label label={`${num}`} />
        </button>
      ))}
    </box>
  )
}
