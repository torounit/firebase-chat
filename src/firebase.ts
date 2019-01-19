import * as firebase from "firebase/app"
import "firebase/database"

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
  REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
  REACT_APP_FIREBASE_PROJECT_ID: projectId,
  REACT_APP_FIREBASE_STORAGE_BUCKET: storageBucket,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
} = process.env

const options = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId }

const app = firebase.initializeApp(options)

export const database = app.database()
