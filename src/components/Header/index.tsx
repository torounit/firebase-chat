import React from "react"
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
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons"

import { compose, withHandlers, withState } from "recompose"
import { Auth } from "../../store/auth"
import ThreadsMenu from "./ThreadsMenu"
import { Thread } from "../../store/threads"

export interface StateProps {
  user: Auth
  threads: Thread[]
}

export interface DispatchProps {
  onLogin: () => void
  onLogout: () => void
}

interface WithStateProps {
  anchorEl: HTMLElement | null
  setAnchorEl: (f: (anchorEl: any) => HTMLElement | null) => void
  isSideMenuOpen: boolean
  updateSideMenuOpen: (f: (status: boolean) => boolean) => void
}

interface WithHandlerProps {
  handleUserMenuOpen: () => void
  handleUserMenuClose: () => void
  handleSideMenuToggle: (status: boolean) => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps
type FCProps = Props & WithStateProps & WithHandlerProps

let UserMenu: HTMLElement | null

const Header: React.FC<FCProps> = ({
  user,
  classes = {},
  onLogin,
  onLogout,
  handleUserMenuOpen,
  handleUserMenuClose,
  anchorEl,
  isSideMenuOpen,
  handleSideMenuToggle,
  threads,
}) => (
  <div>
    <AppBar position={"static"}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={() => handleSideMenuToggle(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography color="inherit" className={classes.grow}>
          Chat App
        </Typography>

        {user.displayName ? (
          <div ref={el => (UserMenu = el)} onClick={handleUserMenuOpen}>
            <IconButton color="inherit">
              {user.photoURL ? <Avatar src={user.photoURL} /> : <AccountCircle />}
            </IconButton>
          </div>
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
      onClose={handleUserMenuClose}
    >
      <MenuItem
        onClick={() => {
          onLogout()
          handleUserMenuClose()
        }}
      >
        Logout
      </MenuItem>
    </Menu>
    <ThreadsMenu threads={threads} open={isSideMenuOpen} handleToggleDrawer={handleSideMenuToggle} />
  </div>
)

const enhancer = compose<FCProps, Props>(
  withStyles({
    grow: {
      flexGrow: 1,
    },
  }),
  withState<WithStateProps, HTMLElement | null, string, string>("anchorEl", "setAnchorEl", null),
  withState<WithStateProps, boolean, string, string>("isSideMenuOpen", "updateSideMenuOpen", false),
  withHandlers<FCProps, WithHandlerProps>({
    handleUserMenuOpen: ({ setAnchorEl }) => () => setAnchorEl(() => UserMenu),
    handleUserMenuClose: ({ setAnchorEl }) => () => setAnchorEl(() => null),
    handleSideMenuToggle: ({ updateSideMenuOpen }) => status => updateSideMenuOpen(() => status),
  })
)

export default enhancer(Header)
