import { combineReducers, compose, createStore } from "redux"
import * as auth from "./auth/state"
import * as messages from "./messages/state"
import { Message } from "./messages/state"

import * as firebase from "firebase/app"
import "firebase/auth"
import { UserInfo } from "firebase"

firebase.initializeApp({
  apiKey: "AIzaSyBIg1CM-15Ag74cwnB9BaJG3z_pFnr8BX0",
  authDomain: "torounit-firebase-chat.firebaseapp.com",
  databaseURL: "https://torounit-firebase-chat.firebaseio.com",
  projectId: "torounit-firebase-chat",
  storageBucket: "torounit-firebase-chat.appspot.com",
  messagingSenderId: "646034935690",
})

export type AppState = {
  messages: Message[],
  auth: UserInfo
}

const initialState = {
  auth: {},
  messages: [],
}

export const store = createStore(
  combineReducers<AppState>({
    auth: auth.reducer,
    messages: messages.reducer,
  }),
  initialState,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  )
)
