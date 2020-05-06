
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "./config/index.css"
import AppContainer from "./views/App/App"
import * as serviceWorker from "./config/serviceWorker"
import store from "./store"

const Store = AppComponent => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)

ReactDOM.render(Store(AppContainer), document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

