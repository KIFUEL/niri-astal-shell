import Network from "gi://AstalNetwork"
import { createBinding as bind } from "ags"

export default function NetworkIndicator() {
  const net = Network.get_default()

  if (!net) {
    return <box visible={false} />
  }

  const wifi = net.wifi

  if (!wifi) {
    return (
      <box class="pill indicator network">
        <icon icon={bind(net, "wired").as((w) => w?.icon_name || "network-wired-symbolic")} />
      </box>
    )
  }

  return (
    <box
      class="pill indicator network"
      tooltipText={bind(wifi, "ssid").as((s: string | null) => s || "Disconnected")}
    >
      <icon icon={bind(wifi, "icon_name")} />
      <label
        label={bind(wifi, "ssid").as((s: string | null) => (s ? s.slice(0, 10) : ""))}
        visible={bind(wifi, "ssid").as((s: string | null) => Boolean(s))}
      />
    </box>
  )
}
