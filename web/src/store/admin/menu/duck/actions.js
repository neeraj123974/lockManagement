import * as type from './action-types'

export const fetchUserList = data => (
{
  type: type.FETCH_USER_LIST,
  payload: data
})

export const fetchAdmin = data => (
{
  type: type.FETCH_ADMIN,
  payload: data
})
