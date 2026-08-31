import app from "ags/gtk3/app"
import style from "./src/style/main.scss"
import Bar from "./src/widgets/Bar"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)
  },
})
