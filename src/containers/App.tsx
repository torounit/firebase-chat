import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import "firebase/auth"

import { compose, withHandlers, withState } from "recompose"
import { DispatchProp } from "react-redux"

import withTheme from "../utils/hoc/withTheme"

import AppHeader from "./AppHeader"
import { CssBaseline, Grid, StyledComponentProps, withStyles } from "@material-ui/core"
import AppDrawerMenu from "./AppDrawerMenu"
import Home from "./Page/Home"

interface StateProps {}

interface WithStateProps {
  isSideMenuOpen: boolean
  updateSideMenuOpen: (f: (status: boolean) => boolean) => void
}

interface WithHandlerProps {
  handleSideMenuToggle: (status: boolean) => void
}

type Props = StateProps & DispatchProp & StyledComponentProps
type FCProps = Props & WithStateProps & WithHandlerProps
const App: React.FC<FCProps> = ({ isSideMenuOpen, handleSideMenuToggle, classes = {} }) => (
  <div className="App">
    <CssBaseline />
    <Grid className={classes.container} container wrap="nowrap" direction="column" justify="center">
      <Grid item>
        <AppHeader handleSideMenuToggle={handleSideMenuToggle}>
          <AppDrawerMenu open={isSideMenuOpen} handleToggleDrawer={handleSideMenuToggle} />
        </AppHeader>
      </Grid>
      <Grid item className={classes.main}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </Grid>
    </Grid>
  </div>
)

export default compose<FCProps, {}>(
  withTheme,
  withStyles(theme => ({
    container: {
      height: "100vh",
    },
    main: {
      flexShrink: 1,
      overflow: "hidden",
      height: "100vh",
      margin: `${theme.spacing.unit}px 0`,
    },
  })),
  withState<WithStateProps, boolean, string, string>("isSideMenuOpen", "updateSideMenuOpen", false),
  withHandlers<FCProps, WithHandlerProps>({
    handleSideMenuToggle: ({ updateSideMenuOpen }) => status => updateSideMenuOpen(() => status),
  })
)(App)
