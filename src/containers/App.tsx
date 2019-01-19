import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"

import { compose, lifecycle } from "recompose"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Paper } from "@material-ui/core"

import withTheme from "../utils/hoc/withTheme"

import * as auth from "../store/auth/actions"
import * as messages from "../store/messages/actions"
import { AppState } from "../store"
import { Message } from "../store/messages/state"
import { UserInfo } from "firebase"
import AppHeader from "./AppHeader"
import ChatMessages from "./ChatMessages"
import ChatInputter from "./ChatInputter"

interface DispatchProps {
  init: () => void
}

interface StateProps {
  auth?: UserInfo
  messages?: Message[]
}

type Props = StateProps & DispatchProps

const App: React.FC<StateProps> = ({ auth }) => (
  <div className="App">
    <AppHeader />
    <Paper>
      <ChatMessages />
    </Paper>
    <ChatInputter />
  </div>
)

export default compose(
  withTheme,
  connect(
    (state: AppState): StateProps => ({
      auth: state.auth,
      messages: [],
    }),
    (dispatch: Dispatch) => ({
      init: () => {
        //login
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch(auth.login(user))
          }
        })
        //fetch
        dispatch(messages.fetch())
      },
    })
  ),
  lifecycle<Props, {}>({
    componentDidMount() {
      const { init } = this.props
      init()
    },
  })
)(App)
