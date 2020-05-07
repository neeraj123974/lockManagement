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
    if(phase === "success"){
      return(
        <Redirect to={'/userDashboard'}/>   
        )
    }
    return (
      <>
       <form  onSubmit={this.handleSubmit}>
        <div>
          <div>
            <input type="text"  name="name" 
              value={this.state.name} 
              onChange={this.handleChange.bind(this)} placeholder="Enter Lock Name"/>
              {  this.state.err.name ?
              <span>
                {this.state.err.name}
              </span> : ''
           }      
          </div>
          <br/>
          <br/>
          <div className="form-group">
              <button type="submit">Submit
              </button>
          </div>  
        </div>                       
      </form> 
      </>
     )
  }
}

export default createLockForm
