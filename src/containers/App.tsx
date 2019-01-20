import React from "react"
import { BrowserRouter, NavLink, Route } from "react-router-dom"
import "firebase/auth"

import { compose, withHandlers, withState } from "recompose"
import { DispatchProp } from "react-redux"

import withTheme from "../utils/hoc/withTheme"

import AppHeader from "./AppHeader"
import {
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  StyledComponentProps,
  withStyles,
} from "@material-ui/core"
import AppDrawerMenu from "./AppDrawerMenu"
import Home from "./Page/Home"
import AddThread from "./Page/AddThread"

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
// @ts-ignore
const App: React.FC<FCProps> = ({ isSideMenuOpen, handleSideMenuToggle, classes = {} }) => (
  <div className="App">
    <CssBaseline />
    <BrowserRouter>
      <Grid className={classes.container} container wrap="nowrap" direction="column" justify="center">
        <Grid item>
          <AppHeader handleSideMenuToggle={handleSideMenuToggle}>
            <AppDrawerMenu open={isSideMenuOpen} handleToggleDrawer={handleSideMenuToggle}>
              <React.Fragment>
                <ListSubheader>Links</ListSubheader>
                <List>
                  <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
                    <ListItem button dense>
                      <ListItemText primary="HOME" />
                    </ListItem>
                  </NavLink>
                  <NavLink to="/add-thread" style={{ textDecoration: "none", color: "unset" }}>
                    <ListItem button dense>
                      <ListItemText primary="Add Thread" />
                    </ListItem>
                  </NavLink>
                </List>
              </React.Fragment>
            </AppDrawerMenu>
          </AppHeader>
        </Grid>
        <Grid item className={classes.main}>
          <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/thread/:name" component={Home} />
            <Route path="/add-thread" component={AddThread} />
          </React.Fragment>
        </Grid>
      </Grid>
    </BrowserRouter>
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
