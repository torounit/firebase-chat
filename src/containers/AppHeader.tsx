import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"
import { connect } from "react-redux"

import Header from "../components/Header"
import { AppState } from "../store"
import { UserInfo } from "firebase"

interface DispatchProps {
  onLogin: () => void
}

interface StateProps {
  user: UserInfo
}
const AppHeader = connect(
  (state: AppState): StateProps => ({
    user: state.auth,
  }),
  (): DispatchProps => ({
    onLogin: () => {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
  })
)(Header)

export default AppHeader
