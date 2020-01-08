import React from "react"
import ChatMessages from "../ChatMessages"
import { Auth } from "../../store/auth"
import { connect, DispatchProp } from "react-redux"
import { Grid, StyledComponentProps, withStyles } from "@material-ui/core"
import { compose, lifecycle } from "recompose"
import { AppState } from "../../store"
import * as messages from "../../store/messages"
import { Thread } from "../../store/threads"
import ChatInputter from "../ChatInputter"
import { RouteChildrenProps, RouteComponentProps } from "react-router"
import { RouterState } from "connected-react-router"

interface StateProps {
  auth: Auth
  thread?: Thread
  messages: messages.Message[]
  router: RouterState
}

type Props = StateProps & DispatchProp & StyledComponentProps & RouteComponentProps
type FCProps = Props & RouteChildrenProps

const App: React.FC<FCProps> = ({ auth, classes = {} }) => (
  <Grid container className={classes.root} wrap="nowrap" direction="column" justify="center">
    <Grid item className={classes.container}>
      {auth.uid && <ChatMessages />}
    </Grid>
    <Grid item>
      <ChatInputter />
    </Grid>
  </Grid>
)

export default compose<FCProps, {}>(
  withStyles(theme => ({
    root: {
      height: "100%",
    },
    container: {
      flexShrink: 1,
      overflow: "hidden",
      height: "100%",
      padding: `${theme.spacing(1)}px 0 0`,
    },
  })),
  connect<StateProps, DispatchProp, {}, AppState>(
    (state: AppState): StateProps => ({
      auth: state.auth,
      thread: state.threads.find(({ isActive }) => !!isActive),
      messages: state.messages,
      router: state.router,
    })
  ),
  lifecycle<FCProps, {}>({
    componentDidMount() {
      const { dispatch, thread } = this.props
      if (thread) {
        dispatch(messages.actions.subscribe(thread.name))
      }
    },
    componentDidUpdate(prevProps) {
      const { dispatch, thread } = this.props
      if (thread && prevProps.thread != thread) {
        if (thread) {
          dispatch(messages.actions.subscribe(thread.name))
        }
      }
    },
  })
)(App)
