import * as type from './action-types'

export const fetchMenus = data => (
{
  type: type.FETCH_MENU_LIST,
  payload: data
})
