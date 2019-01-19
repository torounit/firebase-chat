import React from "react"
import { connect } from "react-redux"

import InputMessage, { DispatchProps } from "../components/InputMessage"
import { AppState } from "../store"
import { Dispatch } from "redux"
import { add } from "../store/messages/actions"

interface StateProps {
  uid: string
}

export default connect<StateProps, any, {}, StateProps & DispatchProps, AppState>(
  (state: AppState): StateProps => ({
    uid: state.auth.uid,
  }),
  (dispatch: Dispatch) => ({ dispatch }),
  (state: StateProps, { dispatch }: { dispatch: Dispatch }, ownProps: Object) => ({
    ...state,
    ...ownProps,
    onSend: message => {
      dispatch(
        add({
          ...message,
          createdAt: Date.now(),
          authorUid: state.uid,
        })
      )
    },
  })
)(InputMessage)
