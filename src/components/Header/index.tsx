import React, { SyntheticEvent } from "react"
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  StyledComponentProps,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { AccountCircle } from "@material-ui/icons"
import { UserInfo } from "firebase"

import { compose, withHandlers, withState } from "recompose"

export interface StateProps {
  user: UserInfo
}

export interface DispatchProps {
  onLogin: () => void
  onLogout: () => void
}

interface WithStateProps {
  anchorEl: HTMLElement | null
  setAnchorEl: (f: (anchorEl: any) => HTMLElement | null) => void
}

interface WithHandlerProps {
  handleMenuOpen: (event: SyntheticEvent) => void
  handleMenuClose: () => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps
type FCProps = Props & WithStateProps & WithHandlerProps
const Header: React.FC<FCProps> = ({
  user,
  classes = {},
  onLogin,
  onLogout,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
}) => (
  <div>
    <AppBar position={"sticky"}>
      <Toolbar>
        <Typography color="inherit" className={classes.grow}>
          Chat App
        </Typography>

        {user.displayName ? (
          <IconButton color="inherit" onClick={handleMenuOpen}>
            {user.photoURL ? <Avatar src={user.photoURL} /> : <AccountCircle />}
          </IconButton>
        ) : (
          <Button color="inherit" onClick={() => onLogin()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          onLogout()
          handleMenuClose()
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  </div>
)
export default compose<FCProps, Props>(
  withStyles({
    grow: {
      flexGrow: 1,
    },
  }),
  withState<WithStateProps, HTMLElement | null, string, string>("anchorEl", "setAnchorEl", null),
  withHandlers<FCProps, WithHandlerProps>({
    handleMenuOpen: ({ setAnchorEl }) => event => {
      event.persist()
      setAnchorEl(() => event.target as HTMLElement)
    },
    handleMenuClose: ({ setAnchorEl }) => () => {
      setAnchorEl(() => null)
    },
  })
)(Header)
