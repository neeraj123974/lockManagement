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

export const createLock = data => (
{
  type: type.CREATE_LOCK,
  payload: data
})

export const getUserLock = data => (
{
  type: type.GET_USER_LOCK,
  payload: data
})

export const deleteUserLock = data => (
{
  type: type.DELETE_USER_LOCK,
  payload: data
})

export const editUserLock = data => (
{
  type: type.EDIT_USER_LOCK,
  payload: data
})

export const deleteUser = data => (
{
  type: type.DELETE_USER,
  payload: data
})


export const initPhase = () => (
{
  type: type.INIT_PHASE
})

export const editUser = data => (
{
  type: type.EDIT_USER,
  payload: data
})
