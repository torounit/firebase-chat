import React from "react"
import AddThread, { DispatchProps, StateProps } from "../../components/AddThread"
import { connect } from "react-redux"
import { AppState } from "../../store"
import { Paper, StyledComponentProps, Typography, withStyles } from "@material-ui/core"
import { compose } from "recompose"
import { Dispatch } from "redux"
import * as threads from "../../store/threads"
import { Thread } from "../../store/threads"

type Props = StateProps & DispatchProps & StyledComponentProps
const Page: React.FC<Props> = ({ classes = {}, onSubmit }) => (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography variant="h5" id="modal-title">
        Add Tread
      </Typography>
      <div>
        <AddThread onSubmit={onSubmit} />
      </div>
    </Paper>
  </div>
)
export default compose<Props, {}>(
  withStyles(theme => ({
    root: {
      margin: `${theme.spacing.unit}px 0`,
      padding: `0 ${theme.spacing.unit * 4}px`,
    },
    paper: {
      padding: `${theme.spacing.unit * 2}px`,
    },
  })),
  connect<StateProps, DispatchProps, {}, AppState>(
    (state: AppState): StateProps => ({}),
    (dispatch: Dispatch) => ({
      onSubmit: threadName => {
        const thread: Thread = {
          name: threadName.replace(/\s+/g, "-").toLowerCase(),
          title: threadName,
          private: false,
        }
        console.log(thread)
        dispatch(threads.actions.add(thread))
      },
    })
  )
)(Page)
