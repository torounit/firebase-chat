import React from "react"
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { AccountCircle } from "@material-ui/icons"
import { UserInfo } from "firebase"

interface Props {
  classes?: any
  user: UserInfo
  onLogin: () => void
  onLogout?: () => void
}

const Header: React.FC<Props> = ({ user, classes, onLogin, onLogout }) => (
  <AppBar position={"sticky"}>
    <Toolbar>
      <Typography color="inherit" className={classes.grow}>
        App
      </Typography>
      <IconButton color="inherit">{user.photoURL ? <Avatar src={user.photoURL} /> : <AccountCircle />}</IconButton>
      {!user.displayName && (
        <Button color="inherit" onClick={() => onLogin()}>
          Login
        </Button>
      )}
    </Toolbar>
  </AppBar>
)
export default withStyles({
  grow: {
    flexGrow: 1,
  },
})(Header)
