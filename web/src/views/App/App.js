import React, { Component } from "react"
import "./App.css"
import { Router, Route, Redirect } from "react-router-dom"
import {createBrowserHistory} from "history"

//import { createBrowserHistory } from 'history'



import Login from "../web/Login/container"
import Signup from "../web/SignUp/container"

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={() => <Redirect to="/Login"/>} />
          <Route path={"/Login"} component={Login} />
          <Route path={"/SignUp"} component={Signup} />
        </div>
      </Router>
    )
  }
}

export default App

