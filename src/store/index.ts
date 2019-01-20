import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import * as auth from "./auth"
import * as messages from "./messages"
import * as users from "./users"
import * as threads from "./threads"

import { all } from "redux-saga/effects"

export type AppState = {
  messages: messages.Message[]
  auth: auth.Auth
  users: users.User[]
  threads: threads.Thread[]
}

const rootSaga = function*() {
  yield all([
    ...messages.saga,
    ...users.saga,
    ...threads.saga,
    ...auth.saga
  ])
}
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers<AppState>({
    auth: auth.reducer,
    messages: messages.reducer,
    users: users.reducer,
    threads: threads.reducer
  }),
  {},
  compose(
    ...[
      applyMiddleware(sagaMiddleware),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    ].filter(Boolean)
  )
)
sagaMiddleware.run(rootSaga)
