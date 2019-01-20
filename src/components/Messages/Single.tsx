import React, { ReactNode } from "react"
import { UserInfo } from "firebase"
import { Avatar, Grid, Typography } from "@material-ui/core"
import { Message } from "../../store/messages/state"

type Props = { actions: ReactNode; message: Message; author: UserInfo | undefined }

const Single: React.FC<Props> = ({ message, children, actions, author }) => (
  <Grid container wrap="nowrap" justify="center" alignItems={"flex-start"} spacing={16}>
    <Grid item>{author && author.photoURL ? <Avatar src={author.photoURL} /> : <Avatar>W</Avatar>}</Grid>
    <Grid item xs>
      <Typography style={{ whiteSpace: "pre-wrap" }}>{message.content}</Typography>
      <Typography variant="caption">{new Date(message.createdAt as number).toLocaleString()}</Typography>
    </Grid>
    <Grid item>{actions}</Grid>
  </Grid>
)
export default Single
