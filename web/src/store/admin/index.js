import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import menuReducer, { menuEpic } from "./menu"


export const adminEpic = combineEpics(
 
  menuEpic
 
)

const adminReducer = combineReducers({
 
  menu: menuReducer
 
})

export default adminReducer
