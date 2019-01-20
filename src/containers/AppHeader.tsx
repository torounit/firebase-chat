import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"
import { connect } from "react-redux"
import Header, { StateProps } from "../components/Header"
import { AppState } from "../store"

export interface DispatchProps {
  onLogin: () => void
  onLogout: () => void
}

const AppHeader = connect(
  (state: AppState): StateProps => ({
    user: state.auth,
  }),
  (): DispatchProps => ({
    onLogin: () => {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    onLogout: () => {
      firebase.auth().signOut()
    },
  })
)(Header)

export default AppHeader
