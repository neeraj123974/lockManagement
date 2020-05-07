import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
class createLockForm extends Component {
   constructor(props) {
    super(props);
    this.state = {
      name:'',
      err: {}
    }
  }

  componentWillReceiveProps(nextProps){
    const {createPhase} = nextProps
    const { history} = this.props
    if(createPhase === 'success'){
      history.push({
        pathname:'/userDashboard'
      }) 
    }
  }
 
  handleChange=(event)=> {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=(event)=> {
    event.preventDefault()
    const err = {}
    const {name } = this.state
    if (name === '') {
      err.name = 'Enter lock Name'
    }
    
    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const { createLock } = this.props
        const obj = {
          name: name
        }
      createLock(obj)
    }
  }

  render() {
    const {phase} = this.props
    const {err , name} = this.state
    if(phase === "success"){
      return(
        <Redirect to={'/userDashboard'}/>   
        )
    }
    return (
      <div className="col-md-6 col-md-offset-3">
      <h2>Create Lock</h2>
       <form  onSubmit={this.handleSubmit}>
          <div className={'form-group'}>
            <label htmlFor="name">Lock Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange.bind(this)} />
            { err && err.name ?
             <div className="help-block">Lockname is required</div> : ''
             }   
          </div>
          <br/>
          <br/>
          <div className="form-group">
              <button type="submit" className="btn btn-primary">Submit
              </button>
          </div>  
      </form> 
      </div>
     )
  }
}

export default createLockForm
