import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"

import { compose, lifecycle, withHandlers, withState } from "recompose"
import { connect, DispatchProp } from "react-redux"

import withTheme from "../utils/hoc/withTheme"

import * as authActions from "../store/auth/actions"
import * as messagesActions from "../store/messages/actions"
import { AppState } from "../store"

import AppHeader from "./AppHeader"
import ChatMessages from "./ChatMessages"
import ChatInputter from "./ChatInputter"
import { CssBaseline, Grid, StyledComponentProps, withStyles } from "@material-ui/core"
import { Message } from "../store/messages"
import { Auth } from "../store/auth"
import AppDrawerMenu from "./AppDrawerMenu"

interface StateProps {
  auth: Auth
  messages: Message[]
}

interface WithStateProps {
  isSideMenuOpen: boolean
  updateSideMenuOpen: (f: (status: boolean) => boolean) => void
}

interface WithHandlerProps {
  handleSideMenuToggle: (status: boolean) => void
}

type Props = StateProps & DispatchProp & StyledComponentProps
type FCProps = Props & WithStateProps & WithHandlerProps
const App: React.FC<FCProps> = ({ auth, isSideMenuOpen, handleSideMenuToggle, classes = {} }) => (
  <div className="App">
    <CssBaseline />
    <Grid className={classes.container} container wrap="nowrap" direction="column" justify="center">
      <Grid item>
        <AppHeader handleSideMenuToggle={handleSideMenuToggle}>
          <AppDrawerMenu open={isSideMenuOpen} handleToggleDrawer={handleSideMenuToggle} />
        </AppHeader>
      </Grid>
      <Grid item className={classes.main}>
        {auth.uid && <ChatMessages />}
      </Grid>
      <Grid item>
        <ChatInputter />
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
      //flexGrow: 1,
      flexShrink: 1,
      overflow: "hidden",
      height: "100vh",
      margin: `${theme.spacing.unit}px 0`,
    },
  })),
  withState<WithStateProps, boolean, string, string>("isSideMenuOpen", "updateSideMenuOpen", false),
  withHandlers<FCProps, WithHandlerProps>({
    handleSideMenuToggle: ({ updateSideMenuOpen }) => status => updateSideMenuOpen(() => status),
  }),
  connect<StateProps, DispatchProp, {}, AppState>(
    (state: AppState): StateProps => ({
      auth: state.auth,
      messages: state.messages,
    })
  ),
  lifecycle<FCProps, {}>({
    componentDidMount() {
      const { dispatch } = this.props
      //login
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(authActions.login(user))
          dispatch(messagesActions.subscribe())
        } else {
          dispatch(authActions.logout())
        }
      })
    },
    componentDidUpdate(prevProps) {
      const { auth, dispatch, messages } = this.props
      if (auth.uid) {
      }
    },
  })
)(App)
