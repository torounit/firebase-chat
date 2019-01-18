import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"

import { compose, lifecycle } from "recompose"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Paper } from "@material-ui/core"

import withTheme from "../utils/hoc/withTheme"

import { login } from "../store/auth/actions"
import { AppState } from "../store"
import { Message } from "../store/messages/state"
import { UserInfo } from "firebase"
import AppHeader from "./AppHeader"
import ChatMessages from "./ChatMessages"
import ChatInputter from "./ChatInputter"

interface DispatchProps {
  login?: () => void
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
      login: () => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch(login(user))
          }
        })
      },
    })
  ),
  lifecycle<Props, {}>({
    componentDidMount() {
      const { login } = this.props
      if ( login ) {
        login()
      }
    },
  })
)(App)
