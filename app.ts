import app from "ags/gtk3/app"
import style from "./src/style/main.scss"
import Bar from "./src/widgets/Bar"
import OSD from "./src/widgets/OSD"
import ControlCenter from "./src/widgets/ControlCenter"

app.start({
  css: style,
  main() {
    app.get_monitors().forEach((monitor) => {
      Bar(monitor)
      OSD(monitor)
      ControlCenter(monitor)
    })
  },
})
