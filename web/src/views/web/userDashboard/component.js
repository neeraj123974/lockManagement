import React, { Component } from "react"
import 'antd/dist/antd.css';
import _ from 'lodash'
import { DeleteFilled , EditFilled , ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal , Button  , DatePicker} from 'antd';
import moment from 'moment';
const { confirm } = Modal;

class userDeshboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      editLock:{},
      err:{},
      name:'',
      editProfileModal:false,
      dob:''
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
	createLock=()=>{
      const {history} = this.props
      history.push({
      	pathname:'/createLock'
      })	}  


  componentDidMount(){
    const {getUserLock , fetchMe}= this.props
    getUserLock()
    fetchMe()
  }

  showDeleteConfirm=(data)=> {
    const {deleteUserLock} = this.props
    confirm({
      title: 'Are you sure delete this lock?',
      icon: <ExclamationCircleOutlined />,
      content: 'If you delete this lock it will be permanently deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUserLock({_id:data._id})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showEditModal = (data) => {
    this.setState({
      visible: true,
      editLock:data,
      name:_.get(data,'name','')
    });
  };

  showEditProfileModal = (data) => {
    this.setState({
      editProfileModal: true,
      editLock:data,
      name:_.get(data,'name',''),
      dob:_.get(data,'dob',null),
    });
  };

  // handleOk = () => {
  //   const {name , editLock} = this.state

  // };

   handleCancel = () => {
    const {editLock} = this.state
    this.setState({
      visible: false,
      name:_.get(editLock , 'name' , ''),
      editProfileModal: false,
      dob:_.get(editLock,'dob',null)
    });
  };

  handleChange=(event)=>{
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=() =>{
    // event.preventDefault()
    const err = {}
    const {name , editLock} = this.state
    if (name === '') {
      err.name = 'Enter lock Name'
    }
    
    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const { editUserLock } = this.props
        if(name !== _.get(editLock ,'name','')){
        const obj = {
          name: name,
          _id:_.get(editLock,'_id','')
        }
      editUserLock(obj)
      this.setState({visible:false})
    }else{
      this.setState({visible:false})
    }
    }
  }

  handleSubmitUser = () =>{
    const err = {}
    const {name , editLock , dob} = this.state
    if (name === '') {
      err.name = 'Enter lock Name'
    }
    
    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const { editUser } = this.props
        const obj = {
          name: name,
          _id:_.get(editLock,'_id',''),
          dob:dob ? moment(dob).format('YYYY-MM-DD') : ''
        }
      editUser(obj)
      this.setState({editProfileModal:false})
    }
  }

  handleDob=(date)=> {
    this.setState({dob:date})
  }

   render() {  
    const {userLocks , me} = this.props
    const { visible, confirmLoading  , err , name , editProfileModal , dob} = this.state;
    const showData = userLocks.length > 0 && userLocks.map((data , i)=>{
      return(
      <tr key = {i}>
        <td>{_.get(data,'name' , 0)}</td>
        <td><EditFilled onClick={()=>this.showEditModal(data)}/></td>
        <td><DeleteFilled onClick={()=>this.showDeleteConfirm(data)}/></td>
      </tr>
      )
    })
    return (
      <div className="col-md-6 col-md-offset-3">
      <h2>Create lock by clicking on create button</h2>
      <form  name="form">
        <div className="form-group">
         <Button  className="btn btn-primary" onClick={()=>this.showEditProfileModal(me)}>Profile</Button>
        </div>
      </form>
      <form  name="form">
        <div className="form-group">
         <button type="submit" className="btn btn-primary" onClick={()=>this.createLock()}>Create Lock</button>
        </div>
      </form>
      <h2>List of lock user can edit and delete lock</h2>
       <table>
        <thead>
          <tr>
            <th>{'User Locks'}</th>
            <th>{'Edit'}</th>
            <th>{'Delete'}</th>
          </tr>
        </thead>
        <tbody>
          {showData}
        </tbody>
       </table>
        <Modal
          title="Edit Lock"
          visible={visible}
          onOk={()=>this.handleSubmit()}
          confirmLoading={confirmLoading}
          onCancel={()=>this.handleCancel()}
        >
          <form  onSubmit={()=>this.handleSubmit}>
            <div>
              <div>
                <input type="text"  name="name" 
                  value={name} 
                  onChange={this.handleChange.bind(this)} placeholder="Enter Lock Name"/>
                  {  err.name ?
                  <span>
                    {err.name}
                  </span> : ''
               }      
              </div> 
            </div>                       
          </form> 
        </Modal>
        <Modal
          title="Edit Lock"
          visible={editProfileModal}
          onOk={()=>this.handleSubmitUser()}
          confirmLoading={confirmLoading}
          onCancel={()=>this.handleCancel()}
        >
        <div className="col-md-6 col-md-offset-3">
        <h2>Update Profile</h2>
          <form name="form" onSubmit={()=>this.handleSubmit}>
            <div className={'form-group'}>
              <label htmlFor="name">Username</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange.bind(this)} />
              { err && err.name ?
               <div className="help-block">Username is required</div> : ''
               }    
              </div>
              <div className={'form-group'}>
              <label htmlFor="dob">Date of birth</label>
                <DatePicker
                value={dob ? moment(dob) :null}
                  clearable={true}
                  format="DD-MMM-YYYY"
                  onChange={date=>this.handleDob(date)} 
                />
              </div>                       
          </form> 
        </div>
        </Modal>
      </div>
     )
  }
}

export default userDeshboard
