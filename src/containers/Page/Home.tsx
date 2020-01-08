import React, { useEffect } from "react"
import ChatMessages from "../ChatMessages"
import { Auth } from "../../store/auth"
import { DispatchProp, useDispatch, useSelector } from "react-redux"
import { Grid, StyledComponentProps, Theme } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
    },
    container: {
      flexShrink: 1,
      overflow: "hidden",
      height: "100%",
      padding: `${theme.spacing(1)}px 0 0`,
    },
  })
)

const App: React.FC<FCProps> = () => {
  const classes = useStyles()
  const threads = useSelector((state: AppState) => state.threads)
  const thread = threads.find(({ isActive }) => !!isActive)
  const auth = useSelector((state: AppState) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (thread) {
      dispatch(messages.actions.subscribe(thread.name))
    }
  })

  return (
    <Grid container className={classes.root} wrap="nowrap" direction="column" justify="center">
      <Grid item className={classes.container}>
        {auth.uid && <ChatMessages />}
      </Grid>
      <Grid item>
        <ChatInputter />
      </Grid>
    </Grid>
  )
}

export default App
