import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import userReducer, { userEpic , userLoginEpic} from "./menu"


export const registerUserEpic = combineEpics(
 
  userEpic,
  userLoginEpic
 
)

const userRegisterReducer = combineReducers({
 
  menu: userReducer
 
})

export default userRegisterReducer
