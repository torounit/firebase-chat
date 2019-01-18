import React from "react"
import { connect } from "react-redux"

import InputMessage, { Props } from "../components/InputMessage"
import { AppState } from "../store"
import { Message } from "../store/messages/state"
import { Dispatch } from "redux"
import { add } from "../store/messages/actions"
import uuid from "../utils/uuid"

interface StateProps {
  messages: Message[]
  uid?: string
}

const ChatMessages = connect<StateProps, Props, {}, AppState>(
  (state: AppState): StateProps => ({
    messages: state.messages,
    uid: state.auth.uid,
  }),
  (dispatch: Dispatch): Props => ({
    onSend: (message: { authorUid?: string; content: string }) => {

      dispatch(add({
        ...message,
        createdAt: Date.now(),
        id: uuid()
      }))
    },
  })
)(InputMessage)

export default ChatMessages
