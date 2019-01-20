import React from "react"
import { colors, createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core"

const { purple, green } = colors
const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#fff",
      default: "#ddd",
    },
  },
  typography: {
    useNextVariants: true,
  },
})
const withRoot = (Component: React.ComponentClass | React.SFC) => (props: any) => (
  <MuiThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Component {...props} />
  </MuiThemeProvider>
)

export default withRoot
