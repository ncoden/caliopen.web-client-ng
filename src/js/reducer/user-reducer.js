import * as actions from '../action/action-types.js';

export default function userReducer(state = {
  isFetching: false,
  didInvalidate: false,
}, action) {
  switch (action.type) {
    case actions.REQUEST_USER:
      return { ...state, isFetching: true };
    case actions.RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        user: action.payload.user,
      };
    case actions.INVALIDATE_USER:
      return { ...state, didInvalidate: true };
    default:
      return state;
  }
}
