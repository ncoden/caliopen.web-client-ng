import * as actions from '../action/action-types.js';

export function userReducer(state = {}, action) {
  switch (action.type) {
    case actions.REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case actions.RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
      });
      break;
    default:
      return state;
  }
}
