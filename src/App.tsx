import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import withTheme from "./withTheme"

const App: React.SFC = () => (
  <div className="App">
    <AppBar>
      <Toolbar>
        <Typography  color="inherit" >App</Typography>
      </Toolbar>
    </AppBar>
  </div>
)

export default withTheme(App)
