import React, { Component } from "react"
import "./App.css"
import { Router, Route, Redirect } from "react-router-dom"
import {createBrowserHistory} from "history"

//import { createBrowserHistory } from 'history'



import Login from "../web/Login/container"
import Signup from "../web/SignUp/container"
import userDashboard from "../web/userDashboard/container"
import createLock from "../web/createLock/container"
import adminDashboard from "../web/adminDashboard/container"

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={() => <Redirect to="/Login"/>} />
          <Route path={"/Login"} component={Login} />
          <Route path={"/SignUp"} component={Signup} />
          <Route path={"/userDashboard"} component={userDashboard} />
          <Route path={"/createLock"} component={createLock} />
          <Route path={"/adminDashboard"} component={adminDashboard} />
        </div>
      </Router>
    )
  }
}

export default App

