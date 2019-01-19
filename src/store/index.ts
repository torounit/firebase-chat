import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import * as auth from "./auth/state"
import * as messages from "./messages/state"
import { Message } from "./messages/state"
import { UserInfo } from "firebase"
import { all } from "redux-saga/effects"
import messagesSaga from "./messages/saga"

export type AppState = {
  messages: Message[]
  auth: UserInfo
}

const initialState = {
  auth: {},
  messages: [],
}

const rootSaga = function*() {
  yield all([...messagesSaga])
}
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers<AppState>({
    auth: auth.reducer,
    messages: messages.reducer,
  }),
  initialState,
  compose(
    ...[
      applyMiddleware(sagaMiddleware),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    ].filter(Boolean)
  )
)
sagaMiddleware.run(rootSaga)
