import React from "react"
import { IconButton, List, ListSubheader, StyledComponentProps } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Message } from "../../store/messages/state"
import { Delete } from "@material-ui/icons"
import { compose, withHandlers } from "recompose"
import { DispatchProp } from "react-redux"

import Single from "./Single"
import { isEqual } from "lodash"
import { User } from "../../store/users/state"
import { Auth } from "../../store/auth/state"
import { Thread } from "../../store/threads"

export interface StateProps {
  messages: Message[]
  users: User[]
  auth: Auth
  thread?:Thread
}

export interface DispatchProps {
  onReply?: (id: string) => void
  onRemove?: (threadName:string, id:string) => void
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
    const { classes = {}, messages, remove, users, auth } = this.props
    return (
      <div className={classes.root} ref={el => (this.elemment = el)}>
        <List className={classes.list}>
          {messages.reduce((acc: React.ReactElement<any>[], message) => {
            const date = new Date(message.createdAt as number)
            date.setMinutes(0, 0, 0)
            const header = (
              <ListSubheader key={`header${message.id}`} className={classes.subheader}>
                {date.toLocaleString()}
              </ListSubheader>
            )
            const author = users.find(({ uid }) => uid === message.authorUid)
            const single = (
              <Single
                key={message.id}
                message={message}
                author={author}
                actions={
                  author &&
                  author.uid === auth.uid && (
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        remove(message.id)
                      }}
                    >
                      <Delete />
                    </IconButton>
                  )
                }
              />
            )
            return acc.find(el => isEqual(el.props.children, header.props.children))
              ? [...acc, single]
              : [...acc, header, single]
          }, [])}
        </List>
      </div>
    )
  }
}

export default compose<ComponentProps, Props>(
  withStyles(theme => ({
    root: {
      flexShrink: 1,
      flexGrow:1,
      overflow: "scroll",
      height: "100%",
      padding: `0 ${theme.spacing.unit * 4}px ${theme.spacing.unit }px`,
    },
    list: {
      padding: `0`,
      backgroundColor: "#fff",
    },
    subheader: {
      backgroundColor: "#eee",
    },
  })),
  withHandlers<ComponentProps, WithHandlerProps>({
    remove: ({ onRemove, thread }) => id => {
      if (onRemove && thread && thread.name) {
        onRemove(thread.name, id)
      }
    },
    reply: ({ onReply }) => id => {},
  })
)(Messages)
