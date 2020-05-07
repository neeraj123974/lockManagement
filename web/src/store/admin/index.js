import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import getUserReducer, { preGetUserEpic } from "./menu"


export const adminEpic = combineEpics(
 
  preGetUserEpic
 
)

const adminReducer = combineReducers({
 
  menu: getUserReducer
 
})

export default adminReducer
