import React, { Component } from "react"
import 'antd/dist/antd.css';
import _ from 'lodash'
import { DeleteFilled , EditFilled , ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
const { confirm } = Modal;

class userDeshboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      editLock:{},
      err:{},
      name:''
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
	createLock=()=>{
      const {history} = this.props
      history.push({
      	pathname:'/createLock'
      })	}  

  componentDidMount(){
    const {getUserLock}= this.props
    getUserLock()
  }

  showDeleteConfirm=(data)=> {
    const {deleteUserLock} = this.props
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
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

  // handleOk = () => {
  //   const {name , editLock} = this.state

  // };

   handleCancel = () => {
    const {editLock} = this.state
    this.setState({
      visible: false,
      name:_.get(editLock , 'name' , '')
    });
  };

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=() =>{
    // event.preventDefault()
    const err = {}
    const {name , editLock} = this.state
    if (name === '') {
      err.name = 'Enter User Name'
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

   render() {  
    const {userLocks} = this.props
    const { visible, confirmLoading  ,err ,name} = this.state;
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
      <>
       <Button onClick={()=>this.createLock()}>Create Lock</Button>
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
      </>
     )
  }
}

export default userDeshboard
