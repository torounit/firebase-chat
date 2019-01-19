import { call, put, takeEvery } from "redux-saga/effects"
import { Action } from "typescript-fsa"
import { Message } from "./state"
import { database } from "../../firebase"
import * as firebase from "firebase/app"
import { receive } from "./actions"

type DataSnapshot = firebase.database.DataSnapshot | null

const ref = database.ref("messages")

const fetch = () => {
  return new Promise((resolve, reject) => {
    ref.off()
    ref.on("value",
      (snapshot: DataSnapshot) => {
        if (snapshot) {
          const messages = snapshot.val()
          resolve({
            messages: Object.entries(messages).map(([id, value]) => ({ ...value, id })),
            //messages: Object.values(messages)
          })
          reject([])
        }
      },
      (result: Object) => {
        reject(result)
      },
    )
  })
}

const fetchMessages = function* () {
  const { messages } = yield call(fetch)
  yield put(receive(messages))
}

const addMessage = function* (action: Action<Message>) {
  const message = action.payload
  yield call((message) => ref.push(message), message)
}

const saga = [
  takeEvery("FETCH_MESSAGES", fetchMessages),
  takeEvery("ADD_MESSAGE", addMessage),
]

export default saga
