import { connect } from 'react-redux'
import { createLock } from "../../../store/user/menu/duck/actions"

import createLockForm from './component'

const createLockContainer = connect(
  // Map state to props
  (state) => ({
  	lockData: state.user.menu.lockData,
  	createPhase: state.user.menu.createPhase,
  	data: state.user.menu.data
  }),
  // Map actions to props
  {
    createLock
  }
)(createLockForm)

export default createLockContainer


