import React from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  StyledComponentProps,
  withStyles,
} from "@material-ui/core"
import { Thread } from "../store/threads"
import { NavLink } from "react-router-dom"

export interface StateProps {
  open: boolean
  threads: Thread[]
}

export interface DispatchProps {
  handleToggleDrawer: (status: boolean) => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps
type FCProps = Props

const ThreadsMenu: React.FC<FCProps> = ({ open, handleToggleDrawer, threads, children, classes = {} }) => (
  <Drawer
    open={open}
    className={classes.root}
    onClose={() => handleToggleDrawer(false)}
    //onOpen={() => handleToggleDrawer(true)}
  >
    <div
      className={classes.root}
      tabIndex={0}
      role="button"
      onClick={() => handleToggleDrawer(false)}
      onKeyDown={() => handleToggleDrawer(false)}
    >
      <List subheader={<ListSubheader>Thread</ListSubheader>}>
        {threads.map(({ name, title, isActive }) => (
          <NavLink key={name} to={`/thread/${name}`} style={{ textDecoration: "none", color: "unset" }}>
            <ListItem button dense selected={isActive}>
              <ListItemText primary={title} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      {children}
    </div>
  </Drawer>
)

export default withStyles(themes => ({
  root: {
    width: 250,
  },
  body: {
    width: 250,
  },
  grow: {},
}))(ThreadsMenu)
