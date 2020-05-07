import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import { message } from 'antd';
import _ from 'lodash'
class SignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
      err: {}
    }
  }

  componentDidMount=()=>{
    const {fetchAdmin}= this.props
    fetchAdmin()
  }

  handleChange=(event) =>{
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
        const { userRegister , adminData } = this.props
        const data = {
          name: userName,
          password:password,
          role : adminData &&  adminData.role === 'Admin' ? 'User' : 'Admin'
        }
        if(adminData  && adminData.role !== 'Admin'){
          message.info('First you will signup as a admin');
        }
       userRegister(data)
    }
  }

  render() {
    const {phase , user } = this.props
    console.log(user)
   if(phase === "success" && _.get(user,'role','') === 'User'){
      return(
        <Redirect to={`/userDashboard`}/>   
        )
    }
    if(phase === "success" && _.get(user,'role','') === 'Admin'){
      return(
        <Redirect to={`/adminDashboard`}/>   
        )
    }
    return (
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
            <input  className="form-control input-lg" name="password" 
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
              <button type="submit">Sign In</button>
          </div>  
        </div>                       
      </form>
     )
  }
}

export default SignUp
