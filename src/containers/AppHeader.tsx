import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"
import { connect } from "react-redux"
import Header, { StateProps, DispatchProps } from "../components/Header"
import { AppState } from "../store"

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
