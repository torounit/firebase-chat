import React from "react"
import ChatMessages from "../ChatMessages"
import { Auth } from "../../store/auth"
import { connect, DispatchProp } from "react-redux"
import { Grid, StyledComponentProps, withStyles } from "@material-ui/core"
import { compose, lifecycle } from "recompose"
import { AppState } from "../../store"
import * as messages from "../../store/messages"
import * as threads from "../../store/threads"
import ChatInputter from "../ChatInputter"
import { RouteComponentProps } from "react-router"

interface StateProps {
  auth: Auth
  messages: messages.Message[]
}

type Props = StateProps & DispatchProp & StyledComponentProps & RouteComponentProps
type FCProps = Props

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
      padding: `${theme.spacing.unit}px 0 0`,
    },
  })),
  connect<StateProps, DispatchProp, {}, AppState>(
    (state: AppState): StateProps => ({
      auth: state.auth,
      messages: state.messages,
    })
  ),
  lifecycle<FCProps, {}>({
    componentDidMount() {
      const { dispatch } = this.props
      dispatch(messages.actions.subscribe("general"))
    },
    componentDidUpdate(prevProps) {
      const { dispatch, match } = this.props
      if (prevProps.match.params !== match.params) {
        const params: any = match.params
        let name = ""
        if (params.name) {
          name = params.name
        } else {
          name = "general"
        }
        dispatch(threads.actions.select(name))
        dispatch(messages.actions.subscribe(name))
      }
    },
  })
)(App)
