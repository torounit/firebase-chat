import * as firebase from "firebase/app"
import 'firebase/database'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBIg1CM-15Ag74cwnB9BaJG3z_pFnr8BX0",
  authDomain: "torounit-firebase-chat.firebaseapp.com",
  databaseURL: "https://torounit-firebase-chat.firebaseio.com",
  projectId: "torounit-firebase-chat",
  storageBucket: "torounit-firebase-chat.appspot.com",
  messagingSenderId: "646034935690",
})

export const database = app.database();
