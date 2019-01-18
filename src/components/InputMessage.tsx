import React from "react"
import { AppBar, Button, TextField, Toolbar } from "@material-ui/core"
import { Chat } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"
import { compose, withHandlers, withState } from "recompose"

export interface Props {
  onSend: (message: { authorUid?: string; content: string }) => void
}

interface withStylesProps {
  classes: any
}

interface WithStateProps {
  message: string
  uid: string
  updateMessage: (f: () => string) => void
}

interface WithHandlerProps {
  update: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  send: React.MouseEventHandler<HTMLElement>
}

type ComposedProps = WithStateProps & WithHandlerProps
type FCProps = ComposedProps & Props & withStylesProps

const InputMessage: React.FC<FCProps> = ({ classes, update, send }) => (
  <AppBar
    position={"fixed"}
    className={classes.appBar}
    component="div"
    color="default"
  >
    <Toolbar>
      <TextField
        multiline
        fullWidth
        rowsMax="4"
        margin="normal"
        onChange={update}
      />
      <Button color="inherit" onClick={send}>
        <Chat fontSize="small" /> Send
      </Button>
    </Toolbar>
  </AppBar>
)
//compose<InputProps, OutputProps>
export default compose<FCProps, Props>(
  withStyles({
    appBar: {
      top: "auto",
      bottom: 0,
    },
  }),
  withState<WithStateProps, string, "message", "updateMessage">(
    "message",
    "updateMessage",
    ""
  ),
  withHandlers<FCProps, WithHandlerProps>({
    update: ({ updateMessage }) => event => {
      let value = event.target.value
      updateMessage(() => value)
    },
    send: ({ message, onSend, uid }) => event => {
      onSend({
        authorUid: uid,
        content: message,
      })
    },
  })
)(InputMessage)
