import React from "react"
import { connect } from "react-redux"

import InputMessage, { Props } from "../components/InputMessage"
import { AppState } from "../store"
import { Dispatch } from "redux"
import { add } from "../store/messages/actions"

interface StateProps {
  uid: string
}

type DispatchProps = Props

export default connect<StateProps, any, {}, StateProps & DispatchProps, AppState>(
  (state: AppState): StateProps => ({
    uid: state.auth.uid,
  }),
  (dispatch: Dispatch) => ({ dispatch }),
  (state: StateProps, { dispatch }: { dispatch: Dispatch }, ownProps: Object) => ({
    ...state,
    ...ownProps,
    onSend: (message: { content: string }) => {
      dispatch(
        add({
          ...message,
          id: "hoge",
          createdAt: Date.now(),
          authorUid: state.uid,
        })
      )
    },
  })
)(InputMessage)
