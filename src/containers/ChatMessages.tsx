import React from "react"
import { connect } from "react-redux"
import Messages from "../components/Messages"
import { AppState } from "../store"
import { Message } from "../store/messages/state"
import { Dispatch } from "redux"
import { remove } from "../store/messages/actions"

interface DispatchProps {
  onRemove: (id: string) => void
  onReply?: () => void
}

interface StateProps {
  messages: Message[]
}

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
