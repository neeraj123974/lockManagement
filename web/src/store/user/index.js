import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import userReducer, { userLoginEpic} from "./menu"


export const registerUserEpic = combineEpics(
 
  userLoginEpic
 
)

const userRegisterReducer = combineReducers({
 
  menu: userReducer
 
})

export default userRegisterReducer
