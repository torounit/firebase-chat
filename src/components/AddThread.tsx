import React from "react"
import {
  Button,
  FormControl,
  StyledComponentProps,
  TextField,
  withStyles,
} from "@material-ui/core"
import { compose, withHandlers, withState } from "recompose"

export interface StateProps {
}

export interface DispatchProps {
  onSubmit: (threadName: string) => void
}

export type Props = StateProps & DispatchProps & StyledComponentProps

interface WithStateProps {
  threadName: string
  updateThreadName: (f: (threadName: string) => string) => void
}

interface WithHandlerProps {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  onFormSubmit: () => void
}

type ComposedProps = WithStateProps & WithHandlerProps
type FCProps = ComposedProps & Props & StyledComponentProps

const AddThread: React.FC<FCProps> = ({ classes = {}, onChange, onFormSubmit }) => (
  <FormControl className={classes.container}>
    <TextField className={classes.field} onChange={onChange} required label="Thread Name" defaultValue="" margin="normal"/>
    <Button color="inherit" onClick={() => onFormSubmit()}>
      Create
    </Button>
  </FormControl>
)

//compose<InputProps, OutputProps>
export default compose<FCProps, Props>(
  withStyles({
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection:'row',
    },
    field: {
      width: '100%',
      flexGrow:1
    }
  }),
  withState<WithStateProps, string, string, string>("threadName", "updateThreadName", ""),
  withHandlers<FCProps, WithHandlerProps>({
    onChange: ({ updateThreadName }) => event => {
      console.log(event.target.value)
      // @ts-ignore
      if (!event.isComposing) {
        let value = event.target.value
        updateThreadName(() => value)
      }
    },
    onFormSubmit: ({ threadName, onSubmit, updateThreadName }) => () => {
      if (threadName.trim()) {
        onSubmit(threadName.trim())
        updateThreadName(() => "")
      }
    },
  }),
)(AddThread)
