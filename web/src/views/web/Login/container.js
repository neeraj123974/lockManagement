import { connect } from 'react-redux'
import { userLogin , getUserLock} from "../../../store/user/menu/duck/actions"

import Login from './component'

const LoginContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data,
  	phase: state.user.menu.phase
  }),
  // Map actions to props
  {
    userLogin,
    getUserLock
  }
)(Login)

export default LoginContainer


