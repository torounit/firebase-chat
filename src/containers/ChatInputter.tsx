import React from "react"
import { connect } from "react-redux"

import InputMessage, { DispatchProps } from "../components/InputMessage"
import { AppState } from "../store"
import { Dispatch } from "redux"
import { add } from "../store/messages/actions"
import { Thread } from "../store/threads"

interface StateProps {
  uid: string
  thread?: Thread
}

export default connect<StateProps, any, {}, StateProps & DispatchProps, AppState>(
  (state: AppState): StateProps => ({
    uid: state.auth.uid,
    thread: state.threads.find(({ isActive }) => Boolean(isActive)),
  }),
  (dispatch: Dispatch) => ({ dispatch }),
  (state: StateProps, { dispatch }: { dispatch: Dispatch }, ownProps: Object) => ({
    ...state,
    ...ownProps,
    onSend: message => {
      if (state.thread && state.thread.name) {
        dispatch(
          add({
            thread: state.thread.name,
            message: {
              ...message,
              createdAt: Date.now(),
              authorUid: state.uid,
            },
          })
        )
      }
    },
  })
)(InputMessage)
