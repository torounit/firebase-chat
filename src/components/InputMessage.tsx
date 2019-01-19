import React from "react"
import { AppBar, Button, StyledComponentProps, TextField, Toolbar } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { compose, withHandlers, withState } from "recompose"
import { Message } from "../store/messages/state"

export interface DispatchProps {
  onSend: (message: Message) => void
}

export type Props = DispatchProps

interface WithStateProps {
  message: Message
  updateMessage: (f: (message: Message) => Message) => void
}

interface WithHandlerProps {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  send: () => void
}

type ComposedProps = WithStateProps & WithHandlerProps
type FCProps = ComposedProps & Props & StyledComponentProps

const InputMessage: React.FC<FCProps> = ({ classes = {}, onChange, send, message }) => (
  <AppBar position={"static"} className={classes.appBar} component="div" color="default">
    <Toolbar>
      <TextField
        multiline
        fullWidth
        value={message.content}
        rowsMax="4"
        margin="normal"
        onChange={event => onChange(event)}
        onKeyDown={event => {
          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            send()
          }
        }}
      />
      <Button type="submit" color="inherit" onClick={send}>
        Send
      </Button>
    </Toolbar>
  </AppBar>
)

const initialMessage: Message = {
  content: "",
  id: "",
}

//compose<InputProps, OutputProps>
export default compose<FCProps, Props>(
  withStyles({
    appBar: {
      top: "auto",
      bottom: 0,
    },
  }),
  withState<WithStateProps, Message, "message", "updateMessage">("message", "updateMessage", initialMessage),
  withHandlers<FCProps, WithHandlerProps>({
    onChange: ({ updateMessage }) => event => {
        // @ts-ignore
        if (!event.isComposing) {
          let value = event.target.value
          updateMessage(message => ({ ...message, content: value }))
        }
      },
    send: ({ message, onSend, updateMessage }) => () => {
      if (message) {
        onSend({
          ...message,
          content: message.content.trim()
        })
        updateMessage(() => initialMessage)
      }
    },
  })
)(InputMessage)
