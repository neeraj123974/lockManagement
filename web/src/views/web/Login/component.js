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
    const {phase , user , loginStatus} = this.props
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
      <>
      <form  onSubmit={this.handleSubmit}>
        <div>
          <div>
            <input type="text"  name="userName" 
              value={this.state.userName} 
              onChange={this.handleChange.bind(this)} placeholder="Enter User Name"/>
              {  this.state.err.userName ?
              <span>
                {this.state.err.userName}
              </span> : ''
           }      
          </div>
          <div className="form-group">
            <input className="form-control input-lg" name="password" 
            value={this.state.password} 
            type='password'
            onChange={this.handleChange.bind(this)} placeholder="Enter Password"/>
            { this.state.err.password ?
              <span className="error_field">
               {this.state.err.password}
              </span> : '' 
            }      
          </div>
          <br/>
          <br/>
          <div className="form-group">
              <button type="submit">Login
              </button>
          </div>  
        </div>                       
      </form> 
      <Link to="/signUp">Sign Up</Link>
      </>
     )
  }
}

export default Login
