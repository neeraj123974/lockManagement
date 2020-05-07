/* eslint-disable default-case */
import { Record } from "immutable"
import { assign } from "lodash"

import * as type from "./action-types"
import { INIT, LOADING, SUCCESS, ERROR } from "../../../../utils/constants"

const InitialStateInterface = {
  phase: INIT,
  error: null,
  data: [] ,
  lockData:[],
  userLocks:[],
  createPhase : INIT,
  deletePhase:INIT,
  editPhase:INIT,
  loginMessage:'',
  loginStatus:false,
  me:[]
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    super(assign(desiredValues))
  }
}

export default function(state = new InitialState(), action = {}) {
  switch (action.type) {

    //user registration action
    case type.USER_REGISTER: {
      return state.set("phase", LOADING).set("error", null)
    }
    case type.USER_REGISTER_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
    }
    case type.USER_REGISTER_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //user login action
    case type.USER_LOGIN: {
      return state
      .set("phase", LOADING)
      .set("error", null)
      .set('loginStatus',false)
      .set('loginMessage','')
    }
    case type.USER_LOGIN_SUCCESS: {
      const { payload } = action
      localStorage.setItem('token', payload.data.token);
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
        .set('loginStatus',payload.status)
        .set('loginMessage',payload.message)
    }
    case type.USER_LOGIN_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }
    
    //create lock action
    case type.CREATE_LOCK: {
      return state.set("createPhase", LOADING).set("error", null)
    }
    case type.CREATE_LOCK_SUCCESS: {
      const { payload } = action
      return state
        .set("createPhase", SUCCESS)
        .set("lockData", payload.data)
        .set("error", null)
    }
    case type.CREATE_LOCK_ERROR: {
      return state.set("createPhase", ERROR).set("error", null)
    }

     //get user lock action
    case type.GET_USER_LOCK: {
      return state.set("phase", LOADING).set("error", null)
    }
    case type.GET_USER_LOCK_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("userLocks", payload.data)
        .set("error", null)
    }
    case type.GET_USER_LOCK_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //delete user lock action
    case type.DELETE_USER_LOCK: {
      return state.set("deletePhase", LOADING).set("error", null)
    }
    case type.DELETE_USER_LOCK_SUCCESS: {
      return state
        .set("deletePhase", SUCCESS)
        .set("error", null)
    }
    case type.DELETE_USER_LOCK_ERROR: {
      return state.set("deletePhase", ERROR).set("error", null)
    }

    //edit user lock action
    case type.EDIT_USER_LOCK: {
      return state.set("editPhase", LOADING).set("error", null)
    }
    case type.EDIT_USER_LOCK_SUCCESS: {
      return state
        .set("editPhase", SUCCESS)
        .set("error", null)
    }
    case type.EDIT_USER_LOCK_ERROR: {
      return state.set("editPhase", ERROR).set("error", null)
    }

     //delete user  action
    case type.DELETE_USER: {
      return state.set("deletePhase", LOADING).set("error", null)
    }
    case type.DELETE_USER_SUCCESS: {
      return state
        .set("deletePhase", SUCCESS)
        .set("error", null)
    }
    case type.DELETE_USER_ERROR: {
      return state.set("deletePhase", ERROR).set("error", null)
    }

    //edit user action
    case type.EDIT_USER: {
      return state.set("editPhase", LOADING).set("error", null)
    }
    case type.EDIT_USER_SUCCESS: {
      return state
        .set("editPhase", SUCCESS)
        .set("error", null)
    }
    case type.EDIT_USER_ERROR: {
      return state.set("editPhase", ERROR).set("error", null)
    }

    case type.INIT_PHASE: {
      return state.set("editPhase", INIT).set("deletePhase", INIT)

    }

    case type.FETCH_ME: {
      return state.set("phase", LOADING).set("error", null)
    }
    case type.FETCH_ME_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("me", payload.data)
        .set("error", null)
    }
    case type.FETCH_ME_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }
    default: {
      return state
    }
  }
}
