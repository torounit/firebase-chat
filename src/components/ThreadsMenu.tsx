import React from "react"
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  StyledComponentProps,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core"
import { Thread } from "../store/threads"

export interface StateProps {
  open: boolean
  threads: Thread[]
}

export interface DispatchProps {
  handleToggleDrawer: (status: boolean) => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps
type FCProps = Props

const ThreadsMenu: React.FC<FCProps> = ({ open, handleToggleDrawer, threads, classes = {} }) => (
  <SwipeableDrawer
    open={open}
    className={classes.root}
    onClose={() => handleToggleDrawer(false)}
    onOpen={() => handleToggleDrawer(true)}
  >
    <div
      className={classes.root}
      tabIndex={0}
      role="button"
      onClick={() => handleToggleDrawer(false)}
      onKeyDown={() => handleToggleDrawer(false)}
    >
      <List subheader={<ListSubheader>Thread</ListSubheader>} >
        {threads.map(({ name, title }) => (
          <ListItem button key={name} dense>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </div>
  </SwipeableDrawer>
)

export default withStyles({
  root: {
    width: 250,
  },
  body: {
    width: '100%'
  }
})(ThreadsMenu)
