import { connect } from 'react-redux'
import { userRegister } from "../../../store/user/menu/duck/actions"
import { fetchAdmin } from "../../../store/admin/menu/duck/actions"

import SignUp from './component'

const SignupContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data,
  	phase:state.user.menu.phase,
  	adminData:state.admin.menu.adminData
  }),
  // Map actions to props
  {
    userRegister,
    fetchAdmin
  }
)(SignUp)

export default SignupContainer


