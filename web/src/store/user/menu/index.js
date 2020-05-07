import userReducer from "./duck/reducers"
import registerUserEpic from "./duck/epics"
import loginUserEpic from "./duck/epics"
import createLockEpic from "./duck/epics"
import getUserLockEpic from  "./duck/epics"
import deleteUserLockEpic from  "./duck/epics"
import editUserLockEpic from  "./duck/epics"
import deleteUserEpic from  "./duck/epics"
import editUserEpic from  "./duck/epics"
export const userEpic = registerUserEpic
export const userLoginEpic = loginUserEpic
export const preCreateLockEpic = createLockEpic
export const preGetUserLockEpic = getUserLockEpic
export const preDeleteUserLockEpic = deleteUserLockEpic
export const preEditUserLockEpic =  editUserLockEpic
export const preDeleteUserEpic =  deleteUserEpic
export const preEditUserEpic =  editUserEpic
export default userReducer
