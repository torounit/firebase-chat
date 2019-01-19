import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"

import { compose, lifecycle } from "recompose"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import withTheme from "../utils/hoc/withTheme"

import * as auth from "../store/auth/actions"
import * as messages from "../store/messages/actions"
import { AppState } from "../store"
import { Message } from "../store/messages/state"
import { UserInfo } from "firebase"
import AppHeader from "./AppHeader"
import ChatMessages from "./ChatMessages"
import ChatInputter from "./ChatInputter"

interface StateProps {
  auth?: UserInfo
}

type Props = StateProps

const App: React.FC<StateProps> = ({ auth }) => (
  <div className="App">
    <AppHeader/>
    <ChatMessages/>
    <ChatInputter/>
  </div>
)

export default compose(
  withTheme,
  connect<StateProps, {}, {}, AppState>(
    (state: AppState): StateProps => ({
      auth: state.auth,
    }),
  ),
  lifecycle<Props, {}>({
    componentDidMount() {
      // @ts-ignore
      const { dispatch } = this.props
      //login
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(auth.login(user))
        }
      })
      //fetch
      dispatch(messages.fetch())
    },
  }),
)(App)
