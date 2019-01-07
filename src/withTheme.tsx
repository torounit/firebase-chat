import React from "react"
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  colors,
} from "@material-ui/core"

const { purple, green } = colors
const theme = createMuiTheme({
  palette: {
  },
  typography: {
    useNextVariants: true,
  },
})
const withRoot = (Component: React.ComponentClass | React.SFC) => (
  props: any
) => (
  <MuiThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Component {...props} />
  </MuiThemeProvider>
)

export default withRoot
