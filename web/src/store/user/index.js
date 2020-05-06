import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import userReducer, {   preCreateLockEpic } from "./menu"


export const registerUserEpic = combineEpics(
  preCreateLockEpic 
)

const userRegisterReducer = combineReducers({
 
  menu: userReducer
 
})

export default userRegisterReducer
