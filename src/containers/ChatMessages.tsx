import React from "react"
import { connect } from "react-redux"
import Messages, { DispatchProps, StateProps } from "../components/Messages"
import { AppState } from "../store"
import { Dispatch } from "redux"
import { remove } from "../store/messages/actions"

const ChatMessages = connect<StateProps, DispatchProps, {}, AppState>(
  (state: AppState): StateProps => ({
    messages: state.messages,
  }),
  (dispatch: Dispatch): DispatchProps => ({
    onRemove: id => {
      dispatch(remove(id))
    },
  })
)(Messages)

export default ChatMessages
