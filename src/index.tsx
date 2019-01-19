import React from "react"
import ReactDOM from "react-dom"
import App from "./containers/App"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import { store } from "./store"
import "./firebase"

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById("root"),
  )
}
render();

/// <reference types="webpack-env" />
if (module.hot) {
  module.hot.accept("./containers/App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
