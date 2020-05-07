import React, { Component } from "react"
import { Redirect , Link} from 'react-router-dom'
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
    const {userName , password , err} = this.state
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
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form  name="form" onSubmit={this.handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">Cancel</Link>
        </div>                     
        </form>
      </div>
     )
  }
}

export default SignUp
