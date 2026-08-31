import Tray from "gi://AstalTray"
import { createBinding as bind } from "ags"

export default function SysTray() {
  const tray = Tray.get_default()

  return (
    <box class="pill tray">
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            class="tray-item"
            tooltipMarkup={bind(item, "tooltip_markup") as any}
            usePopover={false}
            menuModel={bind(item, "menu_model") as any}
          >
            <icon gicon={bind(item, "gicon") as any} />
          </menubutton>
        ))
      ) as any}
    </box>
  )
}
