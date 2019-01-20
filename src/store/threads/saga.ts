import { call, cancelled, fork, ForkEffect, put, take, takeEvery } from "redux-saga/effects"
import { Action } from "typescript-fsa"
import { database } from "../../firebase"
import * as actions from "./actions"
import { Thread } from "./state"
import { eventChannel } from "redux-saga"

const addThread = (thread: Thread) => database.ref(`threads/${thread.name}`).set(thread)

const pushThread = function*(action: Action<Thread>) {
  const thread = action.payload
  yield call(addThread, thread)
  //yield put(actions.add(thread))
}

const threadsChannel = () => {
  return eventChannel(emit => {
    const ref = database.ref(`threads`)
    ref.off()
    ref.on("value", snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
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

const subscribeTheads = function*() {
  const channel = yield call(threadsChannel)
  try {
    while (true) {
      const threads = yield take(channel)
      console.log(threads)
      if (threads && threads.length) {
        yield put(actions.sync(threads))
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

const effects: ForkEffect[] = [
  fork(function*() {
    yield fork(subscribeTheads)
  }),
  takeEvery("ADD_THREAD", pushThread),
]

export default effects
