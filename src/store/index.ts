import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import * as auth from "./auth/state"
import * as messages from "./messages/state"
import { Message } from "./messages/state"
import * as users from "./users/state"
import { UserInfo } from "firebase"
import { all } from "redux-saga/effects"
import messagesSaga from "./messages/saga"
import usersSaga from "./users/saga"

export type AppState = {
  messages: Message[]
  auth: UserInfo
  users: UserInfo[]
}

const initialState = {
  auth: {},
  messages: [],
  users: []
}

const rootSaga = function*() {
  yield all([
    ...messagesSaga,
    ...usersSaga
  ])
}
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers<AppState>({
    auth: auth.reducer,
    messages: messages.reducer,
    users: users.reducer
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
