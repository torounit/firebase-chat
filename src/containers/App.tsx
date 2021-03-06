import React from "react"
import { NavLink, Route, Switch } from "react-router-dom"
import "firebase/auth"

import { compose, withHandlers, withState } from "recompose"
import { connect, DispatchProp } from "react-redux"

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
import { AppState, history } from "../store"
import { ConnectedRouter } from "connected-react-router"

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
const App: React.FC<FCProps> = ({ isWaiting, title, isSideMenuOpen, handleSideMenuToggle, classes = {} }) => (
  <div className="App">
    <CssBaseline />
    <ConnectedRouter history={history}>
      <Grid className={classes.container} container wrap="nowrap" direction="column" justify="center">
        <Grid item>
          <AppHeader title={`#${title}`} handleSideMenuToggle={handleSideMenuToggle}>
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/thread/:name" component={Home} />
            <Route path="/add-thread" component={AddThread} />
            <Route component={Home} />
          </Switch>
        </Grid>
      </Grid>
    </ConnectedRouter>
  </div>
)

export default compose<FCProps, {}>(
  withTheme,
  withStyles(() => ({
    container: {
      height: "100vh",
    },
    main: {
      flexShrink: 1,
      overflow: "hidden",
      height: "100vh",
    },
  })),
  withState<WithStateProps, boolean, string, string>("isSideMenuOpen", "updateSideMenuOpen", false),
  withHandlers<FCProps, WithHandlerProps>({
    handleSideMenuToggle: ({ updateSideMenuOpen }) => status => updateSideMenuOpen(() => status),
  }),
  connect<StateProps, DispatchProp, {}, AppState>(
    (state: AppState): StateProps => {
      const thread = state.threads.find(({ isActive }) => !!isActive)
      return {
        isWaiting: Boolean(state.auth.waiting),
        title: thread ? thread.name : "",
        router: state.router,
      }
    }
  )
)(App)
