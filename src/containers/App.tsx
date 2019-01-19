import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"

import { compose, lifecycle } from "recompose"
import { connect, DispatchProp } from "react-redux"

import withTheme from "../utils/hoc/withTheme"

import * as authActions from "../store/auth/actions"
import * as messagesActions from "../store/messages/actions"
import { AppState } from "../store"
import { UserInfo } from "firebase"
import AppHeader from "./AppHeader"
import ChatMessages from "./ChatMessages"
import ChatInputter from "./ChatInputter"

interface StateProps {
  auth: UserInfo
}

type Props = StateProps & DispatchProp

const App: React.FC<Props> = ({ auth }) => (
  <div className="App">
    <AppHeader />
    {auth.uid && <ChatMessages />}
    <ChatInputter />
  </div>
)

export default compose<Props, {}>(
  withTheme,
  connect<StateProps, DispatchProp, {}, AppState>(
    (state: AppState): StateProps => ({
      auth: state.auth,
    })
  ),
  lifecycle<Props, {}>({
    componentDidMount() {
      const { dispatch } = this.props
      //login
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(authActions.login(user))
        }
        else {
          dispatch(authActions.logout())
        }
      })
    },
    componentDidUpdate() {
      const { auth, dispatch } = this.props
      console.log(auth)
      if (auth.uid) {
        dispatch(messagesActions.fetch())
      }
    },
  })
)(App)
