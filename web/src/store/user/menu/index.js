import userReducer from "./duck/reducers"
import registerUserEpic from "./duck/epics"
import loginUserEpic from "./duck/epics"

export const userEpic = registerUserEpic
export const userLoginEpic = loginUserEpic
export default userReducer
