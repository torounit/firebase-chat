import React from "react"
import AddThread from "../../components/AddThread"
import { useDispatch } from "react-redux"
import { Paper, Theme, Typography } from "@material-ui/core"
import { actions, Thread } from "../../store/threads"
import { useHistory } from "react-router"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: `${theme.spacing(1)}px 0`,
      padding: `0 ${theme.spacing(2)}px`,
    },
    paper: {
      padding: `${theme.spacing(2)}px`,
    },
  })
)

const AddThreadPage: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const onSubmit = (threadName: string) => {
    const name = threadName.replace(/\s+/g, "-").toLowerCase()
    const thread: Thread = {
      name: threadName.replace(/\s+/g, "-").toLowerCase(),
      title: threadName,
      private: false,
    }
    dispatch(actions.add(thread))
    dispatch(actions.select(name))
    history.push(`/thread/${name}`)
  }
  return (
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
}

export default AddThreadPage
