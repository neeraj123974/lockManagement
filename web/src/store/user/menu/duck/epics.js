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

export default combineEpics(registerUserEpic , loginUserEpic)
