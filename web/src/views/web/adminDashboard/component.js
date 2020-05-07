import React, { Component } from "react"
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import _ from 'lodash'
import { DeleteFilled , EditFilled , ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;
const { Panel } = Collapse;

class adminDeshboard extends Component {
	constructor(props) {
	super(props);
	this.state = {
	  visible: false,
	  confirmLoading: false,
	  editLock:{},
	  err:{},
	  name:'',
    userEditModal:false
	}
}
  componentDidMount=()=>{
    const {fetchUserList}= this.props
    fetchUserList()
  }

   componentWillReceiveProps(nextProps){
    const {deletePhase , editPhase} = nextProps
    const {fetchUserList , initPhase}= this.props
    if(deletePhase === 'success' || editPhase === 'success'){
      fetchUserList()
      initPhase()
    }
  }
  
  //Edit the lock of user
  showEditModal = (data) => {
    this.setState({
      visible: true,
      editLock:data,
      name:_.get(data,'name','')
    });
  };
   
   //Edit the profile of user
   showUserEditModal = (data) => {
    this.setState({
      userEditModal: true,
      editLock:data,
      name:_.get(data,'name','')
    });
  };

  //Cancel the modal of edit
  handleCancel = () => {
    const {editLock} = this.state
    this.setState({
      visible: false,
      userEditModal:false,
      name:_.get(editLock , 'name' , '')
    });
  };
  
  //Set the value of edit name
  handleChange=(event)=>{
    this.setState({ [event.target.name]: event.target.value })
  }
  
  //Submit the lock name
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
   
   //Submit the user profile data
   handleUserSubmit=() =>{
    // event.preventDefault()
    const err = {}
    const {name , editLock} = this.state
    if (name === '') {
      err.name = 'Enter lock Name'
    }
    
    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const { editUser } = this.props
        if(name !== _.get(editLock ,'name','')){
        const obj = {
          name: name,
          _id:_.get(editLock,'_id','')
        }
      editUser(obj)
      this.setState({userEditModal:false})
    }else{
      this.setState({userEditModal:false})
    }
    }
  }
  
  //Lock delete modal
  showDeleteConfirm=(data)=> {
    const {deleteUserLock} = this.props
    confirm({
      title: 'Are you sure delete this lock?',
      icon: <ExclamationCircleOutlined />,
      content: 'If you delete this lock , user also not able to see this lock.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUserLock({_id:data._id})
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  //User delete modal
  deleteUser=(data)=> {
    const {deleteUser} = this.props
    confirm({
      title: 'Are you sure delete this lock?',
      icon: <ExclamationCircleOutlined />,
      content: 'If you delete this lock , user also not able to see this lock.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser({_id:data._id})
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  }

	
   render() { 
   const {users , locks} = this.props
   const { visible, confirmLoading  ,err ,name , userEditModal} = this.state;
    return (
    <div className="col-md-6 col-md-offset-3">
       <h2>User List with Lock </h2>
       <Collapse accordion>
        {users.length > 0 && users.map((data , i)=>{
        	return(
	        <Panel header={_.get(data,'name','')} key={i}>
		        <table>
  		        <thead>
  		          <tr>
  		            <th>{'Lock Name'}</th>
  		            <th>{'Edit'}</th>
  		            <th>{'Delete'}</th>
  		          </tr>
  		        </thead>
  		        <tbody>
    		        {locks.length > 0 && locks.map((data1 , i)=>{
      		        if(data1.userId === data._id){
      			      return(
      			      <tr key = {i}>
      			        <td>{_.get(data1,'name' , 0)}</td>
      			        <td><EditFilled onClick={()=>this.showEditModal(data1)}/></td>
      			        <td><DeleteFilled onClick={()=>this.showDeleteConfirm(data1)}/></td>
      			      </tr>
      			      )
    			      }
    			      })}
  		        </tbody>
		        </table>
            <h2>Delete or Edit User</h2>
            <h5>{_.get(data,'name','')}</h5>
            <EditFilled onClick={()=>this.showUserEditModal(data)}/>
            <DeleteFilled className='deleteIcon' onClick={()=>this.deleteUser(data)}/>
		    </Panel>
		    )
        })}
	  </Collapse>
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
          title="Edit User Profile"
          visible={userEditModal}
          onOk={()=>this.handleUserSubmit()}
          confirmLoading={confirmLoading}
          onCancel={()=>this.handleCancel()}
        >
        <form  onSubmit={()=>this.handleUserSubmit}>
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
	</div>
     )
  }
}

export default adminDeshboard
