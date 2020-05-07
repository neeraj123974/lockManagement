//eslint-disable-next-line
import Rx from 'rxjs/Rx';
import { Observable } from "rxjs"
import { mergeMap } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"

import * as api from "./api"
import * as type from "./action-types"

const getUserListEpic = action$ =>
action$.pipe(
  ofType(type.FETCH_USER_LIST),
  mergeMap(action => {
    return Observable.fromPromise(api.getUserList(action.payload))
      .map(payload => ({
        type: type.FETCH_USER_LIST_SUCCESS,
        payload
      }))
      .catch(error =>
        Observable.of({
          type: type.FETCH_USER_LIST_ERROR,
          payload: { error }
        })
      )
  })
)

const getAdminEpic = action$ =>
action$.pipe(
  ofType(type.FETCH_ADMIN),
  mergeMap(action => {
    return Observable.fromPromise(api.getAdmin(action.payload))
      .map(payload => ({
        type: type.FETCH_ADMIN_SUCCESS,
        payload
      }))
      .catch(error =>
        Observable.of({
          type: type.FETCH_ADMIN_ERROR,
          payload: { error }
        })
      )
  })
)

export default combineEpics(getUserListEpic , getAdminEpic)
