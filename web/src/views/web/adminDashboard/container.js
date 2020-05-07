import { connect } from 'react-redux'
import { fetchUserList } from "../../../store/admin/menu/duck/actions"
import { deleteUserLock , editUserLock , initPhase , deleteUser ,editUser} from "../../../store/user/menu/duck/actions"
import adminDeshboard from './component'

const adminDeshboardContainer = connect(
  // Map state to props
  (state) => ({
  	 users: state.admin.menu.users,
  	 locks: state.admin.menu.locks,
  	 deletePhase:state.user.menu.deletePhase,
  	 editPhase:state.user.menu.editPhase
  }),
  // Map actions to props
  {
    fetchUserList,
    deleteUserLock,
    editUserLock,
    initPhase,
    deleteUser,
    editUser
  }
)(adminDeshboard)

export default adminDeshboardContainer


