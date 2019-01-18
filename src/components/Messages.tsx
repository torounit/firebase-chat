import React, { Fragment } from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Message } from "../store/messages/state"

interface Props {
  messages: Message[]
}

const Messages: React.FC<Props & { classes: any }> = ({
  classes,
  messages,
}) => (
  <List className={classes.list}>
    {messages.map(({ authorUid, content }, index) => (
      <Fragment key={index}>
        <ListItem button>
          <ListItemText primary={content} secondary="" />
        </ListItem>
      </Fragment>
    ))}
  </List>
)
export default withStyles({})(Messages)
