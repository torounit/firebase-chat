import React, { Fragment, ReactNode } from "react"
import { Avatar, Fab, Grid, Paper, StyledComponentProps, Typography } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Message } from "../store/messages/state"
import { Delete } from "@material-ui/icons"
import { compose, withHandlers } from "recompose"

export interface StateProps {
  messages: Message[]
}

export interface DispatchProps {
  onReply?: (id: string) => void
  onRemove?: (id: string) => void
}

export type Props = StateProps & DispatchProps;

interface WithHandlerProps {
  reply: (id: string) => void
  remove: (id: string) => void
}

type FCProps = WithHandlerProps & Props & StyledComponentProps

const MessageComponent: React.FC<{ actions: ReactNode; message: Message }> = ({ message, children, actions }) => (
  <Grid container wrap="nowrap" justify="center" alignItems={"center"} spacing={16}>
    <Grid item>
      <Avatar>W</Avatar>
    </Grid>
    <Grid item xs>
      <Typography>{message.content}</Typography>
      <Typography>{(new Date(message.createdAt as number)).toLocaleString()}</Typography>
    </Grid>
    <Grid item>{actions}</Grid>
  </Grid>
)

const Messages: React.FC<FCProps> = ({ classes = {}, messages, remove }) => (
  <div className={classes.root}>
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
export default compose<FCProps, Props>(
  withStyles(theme => ({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: `0 ${theme.spacing.unit * 4}px`,
    },
    paper: {
      margin: `${theme.spacing.unit}px`,
      padding: theme.spacing.unit * 2,
    },
  })),
  withHandlers<FCProps, WithHandlerProps>({
    remove: ({ onRemove }) => id => {
      if (onRemove) {
        onRemove(id)
      }
    },
    reply: ({ onReply }) => id => {},
  })
)(Messages)
