import * as type from './action-types'

export const userRegister = data => (
{
  type: type.USER_REGISTER,
  payload: data
})

export const userLogin = data => (
{
  type: type.USER_LOGIN,
  payload: data
})