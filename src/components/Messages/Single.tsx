import React, { ReactNode } from "react"
import { UserInfo } from "firebase"
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  StyledComponentProps,
  Typography,
  withStyles,
} from "@material-ui/core"
import { Message } from "../../store/messages/state"

type Props = { actions: ReactNode; message: Message; author: UserInfo | undefined } & StyledComponentProps

const Single: React.FC<Props> = ({ message, actions, author, classes = {} }) => (
  <ListItem className={classes.item}>
    <ListItemAvatar className={classes.avatar}>
      {author && author.photoURL ? <Avatar src={author.photoURL} /> : <Avatar>W</Avatar>}
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography variant="body1" gutterBottom style={{ whiteSpace: "pre-wrap" }}>
          {message.content}
        </Typography>
      }
      secondary={<Typography variant="caption">{new Date(message.createdAt as number).toLocaleString()}</Typography>}
    />
    <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>
  </ListItem>
)
export default withStyles(theme => ({
  item: {
    borderColor: "#ddd",
    borderWidth: "0 0 1px",
    borderStyle: "solid",
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    width: "30px",
    height: "30px",
  },
}))(Single)
