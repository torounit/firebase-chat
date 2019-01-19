import React, { Fragment, ReactNode } from "react"
import {
  Avatar,
  CssBaseline,
  Fab,
  Grid,
  Paper,
  StyledComponentProps,
  Typography,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Message } from "../store/messages/state"
import { Delete } from "@material-ui/icons"
import { compose, withHandlers } from "recompose"
import { DispatchProp } from "react-redux"

export interface StateProps {
  messages: Message[]
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

const MessageComponent: React.FC<{ actions: ReactNode; message: Message }> = ({ message, children, actions }) => (
  <Grid container wrap="nowrap" justify="center" alignItems={"flex-start"} spacing={16}>
    <Grid item>
      <Avatar>W</Avatar>
    </Grid>
    <Grid item xs>
      <Typography style={{ whiteSpace: "pre-wrap" }}>{message.content}</Typography>
      <Typography variant="caption">{new Date(message.createdAt as number).toLocaleString()}</Typography>
      <Typography variant="caption">{message.authorUid}</Typography>
    </Grid>
    <Grid item>{actions}</Grid>
  </Grid>
)

class Messages extends React.Component<ComponentProps, { height: number }> {
  elemment: HTMLElement | null

  constructor(props: ComponentProps, context: any) {
    super(props, context)
    this.elemment = null
    this.state = { height: 0 }
  }

  componentDidUpdate(prevProps: ComponentProps, prevState: { height: number }) {
    const { dispatch, messages } = this.props
    // scroll to bottom.
    if (this.elemment) {
      if (messages.length !== prevProps.messages.length) {
        if (prevState.height <= this.elemment.scrollTop + this.elemment.clientHeight) {
          this.elemment.scrollTop = this.elemment.scrollHeight
        }
        this.setState({ height: this.elemment.scrollHeight })
      }
    }
  }

  render(): React.ReactNode {
    const { classes = {}, messages, remove } = this.props
    return (
      <div className={classes.root} ref={el => (this.elemment = el)}>
        <CssBaseline />
        {messages.map((message, index) => (
          <Fragment key={index}>
            <Paper className={classes.paper}>
              <MessageComponent
                key={message.id}
                message={message}
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
