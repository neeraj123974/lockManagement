/* eslint-disable default-case */
import { Record } from "immutable"
import { assign } from "lodash"

import * as type from "./action-types"
import { INIT, LOADING, SUCCESS, ERROR } from "../../../../utils/constants"

const InitialStateInterface = {
  phase: INIT,
  error: null,
  data: []
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    super(assign(desiredValues))
  }
}

export default function(state = new InitialState(), action = {}) {
  switch (action.type) {
    case type.FETCH_MENU_LIST: {
      return state.set("phase", LOADING).set("error", null)
    }
    case type.FETCH_MENU_LIST_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
    }
    case type.FETCH_MENU_LIST_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }
    default: {
      return state
    }
  }
}
