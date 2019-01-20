import { eventChannel } from "redux-saga"
import * as firebase from "firebase/app"
import "firebase/auth"
import { call, cancelled, fork, put, take } from "redux-saga/effects"
import { login, logout } from "./actions"

const authChannel = () => {
  return eventChannel(emit => {
    return firebase.auth().onAuthStateChanged(user => emit({ user }), error => emit({ error }))
  })
}

const subscribeAuth = function*() {
  const channel = yield call(authChannel)
  try {
    while (true) {
      const { user } = yield take(channel)

      if (user) {
        yield put(login(user))
      } else {
        yield put(logout())
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

const effects = [
  fork(function*() {
    yield fork(subscribeAuth)
  }),
]

export default effects
