import React from "react"
import { connect } from "react-redux"
import Messages from "../components/Messages"
import { AppState } from "../store"
import { Message } from "../store/messages/state"
import { Dispatch } from "redux"

interface DispatchProps {
  onClick: () => void
}

interface StateProps {
  messages: Message[]
}

const ChatMessages = connect(
  (state: AppState): StateProps => {
    console.log(state)
    return ({
      messages: state.messages,
    })
  },
  (dispatch:Dispatch): DispatchProps => ({
    onClick: () => {

    },
  }),
)(Messages)

export default ChatMessages
