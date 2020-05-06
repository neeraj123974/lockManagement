import { connect } from 'react-redux'
import { getUserLock , deleteUserLock , editUserLock} from "../../../store/user/menu/duck/actions"
import userDeshboard from './component'

const userDeshboardContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data,
  	userLocks:state.user.menu.userLocks,
  	deletePhase:state.user.menu.deletePhase,
  	editPhase:state.user.menu.editPhase
  }),
  // Map actions to props
  {
    getUserLock,
    deleteUserLock,
    editUserLock
  }
)(userDeshboard)

export default userDeshboardContainer


