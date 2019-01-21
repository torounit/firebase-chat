import { call, cancelled, Effect, put, take, takeEvery } from "redux-saga/effects"
import { Action } from "typescript-fsa"
import { database } from "../../firebase"
import * as actions from "./actions"
import { Thread } from "./state"
import { eventChannel } from "redux-saga"
import { LOCATION_CHANGE, RouterState } from "connected-react-router"
import pathToRegexp from "path-to-regexp"

const pushThread = (thread: Thread) => database.ref(`threads/${thread.name}`).set(thread)

const addThread = function*(action: Action<Thread>) {
  const thread = action.payload
  yield call(pushThread, thread)
}

const threadsChannel = () => {
  return eventChannel(emit => {
    const ref = database.ref(`threads`)
    ref.off()
    ref.on("value", snapshot => {
      if (snapshot) {
        const map = snapshot.val() || {}
        const threads = Object.entries(map).map(([id, value]) => ({ ...value, id }))
        emit(threads)
      }
    })

    return () => {
      ref.off()
    }
  })
}

const threadsWatcher = function*() {
  const channel = yield call(threadsChannel)
  try {
    while (true) {
      const threads = yield take(channel)
      if (threads && threads.length) {
        yield put(actions.sync(threads))
      }
    }
  } catch {
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

const selectThread = function*(action: Action<RouterState>) {
  const location = action.payload.location
  yield take("SYNC_THREADS");
    const re = pathToRegexp("/thread/:threadName")
    const params = re.exec(location.pathname)
    if (Array.isArray(params) && params[1]) {
      yield put(actions.select(params[1]))
    }
    else {
      yield put(actions.select("general"))
    }
}

const effects: Effect[] = [
  call(threadsWatcher),
  takeEvery(LOCATION_CHANGE, selectThread),
  takeEvery("ADD_THREAD", addThread),
]

export default effects
