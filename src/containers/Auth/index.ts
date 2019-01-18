import * as firebase from "firebase"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import AuthButton from "../../components/AuthButton"
import { AppState } from "../../store"

type Props = {
  auth: any
}

const AuthContainer = connect(
  (state: AppState): Props => ({
    auth: state.auth,
  }),
  (dispatch: Dispatch) => {
    return {
      login: () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
      },
    }
  }
)<any>(AuthButton)

export default AuthContainer
