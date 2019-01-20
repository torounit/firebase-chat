import React from "react"
import ThreadsMenu from "../components/ThreadsMenu"
import { connect } from "react-redux"
import { AppState } from "../store"
import { compose } from "recompose"
import { StyledComponentProps, withStyles } from "@material-ui/core"
import { Thread } from "../store/threads"

export interface StateProps {
  open: boolean
  threads: Thread[]
}

export interface DispatchProps {
  handleToggleDrawer: (status: boolean) => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps

const enhancer = compose<Props, DispatchProps & { open: boolean }>(
  withStyles({
    grow: {
      flexGrow: 1,
    },
  }),
  connect<StateProps, {}, { open: boolean }, AppState>(
    (state: AppState, OwnProps): StateProps => ({
      threads: state.threads,
      open: OwnProps.open,
    })
  )
)

export default enhancer(ThreadsMenu)
