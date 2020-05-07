import getUserReducer from "./duck/reducers"
import getUserListEpic from "./duck/epics"
import getAdminEpic from "./duck/epics"
export const preGetUserEpic = getUserListEpic
export const preGetAdminEpic = getAdminEpic
export default getUserReducer
