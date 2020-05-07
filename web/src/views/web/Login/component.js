import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom'
import _ from 'lodash'
import 'antd/dist/antd.css';
import { message } from 'antd';
class Login extends Component {
   constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
      err: {}
    }
  }

 

  componentWillReceiveProps(nextProps){
    const {loginMessage , loginStatus} = nextProps
    if(!loginStatus  && loginMessage){
      message.info(loginMessage);
    }
  }
 

  handleChange=(event)=> {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=(event)=> {
    event.preventDefault()
    const err = {}
    const {userName , password} = this.state
    if (userName === '') {
      err.userName = 'Enter User Name'
    }
    
    if (password === '' ) {
      err.password = 'Enter  Valid Password.'
    }
    
    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const { userLogin } = this.props
        const data = {
          name: userName,
          password:password
        }
      userLogin(data)
    }
  }

  render() {
    const {phase , user , loginStatus } = this.props
    const {userName , password , err} = this.state
    if(phase === "success" && _.get(user,'user.role','') === 'User' && loginStatus){
      return(
        <Redirect to={'/userDashboard'}/>   
        )
    }
    if(phase === "success" && _.get(user,'user.role','') === 'Admin' && loginStatus){
      return(
        <Redirect to={'/adminDashboard'}/>   
        )
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group'}>
                  <label htmlFor="userName">Username</label>
                  <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange.bind(this)} />
                  { err && err.userName ?
                   <div className="help-block">Username is required</div> : ''
                   }    

              </div>
              <div className={'form-group'}>
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" value={password}  onChange={this.handleChange.bind(this)} />
                  {err && err.password ?
                   <div className="help-block">Password is required</div> : '' 
                  }   
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">Login</button>
                  <Link to="/signUp" className="btn btn-link">Register</Link>
              </div>
          </form>
      </div>
     )
  }
}

export default Login
