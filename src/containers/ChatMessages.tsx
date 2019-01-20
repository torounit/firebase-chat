import React from "react"
import { connect, DispatchProp } from "react-redux"
import Messages, { DispatchProps, StateProps } from "../components/Messages"
import { AppState } from "../store"
import { Dispatch } from "redux"
import { remove } from "../store/messages/actions"
import { compose, lifecycle } from "recompose"
import { difference, uniq } from "lodash"
import * as UsersActions from "../store/users/actions"

const ChatMessages = compose<StateProps & DispatchProps, {}>(
  connect<StateProps, DispatchProps & DispatchProp, {}, AppState>(
    (state: AppState): StateProps => ({
      messages: state.messages,
      auth: state.auth,
      users: state.users,
    }),
    (dispatch: Dispatch): DispatchProps & DispatchProp => ({
      dispatch,
      onRemove: id => {
        dispatch(remove(id))
      },
    })
  ),
  lifecycle<StateProps & DispatchProps & DispatchProp, {}>({
    componentDidUpdate(prevProps) {
      const { messages, users, dispatch } = this.props
      if (prevProps.messages.length !== messages.length) {
        const messageUids = uniq(messages.map(({ authorUid }) => authorUid))
        const uids = uniq(users.map(({ uid }) => uid))
        const unknownUids = difference(messageUids, uids).filter(id => Boolean(id))
        if (unknownUids.length) {
          dispatch(UsersActions.fetch(unknownUids as string[]))
        }
      }
    },
  })
)(Messages)

export default ChatMessages
