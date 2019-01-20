import { call, put, takeEvery } from "redux-saga/effects"
import { Action } from "typescript-fsa"
import { database } from "../../firebase"
import * as usersActions from "./actions"

const getUser = (uid: string) =>
  database
    .ref(`/users/${uid}`)
    .once("value")
    .then(snapshot => {
      return ({
        ...snapshot.val(),
        uid,
      })
    })

const getUsers = (uids: string[]) => {
  return Promise.all(uids.map(id => getUser(id)))
}

const fetchUsers = function*(action: Action<string[]>) {
  const uids = action.payload
  const result = yield call(getUsers, uids)
  yield put(usersActions.add(result))
}

const saga = [takeEvery("FETCH_USERS", fetchUsers)]

export default saga
