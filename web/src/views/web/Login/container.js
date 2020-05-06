import { connect } from 'react-redux'
import { userLogin } from "../../../store/user/menu/duck/actions"

import Login from './component'

const LoginContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data,
  	phase: state.user.menu.phase
  }),
  // Map actions to props
  {
    userLogin
  }
)(Login)

export default LoginContainer


