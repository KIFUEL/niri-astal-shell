import Battery from "gi://AstalBattery"
import { createBinding as bind } from "ags"

export default function BatteryIndicator() {
  const bat = Battery.get_default()

  if (!bat || !bat.is_present) {
    return <box visible={false} />
  }

  const percent = bind(bat, "percentage").as((p: number) => `${Math.round(p * 100)}%`)
  const isCharging = bind(bat, "charging")
  const icon = bind(bat, "battery_icon_name")

  return (
    <box
      class={isCharging.as((c: boolean) => `pill indicator battery ${c ? "charging" : ""}`)}
      tooltipText={percent}
    >
      <icon icon={icon} />
      <label label={percent} />
    </box>
  )
}
