import { connect } from 'react-redux'
import { getUserLock , deleteUserLock , editUserLock , fetchMe , editUser} from "../../../store/user/menu/duck/actions"
import userDeshboard from './component'

const userDeshboardContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data,
  	userLocks:state.user.menu.userLocks,
  	deletePhase:state.user.menu.deletePhase,
  	editPhase:state.user.menu.editPhase,
    me:state.user.menu.me
  }),
  // Map actions to props
  {
    getUserLock,
    deleteUserLock,
    editUserLock,
    fetchMe,
    editUser
  }
)(userDeshboard)

export default userDeshboardContainer


