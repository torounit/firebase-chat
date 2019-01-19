import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"
import { connect } from "react-redux"
import Header, { DispatchProps, StateProps } from "../components/Header"
import { AppState } from "../store"

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
