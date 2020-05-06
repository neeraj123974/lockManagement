import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';
class SignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
      err: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
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
        const { userRegister } = this.props
        const data = {
          name: userName,
          password:password
        }
      userRegister(data)
    }
  }

  render() {
    const {setRandomData , sortingStatus} = this.state
    const {phase} = this.props
   if(phase == "success"){
      return(
        <Redirect to={`/userDashboard`}/>   
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
            <input type="text" className="form-control input-lg" name="password" 
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
