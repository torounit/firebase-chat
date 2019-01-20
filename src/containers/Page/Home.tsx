import React from "react"
import ChatMessages from "../ChatMessages"
import { Auth } from "../../store/auth"
import { Message } from "../../store/messages"
import { connect, DispatchProp } from "react-redux"
import { Grid, StyledComponentProps, withStyles } from "@material-ui/core"
import { compose, lifecycle } from "recompose"
import { AppState } from "../../store"
import * as messagesActions from "../../store/messages/actions"
import ChatInputter from "../ChatInputter"

interface StateProps {
  auth: Auth
  messages: Message[]
}

type Props = StateProps & DispatchProp & StyledComponentProps
type FCProps = Props

const App: React.FC<FCProps> = ({ auth, classes = {} }) => (
  <Grid container className={classes.root} wrap="nowrap" direction="column" justify="center">
    <Grid item className={classes.container}>{auth.uid && <ChatMessages />}</Grid>
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
      overflow: "scroll",
      height: "100%",
      margin: `${theme.spacing.unit}px 0`,
      padding: `0 ${theme.spacing.unit * 4}px`,

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
      //login
      dispatch(messagesActions.subscribe())
    },
  })
)(App)
