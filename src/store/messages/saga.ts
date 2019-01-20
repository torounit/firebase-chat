import { call, cancelled, ForkEffect, put, take, takeEvery, takeLatest } from "redux-saga/effects"
import { Action } from "typescript-fsa"
import { Message } from "./state"
import { database } from "../../firebase"
import { receive } from "./actions"
import { eventChannel } from "redux-saga"

const ref = database.ref("messages")

const messageChannel = () => {
  return eventChannel(emit => {
    ref.on("value", snapshot => {
      if (snapshot) {
        const messagesMap = snapshot.val() || {}
        const messages = Object.entries(messagesMap).map(([id, value]) => ({ ...value, id }))
        emit(messages)
      }
    })

    return () => {
      ref.off()
    }
  })
}

const subscribeMessages = function*() {
  const channel = yield call(messageChannel)
  console.log(channel)
  try {
    while (true) {
      const messages = yield take(channel)

      if (messages) {
        yield put(receive(messages))
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

const addMessage = function*(action: Action<Message>) {
  const message = action.payload
  yield call(message => ref.push(message), message)
}

const removeMessage = function*(action: Action<string>) {
  const id = action.payload
  if (id) {
    yield call(id => {
      return database
        .ref(`messages/${id}`)
        .remove()
        .catch((err: Error) => console.log(err.message))
    }, id)
  }
}

const effects: ForkEffect[] = [
  takeLatest("SUBSCRIBE_MESSAGES", subscribeMessages),
  takeEvery("ADD_MESSAGE", addMessage),
  takeEvery("REMOVE_MESSAGE", removeMessage),
]

export default effects
