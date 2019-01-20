import React from "react"
import {
  Button,
  FormControl,
  Modal,
  StyledComponentProps,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core"
import { compose, withHandlers, withState } from "recompose"

export interface StateProps {
  isOpen: boolean
}

export interface DispatchProps {
  handleOpen: () => void
  handleClose: () => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps

const AddThread: React.FC<Props> = ({ handleOpen, handleClose, isOpen, classes = {} }) => (
  <div>
    <Button onClick={() => handleOpen()}>Open Modal</Button>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
      onClose={() => handleClose()}
    >
      <div className={classes.modal}>
        <Typography variant="h6" id="modal-title">Add Tread</Typography>
        <FormControl>
          <TextField required label="Thread Name" defaultValue="" margin="normal" />
        </FormControl>
      </div>
    </Modal>
  </div>
)

interface WithStateProps {
  isOpen: boolean
  updateOpen: (f: (status: boolean) => boolean) => void
}

interface WithHandlerProps {}

type Props = StateProps & DispatchProps & StyledComponentProps
type FCProps = Props & WithStateProps & WithHandlerProps

export default compose<Props, {}>(
  withStyles(theme => ({
    modal: {
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: "none",
      top: `50%`,
      left: `50%`,
      position: "absolute" as "absolute",
      transform: `translate(-50%, -50%)`,
    },
  })),
  withState<WithStateProps, boolean, string, string>("isOpen", "updateOpen", false),
  withHandlers<FCProps, WithHandlerProps>({
    handleOpen: ({ updateOpen }) => () => updateOpen(() => true),
    handleClose: ({ updateOpen }) => () => updateOpen(() => false),
  })
)(AddThread)
