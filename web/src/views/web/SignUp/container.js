import { connect } from 'react-redux'
import { userRegister } from "../../../store/user/menu/duck/actions"

import SignUp from './component'

const SignupContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data
  }),
  // Map actions to props
  {
    userRegister
  }
)(SignUp)

export default SignupContainer


