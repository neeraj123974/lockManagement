import { connect } from 'react-redux'

import userDeshboard from './component'

const userDeshboardContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data
  }),
  // Map actions to props
  {
    // userLogin
  }
)(userDeshboard)

export default userDeshboardContainer


