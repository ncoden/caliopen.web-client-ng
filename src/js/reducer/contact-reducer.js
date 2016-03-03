import * as actions from '../action/action-types.js';

export function contactReducer(state = {
  isFetching: false,
  didInvalidate: false
}, action = {}) {
  switch(action.type) {
    case actions.REQUEST_CONTACT:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectedContact: action.contactId
      });
    case actions.RECEIVER_CONTACT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        [action.contactId]: action.contact,
        lastUpdated: action.receivedAt
      });
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
