//eslint-disable-next-line
import Rx from 'rxjs/Rx';
import { Observable } from "rxjs"
import { mergeMap } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"

import * as api from "./api"
import * as type from "./action-types"

const registerUserEpic = action$ =>
action$.pipe(
  ofType(type.USER_REGISTER),
  mergeMap(action => {
    return Observable.fromPromise(api.registerUser(action.payload))
      .map(payload => ({
        type: type.USER_REGISTER_SUCCESS,
        payload
      }))
      .catch(error =>
        Observable.of({
          type: type.USER_REGISTER_ERROR,
          payload: { error }
        })
      )
  })
)

const loginUserEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Observable.fromPromise(api.loginUser(action.payload))
      .map(payload => ({
        type: type.USER_LOGIN_SUCCESS,
        payload
      }))
      .catch(error =>
        Observable.of({
          type: type.USER_LOGIN_ERROR,
          payload: { error }
        })
      )
  })
)

const createLockEpic = action$ =>
action$.pipe(
  ofType(type.CREATE_LOCK),
  mergeMap(action => {
    return Observable.fromPromise(api.createLock(action.payload))
      .map(payload => ({
        type: type.CREATE_LOCK_SUCCESS,
        payload
      }))
      .catch(error =>
        Observable.of({
          type: type.CREATE_LOCK_ERROR,
          payload: { error }
        })
      )
  })
)

const getUserLockEpic = action$ =>
action$.pipe(
  ofType(type.GET_USER_LOCK),
  mergeMap(action => {
    return Observable.fromPromise(api.getUserLock(action.payload))
      .map(payload => ({
        type: type.GET_USER_LOCK_SUCCESS,
        payload
      }))
      .catch(error =>
        Observable.of({
          type: type.GET_USER_LOCK_ERROR,
          payload: { error }
        })
      )
  })
)

const deleteUserLockEpic = action$ =>
action$.pipe(
  ofType(type.DELETE_USER_LOCK),
  mergeMap(action => {
    return Observable.fromPromise(api.deleteUserLock(action.payload))
      .flatMap(payload => [
      {
        type: type.DELETE_USER_LOCK_SUCCESS,
        payload
      },
      {
        type: type.GET_USER_LOCK
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.DELETE_USER_LOCK_ERROR,
          payload: { error }
        })
      )
  })
)

const editUserLockEpic = action$ =>
action$.pipe(
  ofType(type.EDIT_USER_LOCK),
  mergeMap(action => {
    return Observable.fromPromise(api.editUserLock(action.payload))
      .flatMap(payload => [
      {
        type: type.EDIT_USER_LOCK_SUCCESS,
        payload
      },
      {
        type: type.GET_USER_LOCK
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.EDIT_USER_LOCK_ERROR,
          payload: { error }
        })
      )
  })
)

const deleteUserEpic = action$ =>
action$.pipe(
  ofType(type.DELETE_USER),
  mergeMap(action => {
    return Observable.fromPromise(api.deleteUser(action.payload))
      .flatMap(payload => [
      {
        type: type.DELETE_USER_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.DELETE_USER_ERROR,
          payload: { error }
        })
      )
  })
)

const editUserEpic = action$ =>
action$.pipe(
  ofType(type.EDIT_USER),
  mergeMap(action => {
    return Observable.fromPromise(api.editUser(action.payload))
      .flatMap(payload => [
      {
        type: type.EDIT_USER_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.EDIT_USER_ERROR,
          payload: { error }
        })
      )
  })
)

export default combineEpics(registerUserEpic , loginUserEpic , createLockEpic  , getUserLockEpic , deleteUserLockEpic , editUserLockEpic ,deleteUserEpic , editUserEpic)
