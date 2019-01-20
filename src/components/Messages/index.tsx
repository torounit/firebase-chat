import React, { Fragment } from "react"
import { CssBaseline, Fab, Paper, StyledComponentProps } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Message } from "../../store/messages/state"
import { Delete } from "@material-ui/icons"
import { compose, withHandlers } from "recompose"
import { DispatchProp } from "react-redux"
import { UserInfo } from "firebase"
import Single from "./Single"

export interface StateProps {
  messages: Message[]
  users: UserInfo[]
}

export interface DispatchProps {
  onReply?: (id: string) => void
  onRemove?: (id: string) => void
}

export type Props = StateProps & DispatchProps

interface WithHandlerProps {
  reply: (id: string) => void
  remove: (id: string) => void
}

type ComponentProps = WithHandlerProps & Props & StyledComponentProps & DispatchProp

interface ComponentState {
  height: number
}

class Messages extends React.Component<ComponentProps, ComponentState> {
  elemment: HTMLElement | null

  constructor(props: ComponentProps, context: any) {
    super(props, context)
    this.elemment = null
    this.state = { height: 0 }
  }

  scrollToBottom(prevProps: ComponentProps, prevState: ComponentState) {
    const { messages } = this.props
    if (this.elemment) {
      if (messages.length !== prevProps.messages.length) {
        if (prevState.height <= this.elemment.scrollTop + this.elemment.clientHeight) {
          this.elemment.scrollTop = this.elemment.scrollHeight
        }
        this.setState({ height: this.elemment.scrollHeight })
      }
    }
  }

  componentDidUpdate(prevProps: ComponentProps, prevState: ComponentState) {
    // scroll to bottom.
    this.scrollToBottom(prevProps, prevState)
  }

  render(): React.ReactNode {
    const { classes = {}, messages, remove, users } = this.props
    return (
      <div className={classes.root} ref={el => (this.elemment = el)}>
        <CssBaseline />
        {messages.map((message, index) => (
          <Fragment key={index}>
            <Paper className={classes.paper}>
              <Single
                key={message.id}
                message={message}
                author={users.find(({ uid }) => uid === message.authorUid)}
                actions={
                  <Fab
                    size="small"
                    onClick={() => {
                      remove(message.id)
                    }}
                  >
                    <Delete />
                  </Fab>
                }
              />
            </Paper>
          </Fragment>
        ))}
      </div>
    )
  }
}

export default compose<ComponentProps, Props>(
  withStyles(theme => ({
    root: {
      flexGrow: 1,
      height: "100%",
      overflow: "scroll",
      padding: `0 ${theme.spacing.unit * 4}px`,
    },
    paper: {
      margin: `${theme.spacing.unit}px`,
      padding: theme.spacing.unit * 2,
    },
  })),
  withHandlers<ComponentProps, WithHandlerProps>({
    remove: ({ onRemove }) => id => {
      if (onRemove) {
        onRemove(id)
      }
    },
    reply: ({ onReply }) => id => {},
  })
)(Messages)
