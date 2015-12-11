import * as actions from '../action/action-types.js';

export function contactReducer(state = {
  isFetching: false,
  didInvalidate: false
}, action = {}) {
  switch(action.type) {
    case actions.REQUEST_CONTACTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectedContact: undefined
      });
    case actions.RECEIVER_CONTACTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        contacts: action.contacts,
        totalContacts: action.total,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}
