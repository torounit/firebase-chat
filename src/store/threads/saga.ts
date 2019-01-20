import { call, ForkEffect, put, takeEvery } from "redux-saga/effects"
import { Action } from "typescript-fsa"
import { database } from "../../firebase"
import * as usersActions from "./actions"
import { Thread } from "./state"

const getThread = (threadName: string) =>
  database
    .ref(`/threads/${threadName}`)
    .once("value")
    .then(snapshot => {
      return {
        ...snapshot.val(),
      }
    })

const addThread = (thread: Thread) => database.ref(`/threads/${thread.name}`).set(thread)

const getThreads = () => {
  database
    .ref(`/threads/`)
    .once("value")
    .then(snapshot => {
      return {
        ...snapshot.val(),
      }
    })
}

const fetchThreads = function*(action: Action<string[]>) {
  const uids = action.payload
  const result = yield call(getThreads, uids)
  yield put(usersActions.add(result))
}

const effects: ForkEffect[] = [takeEvery("FETCH_THREADS", fetchThreads)]

export default effects
