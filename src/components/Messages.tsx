import React, { Fragment } from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Message } from "../store/messages/state"
import { Delete } from "@material-ui/icons"
import { compose, withHandlers } from "recompose"

export interface Props {
  messages: Message[]
  onReply?: (id: string) => void
  onRemove?: (id: string) => void
}

interface withStylesProps {
  classes: any
}

interface WithStateProps {}

interface WithHandlerProps {
  reply: (id: string) => void
  remove: (id: string) => void
}

type ComposedProps = WithStateProps & WithHandlerProps
type FCProps = ComposedProps & Props & withStylesProps

const Messages: React.FC<FCProps> = ({ classes, messages, remove }) => (
  <List className={classes.list}>
    {messages.map(({ authorUid, content, id }, index) => (
      <Fragment key={index}>
        <ListItem button>
          <ListItemText primary={content} secondary="" />
          <ListItemIcon
            onClick={() => {
              remove(id)
            }}
          >
            <Delete />
          </ListItemIcon>
        </ListItem>
      </Fragment>
    ))}
  </List>
)
export default compose<FCProps, Props>(
  withStyles({}),
  withHandlers<FCProps, WithHandlerProps>({
    remove: ({ onRemove }) => id => {
      if (onRemove) {
        onRemove(id)
      }
    },
    reply: ({ onReply }) => id => {},
  })
)(Messages)
