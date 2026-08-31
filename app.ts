import app from "ags/gtk3/app"
import style from "./src/style/main.scss"
import Bar from "./src/widgets/Bar"
import OSD from "./src/widgets/OSD"
import ControlCenter from "./src/widgets/ControlCenter"
import AppLauncher from "./src/widgets/Launcher"
import PowerMenu from "./src/widgets/PowerMenu"

app.start({
  css: style,
  requestHandler(request, res) {
    const cmd = request.trim().toLowerCase()
    if (cmd === "launcher" || cmd === "applauncher") {
      app.toggle_window("AppLauncher")
      res("ok")
    } else if (cmd === "powermenu") {
      app.toggle_window("PowerMenu")
      res("ok")
    } else if (cmd === "controlcenter") {
      app.toggle_window("ControlCenter")
      res("ok")
    } else {
      res("unknown command")
    }
  },
  main() {
    app.get_monitors().forEach((monitor) => {
      Bar(monitor)
      OSD(monitor)
      ControlCenter(monitor)
      AppLauncher(monitor)
      PowerMenu(monitor)
    })
  },
})
